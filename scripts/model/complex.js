// Complex number class to handle basic operations
export class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  // Add two complex numbers
  add(c) {
    return new Complex(this.real + c.real, this.imag + c.imag);
  }

  // Multiply a complex number by a scalar
  multiplyScalar(scalar) {
    return new Complex(this.real * scalar, this.imag * scalar);
  }

  // Multiply two complex numbers
  multiply(c) {
    const realPart = this.real * c.real - this.imag * c.imag;
    const imagPart = this.real * c.imag + this.imag * c.real;
    return new Complex(realPart, imagPart);
  }

  // Convert complex number to a string representation
  toString() {
    return `${this.real} + ${this.imag}i`;
  }
}
