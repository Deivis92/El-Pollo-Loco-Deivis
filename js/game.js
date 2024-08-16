let canvas;
let world;
let keyboard = new Keybord();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My Charackter is", world.character);
}

window.addEventListener('keypress', (e) => {
console.log(e);
});
