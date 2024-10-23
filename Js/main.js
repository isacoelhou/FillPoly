document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const deleteButton = document.getElementById('delete');
    const clearButton = document.getElementById('clear');
    const colorButton = document.getElementById('changecolor'); 
    const newcolor = document.getElementById('color');
    const color = document.getElementById('colorcreate');
    const arestac = document.getElementById('arestacolor');
    const changeColorButton = document.getElementById('changecolor'); 
    document.getElementById('create').addEventListener('click', createPolygon);    
  
    let currentPoly = new Poly(); 
    let polygons = [];
    let selectedPolygon = null;
    
    function registerPoint(event) {
        if (!selectedPolygon) {
            const x = event.offsetX;
            const y = event.offsetY;
    
            currentPoly.addPoint(x, y);
    
            ctx.fillStyle = 'black';  
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);  
            ctx.fill();
        }
    }

    function hexToRgb(hex) {
        if (typeof hex !== 'string') {
            console.error("Invalid hex value:", hex);
            return null;
        }
        
        hex = hex.replace(/^#/, '');
    
        if (hex.length !== 6) {
            console.error("Invalid hex format:", hex);
            return null;
        }
    
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
    
        return `rgb(${r}, ${g}, ${b})`;
    }
        

    function createPolygon() {
        if (currentPoly.points.length >= 3) {
            currentPoly.arestacolor = hexToRgb(arestac.value); 
            ctx.strokeStyle = currentPoly.arestacolor;
            ctx.lineWidth = 5;
            
            ctx.beginPath();
            ctx.moveTo(currentPoly.points[0].x, currentPoly.points[0].y);
            for (let i = 1; i < currentPoly.points.length; i++) {
                ctx.lineTo(currentPoly.points[i].x, currentPoly.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            
            currentPoly.color = hexToRgb(color.value); 
            currentPoly.cria_arestas();
            currentPoly.fillpoly(ctx); 
    
            polygons.push(currentPoly); 
    
            currentPoly = new Poly();
        } else {
            alert("Selecione pelo menos 3 pontos para formar um polígono.");
        }
    }
    
    
    function selectPolygon(event) {
        currentPoly = null;
        currentPoly = new Poly();
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
    
        selectedPolygon = null;
        polygons.forEach(poly => poly.isSelected = false);  
    
        for (let i = polygons.length - 1; i >= 0; i--) {
            if (polygons[i].containsPoint(mouseX, mouseY)) {
                selectedPolygon = polygons[i]; 
                selectedPolygon.isSelected = true;
                break; 
            }
        }
        }

    function deleteSelectedPolygon() {
        if (selectedPolygon) {
            polygons = polygons.filter(poly => poly !== selectedPolygon);  
            selectedPolygon = null; 
            redrawPolygons();  
        } else {
            alert("Nenhum polígono selecionado.");
        }
    }


    function changeColor() {
        if (selectedPolygon) {
            selectedPolygon.color = hexToRgb(newcolor.value); 
            redrawPolygons();
        } else {
            alert("Nenhum polígono selecionado.");
        }
    }
    

    function redrawPolygons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
        polygons.forEach((p) => {
            ctx.strokeStyle = p.arestacolor; 
            ctx.lineWidth = 5;
            ctx.beginPath();
            let copy = new Poly();
            copy = p;
            p = null;
            ctx.moveTo(copy.points[0].x, copy.points[0].y);
            for (let i = 1; i < copy.points.length; i++) {
                ctx.lineTo(copy.points[i].x, copy.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();
    
            copy.fillpoly(ctx);
        });
    }
    
    
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        polygons = [];
        currentPoly = new Poly();
        selectedPolygon = null;
    }
  
        
    deleteButton.addEventListener('click', deleteSelectedPolygon); 
    clearButton.addEventListener('click', clearCanvas);
    changeColorButton.addEventListener('click', changeColor); 
    canvas.addEventListener('mousedown', registerPoint);
    canvas.addEventListener('dblclick', selectPolygon); 

});