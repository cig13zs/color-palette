const sample = "#3b82f6";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const hex = inputEl.value.trim() || '#3b82f6';
  try {
    const schemes = ColorPalette.generateSchemes(hex);
    outputEl.value = JSON.stringify(schemes, null, 2);
    if (statsEl) statsEl.textContent = `Generated complementary, analogous, triadic & shade palettes`;
  } catch (e) {
    outputEl.value = 'Invalid color: ' + e.message;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied color palette!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
process();
