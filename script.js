const stage = document.getElementById("stage");
const gif = document.getElementById("randomGif");

// ------------------------------
// WHISPERS
// ------------------------------
const whispers = [
    "YASHAS HELP",
    "there are more than before",
    "you did not create this many",
    "they are moving independently",
    "do not focus on one",
    "they are not synced",
    "something is wrong with the copies"
];

const titles = [
    "THERE WAS ONLY ONE",
    "IT SHOULDN'T HAVE BEEN ME",
    "THEY ARE SPLITTING",
    "ITS ALL YOUR FAULT YASHAS",
    "DO NOT COUNT THEM"
];

setInterval(() => {
    document.getElementById("whisper").innerText =
        whispers[Math.floor(Math.random() * whispers.length)];
}, 3000);

setInterval(() => {
    document.getElementById("title").innerText =
        titles[Math.floor(Math.random() * titles.length)];
}, 6000);

// ------------------------------
// AUDIO SYSTEM
// ------------------------------
const sounds = [
    "sounds/sound1.mp3",
    "sounds/sound2.mp3",
    "sounds/sound3.mp3"
];

const activeSounds = [];

// play a looping ambient sound (controlled)
function playSound() {
    const src = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(src);

    audio.loop = true;
    audio.volume = 0.2;

    audio.play().catch(() => {
        // autoplay restrictions safe fail
    });

    activeSounds.push(audio);

    // limit number of overlapping sounds (prevents chaos crash)
    if (activeSounds.length > 6) {
        const old = activeSounds.shift();
        old.pause();
    }
}

// ------------------------------
// VASE SYSTEM
// ------------------------------
function createVase(x, y, scale = 1) {
    const img = document.createElement("img");
    img.src = "vase.png";
    img.className = "vase";

    img.style.left = x + "px";
    img.style.top = y + "px";

    stage.appendChild(img);

    let vx = (Math.random() - 0.5) * 6;
    let vy = (Math.random() - 0.5) * 6;

    let sx = 1;
    let sy = 1;

    function animate() {
        let rect = img.getBoundingClientRect();

        if (rect.left <= 0 || rect.right >= window.innerWidth) vx *= -1;
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) vy *= -1;

        img.style.left = img.offsetLeft + vx + "px";
        img.style.top = img.offsetTop + vy + "px";

        sx += (Math.random() - 0.5) * 0.04;
        sy += (Math.random() - 0.5) * 0.04;

        sx = Math.max(0.6, Math.min(1.8, sx));
        sy = Math.max(0.6, Math.min(1.8, sy));

        img.style.transform = `scale(${scale * sx}, ${scale * sy})`;

        requestAnimationFrame(animate);
    }

    animate();

    // 🔊 SOUND TRIGGER PER SPAWN
    playSound();
}

// initial vase
createVase(window.innerWidth / 2, window.innerHeight / 2, 1.6);

// spawn system
setInterval(() => {
    createVase(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        0.5 + Math.random() * 1.5
    );
}, 2000);

// escalation
setTimeout(() => {
    setInterval(() => {
        createVase(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            0.3 + Math.random() * 2
        );
    }, 800);
}, 15000);

// ------------------------------
// RANDOM GIF
// ------------------------------
function moveGif() {
    const x = Math.random() * (window.innerWidth - 160);
    const y = Math.random() * (window.innerHeight - 160);

    gif.style.left = x + "px";
    gif.style.top = y + "px";

    gif.style.opacity = 0.2;

    setTimeout(() => {
        gif.style.opacity = 0;
    }, 500);
}

setInterval(moveGif, 2500 + Math.random() * 2000);
