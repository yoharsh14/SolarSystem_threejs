import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { sunMesh, orbitList } from "./planets/sun.js";
import { getplanetList } from "./planets/planet.js";
import { radius_list } from "./secondaryEl/radiusList.js";
const scene = new THREE.Scene();
export const solarSystem = new THREE.Object3D();
const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//positioning the planets

// adding orbits to the solarSystem object
const listOfOrbit = orbitList();
listOfOrbit.forEach((el) => {
  solarSystem.add(el);
  console.log(el);
});

// adding planets to the solarSystem
const allPlanets = getplanetList();
allPlanets.forEach((el) => {
  if (el.len == 1) {
    solarSystem.add(el.planetMesh);
  } else {
    solarSystem.add(el.planetMesh);
    solarSystem.add(el.orbit);
  }
});
// solarSystem.add(earthMesh);
solarSystem.add(sunMesh);
const hemiLight = new THREE.HemisphereLight();
solarSystem.add(hemiLight);

scene.add(solarSystem);
let t = 0;
function animate() {
  t += 0.0001;

  for (let i = 0; i < allPlanets.length; i++) {
    const x = (radius_list[i][0] * Math.cos(t * Math.PI * 2));
    const y = radius_list[i][1] * Math.sin(t * Math.PI * 2);
    console.log(x);
    if (allPlanets[i].len == 1) {
      allPlanets[i].planetMesh.position.set(x, y, 0);
      allPlanets[i].planetMesh.rotation.x = t * Math.PI;
      allPlanets[i].planetMesh.rotation.y = t * Math.PI;
    } else {
      allPlanets[i].planetMesh.position.set(x, y, 0);
      allPlanets[i].planetMesh.rotation.x = t * Math.PI;
      allPlanets[i].planetMesh.rotation.y = t * Math.PI;

      allPlanets[i].orbit.position.set(x, y, 0);
      allPlanets[i].orbit.rotation.x = t * Math.PI;
      allPlanets[i].orbit.rotation.y = t * Math.PI;
    }
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
