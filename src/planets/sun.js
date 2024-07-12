import * as THREE from "three";
import { createOrbit } from "../secondaryEl/orbit.js";
import { radius_list } from "../secondaryEl/radiusList.js";
import { planetList } from "../secondaryEl/planetList.js";
const loader = new THREE.TextureLoader();
const sun = new THREE.IcosahedronGeometry(20, 20);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: loader.load("../../assets/sunmap.jpg"),
});

export const sunMesh = new THREE.Mesh(sun, sunMaterial);

export const orbitList = () => {
  const list = [];
  for(let i=0;i<radius_list.length;i++){
    const orbit = createOrbit(radius_list[i][0], radius_list[i][1],planetList[i].color);
    orbit.position.copy(sunMesh.position);
    list.push(orbit);
  }
  return list;
};
