import * as THREE from "three";

export const createSphere = (color: number) => {
  const geometry = new THREE.SphereGeometry(1);
  const material = new THREE.MeshPhongMaterial({ color, shininess: 100 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.x = 1;
  mesh.scale.y = 1;
  mesh.scale.z = 1;
  mesh.castShadow = true;
  return mesh;
};
