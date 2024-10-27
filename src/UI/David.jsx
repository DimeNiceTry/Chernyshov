import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classes from './David.module.css'
const David = () => {
    const mountRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); // Прозрачный фон
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий окружающий свет
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        let model;

        loader.load(
            './assets/david/scene.gltf',
            (gltf) => {
                model = gltf.scene;
                model.scale.set(0.01, 0.01, 0.01); // Масштабирование модели
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Ошибка при загрузке модели', error);
            }
        );

        // Переменные для управления частотой обновления
        let lastRenderTime = 0;
        const animate = (time) => {
            requestAnimationFrame(animate);

            // Ограничение частоты обновления до 60 FPS
            if (time - lastRenderTime < 16) return;
            lastRenderTime = time;

            if (model) {
                model.rotation.y += 0.01; // Вращение модели по оси Y
            }
            renderer.render(scene, camera);
        };
        animate();

        camera.position.z = 5; // Установка позиции камеры

        // Обработчик изменения размера окна
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Очистка ресурсов при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
            if (model) {
                scene.remove(model);
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        child.material.dispose();
                    }
                });
            }
            renderer.dispose();
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className={classes['david']}/>;
};

export default David;
