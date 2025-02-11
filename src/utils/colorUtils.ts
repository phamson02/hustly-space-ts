const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number) => {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const lightenColor = (hex: string, factor: number = 0.5) => {
  let [r, g, b] = hexToRgb(hex);
  r = Math.round(r + (255 - r) * factor);
  g = Math.round(g + (255 - g) * factor);
  b = Math.round(b + (255 - b) * factor);
  return rgbToHex(r, g, b);
};

const darkenColor = (hex: string, factor: number = 0.5) => {
  let [r, g, b] = hexToRgb(hex);
  r = Math.round(r * (1 - factor));
  g = Math.round(g * (1 - factor));
  b = Math.round(b * (1 - factor));
  return rgbToHex(r, g, b);
};

export { hexToRgb, rgbToHex, lightenColor, darkenColor };
