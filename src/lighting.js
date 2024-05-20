import * as THREE from 'three';

export function setupLighting(scene) {
  const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 1);
  directionalLightLeft.position.set(-1, 1, 0);
  scene.add(directionalLightLeft);

  const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLightRight.position.set(1, 1, 0);
  scene.add(directionalLightRight);

  const directionalLightFront = new THREE.DirectionalLight(0xffffff, 1);
  directionalLightFront.position.set(0, 1, -1);
  scene.add(directionalLightFront);

  const directionalLightBack = new THREE.DirectionalLight(0xffffff, 1);
  directionalLightBack.position.set(0, 1, 1);
  scene.add(directionalLightBack);

  const directionalLightDown = new THREE.DirectionalLight(0xffffff, 1);
  directionalLightDown.position.set(0, -1, 0);
  scene.add(directionalLightDown);
}
