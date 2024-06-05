import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
export function setupGround(scene) {
  const center = new THREE.BoxGeometry(32, 1, 32);
  loader.load('./src/grass/scene.gltf', function (grassGltf) {
    const grassScene = grassGltf.scene;
    let grassMaterial;
    grassScene.traverse(function (child) {
      if (child.isMesh) {
        grassMaterial = child.material;
      }
    });
    const grassTexture = grassMaterial.map;
    grassTexture.repeat.set(32, 32);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
    const grassField = new THREE.Mesh(center, grassMaterial);
    grassField.position.set(0, -0.5, 0);
    scene.add(grassField);
  });

  function createCornerTile(scene, stonewallMaterial, position) {
    const corner = new THREE.BoxGeometry(16, 1, 16);
    const cornerField = new THREE.Mesh(corner, stonewallMaterial);
    cornerField.position.copy(position);
    scene.add(cornerField);
  }
  loader.load('./src/stonewall/scene.gltf', function (stonewallGltf) {
    const stonewallScene = stonewallGltf.scene;
    let stonewallMaterial;
    stonewallScene.traverse(function (child) {
      if (child.isMesh) {
        stonewallMaterial = child.material;
      }
    });
    stonewallMaterial.map.repeat.set(4, 4);
    stonewallMaterial.map.wrapS = THREE.RepeatWrapping;
    stonewallMaterial.map.wrapT = THREE.RepeatWrapping;
    const positions = [
      new THREE.Vector3(-24, -0.5, 24),
      new THREE.Vector3(-24, -0.5, 8),
      new THREE.Vector3(-24, -0.5, -8),
      new THREE.Vector3(-24, -0.5, -24),
      new THREE.Vector3(-8, -0.5, 24),
      new THREE.Vector3(8, -0.5, 24),
      new THREE.Vector3(24, -0.5, 24),
      new THREE.Vector3(24, -0.5, 8),
      new THREE.Vector3(24, -0.5, -8),
      new THREE.Vector3(24, -0.5, -24),
      new THREE.Vector3(8, -0.5, -24),
      new THREE.Vector3(-8, -0.5, -24)
    ];
    positions.forEach(position => {
      createCornerTile(scene, stonewallMaterial, position);
    });
  });
}
