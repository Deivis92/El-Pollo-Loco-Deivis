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
            collect_coin_sound: new Audio("./audio/collect_coin.mp3"),
            pepe_snor: new Audio("./audio/pepe_snor.mp3")
        };
        this.isMuted = false;
        this.initializeSounds();
    }

    initializeSounds() {
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

    stopSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0; // Reset playback position to start
        } else {
            console.error(`Sound ${soundName} not found`);
        }
    }

    restartSound(soundName) {
        if (this.sounds[soundName]) {
            this.stopSound(soundName); // Stop and reset the sound
            this.playSound(soundName); // Play it again from the start
        } else {
            console.error(`Sound ${soundName} not found`);
        }
    }

    setVolume(soundName, volume) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
        } else {
            console.error(`Sound ${soundName} not found`);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        console.log("Mute toggled:", this.isMuted);
        this.updateAllSoundsMuteState();
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
// document.addEventListener('DOMContentLoaded', () => {
//     const audioManager = new AudioManager();
//     const soundIconElement = document.getElementById('sound-icon').querySelector('img');

//     soundIconElement.addEventListener('click', () => {
//         audioManager.toggleMute();
//         audioManager.updateIcon(soundIconElement);
//     });
// });