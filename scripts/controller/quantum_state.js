import * as THREE from 'three';
import {getStateVectorFromInput, setInputFields} from "./form.js";
import {handleStateChange} from "./input.js";
import {Complex} from "../model/complex.js";

const gates = {
  'X': [
    [new Complex(0, 0), new Complex(1, 0)],
    [new Complex(1, 0), new Complex(0, 0)],
  ],
  'H': [
    [new Complex(1 / Math.sqrt(2), 0), new Complex(1 / Math.sqrt(2), 0)],
    [new Complex(1 / Math.sqrt(2), 0), new Complex(-1 / Math.sqrt(2), 0)],
  ],
  'Y': [
    [new Complex(0, 0), new Complex(0, -1)],
    [new Complex(0, 1), new Complex(0, 0)],
  ],
  'Z': [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(-1, 0)],
  ],
  'S': [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(0, 1)],  // i is the imaginary unit (sqrt(-1))
  ],
  'T': [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 1 / Math.sqrt(2)), new Complex(0, 1 / Math.sqrt(2))],
  ]
};

const stateCoefficients = {
  '0': {aRe: 1, aIm: 0, bRe: 0, bIm: 0},
  '1': {aRe: 0, aIm: 0, bRe: 1, bIm: 0},
  '+': {aRe: 1 / Math.sqrt(2), aIm: 0, bRe: 1 / Math.sqrt(2), bIm: 0},
  '-': {aRe: 1 / Math.sqrt(2), aIm: 0, bRe: -1 / Math.sqrt(2), bIm: 0},
  'i': {aRe: 1 / Math.sqrt(2), aIm: 0, bRe: 0, bIm: 1 / Math.sqrt(2)},
  '-i': {aRe: 1 / Math.sqrt(2), aIm: 0, bRe: 0, bIm: -1 / Math.sqrt(2)}
};


// Function to update the Bloch sphere and quantum state position based on coefficients
export function updateQuantumState(quantumState, aRe, aIm, bRe, bIm) {
  // Normalize coefficients (|a|^2 + |b|^2 = 1)
  const norm = Math.sqrt(Math.pow(aRe, 2) + Math.pow(aIm, 2) + Math.pow(bRe, 2) + Math.pow(bIm, 2));
  const scaleFactor = 1 / norm;

  // Normalize coefficients
  aRe *= scaleFactor;
  aIm *= scaleFactor;
  bRe *= scaleFactor;
  bIm *= scaleFactor;

  // Calculate the Cartesian coordinates of the quantum state on the Bloch sphere
  const x = 2 * (aRe * bRe + aIm * bIm); // Re(a* b)
  const y = 2 * (aIm * bRe - aRe * bIm); // Im(a* b)
  const z = Math.pow(aRe, 2) + Math.pow(aIm, 2) - Math.pow(bRe, 2) - Math.pow(bIm, 2); // |a|^2 - |b|^2

  // Update the quantum state point's position on the Bloch sphere (3D)
  quantumState.quantumStatePoint.position.set(x, y, z);

  // Update the theta and phi values
  const theta = isNaN(Math.acos(z)) ? 0.0 : Math.acos(z); // Inclination angle from the Z axis
  const phi = Math.atan2(y, x); // Azimuthal angle around the Z axis

  // Update the theta and phi input fields
  document.getElementById('theta').value = theta.toFixed(2);
  document.getElementById('phi').value = phi.toFixed(2);

  // Update the quantum state formula (if needed)
  updateQuantumStateFormula(aRe, aIm, bRe, bIm);

  // Update Cartesian coordinates for debugging
  document.getElementById('xCoord').textContent = x.toFixed(2);
  document.getElementById('yCoord').textContent = y.toFixed(2);
  document.getElementById('zCoord').textContent = z.toFixed(2);

  // Dynamically update the lines based on the new quantum state
  updateQuantumStateLines(quantumState);

  return {theta, phi}; // Optionally return the angles if needed
}

// Function to update the quantum state lines dynamically (now cylinders)
function updateQuantumStateLines(quantumState) {
  let line1 = quantumState.line1;
  let line2 = quantumState.line2;
  let line3 = quantumState.line3;
  let quantumStatePoint = quantumState.quantumStatePoint;

  const quantumStatePosition = quantumStatePoint.position;
  const origin = new THREE.Vector3(0, 0, 0);
  const xyProjection = new THREE.Vector3(quantumStatePosition.x, quantumStatePosition.y, 0);
  const xyProjectionCenterPoint = new THREE.Vector3(quantumStatePosition.x, quantumStatePosition.y, quantumStatePosition.z / 2);
  const originToXyProjectionCenterPoint = new THREE.Vector3(quantumStatePosition.x / 2, quantumStatePosition.y / 2, 0);

  // Update line1 (directly from origin to the quantum state point)
  const direction1 = new THREE.Vector3().subVectors(quantumStatePosition, origin);
  line1.position.copy(origin).add(quantumStatePosition).multiplyScalar(0.5);
  const rotation1 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction1.normalize());
  line1.setRotationFromQuaternion(rotation1);

  // Update line2 (from quantum state point to its projection on the XY plane)
  const direction2 = new THREE.Vector3().subVectors(quantumStatePosition, xyProjection);
  line2.position.copy(origin).add(xyProjectionCenterPoint);
  const rotation2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction2.normalize());
  line2.setRotationFromQuaternion(rotation2);
  line2.scale.x = quantumStatePosition.distanceTo(xyProjection);
  line2.scale.y = quantumStatePosition.distanceTo(xyProjection);

  // Update line3 (from origin to the XY plane projection of the quantum state point)
  const direction3 = new THREE.Vector3().subVectors(origin, xyProjection);
  line3.position.copy(origin).add(originToXyProjectionCenterPoint);
  const rotation3 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction3.normalize());
  line3.setRotationFromQuaternion(rotation3);
  line3.scale.x = origin.distanceTo(xyProjection);
  line3.scale.y = origin.distanceTo(xyProjection);
}

// Function to dynamically update the quantum state formula in the controls
export function updateQuantumStateFormula(aRe, aIm, bRe, bIm) {
  const formulaElement = document.getElementById('quantumFormula');

  formulaElement.textContent = `|ψ⟩ = (${aRe.toFixed(2)} + ${aIm.toFixed(2)}i)|0⟩ + (${bRe.toFixed(2)} + ${bIm.toFixed(2)}i)|1⟩`;
}

// Set a quantum state
export function setState(quantumState, stateIdentifier) {
  // Retrieve the coefficients for the selected state or do nothing if state is invalid
  const coefficients = stateCoefficients[stateIdentifier];

  if (!coefficients) return; // If the state is not found, do nothing

  // Update the input fields with the corresponding values
  setInputFields(coefficients.aRe, coefficients.aIm, coefficients.bRe, coefficients.bIm);

  // Normalize and update the quantum state
  handleStateChange(quantumState);
}

// Modify a quantum state
export function modifyState(quantumState, gate) {
  let state = getStateVectorFromInput();

  const result = applyGate(state, gates[gate]);
  console.log(state);
  console.log(result);

  // Update the input fields with the corresponding values
  setInputFields(result[0].real, result[0].imag, result[1].real, result[1].imag);

  // Normalize and update the quantum state
  handleStateChange(quantumState);
}

// Apply a quantum gate to a state vector
function applyGate(stateVector, gateMatrix) {
  const result = [new Complex(0, 0), new Complex(0, 0)]; // Resulting state vector

  for (let i = 0; i < 2; i++) {
    // Initialize a complex number for the result
    let sum = new Complex(0, 0);

    for (let j = 0; j < 2; j++) {
      // Matrix multiplication: result[i] += gate[i][j] * stateVector[j]
      const product = gateMatrix[i][j].multiply(stateVector[j]);
      sum = sum.add(product);
    }

    result[i] = sum;
  }

  return result;
}
