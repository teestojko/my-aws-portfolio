<template>
    <div ref="sceneRef" class="scene"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";

export default {
    name: "MovingCube",
    setup() {
        const sceneRef = ref(null);
        let renderer, camera, scene, cubes = [];
        let animationId = null;

        onMounted(() => {
            if (!sceneRef.value) return;

                const current = sceneRef.value;
                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(
                75,
                current.clientWidth / current.clientHeight,
                0.1,
                1000
            );
            camera.position.z = 15;

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(current.clientWidth, current.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.top = "0";
            renderer.domElement.style.left = "0";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            current.appendChild(renderer.domElement);

        // ⭐ リサイズ対応
            const handleResize = () => {
                if (!current) return;
                renderer.setSize(current.clientWidth, current.clientHeight);
                camera.aspect = current.clientWidth / current.clientHeight;
                camera.updateProjectionMatrix();
            };
            window.addEventListener("resize", handleResize);

            // ⭐ 立方体生成
            for (let i = 0; i < 200; i++) {
                const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
                const material = new THREE.MeshStandardMaterial({
                    color: Math.random() * 0xffffff,
                    metalness: 0.5,
                    roughness: 0.2,
                });

                const cube = new THREE.Mesh(geometry, material);
                cube.rotationSpeed = {
                    x: Math.random() * 0.02 - 0.01,
                    y: Math.random() * 0.02 - 0.01,
                    z: Math.random() * 0.02 - 0.01,
                };
                cube.movementSpeed = {
                    x: Math.random() * 0.02 - 0.01,
                    y: Math.random() * 0.02 - 0.01,
                    z: Math.random() * 0.02 - 0.01,
                };
                cube.position.set(
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100
                );
                cubes.push(cube);
                scene.add(cube);
            }

                // ⭐ 光源追加
            const light = new THREE.PointLight(0xffffff, 2.0);
            light.position.set(50, 50, 50);
            scene.add(light);

            const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
            scene.add(ambientLight);

        // ⭐ アニメーション
            const animate = () => {
                animationId = requestAnimationFrame(animate);
                cubes.forEach((cube) => {
                    cube.rotation.x += cube.rotationSpeed.x;
                    cube.rotation.y += cube.rotationSpeed.y;
                    cube.rotation.z += cube.rotationSpeed.z;
                    cube.position.x += cube.movementSpeed.x;
                    cube.position.y += cube.movementSpeed.y;
                    cube.position.z += cube.movementSpeed.z;

                    // 視界外に出たらリセット
                    if (cube.position.x > 60 || cube.position.x < -60) cube.position.x = Math.random() * 100 - 50;
                    if (cube.position.y > 60 || cube.position.y < -60) cube.position.y = Math.random() * 100 - 50;
                    if (cube.position.z > 50 || cube.position.z < -50) cube.position.z = Math.random() * 100 - 50;
                });
                renderer.render(scene, camera);
            };

            animate();

            // ⭐ クリーンアップ
            onUnmounted(() => {
                cancelAnimationFrame(animationId);
                window.removeEventListener("resize", handleResize);
                if (current && renderer?.domElement?.parentNode) {
                    current.removeChild(renderer.domElement);
                }
                renderer.dispose();
            });
        });

        return { sceneRef };
    },
};
</script>

<style scoped>
.scene {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
}
</style>
