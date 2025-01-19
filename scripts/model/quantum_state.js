// Quantum state class to hold the quantum state point and lines
export class QuantumState {
  constructor(quantumStatePoint, line1, line2, line3) {
    this.quantumStatePoint = quantumStatePoint;
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
  }

  // Convert state to a string representation
  toString() {
    return `${this.quantumStatePoint}`;
  }
}
