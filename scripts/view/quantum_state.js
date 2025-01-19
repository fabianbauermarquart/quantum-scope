import * as THREE from 'three';

// Function to create a small sphere to represent the quantum state
export function createQuantumStatePoint(scene) {
  const pointGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Small sphere as the quantum state indicator
  const pointMaterial = new THREE.MeshBasicMaterial({color: 0x800080});
  const point = new THREE.Mesh(pointGeometry, pointMaterial);
  point.position.copy(new THREE.Vector3(0, 0, 1));
  scene.add(point);
  return point;
}

export function createCylindricLineAndAddToScene(scene, start, end) {
  // Create a cylinder geometry with small diameter (for thickness) and length based on the distance between start and end
  const direction = new THREE.Vector3().subVectors(end, start); // Direction from start to end
  const length = start.distanceTo(end);
  const cylinderGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8); // Small diameter for thick lines
  const cylinderMaterial = new THREE.MeshBasicMaterial({color: 0x800080});
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  // Set the position to the midpoint between start and end
  cylinder.position.copy(start).add(end).multiplyScalar(0.5);

  // Rotate the cylinder to align with the direction
  const axis = new THREE.Vector3(0, 1, 0); // Initial axis (assume the cylinder starts along the Y-axis)
  const rotation = new THREE.Quaternion().setFromUnitVectors(axis, direction.normalize()); // Get rotation from axis to direction
  cylinder.setRotationFromQuaternion(rotation);

  scene.add(cylinder);

  return cylinder;
}
