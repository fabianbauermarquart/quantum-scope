import * as THREE from 'three';

// Function to create a transparent colored circle that exactly fits inside the Bloch sphere
export function createHalfPlaneCircle(scene, axis, radius = 1) {
  let color;
  // Set the color based on the axis
  if (axis === 'XY') {
    color = 0x00ff00;  // Green (Y-axis)
  } else if (axis === 'XZ') {
    color = 0xff0000;  // Red (Z-axis)
  } else if (axis === 'YZ') {
    color = 0x0000ff;  // Blue (X-axis)
  }

  const geometry = new THREE.RingGeometry(0, radius, 64);  // Circle with outer radius matching the sphere
  const material = new THREE.MeshBasicMaterial({
    color: color,       // Set the color based on the axis
    transparent: true,  // Enable transparency
    opacity: 0.2,       // Set transparency
    side: THREE.DoubleSide // Make it visible from both sides
  });
  const circle = new THREE.Mesh(geometry, material);

  // Rotate the circle to lie in the correct plane
  if (axis === 'XY') {
    circle.rotation.x = Math.PI / 2; // Rotate to lie in the XY plane
  } else if (axis === 'XZ') {
    circle.rotation.y = Math.PI / 2; // Rotate to lie in the XZ plane
  } else if (axis === 'YZ') {
    circle.rotation.z = Math.PI / 2; // Rotate to lie in the YZ plane
  }

  scene.add(circle);
  return circle;
}
