let numBitsSlider;
let img;
let bits = [];
let colorText;
let numBitsText;

function createBits(message) {
  const bits = [];
  for (let i = 0; i < message.length; i++) {
    const asciiValue = message.charCodeAt(i);
    for (let powerOf2 = 7; powerOf2 >= 0; --powerOf2) {
      const bitIsSet = asciiValue & (1 << powerOf2);
      bits.push(bitIsSet ? 1 : 0);
    }
  }
  return bits;
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

function asBitstring(oneByteNum) {
  let bits = oneByteNum.toString(2);
  while (bits.length < 8) bits = '0' + bits;
  return bits;
}

function draw() {
  image(img, 0, 0);
  numBitsText.elt.textContent = `Bits: ${numBitsSlider.value()}`;
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    const red = img.get(mouseX, mouseY)[0];
    const bits = asBitstring(red);
    colorText.elt.textContent = `Red: ${bits} (${red})`;
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
      for (let powerOf2 = numBits - 1; powerOf2 >= 0; --powerOf2) {
        if (bitIndex < bits.length) {
          if (bits[bitIndex++]) {
            encodedValue |= 1 << powerOf2;
          }
        }
      }
      img.set(col, row, color(encodedValue, 0, 0));
    }
  }
  img.updatePixels();
}
