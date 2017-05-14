export default class FightingGame {
  constructor(width, height) {
    this.keys = [];
    this.gameObjects = [];

    this.el = document.body;

    const bg = Math.ceil(Math.random()*2);
    const heights = [0, 350, 340];

    document.body.style.backgroundImage = `url(assets/images/bg${bg}.png)`;
    document.body.style.paddingTop = `${heights[bg]}px`;
  }

  keyDown = e => {
    if(this.keys.indexOf(e.which) < 0) this.keys.push(e.which);
  }

  keyUp = e => {
    this.keys.splice(this.keys.findIndex(v => v === e.which), 1);
  }

  click = e => {

  }

  mouseDown = e => {

  }

  mouseUp = e => {

  }

  start = () => {
    this.gameObjects.forEach(go => go.start());

    this.lastRendered = null;
    this.interval = 1000/16;

    this._animationFrame = window.requestAnimationFrame(this.tick);

    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    document.addEventListener('mousedown', this.mouseDown);
    document.addEventListener('click', this.click);
    document.addEventListener('mouseup', this.mouseUp);
  }

  tick = ts => {
    if(this.ontick) this.ontick();

    if(!this.lastRendered) this.lastRendered = ts;

    const shouldRender = (ts - this.lastRendered) >= this.interval;

    this.gameObjects.forEach(go1 => {
      const { frameWidth: w1, translation: { x: x1, y: y1 }, collision: c1 } = go1;

      this.gameObjects.forEach(go2 => {
        if(go2 === go1) return;

        const { frameWidth: w2, translation: { x: x2, y: y2 }, collision: c2 } = go2;
        const dist = Math.abs((x2 + w2) - (x1 + w1) + (y2 - y1));

        if(dist < w2/2) c2(go1);
        if(dist < w1/2) c1(go2);
      });
    });

    if(shouldRender) {
      this.gameObjects.forEach(go => go.render(this));
      this.lastRendered = ts;
    }

    window.requestAnimationFrame(this.tick);
  }

  add(gameObject) {
    this.gameObjects.push(gameObject);
    this.el.appendChild(gameObject.el);
  }

  stop() {
    clearAnimationFrame(this._animationFrame);
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    document.removeEventListener('mousedown', this.mouseDown);
    document.removeEventListener('click', this.click);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}
