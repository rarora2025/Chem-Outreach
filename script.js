// Constants
const C = 2.998e8; // Speed of light in m/s
const H = 4.136e-15; // Planck's constant in eV·s

// DOM Elements
const wavelengthInput = document.getElementById('wavelength');
const frequencyInput = document.getElementById('frequency');
const energyInput = document.getElementById('energy');
const colorBox = document.getElementById('colorBox');
const colorName = document.getElementById('colorName');
const colorValues = document.getElementById('colorValues');
const spectrumMarker = document.getElementById('spectrumMarker');
const spectrumContainer = document.getElementById('spectrumContainer');
const spectrumWavelength = document.getElementById('spectrumWavelength');

let isUpdating = false;

// Convert wavelength (nm) to RGB color - EXACTLY matches the slider gradient
function wavelengthToColor(wavelength) {
    // Clamp wavelength to slider range
    wavelength = Math.max(200, Math.min(800, wavelength));
    
    // Color stops from the CSS gradient (matching spectrum-bar)
    // 0% (200nm): #9400d3, 8%: #4b0082, 16%: #0000ff, 33%: #00ff00, 50%: #ffff00, 66%: #ff7f00, 83%: #ff0000, 100% (800nm): #8b0000
    const colorStops = [
        { pos: 0,   r: 148, g: 0,   b: 211 }, // #9400d3 at 200nm
        { pos: 8,   r: 75,  g: 0,   b: 130 }, // #4b0082
        { pos: 16,  r: 0,   g: 0,   b: 255 }, // #0000ff
        { pos: 33,  r: 0,   g: 255, b: 0 },   // #00ff00
        { pos: 50,  r: 255, g: 255, b: 0 },   // #ffff00
        { pos: 66,  r: 255, g: 127, b: 0 },   // #ff7f00
        { pos: 83,  r: 255, g: 0,   b: 0 },   // #ff0000
        { pos: 100, r: 139, g: 0,   b: 0 }    // #8b0000 at 800nm
    ];
    
    // Convert wavelength (200-800) to percentage (0-100)
    const percentage = ((wavelength - 200) / (800 - 200)) * 100;
    
    // Find the two color stops to interpolate between
    let startStop = colorStops[0];
    let endStop = colorStops[colorStops.length - 1];
    
    for (let i = 0; i < colorStops.length - 1; i++) {
        if (percentage >= colorStops[i].pos && percentage <= colorStops[i + 1].pos) {
            startStop = colorStops[i];
            endStop = colorStops[i + 1];
            break;
        }
    }
    
    // Interpolate between the two stops
    const range = endStop.pos - startStop.pos;
    const t = range > 0 ? (percentage - startStop.pos) / range : 0;
    
    const r = Math.round(startStop.r + (endStop.r - startStop.r) * t);
    const g = Math.round(startStop.g + (endStop.g - startStop.g) * t);
    const b = Math.round(startStop.b + (endStop.b - startStop.b) * t);
    
    return `rgb(${r}, ${g}, ${b})`;
}

// Get color name from wavelength - matches the slider gradient stops
function getColorName(wavelength) {
    // Clamp to slider range
    wavelength = Math.max(200, Math.min(800, wavelength));
    
    // Calculate percentage position (0-100%)
    const percentage = ((wavelength - 200) / (800 - 200)) * 100;
    
    // Match the exact color stops from the CSS gradient:
    // 0%: #9400d3 (Purple), 8%: #4b0082 (Dark Purple), 16%: #0000ff (Blue),
    // 33%: #00ff00 (Green), 50%: #ffff00 (Yellow), 66%: #ff7f00 (Orange),
    // 83%: #ff0000 (Red), 100%: #8b0000 (Dark Red)
    
    if (percentage < 8) return 'Purple';
    if (percentage < 16) return 'Dark Purple';
    if (percentage < 33) return 'Blue';
    if (percentage < 50) return 'Green';
    if (percentage < 66) return 'Yellow';
    if (percentage < 83) return 'Orange';
    return 'Red';
}

// Update all calculations
function updateCalculations(source) {
    if (isUpdating) return;
    isUpdating = true;

    let wavelength = parseFloat(wavelengthInput.value);
    let frequency = parseFloat(frequencyInput.value);
    let energy = parseFloat(energyInput.value);

    // If wavelength is provided, calculate frequency and energy
    if (source === 'wavelength' && wavelength && !isNaN(wavelength) && wavelength > 0) {
        const wavelengthM = wavelength * 1e-9;
        frequency = (C / wavelengthM) / 1e12;
        energy = (H * C) / wavelengthM;
        frequencyInput.value = frequency.toFixed(2);
        energyInput.value = energy.toFixed(3);
    } 
    // If frequency is provided, calculate wavelength and energy
    else if (source === 'frequency' && frequency && !isNaN(frequency) && frequency > 0) {
        const frequencyHz = frequency * 1e12;
        wavelength = (C / frequencyHz) * 1e9;
        energy = H * frequencyHz;
        wavelengthInput.value = wavelength.toFixed(2);
        energyInput.value = energy.toFixed(3);
    } 
    // If energy is provided, calculate wavelength and frequency
    else if (source === 'energy' && energy && !isNaN(energy) && energy > 0) {
        const frequencyHz = energy / H;
        frequency = frequencyHz / 1e12;
        wavelength = ((H * C) / energy) * 1e9;
        frequencyInput.value = frequency.toFixed(2);
        wavelengthInput.value = wavelength.toFixed(2);
    }

    // Update display
    if (wavelength && !isNaN(wavelength) && wavelength > 0) {
        const color = wavelengthToColor(wavelength);
        colorBox.style.backgroundColor = color;
        colorName.textContent = getColorName(wavelength);
        
        const wavelengthM = wavelength * 1e-9;
        const frequencyHz = (frequency || 0) * 1e12 || (C / wavelengthM);
        const calculatedEnergy = H * frequencyHz;
        
        colorValues.innerHTML = `
            λ = ${wavelength.toFixed(2)} nm<br>
            ν = ${(frequencyHz / 1e12).toFixed(2)} THz<br>
            E = ${calculatedEnergy.toFixed(3)} eV<br>
            c = ${(wavelengthM * frequencyHz).toExponential(2)} m/s
        `;
        
        const percentage = ((wavelength - 200) / (800 - 200)) * 100;
        spectrumMarker.style.left = `${Math.max(0, Math.min(100, percentage))}%`;
        
        // Animate wavelength display update
        spectrumWavelength.style.animation = 'none';
        setTimeout(() => {
            spectrumWavelength.style.animation = 'valueUpdate 0.3s ease';
            spectrumWavelength.textContent = `${wavelength.toFixed(1)} nm`;
        }, 10);
        
        // Animate color box
        colorBox.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorBox.style.transform = 'scale(1)';
        }, 200);
    }

    isUpdating = false;
}

// Handle spectrum click/drag
let isDragging = false;

spectrumContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleSpectrumClick(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        handleSpectrumClick(e);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

spectrumContainer.addEventListener('click', handleSpectrumClick);

function handleSpectrumClick(e) {
    const rect = spectrumContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const wavelength = 200 + (percentage / 100) * (800 - 200);
    
    wavelengthInput.value = Math.max(200, Math.min(800, wavelength)).toFixed(1);
    updateCalculations('wavelength');
}

// Event Listeners
wavelengthInput.addEventListener('input', () => {
    updateCalculations('wavelength');
});

frequencyInput.addEventListener('input', () => {
    updateCalculations('frequency');
});

energyInput.addEventListener('input', () => {
    updateCalculations('energy');
});

// Initialize
wavelengthInput.value = '550';
updateCalculations('wavelength');
