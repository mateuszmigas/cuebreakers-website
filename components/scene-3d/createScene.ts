import { SceneController } from "./sceneController";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSphere } from "./createBall";

export const createScene = (hostElement: HTMLDivElement): SceneController => {
  const width = hostElement.clientWidth;
  const height = hostElement.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x = 0;
  directionalLight.position.y = 0;
  directionalLight.position.z = 5;
  directionalLight.position.normalize();
  scene.add(directionalLight);

  camera.position.z = 10;

  hostElement.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const render = () => renderer.render(scene, camera);

  const objects = {
    redBall: createSphere(0xe93329),
    blueBall: createSphere(0x2254f4),
    yellowBall: createSphere(0xf5c142),
    whiteBall: createSphere(0xffffff),
    table: new THREE.Object3D(),
    camera,
  };

  scene.add(...Object.values(objects));

  objects.blueBall.position.set(0, 0, 3);

  const loader = new GLTFLoader();
  loader.load(
    "table.glb",
    gltf => {
      gltf.scene.rotateX(Math.PI / 2);
      objects.table.add(gltf.scene);
      renderer.render(scene, camera);
    },
    undefined,
    error => console.error(error)
  );

  const resizeObserver = new ResizeObserver(elements => {
    const observerEntry = elements.find(e => e.target === hostElement);

    if (observerEntry) {
      const { width, height } = observerEntry.target.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }
  });
  resizeObserver.observe(hostElement);

  return {
    render,
    objects,
    dispose: () => {
      resizeObserver.disconnect();
    },
  };
};
