const stage = document.getElementById("stage");

const whispers = [
    "it is not staying still",
    "there are more than before",
    "you did not create this many",
    "they are moving independently",
    "do not focus on one",
    "they are not synced"
];

// update text
setInterval(() => {
    document.getElementById("whisper").innerText =
        whispers[Math.floor(Math.random() * whispers.length)];
}, 3000);

// bounce physics vase object
function createVase(x, y, scale = 1) {
    const img = document.createElement("img");
    img.src = "vase.png";
    img.className = "vase";

    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.transform = `scale(${scale})`;

    stage.appendChild(img);

    let vx = (Math.random() - 0.5) * 6;
    let vy = (Math.random() - 0.5) * 6;

    let stretchX = 1;
    let stretchY = 1;

    function animate() {
        let rect = img.getBoundingClientRect();

        let newX = img.offsetLeft + vx;
        let newY = img.offsetTop + vy;

        if (rect.left <= 0 || rect.right >= window.innerWidth) vx *= -1;
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) vy *= -1;

        // weird distortion (this is the “wrongness”)
        stretchX += (Math.random() - 0.5) * 0.05;
        stretchY += (Math.random() - 0.5) * 0.05;

        stretchX = Math.max(0.6, Math.min(1.6, stretchX));
        stretchY = Math.max(0.6, Math.min(1.6, stretchY));

        img.style.left = newX + "px";
        img.style.top = newY + "px";

        img.style.transform = `scale(${scale * stretchX}, ${scale * stretchY})`;

        requestAnimationFrame(animate);
    }

    animate();
}

// initial vase
createVase(window.innerWidth / 2, window.innerHeight / 2, 1.5);

// spawn duplicates over time
setInterval(() => {
    createVase(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        0.5 + Math.random() * 1.5
    );
}, 2000);

// escalation (more spawning later)
setTimeout(() => {
    setInterval(() => {
        createVase(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            0.3 + Math.random() * 2
        );
    }, 800);
}, 15000);
