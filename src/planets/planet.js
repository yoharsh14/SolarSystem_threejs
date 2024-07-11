import * as THREE from "three";
import { planetList } from "../secondaryEl/planetList.js";
import { createOrbit } from "../secondaryEl/orbit.js";
import { solarSystem } from "../index.js";
const createPlanet = (
  path = "../../assets/earthmap.jpg",
  x = 100,
  y = 2,
  z = 3,
  radius = 1
) => {
  const loader = new THREE.TextureLoader();

  const planet = new THREE.IcosahedronGeometry(radius, 20);
  const planetMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: loader.load(path),
  });
  const planetMesh = new THREE.Mesh(planet, planetMaterial);
  planetMesh.position.set(x, y, z);
  return planetMesh;
};

export const getplanetList = () => {
  const res = [];
  planetList.forEach((el) => {
    const planetMesh = createPlanet(el.path, el.x, el.y, el.z, el.planetRadius);
    if (el.hasRing) {
      const orbit = createOrbit(el.radius, el.radius);
      orbit.position.copy(planetMesh.position);
      res.push({ len: 2, planetMesh, orbit });
    } else {
      res.push({ len: 1, planetMesh });
    }
  });
  return res;
};
