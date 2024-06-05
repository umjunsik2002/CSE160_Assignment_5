import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
export function setupFence(scene) {
  loader.load('./src/fence/scene.gltf', function (gltf) {
    const fence = gltf.scene;
    fence.scale.set(0.5, 0.5, 0.5);
    
    const startPosition1 = new THREE.Vector3(-16, 0, -15);
    const endPosition1 = new THREE.Vector3(-16, 0, 16);
    const step1 = 1;
    for (let z = startPosition1.z; z <= endPosition1.z; z += step1) {
      const position = new THREE.Vector3(startPosition1.x, startPosition1.y, z);
      const clonedFence = fence.clone();
      clonedFence.position.copy(position);
      scene.add(clonedFence);
    }

    const startPosition2 = new THREE.Vector3(16, 0, -15);
    const endPosition2 = new THREE.Vector3(16, 0, 16);
    const step2 = 1;
    for (let z = startPosition2.z; z <= endPosition2.z; z += step2) {
      const position = new THREE.Vector3(startPosition2.x, startPosition2.y, z);
      const clonedFence = fence.clone();
      clonedFence.position.copy(position);
      scene.add(clonedFence);
    }

    fence.rotateY(Math.PI / 2);
    const startPosition3 = new THREE.Vector3(-15, 0, -16);
    const endPosition3 = new THREE.Vector3(16, 0, -16);
    const step3 = 1;
    for (let x = startPosition3.x; x <= endPosition3.x; x += step3) {
      const position = new THREE.Vector3(x, startPosition3.y, startPosition3.z);
      const clonedFence = fence.clone();
      clonedFence.position.copy(position);
      scene.add(clonedFence);
    }

    const startPosition4 = new THREE.Vector3(-15, 0, 16);
    const endPosition4 = new THREE.Vector3(16, 0, 16);
    const step4 = 1;
    for (let x = startPosition4.x; x <= endPosition4.x; x += step4) {
      const position = new THREE.Vector3(x, startPosition4.y, startPosition4.z);
      const clonedFence = fence.clone();
      clonedFence.position.copy(position);
      scene.add(clonedFence);
    }
  });
}