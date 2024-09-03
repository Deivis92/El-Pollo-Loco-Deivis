class AudioManager {
    constructor() {
        this.sounds = {
            walking_sound: new Audio("./audio/walk.mp3"),
            pepe_jumps: new Audio("./audio/pepe_jumps.mp3"),
            dead_chicken: new Audio("./audio/dead_chicken.mp3"),
            hurt_sound: new Audio("./audio/hurt.mp3"),
            small_chicken_dead: new Audio("./audio/small_chicken_dead.mp3"),
            flying_bottle: new Audio("./audio/flying_bottle.mp3"),
            bottle_splash: new Audio("./audio/splash.mp3"),
            collect_bottle_sound: new Audio("./audio/collect_bottle.mp3"),
            collect_coin_sound: new Audio("./audio/collect_coin.mp3")
        };
        this.isMuted = false;
        this.initializeSounds();
    }

    initializeSounds() {
        // Set default mute state for all sounds
        this.updateAllSoundsMuteState();
    }

    updateAllSoundsMuteState() {
        console.log("Updating mute state:", this.isMuted);
        for (const key in this.sounds) {
            if (this.sounds.hasOwnProperty(key)) {
                this.sounds[key].muted = this.isMuted;
                console.log(`Sound ${key} muted:`, this.sounds[key].muted);
            }
        }
    }

    playSound(soundName) {
        if (this.isMuted) {
            console.log(`Attempt to play sound ${soundName} ignored because muted.`);
            return;
        }
        if (this.sounds[soundName]) {
            this.sounds[soundName].play().catch(error => {
                console.error(`Error playing sound ${soundName}:`, error);
            });
        } else {
            console.error(`Sound ${soundName} not found`);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        console.log("Mute toggled:", this.isMuted);
        this.updateAllSoundsMuteState();
    }

    toggleSound(iconElement) {
        this.toggleMute();
        this.updateIcon(iconElement);
    }

    updateIcon(iconElement) {
        if (this.isMuted) {
            iconElement.src = './icons/mute.svg'; // Path to the muted icon
        } else {
            iconElement.src = './icons/sound_on.svg'; // Path to the unmuted icon
        }
    }
}

// Usage Example
document.addEventListener('DOMContentLoaded', () => {
    const audioManager = new AudioManager();
    const soundIconElement = document.getElementById('sound-icon').querySelector('img');

    soundIconElement.addEventListener('click', () => {
        audioManager.toggleSound(soundIconElement);
    });

    // Initial setup to set the correct icon based on the current mute state
    audioManager.updateIcon(soundIconElement);
});