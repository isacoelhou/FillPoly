class Teste {
  
  constructor() {
    this.points = [];
    this.color = '#FFFF00';
    this.isSelected = false;
    this.arestas = [];
  }

  addPoint(x, y) {
    this.points.push({ x, y });
  }

  addAresta(x1, y1, x2, y2){  
    this.arestas.push({ x1, y1, x2, y2 });
  }

  cria_arestas(){
    for(let i = 0; i < this.points.length; i++){
      if (i == this.points.length - 1) {
        this.addAresta(this.points[i].x, this.points[i].y, this.points[0].x, this.points[0].y);
      } else {
        this.addAresta(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
      }
    }
  }

  swap_arestas(i){
    let aux1 = this.arestas[i].x1;
    let aux2 = this.arestas[i].y1;

    this.arestas[i].x1 = this.arestas[i].x2;
    this.arestas[i].y1 = this.arestas[i].y2;

    this.arestas[i].x2 = aux1;
    this.arestas[i].y2 = aux2;
  }

  fillpoly() {
    const pointsy = this.points.map(point => point.y);
    let ymin = Math.min(...pointsy);
    let ymax = Math.max(...pointsy);

    const N_scanlines = ymax - ymin;
    const Scan_lines = new Array(N_scanlines);
    const coeficiente = new Array(this.arestas.length); 
    const inters = Array.from({ length: ymax - ymin }, () => []);      

    for(let i = 0; i < this.arestas.length; i++) {
      if(this.arestas[i].y1 == this.arestas[i].y2) {
        continue;
      } 
      
      if(this.arestas[i].y1 > this.arestas[i].y2) {
        this.swap_arestas(i);
      }
      
      coeficiente[i] = (this.arestas[i].x2 - this.arestas[i].x1) / (this.arestas[i].y2 - this.arestas[i].y1);

      let x = parseFloat(this.arestas[i].x1);
      let y = parseFloat(this.arestas[i].y1);
      let index = Math.floor(this.arestas[i].y1 - ymin); 
  
      while (y < this.arestas[i].y2) {
        inters[index].push(x);
        x += coeficiente[i]; 
        y += 1;
        index += 1;
      }
    }

    console.log(inters); 
  }
}
      
const a = new Teste();
a.addPoint(10, 30); 
a.addPoint(20, 20);
a.addPoint(30, 20);
a.addPoint(30, 1); 
a.cria_arestas();
a.fillpoly();
