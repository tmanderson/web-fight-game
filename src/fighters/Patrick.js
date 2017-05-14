import Fighter from '../core/Fighter';

export default class Patrick extends Fighter {
  constructor(controls) {
    super('assets/Patrick_Sheet1.png', 250, 320, controls);

    const actionOptions = { repeat: 1, alternate: true, interrupt: false };

    this.addAnimation('idle', 0, 0, { alternate: true });
    this.addAnimation('walk', 1, 7, { alternate: false });
    this.addAnimation('rpunch', 2, 4, actionOptions);
    this.addAnimation('lpunch', 3, 4, actionOptions);
    this.addAnimation('kick', 4, 4, actionOptions);
    this.addAnimation('jump', 5, 3, actionOptions);
    this.addAnimation('hit', 0, 0, { offset: 4, repeat: 1, interrupt: false });
  }

  start() {
    this.play('idle');
  }
}
