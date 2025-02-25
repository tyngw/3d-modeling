import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

window.addEventListener("load", init);

function init() {
  const thickness = 100;
  const margin = 10;

  // シーンの作成
  const scene = new THREE.Scene();

  //レンダラーの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xaaaaaa, 1.0);
  document.getElementById('cube')!.appendChild(renderer.domElement);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 0, 2000);

  // OrbitControlsを追加
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 慣性を有効にする
  controls.dampingFactor = 0.25; // 慣性の強さ
  controls.enableZoom = true; // ズームを有効にする

  // 立方体を作成する関数
  function createBox(material: THREE.Material, position: [number, number, number]) {
    const geometry = new THREE.BoxGeometry(500, 100, 500);
    const box = new THREE.Mesh(geometry, material);
    box.position.set(...position);
    return box;
  }

  function createMaterial(color: number) {
    return new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.5
    });
  }

  const box1 = createBox(createMaterial(0x0000ff), [0, 0, 0]);
  const box2 = createBox(createMaterial(0x00ff00), [0, (thickness + margin), 0]);
  const box3 = createBox(createMaterial(0xff0000), [0, -1 * (thickness + margin), 0]);

  // シーンに追加
  scene.add(box1);
  scene.add(box2);
  scene.add(box3);

  // フォントローダーを使用してテキストを作成
  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font: Font) {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    function createTextMesh(text: string, position: [number, number, number]) {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 40,
        height: 5,
      });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(...position);
      return textMesh;
    }

    const textMesh1 = createTextMesh('back-end', [-200, 0, 250]);
    const textMesh2 = createTextMesh('front-end', [-200, thickness, 250]);
    const textMesh3 = createTextMesh('infrastructure', [-200, -1 * (thickness + margin), 250]);

    scene.add(textMesh1);
    scene.add(textMesh2);
    scene.add(textMesh3);
  });

  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);  // 光の向きを変更
  // シーンに追加
  scene.add(light);

  renderer.render(scene, camera);

  roll();

  function roll() {
    requestAnimationFrame(roll);

    // コントロールを更新
    controls.update();

    // レンダリング
    renderer.render(scene, camera);
  }

  // ブラウザリサイズ対応
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", onWindowResize);
}