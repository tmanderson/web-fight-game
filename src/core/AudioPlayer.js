export default class AudioPlayer {
  static sources = {};

  static load(name) {
    AudioPlayer.sources[name] = new Audio(require(`audio/${name}.mp3`));
    return AudioPlayer.sources[name];
  }

  static play(name) {
    AudioPlayer.sources[name].play();
  }
}
