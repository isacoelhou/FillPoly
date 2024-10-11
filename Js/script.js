document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const createButton = document.getElementById('create');
    const clearButton = document.getElementById('clear');
    const deleteButtonsContainer = document.getElementById('delete-buttons'); 
  
    let currentPoly = new Poly(); 
    let polygons = [];
  
    function registerPoint(event) {
      console.log(`Ponto registrado: (${event.offsetX}, ${event.offsetY})`);
      currentPoly.addPoint(event.offsetX, event.offsetY);
    }
  
    function createPolygon() {
      if (currentPoly.points.length >= 3) {
        console.log('Criando polígono');
        currentPoly.draw(ctx);  
        polygons.push(currentPoly); 
        currentPoly.addDeleteButton(polygons.length - 1, polygons, deleteButtonsContainer, redrawPolygons); 
  
        currentPoly = new Poly();   
      } else {
        alert("Selecione pelo menos 3 pontos para formar um polígono.");
      }
    }
  
    function redrawPolygons() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      polygons.forEach(poly => poly.draw(ctx)); 
    }
  
    function clearCanvas() {
      console.log('Limpando tela');
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      polygons = []; 
      currentPoly = new Poly();  
      deleteButtonsContainer.innerHTML = ''; 
    }
  
    canvas.addEventListener('mousedown', registerPoint);
    createButton.addEventListener('click', createPolygon);
    clearButton.addEventListener('click', clearCanvas);
  });
  