import 'styles/main.scss';
import Engine from './core/Engine';
import AudioPlayer from './core/AudioPlayer';

const sfx = AudioPlayer.load('winner');

import Patrick from './fighters/Patrick';

const engine = new Engine();

const keymap1 = {
  left: 65, // a
  right: 68, // d
  rpunch: 81, // q
  lpunch: 69, // e
  kick: 90, // z
  jump: 87, // w
};

const keymap2 = {
  left: 37,
  right: 39,
  rpunch: 80,
  lpunch: 76,
  kick: 75,
  jump: 32,
};

const player1 = new Patrick(keymap1);
const hb1 = document.createElement('div');
const span1 = document.createElement('span');
hb1.appendChild(span1);
hb1.className = 'health';
document.body.appendChild(hb1);

const player2 = new Patrick(keymap2)
const hb2 = document.createElement('div');
const span2 = document.createElement('span');
hb2.appendChild(span2);
hb2.className = 'health';
document.body.appendChild(hb2);

player2.translate(document.body.offsetWidth - player2.frameWidth - 50);
player2.flip('y');

engine.add(player1);
engine.add(player2);

let winner = false;

engine.ontick = function() {
  hb1.dataset.value = player1.health;
  hb2.dataset.value = player2.health;

  if(!winner && (player1.health <= 0 || player2.health <= 0)) {
    winner = true;
    sfx.play();
  }
}

engine.start();
