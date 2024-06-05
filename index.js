import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { setupGrid } from './src/grid.js';
import { setupLighting } from './src/lighting.js';
import { setupGround } from './src/ground.js'
import { setupFence } from './src/fence.js';

// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 1000);
camera.position.set(0, 1, 1.5);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c') });
renderer.setSize(1280, 720);
renderer.setClearColor(0x66b2ff);

// Setup grid and lighting
// setupGrid(scene, 32);
setupLighting(scene);
setupGround(scene);
setupFence(scene);

// Setup controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

let skybox;
const loader = new GLTFLoader();
loader.load('./src/scene-v1.glb', function (gltf) {
  try {
    skybox = gltf.scene;
    skybox.position.y += 120;
    scene.add(skybox);
  } catch (error) {
    console.warn("An error occurred while loading the model:", error);
  }
});

let pomni;
loader.load('./src/pomni/scene.gltf', function (gltf) {
  pomni = gltf.scene;
  pomni.position.set(0, 0, 0);
  scene.add(pomni);
  const targetPosition = pomni.position.clone().add(new THREE.Vector3(0, 1, 0));
  controls.target.copy(targetPosition);
});

loader.load('./src/buildings/stilized_house/scene.gltf', function (gltf) {
  const stilized_house = gltf.scene;
  stilized_house.position.set(28, 0, 0);
  scene.add(stilized_house);
});

loader.load('./src/buildings/free_anime_house/scene.gltf', function (gltf) {
  const free_anime_house = gltf.scene;
  free_anime_house.rotateY(Math.PI);
  free_anime_house.position.set(0, -0.01, 23);
  scene.add(free_anime_house);
});

loader.load('./src/buildings/medieval_house/scene.gltf', function (gltf) {
  const medieval_house = gltf.scene;
  medieval_house.scale.set(1.5, 1.5, 1.5);
  medieval_house.position.set(-26, 0, 0);
  scene.add(medieval_house);
});

loader.load('./src/buildings/medieval/scene.gltf', function (gltf) {
  const medieval = gltf.scene;
  medieval.position.set(20, 0, 8);
  scene.add(medieval);
});

loader.load('./src/buildings/middle_age_noble_house/scene.gltf', function (gltf) {
  const middle_age_noble_house = gltf.scene;
  middle_age_noble_house.scale.set(32, 32, 32);
  middle_age_noble_house.position.set(22, 0, -8);
  scene.add(middle_age_noble_house);
});

loader.load('./src/buildings/medieval_house_2/scene.gltf', function (gltf) {
  const medieval_house_2 = gltf.scene;
  medieval_house_2.rotateY(Math.PI);
  medieval_house_2.position.set(-19, 1, 10);
  scene.add(medieval_house_2);
});

let wKeyPressed = false;
window.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    wKeyPressed = true;
  }
});
window.addEventListener('keyup', (event) => {
  if (event.key === 'w') {
    wKeyPressed = false;
  }
});
function movePomniForward(deltaTime) {
  if (!pomni) return;
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  const pomniSpeed = 5;
  const distanceToMove = pomniSpeed * deltaTime;
  const oldPomniPosition = pomni.position.clone(); // Remember pomni's old position
  const newX = pomni.position.x + cameraDirection.x * distanceToMove;
  const newZ = pomni.position.z + cameraDirection.z * distanceToMove;
  const clampedX = THREE.MathUtils.clamp(newX, -15, 15);
  const clampedZ = THREE.MathUtils.clamp(newZ, -15, 15);
  pomni.position.set(clampedX, pomni.position.y, clampedZ);
  const deltaPosition = pomni.position.clone().sub(oldPomniPosition);;
  camera.position.add(deltaPosition);
  controls.target.copy(pomni.position).add(new THREE.Vector3(0, 1, 0));
  pomni.lookAt(clampedX + cameraDirection.x, pomni.position.y, clampedZ + cameraDirection.z);
}

let lastFrameTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;
  if (wKeyPressed) {
    movePomniForward(deltaTime);
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();
