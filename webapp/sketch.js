let numBitsSlider;
let img;
let bits = [];
let colorText;
let numBitsText;

function createBits(message) {
  const b = [];
  for (let char of message) {
    const ascii = char.charCodeAt(0);
    for (let p = 7; p >= 0; --p) {
      b.push(ascii & 2 ** p ? 1 : 0);
    }
  }
  return b;
}

function setup() {
  createCanvas(50, 50);
  createP();
  numBitsSlider = createSlider(1, 8, 1).changed(update);
  numBitsText = createP();
  colorText = createP();
  bits = createBits('The first recorded uses of steganography can be traced back to 440 BC when Herodotus mentions two examples in his Histories.[3] Histiaeus sent a message to his vassal, Aristagoras, by shaving the head of his most trusted servant, "marking" the message onto his scalp, then sending him on his way once his hair had regrown, with the instruction, "When thou art come to Miletus, bid Aristagoras shave thy head, and look thereon." Additionally, Demaratus sent a warning about a forthcoming attack to Greece by writing it directly on the wooden backing of a wax tablet before applying its beeswax surface. Wax tablets were in common use then as reusable writing surfaces, sometimes used for shorthand.');
  update();
}

function draw() {
  image(img, 0, 0);
  numBitsText.elt.textContent = `Bits: ${numBitsSlider.value()}`;
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    const c = img.get(mouseX, mouseY);
    let  bits = c[0].toString(2);
    while (bits.length < 8) bits = '0' + bits;
    colorText.elt.textContent = `Red: ${bits} (${c[0]})`;
  }
}

function update() {
  const numBits = numBitsSlider.value();
  img = createImage(width, height);
  img.loadPixels();
  let bitIndex = 0;
  for (let row = 0; row < img.height; row++) {
    for (let col = 0; col < img.width; col++) {
      let encodedValue = 0;
      for (let p = numBits - 1; p >= 0; --p) {
        if (bitIndex < bits.length) {
          if (bits[bitIndex++]) {
            encodedValue |= 2 ** p;
          }
        }
      }
      img.set(col, row, color(encodedValue, 0, 0));
    }
  }
  img.updatePixels();
}
