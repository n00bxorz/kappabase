const width = 1920; /**Viewport width */
const height = 1080; /**Veiwport Height */
const emoteScale = height * 0.1; /*Scale of emote on screen */

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

/*Emote element variables and animation*/ 
class Emote {
  constructor(element) {
    this.element = element;
    const ratio = element.width / element.height;
    this.height = emoteScale;
    this.width = emoteScale * ratio;
    this.speed = 0;
    
    
    this.a = -Math.random() * 0.005 - 0.0002;
    this.b = Math.random() * height * 9 + height * 2;
    this.offset = Math.sqrt(Math.abs(this.b / this.a));
    this.x = -this.offset;

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
    ctx.drawImage(this.element, x, y, this.width, this.height);
  }
}
