export function getRandomRGBValue() {
  const rgb = [];

  for (let i = 0; i < 3; i++) {
    rgb.push(Math.floor(Math.random() * 256)); // 256 is max limit.
  }

  return rgb;
}
