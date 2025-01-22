# Quantum Scope - Interactive Qubit Visualization

This project provides a simple web interface to manipulate the coefficients of a quantum state, represented by two complex numbers: **α (alpha)** and **β (beta)**. These coefficients correspond to the two amplitudes in a quantum state on the Bloch sphere, where the state is normalized to have unit norm. The app allows for real-time adjustment of the real and imaginary components of **α** and **β** while maintaining the normalization constraint (i.e., the total norm of the state vector remains 1).

![Quantum Scope Screenshot](https://raw.githubusercontent.com/fabianbauermarquart/quantum-scope/refs/heads/master/img/quantum-scope-screenshot.png)

## Live Version

You can access the live version of Quantum Scope [here](https://bauer-marquart.com/quantum-scope).

### Features:
- **Real-time Normalization**: The real (`Re`) and imaginary (`Im`) components of both **α** and **β** are dynamically adjusted to ensure the quantum state remains normalized.
- **Interactive Interface**: Input fields for modifying the components of the quantum state and buttons to adjust the values interactively.
- **Bloch Sphere Visualization**: Although not part of this project directly, the app's normalization ensures the state corresponds to points on the Bloch sphere, making it suitable for further visualization.

### Technologies Used:
- **THREE.js**: Handles 3D graphics to visualize the quantum state based on user input.
- **Math**: Used to compute the norms of **α** and **β** and adjust the values while ensuring the quantum state remains valid.

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, etc.).
- No server setup required—this is a purely client-side web app.

### Steps to Run Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/fabianbauermarquart/quantum-scope.git
2. Navigate into the project folder:
   ```bash
   cd quantum-scope
3. Open the `index.html` file in a browser:
You can simply double-click the `index.html` file to open it in your default browser.
Alternatively, you can serve it locally using any simple HTTP server (e.g., using `python3 -m http.server`).

## Usage

### Quantum State Inputs

The application allows you to set the quantum state coefficients **α** and **β** using the input fields. These represent the complex amplitudes for the **|0⟩** and **|1⟩** states, respectively.

- **α** = **aRe** + i**aIm**
- **β** = **bRe** + i**bIm**

Where:
- **aRe** and **aIm** represent the real and imaginary parts of **α** (the amplitude for the **|0⟩** state).
- **bRe** and **bIm** represent the real and imaginary parts of **β** (the amplitude for the **|1⟩** state).

By adjusting these values, you modify the relative probabilities of measuring the quantum state in the **|0⟩** or **|1⟩** state.

### Normalization of the Quantum State

After adjusting the values of **α** and **β**, the application automatically ensures that the quantum state is normalized. This means the sum of the squares of the magnitudes of **α** and **β** is always equal to 1:

- **|α|² + |β|² = 1**

This normalization constraint ensures that the quantum state remains a valid state in quantum mechanics.

### Bloch Sphere Visualization

The quantum state is visualized using the **Bloch sphere**, a geometric representation of a qubit's state.

- The **|0⟩** state is represented as the north pole.
- The **|1⟩** state is represented as the south pole.
- Superposition states are represented as points on the surface of the sphere.

As you modify **α** and **β**, the corresponding point on the Bloch sphere will move, reflecting the quantum state’s change.


### Setting Quantum States

You can set predefined quantum states by clicking the corresponding buttons. Each button updates the coefficients **α** (alpha) and **β** (beta) to match the corresponding quantum state. The available states are:

- **|0⟩**: The basis state |0⟩.
    - This corresponds to **α = 1**, **β = 0** (i.e., **α** is purely real and **β** is zero).

- **|1⟩**: The basis state |1⟩.
    - This corresponds to **α = 0**, **β = 1** (i.e., **α** is zero and **β** is purely real).

- **|+⟩**: The superposition state (|0⟩ + |1⟩) / √2.
    - This corresponds to **α = 1/√2**, **β = 1/√2** (both **α** and **β** are real and equal).

- **|-⟩**: The superposition state (|0⟩ - |1⟩) / √2.
    - This corresponds to **α = 1/√2**, **β = -1/√2** (both **α** and **β** are real, with **β** negative).

- **|i⟩**: The imaginary state (|0⟩ + i|1⟩) / √2.
    - This corresponds to **α = 1/√2**, **β = i/√2** (where **α** is real and **β** is purely imaginary).

- **|-i⟩**: The imaginary state (|0⟩ - i|1⟩) / √2.
    - This corresponds to **α = 1/√2**, **β = -i/√2** (where **α** is real and **β** is purely imaginary, with **β** negative).

These buttons will instantly update the values of **α** and **β**, and adjust the quantum state visualization (on the Bloch sphere) accordingly.

### Applying Quantum Gates

You can apply various quantum gates to manipulate the quantum state. Each gate will modify the coefficients **α** (alpha) and **β** (beta) of the quantum state according to its specific operation. The available gates are:

- **X Gate (Pauli-X)**:
    - Also known as the NOT gate, it swaps the states of **|0⟩** and **|1⟩**.
    - This operation flips **α** and **β** (i.e., **X|0⟩ = |1⟩** and **X|1⟩ = |0⟩**).
    - This gate is equivalent to a 180° rotation about the **X-axis** on the Bloch sphere.

- **Z Gate (Pauli-Z)**:
    - The **Z** gate applies a phase flip. It leaves **|0⟩** unchanged but adds a **π** phase to **|1⟩**.
    - This operation changes the sign of **β** (i.e., **Z|0⟩ = |0⟩** and **Z|1⟩ = -|1⟩**).
    - The **Z** gate corresponds to a 180° rotation around the **Z-axis** on the Bloch sphere.

- **Y Gate (Pauli-Y)**:
    - The **Y** gate combines both a phase flip and a bit flip. It applies a **π** rotation around the **Y-axis** of the Bloch sphere.
    - This gate is represented as **Y = iXZ**, and it flips the state in a complex manner, modifying both the real and imaginary parts of **α** and **β**.

- **H Gate (Hadamard Gate)**:
    - The **Hadamard (H)** gate puts the qubit into a superposition state, balancing the coefficients of **α** and **β**. It creates an equal superposition between **|0⟩** and **|1⟩**.
    - When applied to **|0⟩**, it results in **(1/√2) (|0⟩ + |1⟩)**, and when applied to **|1⟩**, it results in **(1/√2) (|0⟩ - |1⟩)**.
    - The **H** gate corresponds to a 90° rotation around the **X-axis** on the Bloch sphere, creating a uniform superposition.

- **S Gate**:
    - The **S** gate (also known as the Phase gate) applies a phase shift of **π/2** to the **|1⟩** state. It does not affect **|0⟩**.
    - This is represented as **S|0⟩ = |0⟩** and **S|1⟩ = i|1⟩**.
    - The **S** gate corresponds to a 90° rotation around the **Z-axis** on the Bloch sphere.

- **T Gate**:
    - The **T** gate (also known as the **π/4 Phase gate**) applies a phase shift of **π/4** to the **|1⟩** state.
    - This is represented as **T|0⟩ = |0⟩** and **T|1⟩ = exp(iπ/4)|1⟩**.
    - The **T** gate is another **Z-axis** rotation, but with a smaller phase shift compared to the **S** gate.

These gates are applied by clicking the corresponding buttons. The quantum state visualization on the Bloch sphere will automatically update to reflect the new state after each gate is applied.

To apply a gate:
1. Click one of the gate buttons (e.g., **X**, **Z**, **Y**, etc.).
2. The state will be updated accordingly, and the Bloch sphere will show the new quantum state.


## Contributing

We welcome contributions to improve **Quantum Scope**! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

Please ensure that your code adheres to the existing code style and includes appropriate tests. We also encourage you to write clear commit messages explaining your changes.

## Acknowledgements

I would like to acknowledge the following resources that were instrumental in the development of **Quantum Scope**:

- **Nielsen, M. A., & Chuang, I. L.** (2010). *Quantum Computation and Quantum Information*. Cambridge University Press.  
  This book is a comprehensive resource for quantum computing and quantum information theory, and served as the foundation for many of the concepts used in this project.

- The contributors to the open-source community for their tools and libraries that helped in building this project.

