class Poly {
    constructor() {
      this.points = [];
      this.color = '#FFFF00';
      this.isSelected = false;
    }
  
    addPoint(x, y) {
      this.points.push({ x, y });
    }
  
    draw(ctx) {
      ctx.strokeStyle = this.isSelected ? '#f00' : this.color; 
      ctx.lineWidth = 5;
  
      if (this.points.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
  
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
  
        ctx.closePath();
        ctx.stroke();
      }
    }
  
    containsPoint(x, y) {
      let inside = false;
      let j = this.points.length - 1;
  
      for (let i = 0; i < this.points.length; j = i++) {
        const xi = this.points[i].x, yi = this.points[i].y;
        const xj = this.points[j].x, yj = this.points[j].y;
  
        const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
  
        if (intersect) inside = !inside;
      }
  
      return inside;
    }
  }
  