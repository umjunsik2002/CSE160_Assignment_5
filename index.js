import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { setupGrid } from './src/grid.js';
import { setupLighting } from './src/lighting.js';

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
setupGrid(scene, 32);
setupLighting(scene);

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

const greenGeometry = new THREE.BoxGeometry(32, 1, 32);
const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const greenCube = new THREE.Mesh(greenGeometry, greenMaterial);
greenCube.position.set(0, -0.5, 0);
scene.add(greenCube);

let pomni;
loader.load('./src/pomni/scene.gltf', function (gltf) {
  pomni = gltf.scene;
  pomni.position.set(0, 0, 0);
  scene.add(pomni);
  const targetPosition = pomni.position.clone().add(new THREE.Vector3(0, 1, 0));
  controls.target.copy(targetPosition);
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
