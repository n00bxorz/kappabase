const width = 1920;
const height = 1080;
const emoteScale = height * 3;

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

    this.a = -1;
    this.b = 10;
    this.offset = Math.sqrt(Math.abs(this.b / this.a));
    this.x = -this.offset;
    this.speed =
      3;
    this.shouldBeDeleted = false;
  }

  update() {
    this.x += this.speed;

    if (this.x > this.offset) {
      this.shouldBeDeleted = true;
    }
  }

  draw() {
    const x = this.x + -20;
    const y = height;
    ctx.drawImage(this.element, x, y, this.width, this.height);
  }
}
