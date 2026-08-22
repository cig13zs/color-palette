const assert = require('assert');
const ColorPalette = require('./core');

const res = ColorPalette.generateSchemes('#3b82f6');
assert.strictEqual(res.base, '#3b82f6');
assert.strictEqual(res.triadic.length, 3);
assert.strictEqual(res.shades.length, 5);

console.log('ok, all ColorPalette assertions passed');
