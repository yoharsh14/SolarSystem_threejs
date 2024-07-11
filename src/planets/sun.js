import * as THREE from "three";
import { createOrbit } from "../secondaryEl/orbit.js";
import { radius_list } from "../secondaryEl/radiusList.js";
const loader = new THREE.TextureLoader();
const sun = new THREE.IcosahedronGeometry(20, 20);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: loader.load("../../assets/sunmap.jpg"),
});

export const sunMesh = new THREE.Mesh(sun, sunMaterial);

export const orbitList = () => {
  const list = [];
  radius_list.map((el) => {
    const orbit = createOrbit(el[0], el[1]);
    orbit.position.copy(sunMesh.position);
    list.push(orbit);
  });
  return list;
};
