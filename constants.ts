import * as THREE from 'three';

// Palette
export const COLORS = {
  EMERALD_DEEP: new THREE.Color('#002816'),
  EMERALD_LIGHT: new THREE.Color('#005C32'),
  GOLD_HIGH: new THREE.Color('#F9E58A'),
  GOLD_DEEP: new THREE.Color('#C5A059'),
  RED_LUXURY: new THREE.Color('#8a1c1c'),
  WHITE_WARM: new THREE.Color('#FFF5E1'),
};

// Scene Settings
export const FOLIAGE_COUNT = 12000;
export const ORNAMENT_COUNT = 400;
export const LIGHT_COUNT = 300;
export const DUST_COUNT = 500;

export const TREE_HEIGHT = 14;
export const TREE_RADIUS = 5.5;

// Physics / Animation
export const LERP_SPEED = 2.5; // Visual morph speed
export const SPIN_FRICTION = 0.96; // Inertia decay
export const SPIN_SENSITIVITY = 0.005;

// Camera
export const CAMERA_POS: [number, number, number] = [0, 2, 22];
