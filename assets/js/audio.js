/* Audio disabled per user preference */
class SoundController {
  constructor() {
    this.enabled = false;
  }
  toggle() { return false; }
  playClick() {}
  playSuccess() {}
  playTerminalKey() {}
}
window.soundController = new SoundController();
