import * as THREE from 'three';

export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED',
}

export interface DualPosition {
  chaos: THREE.Vector3;
  target: THREE.Vector3;
}

export interface OrnamentData {
  position: DualPosition;
  color: THREE.Color;
  scale: number;
  type: 'gift' | 'ball' | 'light';
  speedOffset: number; // For varying lerp speeds
}

export interface FoliageData {
  chaosPositions: Float32Array;
  targetPositions: Float32Array;
  colors: Float32Array;
}
