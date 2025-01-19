import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {createArrowAndAddToScene} from 'scripts/view/axis.js';
import {createHalfPlaneCircle} from 'scripts/view/half_plane.js';
import {addLabel} from 'scripts/view/labels.js';
import {createQuantumStatePoint, createCylindricLineAndAddToScene} from 'scripts/view/quantum_state.js'
import {setState, modifyState} from 'scripts/controller/quantum_state.js';
import {handleInput, handleStateChange} from 'scripts/controller/input.js';
import {QuantumState} from 'scripts/model/quantum_state.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('container').appendChild(renderer.domElement);

// Create the Bloch sphere
const radius = 1;
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xeeeeee, wireframe: true});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.rotation.x = Math.PI / 2;  // 90 degrees in radians
scene.add(sphere);

// Create arrows for the axes (X, Y, Z)
const xAxis = createArrowAndAddToScene(scene, 0xff0000, 1, 0, 0);  // X axis (red) - pointing towards the viewer
const yAxis = createArrowAndAddToScene(scene, 0x00ff00, 0, 1, 0);  // Y axis (green) - pointing to the right
const zAxis = createArrowAndAddToScene(scene, 0x0000ff, 0, 0, 1);  // Z axis (blue) - pointing upwards

// Camera position
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2.5;

if (window.innerWidth < 768) {
    camera.position.x = 2.5;
    camera.position.y = 2.5;
    camera.position.z = 3;
}

// Rotate the scene 90 degrees around the X-axis to make the Z-axis point upwards
scene.rotation.x = -Math.PI / 2;  // Rotate the entire scene -90 degrees
scene.rotation.z = 3 + Math.PI / 2;

// Initialize OrbitControls (for manual rotation)
const controls = new OrbitControls(camera, renderer.domElement);

// Create the quantum state point (a small sphere)
const quantumStatePoint = createQuantumStatePoint(scene);

// Create initial cylinders (lines) that represent the quantum state
let line1 = createCylindricLineAndAddToScene(scene, new THREE.Vector3(0, 0, 0), quantumStatePoint.position);
let line2 = createCylindricLineAndAddToScene(scene, new THREE.Vector3(quantumStatePoint.position.x, quantumStatePoint.position.y, 0), quantumStatePoint.position);
let line3 = createCylindricLineAndAddToScene(scene, new THREE.Vector3(0, 0, 0), new THREE.Vector3(quantumStatePoint.position.x, quantumStatePoint.position.y, 0));

const quantumState = new QuantumState(quantumStatePoint, line1, line2, line3);

function adjustValue(fieldId, increment) {
    const inputField = document.getElementById(fieldId);
    let currentValue = parseFloat(inputField.value);
    if (!isNaN(currentValue)) {
        currentValue += increment;
        // Ensure the value stays within the allowed range
        currentValue = Math.min(Math.max(currentValue, -1), 1);
        inputField.value = currentValue.toFixed(2); // Update the input field
    }
    handleStateChange(quantumState, fieldId.at(0));
}

// Attach functions to the window object so it can be called from HTML
window.adjustValue = adjustValue;

window.setState = function (stateIdentifier) {
    setState(quantumState, stateIdentifier);
};
window.modifyState = function (gate) {
    modifyState(quantumState, gate);
};

// Listen for changes in input fields
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function (event) {
        handleInput(event, quantumState);
    });
});

// Initial state is |0>
handleStateChange(quantumState);

// Create three colored circles that exactly fit inside the Bloch sphere
createHalfPlaneCircle(scene, 'XY', 1);  // XY plane circle (Blue)
createHalfPlaneCircle(scene, 'XZ', 1);  // XZ plane circle (Green)
createHalfPlaneCircle(scene, 'YZ', 1);  // YZ plane circle (Red)

// Add labels for the axes
addLabel(scene, '|0⟩', new THREE.Vector3(0, 0, 1.2));   // Z axis positive label
addLabel(scene, '|1⟩', new THREE.Vector3(0, 0, -1.2));  // Z axis negative label
addLabel(scene, '|+i⟩', new THREE.Vector3(0, 1.2, 0));  // Y axis positive label
addLabel(scene, '|-i⟩', new THREE.Vector3(0, -1.2, 0)); // Y axis negative label
addLabel(scene, '|+⟩', new THREE.Vector3(1.2, 0, 0));   // X axis positive label
addLabel(scene, '|-⟩', new THREE.Vector3(-1.2, 0, 0));  // X axis negative label

// Add labels for X, Y, Z axes near the arrowheads
addLabel(scene, 'X', new THREE.Vector3(1.4, 0, 0));     // X axis label
addLabel(scene, 'Y', new THREE.Vector3(0, 1.4, 0));     // Y axis label
addLabel(scene, 'Z', new THREE.Vector3(0, 0, 1.4));     // Z axis label

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update the controls to reflect user input (manual rotation)
    renderer.render(scene, camera);
}

animate();
