class Poly {
    constructor() {
      this.points = [];
      this.color = '#000';
    }
  
    addPoint(x, y) {
      this.points.push({ x, y });
    }
  
    draw(ctx) {
      if (this.points.length < 3) {
        alert("É necessário selecionar pelo menos 3 pontos para criar um polígono.");
        return;
      }
  
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
  
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
  
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
  
      ctx.closePath();
      ctx.stroke();
    }
  
    delete(index, polygons, deleteButtonsContainer, redrawPolygons) {
      console.log(`Apagando polígono ${index + 1}`);
      polygons.splice(index, 1);
      deleteButtonsContainer.innerHTML = ''; 
      polygons.forEach((_, idx) => this.addDeleteButton(idx, polygons, deleteButtonsContainer, redrawPolygons)); 
      redrawPolygons(); 
    }
  
    addDeleteButton(index, polygons, deleteButtonsContainer, redrawPolygons) {
      const button = document.createElement('button');
      button.textContent = `Apagar Polígono ${index + 1}`;
      
      button.addEventListener('click', () => this.delete(index, polygons, deleteButtonsContainer, redrawPolygons));
      deleteButtonsContainer.appendChild(button);
    }
  }
  