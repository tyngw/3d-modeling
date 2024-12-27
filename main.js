import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
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
  document.getElementById('cube').appendChild(renderer.domElement);

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
  function createBox(material, position) {
    const geometry = new THREE.BoxGeometry(500, 100, 500);
    const box = new THREE.Mesh(geometry, material);
    box.position.set(...position);
    return box;
  }

  const material_blue = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.3
  });
  const material_red = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.5
  });
  const material_green = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5
  });

  // 3つの箱を作成し、それぞれの位置を調整
  const box1 = createBox(material_blue, [0, 0, 0]);
  const box2 = createBox(material_green, [0, (thickness + margin), 0]);
  const box3 = createBox(material_red, [0, -1 * (thickness + margin), 0]);

  // シーンに追加
  scene.add(box1);
  scene.add(box2);
  scene.add(box3);

  // フォントローダーを使用してテキストを作成
  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const textGeometry1 = new TextGeometry('back-end', {
      font: font,
      size: 40,
      height: 5,
    });
    const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
    textMesh1.position.set(-200, 0, 250);
    scene.add(textMesh1);

    const textGeometry2 = new TextGeometry('front-end', {
      font: font,
      size: 40,
      height: 5,
    });
    const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
    textMesh2.position.set(-200, (thickness), 250);
    scene.add(textMesh2);

    const textGeometry3 = new TextGeometry('infrastracture', {
      font: font,
      size: 40,
      height: 5,
    });
    const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial);
    textMesh3.position.set(-200, -1 * (thickness + margin), 250);
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