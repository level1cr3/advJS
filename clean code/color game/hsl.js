export function getRandomHSLValue() {
  const hsl = [];

  for (let i = 0; i < 3; i++) {
    if (i === 0) hsl.push(Math.floor(Math.random() * 360));
    else hsl.push(Math.floor(Math.random() * 101));
  }

  return hsl;
}

export function hslToRGB([h, s, l]) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [
    Math.floor(255 * f(0)),
    Math.floor(255 * f(8)),
    Math.floor(255 * f(4)),
  ];
}
