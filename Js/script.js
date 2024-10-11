document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const deleteButton = document.getElementById('delete');
    const clearButton = document.getElementById('clear');
    const colorButton = document.getElementById('changecolor'); 
    const colorInput = document.getElementById('color');
    const changeColorButton = document.getElementById('changecolor'); 
    document.getElementById('create').addEventListener('click', createPolygon);    
  
    let currentPoly = new Poly(); 
    let polygons = [];
    let selectedPolygon = null;
    
    function registerPoint(event) {
        if (!selectedPolygon) {
        currentPoly.addPoint(event.offsetX, event.offsetY);
        }
    }

    function createPolygon() {
        if (currentPoly.points.length >= 3) {
            currentPoly.draw(ctx);
            polygons.push(currentPoly);
            currentPoly = new Poly();
            //perguntar aqui se o user deseja escolher a cor do poligono ou não
        } else {
            alert("Selecione pelo menos 3 pontos para formar um polígono.");
        }
    }

    function selectPolygon(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        
        selectedPolygon = null;
        polygons.forEach(poly => poly.isSelected = false); 
        
        for (let i = 0; i < polygons.length; i++) {
            if (polygons[i].containsPoint(mouseX, mouseY)) {
                selectedPolygon = polygons[i];
                selectedPolygon.isSelected = true; 
                break;
            }
        }
        
        redrawPolygons();
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
            const selectedColor = colorInput.value;
            selectedPolygon.color = colorInput.value; 
            redrawPolygons(); // Redesenha os polígonos
        } else {
            alert("Nenhum polígono selecionado.");
        }
    }

    function redrawPolygons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        polygons.forEach(poly => poly.draw(ctx)); 
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
    canvas.addEventListener('click', selectPolygon); 

});