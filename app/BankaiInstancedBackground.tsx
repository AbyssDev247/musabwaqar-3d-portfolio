'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate, stagger } from 'animejs';
import { getInstances } from 'animejs/adapters/three';

/**
 * Lightweight procedural background only.
 * The portfolio scroll timeline is intentionally not touched here.
 * Anime.js owns the per-instance motion while Three.js owns rendering.
 */
export default function BankaiInstancedBackground() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;

    const root = mount.current;
    const isMobile = window.innerWidth < 700;
    const density = isMobile ? 4 : window.innerWidth < 1200 ? 6 : 8;
    const count = density * density * 3;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020305, isMobile ? 0.045 : 0.032);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    root.appendChild(renderer.domElement);

    const resize = () => {
      const width = root.clientWidth || window.innerWidth;
      const height = root.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener('resize', resize);

    scene.add(new THREE.HemisphereLight(0x8ca9ff, 0x020305, 0.5));

    const geometry = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8ca9ff,
      roughness: 0.36,
      metalness: 0.72,
      transparent: true,
      opacity: 0.62,
      emissive: 0x17284c,
      emissiveIntensity: 0.55,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const instances = getInstances(mesh);
    const palette = ['#8ca9ff', '#c7d5ff', '#ff6b00', '#ff9d45', '#6d7cff'];

    const spreadX = 9.5;
    const spreadY = 5.5;
    const depth = 3;
    const center = (density - 1) / 2;

    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < density; y++) {
        for (let x = 0; x < density; x++) {
          const id = z * density * density + y * density + x;
          const depthOffset = (z - 1) * 3.2;
          instances[id].x = (x - center) * (spreadX / density);
          instances[id].y = (y - center) * (spreadY / density);
          instances[id].z = depthOffset;
          instances[id].scale = 0.35 + ((x + y + z) % 3) * 0.12;
          instances[id].rotateX = (x - center) * 4;
          instances[id].rotateY = (y - center) * 5;
          instances[id].color = palette[id % palette.length];
        }
      }
    }

    // Anime.js animates individual InstancedMesh slots through per-instance proxies.
    const animation = animate(instances, {
      scale: [0.25, 1.05, 0.35],
      rotateX: [0, 360],
      rotateY: [0, 360],
      color: palette,
      delay: stagger(18, { grid: [density, density, depth], from: 'center' }),
      duration: 4200,
      loopDelay: 350,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    });

    let raf = 0;
    const pointer = new THREE.Vector2();
    const smooth = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      smooth.lerp(pointer, 0.035);
      mesh.rotation.y += (smooth.x * 0.045 - mesh.rotation.y) * 0.025;
      mesh.rotation.x += (-smooth.y * 0.03 - mesh.rotation.x) * 0.025;
      camera.position.x += (smooth.x * 0.35 - camera.position.x) * 0.018;
      camera.position.y += (-smooth.y * 0.22 - camera.position.y) * 0.018;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      animation.pause();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      root.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="instanced-bankai-background" aria-hidden="true" />;
}
