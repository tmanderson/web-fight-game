import Sprite from './Sprite';

export default class Fighter extends Sprite {
  health = 100;

  constructor(name, width, height, controls) {
    super(name, width, height);
    this.controls = controls;
  }

  collision = other => {
    if(!this.attacking) {
      if(this.heading + other.heading !== 0) return;
      this._colliding = true;
      return false;
    }

    other.play('hit');
    other.health -= 10;
    this.attacking = false;

    return true;
  }

  render({ keys }) {
    if(this.health <= 0) {
      this.el.parentNode.removeChild(this.el);
    }

    if(keys.includes(this.controls.left)) {
      if(this.heading > 0) this.flip('y');
      this.play('walk');
    }
    else if(keys.includes(this.controls.right)) {
      if(this.heading < 0) this.flip('y');
      this.play('walk');
    }
    else {
      this.play('idle');
    }

    const a = this.animation.name;

    if(keys.includes(this.controls.jump)) this.play('jump'); // space
    else if(keys.includes(this.controls.kick)) this.play('kick'); // k
    else if(keys.includes(this.controls.lpunch)) this.play('lpunch'); // l
    else if(keys.includes(this.controls.rpunch)) this.play('rpunch'); // p

    super.render();

    if(this._colliding) {
      this.attacking = /punch|kick/.test(this.animation.name) && a !== this.animation.name;
      this._colliding = false;
      return;
    }

    if(this.animation.name === 'walk') {
      this.translate(10 * this.heading, 0);
    }

    if(this.animation.name === 'jump') {
      this.translate(20 * this.heading, 0);
    }
  }
}
