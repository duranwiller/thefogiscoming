const stage = document.getElementById("stage");
const gif = document.getElementById("randomGif");
const enterBtn = document.getElementById("enterBtn");
const gate = document.getElementById("gate");

let unlocked = false;

/* -------------------------
   SOUND SYSTEM
------------------------- */
const sounds = [
    "sounds/sound1.mp3",
    "sounds/sound2.mp3",
    "sounds/sound3.mp3"
];

function playRandomSound() {
    const src = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(src);

    audio.volume = 0.25;
    audio.loop = true;
    audio.play().catch(() => {});
}

/* -------------------------
   TEXT SYSTEM
------------------------- */
const whispers = [
    "it is not staying still",
    "there are more than before",
    "they are multiplying",
    "do not focus on one",
    "yashas it is all at your fault",
    "something is wrong"
];

const titles = [
    "THERE WAS ONLY ONE",
    "IT IS MULTIPLYING",
    "YASAHS WHY WHY W̶̧̛̜̪͚̝̮̤̜̳͕̤̓̎̒̎́̾͆͑̿͂̓̀́͜͝H̵̡͚̜͓̼͎̞̟̰̗̺̱̯͌͐̈́͐ͅY̷̢̨̜͉͈̟͋͑̾̈͊̅͜͝",
    "IT IS NOT STABLE",
    "DO NOT COUNT THEM"
];

function startTextLoop() {
    setInterval(() => {
        document.getElementById("whisper").innerText =
            whispers[Math.floor(Math.random() * whispers.length)];
    }, 3000);

    setInterval(() => {
        document.getElementById("title").innerText =
            titles[Math.floor(Math.random() * titles.length)];
    }, 6000);
}

/* -------------------------
   VASE SYSTEM
------------------------- */
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

    playRandomSound(); // SOUND ON SPAWN
}

/* -------------------------
   GIF SYSTEM
------------------------- */
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

/* -------------------------
   START EXPERIENCE
------------------------- */
function startExperience() {

    startTextLoop();

    createVase(
        window.innerWidth / 2,
        window.innerHeight / 2,
        1.6
    );

    setInterval(() => {
        createVase(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            0.5 + Math.random() * 1.5
        );
    }, 2000);

    setTimeout(() => {
        setInterval(() => {
            createVase(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                0.3 + Math.random() * 2
            );
        }, 800);
    }, 15000);

    setInterval(moveGif, 600 + Math.random() * 800);
}

/* -------------------------
   GATE UNLOCK
------------------------- */
enterBtn.addEventListener("click", () => {
    gate.style.display = "none";
    unlocked = true;

    document.getElementById("whisper").innerText = "it is now listening";

    startExperience();
});
