import { SceneController } from "./sceneController";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSphere } from "./createBall";
import { useEffect, useRef } from "react";

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
      console.log("resizing");
    }
  });
  resizeObserver.observe(hostElement);

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
    dispose: () => {
      resizeObserver.disconnect();
    },
  };
};
