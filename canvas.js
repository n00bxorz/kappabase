const width = 1920;
const height = 1080;
const emoteScale = height * 10000;

const canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const showEmote = url => {
  const imgElement = new Image();
  imgElement.onload = () => {
    emotesToShow.push(new Emote(imgElement));
  };
  imgElement.src = url;
};

let emotesToShow = [];

const setup = () => {
  loop();
};

const loop = () => {
  ctx.clearRect(0, 0, width, height);

  emotesToShow.forEach(emote => {
    emote.draw();
    emote.update();
  });

  emotesToShow = emotesToShow.filter(emote => !emote.shouldBeDeleted);

  requestAnimationFrame(loop);
};

setup();

class Emote {
  constructor(element) {
    this.element = element;
    const ratio = element.width / element.height;
    this.height = emoteScale;
    this.width = emoteScale * ratio;

    this.a = -Math.random() * 0.005 - 0.0002;
    this.b = Math.random() * height * 0.4 + height * 0.6;
    this.offset = 0;
    this.x = -this.offset;
    this.speed = 0;
    this.shouldBeDeleted = false;
  }

  update() {
    this.x += this.speed;

    if (this.x > this.offset) {
      this.shouldBeDeleted = true;
    }
  }

  draw() {
    const x = this.x + this.offset;
    const y = height - (this.a * Math.pow(this.x, 2) + this.b);
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Shadow
    ctx.drawImage(Emote, -12, -12);
  }
}
