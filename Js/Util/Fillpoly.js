class Teste {
  constructor() {
    this.points = [];
    this.color = '#FFFF00';
    this.isSelected = false;
    this.arestas = [];
    this.inters = [];
  }

  addPoint(x, y) {
    this.points.push({ x, y });
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

  draw(line, y) {
    for (let i = 0; i < line.length; i += 2) {
      const xStart = Math.ceil(line[i]);
      const xEnd = Math.floor(line[i + 1]);
      console.log(`Drawing line from (${xStart}, ${y}) to (${xEnd}, ${y})`);
      context.beginPath();
      context.moveTo(xStart, y);
      context.lineTo(xEnd, y);
      context.stroke();
    }
  }
  

  fillpoly() {
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

    this.inters.forEach((line) => {
      line.sort((a, b) => a - b);
      this.draw(line, ymin);
    });

  }
}

const a = new Teste();
a.addPoint(10, 30); 
a.addPoint(20, 10);
a.addPoint(30, 40);
a.addPoint(40, 1); 
a.cria_arestas();
a.fillpoly(); 
