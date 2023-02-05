import * as convert from "color-convert";

export const generatePalette = (hex) => {
  const colors = [];
  const [h, s] = convert.hex.hsl(hex);

  for (let index = 0; index <= 100; index += 5) {
    colors.push([h, s, index]);
  }
  return colors;
};

export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

export const hsltoCss = (hsl) => {
  const root = document.documentElement;
  const cssmodifier = `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`;
  root.style.setProperty("--shadow-color", cssmodifier);
};
