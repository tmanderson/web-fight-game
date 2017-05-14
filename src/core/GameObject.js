import CSSMatrix from './CSSMatrix';

export default class GameObject {
  constructor(name, width, height) {
    this.el = document.createElement('div');
    this.el.style.width = `${width}px`;
    this.el.style.height = `${height}px`;

    this.transform = new CSSMatrix();

    this.translation = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
  }

  translate(x=0, y=0, append=true) {
    this.translation.x = (append ? this.translation.x : 0) + x;
    this.translation.y = (append ? this.translation.y : 0) + y;
    this.transform.translate(this.translation.x, this.translation.y);
  }

  rotate(x, y) {
    Object.assign(this.rotation, { x, y });
    this.transform.rotate(0, x, y);
  }
}
