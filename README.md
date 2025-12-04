# Color ↔ Wavelength ↔ Energy Converter
## UN1403 Chemistry Outreach Project

An interactive web application demonstrating the relationships between color, wavelength, frequency, and energy in chemistry, with a focus on crystal field splitting, photon energy, and the photoelectric effect.

## Features

### 1. Interactive Energy Converter
- Convert between wavelength (nm), frequency (THz), and energy (eV)
- Real-time color visualization based on wavelength
- Automatic calculation of all related formulas:
  - **c = λν** (Speed of Light)
  - **E = hν** (Photon Energy)
  - **E = hc/λ** (Energy from Wavelength)

### 2. Crystal Field Splitting
- Visual representation of d-orbital splitting in octahedral fields
- Explanation of how crystal field splitting relates to color
- Examples of complementary color relationships

### 3. Photoelectric Effect Simulator
- Interactive demonstration of the photoelectric effect
- Calculate kinetic energy of ejected electrons: **KE = E - Φ**
- Visual feedback showing whether electrons are ejected
- Educational content on key principles

### 4. Electromagnetic Spectrum Visualization
- Interactive spectrum bar showing the full visible range (200-800 nm)
- Real-time marker indicating current wavelength position
- Color-coded regions (UV, Visible, IR)

### 5. Educational Content
- Key physical constants (Planck's constant, speed of light)
- Energy-wavelength relationships
- Visible light range information

## How to Use

1. Open `index.html` in any modern web browser
2. Enter a value in any of the three input fields (wavelength, frequency, or energy)
3. The other values will automatically calculate
4. Watch the color box update to show the corresponding visible color
5. Explore the photoelectric effect by adjusting work function and photon energy
6. Observe the spectrum marker move as you change wavelengths

## Technical Details

### Constants Used
- Speed of Light (c): 2.998 × 10⁸ m/s
- Planck's Constant (h): 4.136 × 10⁻¹⁵ eV·s
- Visible Light Range: 380-780 nm

### Formulas Implemented
- **c = λν**: Relates wavelength and frequency
- **E = hν**: Photon energy from frequency
- **E = hc/λ**: Photon energy from wavelength
- **KE = E - Φ**: Kinetic energy in photoelectric effect

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `script.js` - Interactive calculations and visualizations

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Educational Value

This project demonstrates:
- Quantum mechanical relationships between light and energy
- Crystal field theory and transition metal colors
- Photoelectric effect principles
- Electromagnetic spectrum properties
- Real-time scientific calculations

---

**Created for UN1403 Chemistry Outreach Project**

