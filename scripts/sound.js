/* ==========================================
   Website Sound Effects
   ========================================== */

// 1. Get Audio and Toggle Button
const interfaceSound = document.getElementById("interface-sound");
const soundToggle = document.getElementById("sound-toggle");

// 2. Load Saved Sound Preference
let soundEnabled = localStorage.getItem("portfolioSound") !== "off";

// 3. Update Sound Toggle Button
function updateSoundToggle() {
    if (soundEnabled) {
        soundToggle.textContent = "🔊 Sound On";
        soundToggle.setAttribute("aria-pressed", "true");
        soundToggle.setAttribute("aria-label", "Turn website sound off");
    } else {
        soundToggle.textContent = "🔇 Sound Off";
        soundToggle.setAttribute("aria-pressed", "false");
        soundToggle.setAttribute("aria-label", "Turn website sound on");
    }
}

// 4. Play Interface Sound
function playInterfaceSound() {
    if (!soundEnabled) {
        return;
    }

    interfaceSound.volume = 0.15;
    interfaceSound.currentTime = 0;

    interfaceSound.play().catch(() => {
        // Playback may be blocked by the browser.
    });
}

// 5. Toggle Website Sound
soundToggle.addEventListener("click", function () {
    soundEnabled = !soundEnabled;

    localStorage.setItem(
        "portfolioSound",
        soundEnabled ? "on" : "off"
    );

    if (!soundEnabled) {
        interfaceSound.pause();
        interfaceSound.currentTime = 0;
    }

    updateSoundToggle();
});

// 6. Play Sound Before Navigating
document.querySelectorAll("nav a").forEach(function (link) {
link.addEventListener("click", function (event) {
    if (!soundEnabled) {
        return;
    }

    if (event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) {
        return;
    }

    event.preventDefault();

    playInterfaceSound();

    setTimeout(function () {
        window.location.href = link.href;
    }, 250);
    });
});

// 7. Initialize Sound Button
updateSoundToggle();
