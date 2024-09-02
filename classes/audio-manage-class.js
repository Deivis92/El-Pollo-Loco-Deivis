class AudioManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
    }

    loadSound(key, src) {
        const audio = new Audio(src);
        this.sounds[key] = audio;
    }

    playSound(key) {
        if (!this.isMuted && this.sounds[key]) {
            this.sounds[key].play();
        }
    }

    mute() {
        this.isMuted = true;
        this._updateVolume();
    }

    unmute() {
        this.isMuted = false;
        this._updateVolume();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this._updateVolume();
    }

    _updateVolume() {
        for (let key in this.sounds) {
            this.sounds[key].muted = this.isMuted;
        }
    }
}