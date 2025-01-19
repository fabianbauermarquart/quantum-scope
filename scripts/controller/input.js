import {setInputFields} from './form.js';
import {updateQuantumState} from './quantum_state.js';

// Handle user input and normalize coefficients
export function handleInput(event, quantumState) {
  let source = event ? event.target.id.at(0) : undefined;

  return handleStateChange(quantumState, source);
}

export function handleStateChange(quantumState, source) {
  // Get the current values from input fields
  let aRe = parseFloat(document.getElementById('aRe').value);
  let aIm = parseFloat(document.getElementById('aIm').value);
  let bRe = parseFloat(document.getElementById('bRe').value);
  let bIm = parseFloat(document.getElementById('bIm').value);

  // Check if any of the values is NaN or invalid
  if (isNaN(aRe) || isNaN(aIm) || isNaN(bRe) || isNaN(bIm)) {
    return;
  }

  // Calculate the norms of a and b (their magnitudes)
  let normA = Math.sqrt(Math.pow(aRe, 2) + Math.pow(aIm, 2));
  let normB = Math.sqrt(Math.pow(bRe, 2) + Math.pow(bIm, 2));

  // Adjust values based on the input source
  if (source) {
    if (source === 'a') {
      // If normA is updated, adjust bRe and bIm
      if (normA > 1) {
        const scaleFactor = 1 / normA;
        aRe *= scaleFactor;
        aIm *= scaleFactor;
        normA = 1; // Recalculate normA after scaling
      }

      // Recalculate bRe and bIm such that normB = sqrt(1 - normA^2)
      normB = Math.sqrt(1 - Math.pow(normA, 2));
      if (normB < 0) {
        bRe = 0;
        bIm = 0;
      } else {
        // Adjust bRe and bIm accordingly
        bRe = bRe >= 0 ? Math.sqrt(1 - Math.pow(normA, 2)) : -Math.sqrt(1 - Math.pow(normA, 2));
        bIm = 0;
      }
    } else if (source === 'b') {
      // If normB is updated, adjust aRe and aIm
      if (normB > 1) {
        const scaleFactor = 1 / normB;
        bRe *= scaleFactor;
        bIm *= scaleFactor;
        normB = 1; // Recalculate normB after scaling
      }

      // Recalculate aRe and aIm such that normA = sqrt(1 - normB^2)
      normA = Math.sqrt(1 - Math.pow(normB, 2));

      // Adjust aRe and aIm accordingly
      aRe = aRe >= 0 ? Math.sqrt(1 - Math.pow(normB, 2)) : -Math.sqrt(1 - Math.pow(normB, 2));
      aIm = 0;
    }
  }

  // Recalculate the total norm after adjustments
  const totalNorm = Math.sqrt(Math.pow(aRe, 2) + Math.pow(aIm, 2) + Math.pow(bRe, 2) + Math.pow(bIm, 2));

  // If total norm is zero (invalid), reset to zero to avoid division by zero
  if (totalNorm === 0) {
    return;
  }

  // Scale factor to normalize both a and b
  const scaleFactor = 1 / totalNorm;

  // Adjust both a and b based on the scale factor
  aRe *= scaleFactor;
  aIm *= scaleFactor;
  bRe *= scaleFactor;
  bIm *= scaleFactor;

  // Update the input fields for a and b with the normalized values
  setInputFields(aRe, aIm, bRe, bIm);

  // Update the quantum state and position based on the new normalized coefficients
  updateQuantumState(quantumState, aRe, aIm, bRe, bIm);
}
