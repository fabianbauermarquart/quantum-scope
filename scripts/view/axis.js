import * as THREE from 'three';

// Function to create a thick axis arrow (with dashed line support for negative axes)
export function createArrowAndAddToScene(scene, color, x, y, z) {
  const arrowLength = 1.5; // Length of the arrow to make it visible
  const direction = new THREE.Vector3(x, y, z); // Direction vector from the origin
  direction.normalize(); // Normalize the direction vector to have a unit vector

  // Create the arrow (cone at the tip)
  const arrowGeometry = new THREE.ConeGeometry(0.05, 0.1, 12);  // Cone at the end of the arrow
  const arrowMaterial = new THREE.MeshBasicMaterial({color: color});
  const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
  arrow.position.copy(direction).multiplyScalar(arrowLength); // Position the arrow tip at (x, y, z) * arrowLength
  scene.add(arrow);

  // Create the shaft of the arrow (cylinder)
  const shaftGeometry = new THREE.CylinderGeometry(0.02, 0.02, arrowLength, 8);
  const shaftMaterial = new THREE.MeshBasicMaterial({color: color});
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);

  // Position the shaft at the center of the arrow, so it's half the length along the direction vector
  shaft.position.copy(direction).multiplyScalar(arrowLength / 2);

  // Align the shaft with the direction of the vector (rotate it to point in the correct direction)
  const axis = new THREE.Vector3(0, 1, 0); // Initial forward direction (shaft's local z-axis)
  const rotation = new THREE.Quaternion().setFromUnitVectors(axis, direction); // Calculate the rotation
  shaft.setRotationFromQuaternion(rotation); // Apply the rotation to the shaft
  arrow.setRotationFromQuaternion(rotation);

  scene.add(shaft);

  return {arrow, shaft};
}
