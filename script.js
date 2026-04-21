const whispers = [
"it shouldn't have this many versions",
"which one is the original",
"they are all looking at you",
"you only uploaded one image",
"why are there five now",
"it duplicated itself",
"stop refreshing"
];

const titles = [
"THE VESSEL IS NOT CONSISTENT",
"THE VESSEL MULTIPLIES",
"THE VESSEL IS COPYING",
"THERE WERE NOT THIS MANY",
"DO YOU REMEMBER UPLOADING THESE"
];

// change whisper text
setInterval(() => {
document.getElementById("whisper").innerText =
whispers[Math.floor(Math.random() * whispers.length)];
}, 4000);

// change title
setInterval(() => {
document.getElementById("title").innerText =
titles[Math.floor(Math.random() * titles.length)];
}, 7000);

// occasional full-screen intrusion
setInterval(() => {
const intrusion = document.getElementById("intrusion");
intrusion.style.opacity = 0.25;

```
setTimeout(() => {
    intrusion.style.opacity = 0;
}, 150);
```

}, 9000);

// subtle mouse tracking (makes it feel reactive)
document.addEventListener("mousemove", (e) => {
const vase = document.getElementById("mainVase");
let x = (e.clientX / window.innerWidth - 0.5) * 20;
let y = (e.clientY / window.innerHeight - 0.5) * 20;
vase.style.transform = `translate(${x}px, ${y}px)`;
});

// delayed escalation
setTimeout(() => {
document.getElementById("whisper").innerText =
"you stayed long enough to see all of them";
}, 30000);
