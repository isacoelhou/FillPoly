class Poly {
    
    constructor() {
        this.points = [];
        this.color = "rgb(255, 255, 0)"; 
        this.isSelected = false;
        this.arestas = [];
        this.inters = [];
        this.arestacolor = "rgb(255, 255, 0)"; 
      }
  
    addPoint(x, y) {
      this.points.push({ x, y });
    }
  
    containsPoint(x, y) {
      let inside = false;
      let j = this.points.length - 1;  
  

      for (let i = 0; i < this.points.length; i++) {
          const xi = this.points[i].x, yi = this.points[i].y;
          const xj = this.points[j].x, yj = this.points[j].y;
          
          const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          
          if (intersect)
            inside = !inside;  
  
          j = i; 
      }
  
      return inside;  
  }
  
    addAresta(x1, y1, x2, y2){  
      this.arestas.push({ x1, y1, x2, y2 });
    }
  
    cria_arestas() {
      this.points.forEach((point, i) => {
        const nextPoint = this.points[(i + 1) % this.points.length];
        this.addAresta(point.x, point.y, nextPoint.x, nextPoint.y);
      });
    }
    
    swap_arestas(i) {
      [this.arestas[i].x1, this.arestas[i].x2] = [this.arestas[i].x2, this.arestas[i].x1];
      [this.arestas[i].y1, this.arestas[i].y2] = [this.arestas[i].y2, this.arestas[i].y1];
    }
  
    draw(line, y, context) {
      context.fillStyle = this.color; 
  
      for (let i = 0; i < line.length; i += 2) {
          const x1 = Math.ceil(line[i]);
          const x2 = Math.floor(line[i + 1]);
          
          for (let x = x1; x <= x2; x++) { 
              context.fillRect(x, y, 1, 1); 
          }
      }
  }
  
    fillpoly(ctx) {
      const ymin = Math.min(...this.points.map(p => p.y));
      const ymax = Math.max(...this.points.map(p => p.y));
      
      this.inters = Array.from({ length: ymax - ymin }, () => []); 
  
      this.arestas.forEach((aresta, i) => {
          if (aresta.y1 === aresta.y2) return; 
          if (aresta.y1 > aresta.y2) this.swap_arestas(i);
  
          const { x1, y1, x2, y2 } = this.arestas[i];
          const coeficiente = (x2 - x1) / (y2 - y1);
  
          let x = x1;
          let index = Math.floor(y1 - ymin);
  
          for (let y = y1; y < y2; y++) {
              this.inters[index++].push(x);
              x += coeficiente;
          }
      });
  
      this.inters.forEach((line, i) => {
          line.sort((a, b) => a - b);
          this.draw(line, ymin + i, ctx);  
      });
  }
  
} 