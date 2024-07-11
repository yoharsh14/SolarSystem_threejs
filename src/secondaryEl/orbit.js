import * as THREE from "three";

export const createOrbit = (majorAxis = 50, minorAxis = 30) => {
  const semiMajorAxis = majorAxis; // Adjust based on desired orbit size
  const semiMinorAxis = minorAxis; // Adjust based on eccentricity
  const ellipseCurve = new THREE.EllipseCurve(
    0,
    0, // center coordinates (usually sun's position)
    semiMajorAxis,
    semiMinorAxis,
    0,
    2 * Math.PI // full ellipse (0 - 2PI)
  );
  const segmentCount = 64; // Number of segments for smoother line
  const points = ellipseCurve.getPoints(segmentCount);
  const orbitGeometry = new THREE.BufferGeometry(ellipseCurve.getPoints(64)); // 64 segments for smooth line
  orbitGeometry.setFromPoints(points);
  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0xf5efdf,
    linewidth: 10,
  });
  return new THREE.Line(orbitGeometry, orbitMaterial);
};
