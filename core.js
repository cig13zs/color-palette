;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ColorPalette = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function hexToHsl(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToHex(h, s, l) {
    h = (h % 360 + 360) % 360;
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    const toHex = n => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  function generateSchemes(hex) {
    const [h, s, l] = hexToHsl(hex);
    return {
      base: hex,
      complementary: [hex, hslToHex(h + 180, s, l)],
      analogous: [hslToHex(h - 30, s, l), hex, hslToHex(h + 30, s, l)],
      triadic: [hex, hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)],
      shades: [10, 30, 50, 70, 90].map(lightness => hslToHex(h, s, lightness))
    };
  }

  return { generateSchemes: generateSchemes, hexToHsl: hexToHsl, hslToHex: hslToHex };
});
