import { SceneController } from "./sceneController";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSphere } from "./createBall";

export const createScene = (hostElement: HTMLElement): SceneController => {
  const width = window.innerWidth;
  const height = window.innerHeight;
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

  const redBall = createSphere(0xe93329);
  redBall.position.x = -2;
  redBall.position.z = 3;
  scene.add(redBall);
  const blueBall = createSphere(0x2254f4);
  scene.add(blueBall);
  blueBall.position.z = 3;
  const yellowBall = createSphere(0xf5c142);
  yellowBall.position.x = 2;
  yellowBall.position.z = 3;
  scene.add(yellowBall);
  const whiteBall = createSphere(0xffffff);
  scene.add(whiteBall);
  const table = new THREE.Object3D();
  scene.add(table);

  const loader = new GLTFLoader();
  loader.load(
    "table.glb",
    gltf => {
      gltf.scene.rotateX(Math.PI / 2);
      gltf.scene.name = "table";
      table.add(gltf.scene);
      renderer.render(scene, camera);
    },
    undefined,
    error => {
      console.error(error);
    }
  );

  render();

  return {
    render,
    objects: {
      redBall,
      blueBall,
      yellowBall,
      whiteBall,
      table,
      camera,
    },
  };
};
