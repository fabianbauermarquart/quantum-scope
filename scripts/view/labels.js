import * as THREE from 'three';

// Function to add labels for the axes (quantum states)
export function addLabel(scene, text, position) {
  const spriteMaterial = new THREE.SpriteMaterial({color: 0xffffff});
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.75, 0.5, 1); // Adjust size of text
  sprite.position.set(position.x, position.y, position.z);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = '30px Arial';
  context.fillStyle = 'white';
  context.fillText(text, 0, 50);
  const texture = new THREE.CanvasTexture(canvas);
  sprite.material.map = texture;
  scene.add(sprite);
}
