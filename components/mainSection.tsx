import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const defaultHeight = "h-screen";

const createSphere = (color: number) => {
  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.x = 1;
  mesh.scale.y = 1;
  mesh.scale.z = 1;
  return mesh;
};

export const MainSectionNew = (props: { pageProgress: number }) => {
  const htmlRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
  }>({} as any);

  console.log("pageProgress", props.pageProgress);

  useEffect(() => {
    if (!htmlRef.current) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    threeRef.current.camera = camera;
    threeRef.current.scene = scene;
    threeRef.current.renderer = renderer;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 0;
    directionalLight.position.y = 0;
    directionalLight.position.z = 5;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    camera.position.z = 10;

    htmlRef.current.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const redBall = createSphere(0xe93329);
    redBall.name = "redBall";
    redBall.position.x = -2;
    redBall.position.z = 3;
    scene.add(redBall);
    const blueBall = createSphere(0x2254f4);
    blueBall.name = "blueBall";
    scene.add(blueBall);
    blueBall.position.z = 3;
    const yellowBall = createSphere(0xf5c142);
    yellowBall.name = "yellowBall";
    yellowBall.position.x = 2;
    yellowBall.position.z = 3;
    scene.add(yellowBall);
    renderer.render(scene, camera);

    const loader = new GLTFLoader();

    loader.load(
      "table.glb",
      gltf => {
        gltf.scene.rotateX(Math.PI / 2);
        // const scale = 0.5;
        // gltf.scene.scale.set(scale, scale, scale);

        gltf.scene.name = "table";
        scene.add(gltf.scene);

        renderer.render(scene, camera);
      },
      undefined,
      error => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const { scene, camera, renderer } = threeRef.current;

    if (!scene || !camera || !renderer) {
      return;
    }

    scene.children
      .filter(
        c =>
          c.name === "redBall" ||
          c.name === "blueBall" ||
          c.name === "yellowBall"
      )
      .forEach((child, index) => {
        // if (child instanceof THREE.Mesh) {
        console.log("changing scale", props.pageProgress);

        const newScale = Math.max(1 - props.pageProgress, 0.1);
        child.scale.x = newScale;
        child.scale.y = newScale;
        child.scale.z = newScale;
        // }
      });
    renderer.render(scene, camera);
    // console.log("rendering");
  }, [props.pageProgress]);

  return (
    <div
      ref={htmlRef}
      style={{ zIndex: 3 }}
      className={`absolute flex h-screen w-full flex-col border-2 border-red-400 text-fuchsia-500`}
    ></div>
  );
};

export const MainSection = MainSectionNew;
