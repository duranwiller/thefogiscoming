const stage = document.getElementById("stage");
const whispers = [
"you only uploaded one file",
"why are there more now",
"it is copying itself",
"this is not how images work",
"stop refreshing",
"they are not identical",
"look closely"
];

const titles = [
"THERE WAS ONLY ONE",
"IT DUPLICATED",
"IT IS SPREADING",
"THE FILE CHANGED",
"THIS IS NOT STATIC"
];

// change text
setInterval(() => {
document.getElementById("whisper").innerText =
whispers[Math.floor(Math.random() * whispers.length)];
}, 4000);

setInterval(() => {
document.getElementById("title").innerText =
titles[Math.floor(Math.random() * titles.length)];
}, 7000);

// bouncing movement for main vase
let dx = 2;
let dy = 2;
const main = document.getElementById("mainVase");

function moveMain() {
let rect = main.getBoundingClientRect();

```
if (rect.left <= 0 || rect.right >= window.innerWidth) dx *= -1;
if (rect.top <= 0 || rect.bottom >= window.innerHeight) dy *= -1;

main.style.left = (main.offsetLeft + dx) + "px";
main.style.top = (main.offsetTop + dy) + "px";

requestAnimationFrame(moveMain);
```

}
moveMain();

// duplicate spawning
function spawnVase() {
const img = document.createElement("img");
img.src = "vase.png";
img.className = "vase";

```
img.style.left = Math.random() * window.innerWidth + "px";
img.style.top = Math.random() * window.innerHeight + "px";
img.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;

stage.appendChild(img);

// slight drifting motion
let driftX = (Math.random() - 0.5) * 2;
let driftY = (Math.random() - 0.5) * 2;

function drift() {
    img.style.left = (img.offsetLeft + driftX) + "px";
    img.style.top = (img.offsetTop + driftY) + "px";
    requestAnimationFrame(drift);
}
drift();
```

}

// spawn more over time
setInterval(() => {
spawnVase();
}, 2000);

// escalation
setTimeout(() => {
setInterval(() => {
spawnVase();
}, 500);
}, 20000);
