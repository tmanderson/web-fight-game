import GameObject from './GameObject';

export default class Sprite extends GameObject {
  _dir = 1;

  up = 1;
  heading = 1;

  row = 0;
  col = 0;

  constructor(src, frameWidth, frameHeight) {
    super('src', frameWidth, frameHeight);

    this._queue = [];
    this.src = src;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.animations = {};
    this.el.style.backgroundImage = `url(${src})`;
  }

  flip(axis) {
    if(axis === 'y') {
      this.heading *= -1;
      this.rotate(0, this.heading > 0 ? 0 : Math.PI * this.heading);
    }

    if(axis === 'x') {
      this.up *= -1;
      this.rotate(this.up > 0 ? 0 : Math.PI * this.up, 0);
    }

    return this;
  }

  play(name='idle') {
    if(this.animation && (this.animation.name === name)) return this;

    if(this.animation && !this.animation.interrupt) {
      if(this.animations[name].repeat && this._queue[this._queue.length-1] !== name) {
        this._queue.push(name);
      }
      return this;
    }

    this._prev = this.animation && this.animation.name || null;
    this._dir = 1;
    this.animation = this.animations[name];
    this.plays = 0;
    this.col = 0;
    this.row = this.animation.row;

    return this;
  }

  addAnimation(name, row, length, options) {
    const {
      alternate,
      offset = 0,
      repeat = 0,
      interrupt = true,
    } = options;

    this.animations[name] = {
      name,
      alternate,
      row,
      length,
      repeat,
      interrupt,
      offset,
      plays: 0
    };
  }

  nextFrame() {
    const { animation: { alternate, repeat, length: frames } } = this;

    if(!alternate && this.col > frames || alternate && this.col < 0)  {
      this.animation.plays++;

      if(repeat && this.animation.plays >= repeat) {
        this.animation = null;
        this.play(this._queue.shift());

        return false;
      }

      this.animation.plays = 0;
    }

    return true;
  }

  render() {
    if(!this.animation) return;

    const {
      frameWidth,
      frameHeight,
      row,
      col,
      animation: { alternate, repeat, offset, length: frames }
    } = this;

    this.el.style.backgroundPosition = `-${(col + offset) * frameWidth}px -${row * frameHeight}px`;
    this.el.style.transform = this.transform.toCSS();
    this.col += this._dir;

    if(this.nextFrame()) {
      if(this.col >= frames) {
        this.col = alternate ? this.col - 1 : 0;
        if(alternate) this._dir *= -1;
      }

      if(this.col < 0) {
        this.col = alternate ? 1 : 0;
        if(alternate) this._dir *= -1;
      }
    }
  }
}
