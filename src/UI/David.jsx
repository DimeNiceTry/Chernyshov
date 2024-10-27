import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classes from './David.module.css';

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
                model.scale.set(0.019, 0.019, 0.0175); // Масштабирование модели
                model.position.x = -3;
                model.position.y = -2;
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Ошибка при загрузке модели', error);
            }
        );

        // Переменные для управления частотой обновления
        let lastRenderTime = 0;
        let mouseX = 0;
        let mouseY = 0;

        const animate = (time) => {
            requestAnimationFrame(animate);

            // Ограничение частоты обновления до 60 FPS
            if (time - lastRenderTime < 16) return;
            lastRenderTime = time;

            if (model) {
                // Обновление вращения модели на основе позиции курсора
                model.rotation.y = mouseX * 0.5;
                model.rotation.x = mouseY * -0.5;
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

        // Обработчик движения мыши
        const handleMouseMove = (event) => {
            // Нормализация координат мыши в диапазоне [-1, 1]
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Очистка ресурсов при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
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
