import "./styles.css";
const partyImage = require("./party.png");

const imageUrl = document.location.origin + "/" + partyImage.default;
console.log(imageUrl);
document
  .querySelector('meta[property="og:image"]')
  .setAttribute("content", imageUrl);

// confetti
var myCanvas = document.createElement("canvas");
myCanvas.style.position = "absolute";
myCanvas.style.top = 0;
myCanvas.style.zIndex = 999;

myCanvas.height = window.innerHeight;
myCanvas.width = window.innerWidth;
const x = document.getElementById("confetti");
x.appendChild(myCanvas);

const loadWensen = async () => {
  const wJson = await fetch(
    "https://europe-west1-wie-is-het-264722.cloudfunctions.net/getWensen"
  );
  const wensen = await wJson.json();
  let template = require("./wensen.pug");

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  console.log(
    wensen.wensen.map((x) => {
      return { n: x.Naam, t: x.Tekst, l: x.Tekst.length };
    })
  );
  let locals = {
    wensen: shuffle(wensen.wensen),
  };
  document.querySelector(".wensen").innerHTML = template(locals);

  var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
  });
  myConfetti({
    particleCount: 100,
    spread: 160,
  });

  // load in images
  setTimeout(() => {
    document.querySelectorAll("img").forEach((image) => {
      image.src = image.dataset.src;
    });
  }, 1);
};

loadWensen();
