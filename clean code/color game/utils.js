const DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export function getColors({ colorValue, gameDifficulty }) {
  if (gameDifficulty === DIFFICULTY.EASY) {
    const tolerance = 250;
    const colors = [colorValue, ...generateCloseColors(colorValue, tolerance)];
    return shuffle(colors);
  }

  if (gameDifficulty === DIFFICULTY.MEDIUM) {
    const tolerance = 200;
    const colors = [colorValue, ...generateCloseColors(colorValue, tolerance)];
    return shuffle(colors);
  }

  if (gameDifficulty === DIFFICULTY.HARD) {
    const tolerance = 100;
    const colors = [colorValue, ...generateCloseColors(colorValue, tolerance)];
    return shuffle(colors);
  }
}

function generateCloseColors([r, g, b], tolerance) {
  const colors = [];
  tolerance = Math.min(255, Math.max(0, tolerance)); // tolerance range (0-255)

  for (let i = 0; i < 5; i++) {
    // Generate random values within the tolerance range
    const deltaR = Math.floor(Math.random() * (2 * tolerance)) - tolerance;
    const deltaG = Math.floor(Math.random() * (2 * tolerance)) - tolerance;
    const deltaB = Math.floor(Math.random() * (2 * tolerance)) - tolerance;

    const newR = Math.min(255, Math.max(0, r + deltaR));
    const newG = Math.min(255, Math.max(0, g + deltaG));
    const newB = Math.min(255, Math.max(0, b + deltaB));

    colors.push([newR, newG, newB]);
  }

  return colors;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
