/*
> workflow : 

> random color code. will be generate when page is loaded. 
> and 6 color box will be generated based color code.

> when we select color that is farthest to generate code we win. else we lose.
> then we click on next button to do the same.

> on change of color format using radio button. 
> color code changes.

> on change of difficulty.
> below six color change. from being all very different to all very same.

*/

import { getRandomRGBValue } from "./rgb.js";
import { getRandomHSLValue, hslToRGB } from "./hsl.js";
import { getRandomHEXValue, hexToRGB } from "./hex.js";
import { getColors } from "./utils.js";

const colorSetting = {
  colorValue: "",
  gameDifficulty: "",
};

const colorString = document.querySelector(".color-string");
const colorGrid = document.querySelector(".color-grid");
const resultMsg = document.querySelector("#resultMsg");
const nextGameBtn = document.querySelector("#nextBtn");

InitialColorGameSetup();

function InitialColorGameSetup() {
  const initialColorVal = getRandomRGBValue();
  colorString.textContent = `rgb(${initialColorVal.join(", ")})`;
  colorString.dataset.correctRgbVal = initialColorVal;

  colorSetting.gameDifficulty = "easy";
  colorSetting.colorValue = initialColorVal;
  const colors = getColors(colorSetting);

  bindColorsToUI(colors);
}

const rgbFormat = document.querySelector("#rgb");
const hslFormat = document.querySelector("#hsl");
const hexFormat = document.querySelector("#hex");

rgbFormat.addEventListener("change", () => {
  const rgbColor = getRandomRGBValue();
  colorString.textContent = `rgb(${rgbColor.join(", ")})`;
  colorString.dataset.correctRgbVal = rgbColor;

  colorSetting.colorValue = rgbColor;
  const colors = getColors(colorSetting);
  bindColorsToUI(colors);
});

hslFormat.addEventListener("change", () => {
  const hslColor = getRandomHSLValue();
  const formattedHslColor = hslColor.map((item, i) => {
    if (i === 0) return item;
    return `${item}%`;
  });
  colorString.textContent = `hsl(${formattedHslColor.join(", ")})`;
  const rgbVersion = hslToRGB(hslColor);
  colorString.dataset.correctRgbVal = rgbVersion;

  colorSetting.colorValue = hslToRGB(rgbVersion);
  const colors = getColors(colorSetting);
  bindColorsToUI(colors);
});

hexFormat.addEventListener("change", () => {
  const hexColor = getRandomHEXValue();
  colorString.textContent = hexColor;
  const rgbVersion = hexToRGB(hexColor);
  colorString.dataset.correctRgbVal = rgbVersion;

  colorSetting.colorValue = rgbVersion;
  const colors = getColors(colorSetting);
  bindColorsToUI(colors);
});

const gameDifficulties = document.querySelectorAll("[name='difficulty']");
gameDifficulties.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    colorSetting.gameDifficulty = e.target.value;

    const colors = getColors(colorSetting);
    bindColorsToUI(colors);
  });
});

function bindColorsToUI(colors) {
  resultMsg.textContent = "";

  const colorBtnElements = colors.map((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = `rgb(${color.join(",")})`;
    button.dataset.rgbVal = color;
    return button;
  });

  colorGrid.replaceChildren(...colorBtnElements);
}

colorGrid.addEventListener("click", (e) => {
  if (e.target.dataset.rgbVal) {
    const selectedValue = e.target.dataset.rgbVal;
    const correctValue = colorString.dataset.correctRgbVal;

    if (selectedValue === correctValue) resultMsg.textContent = "Correct";
    else resultMsg.textContent = "Wrong";

    colorGrid.childNodes.forEach((child) => {
      if (child.dataset.rgbVal !== colorString.dataset.correctRgbVal) {
        child.classList.add("wrong");
        child.disabled = true;
      }
    });
  }
});

nextGameBtn.addEventListener("click", () => {
  // get new random color based on settings val.
  const formatElements = document.querySelectorAll("[name='format']");
  formatElements.forEach((element) => {
    if (element.checked) {
      const format = element.value;
      let rgbColor;

      if (format === "rgb") {
        rgbColor = getRandomRGBValue();
        colorString.textContent = `rgb(${rgbColor.join(", ")})`;
      }
      if (format === "hex") {
        const hexColor = getRandomHEXValue();
        colorString.textContent = hexColor;
        rgbColor = hexToRGB(hexColor);
      }
      if (format === "hsl") {
        const hslColor = getRandomHSLValue();
        const formattedHslColor = hslColor.map((item, i) => {
          if (i === 0) return item;
          return `${item}%`;
        });
        colorString.textContent = `hsl(${formattedHslColor.join(", ")})`;
        rgbColor = hslToRGB(hslColor);
      }

      colorString.dataset.correctRgbVal = rgbColor;
      colorSetting.colorValue = rgbColor;
      const colors = getColors(colorSetting);
      bindColorsToUI(colors);
    }
  });
});
