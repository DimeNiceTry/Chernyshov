import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classes from './David.module.css';

const David = () => {
    const mountRef = useRef();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x546AFF, 1); // Soft ambient light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(3, 2, 1).normalize();
        scene.add(directionalLight);
        const directionalLight1 = new THREE.DirectionalLight(0x546AFF, 1);
        directionalLight1.position.set(0, 2, 1).normalize();
        scene.add(directionalLight1);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(1, 0, 1).normalize();
        scene.add(directionalLight2);

        const loader = new GLTFLoader();
        let model;

        loader.load(
            process.env.PUBLIC_URL + '/assets/david/scene.gltf',
            (gltf) => {
                model = gltf.scene;
                
                // Масштабирование модели в зависимости от размера экрана
                if (window.innerWidth <= 480) {
                    model.scale.set(0.015, 0.015, 0.014);
                    model.position.x = 0;
                    model.position.y = 0; // Поднимаем модель выше на мобильных
                } else if (window.innerWidth <= 768) {
                    model.scale.set(0.017, 0.017, 0.016);
                    model.position.x = -2;
                    model.position.y = -0.5; // Поднимаем модель выше на планшетах
                } else {
                    model.scale.set(0.019, 0.019, 0.0175);
                    model.position.x = -3;
                    model.position.y = -2; // Стандартное положение для десктопа
                }
                
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Error loading model', error);
            }
        );

        // Variables for controlling update rate
        let lastRenderTime = 0;
        let mouseX = 0;
        let mouseY = 0;

        const bobbingAmplitude = 0.03; // Amplitude of bobbing
        const bobbingFrequency = 2; // Frequency of bobbing

        const animate = (time) => {
            requestAnimationFrame(animate);

            // Limit update rate to 60 FPS
            if (time - lastRenderTime < 16) return;
            lastRenderTime = time;

            if (model) {
                // Update model rotation based on mouse position
                model.rotation.y = mouseX * 0.1;

                // Calculate bobbing effect
                const basePosition = window.innerWidth <= 480 ? 0 : 
                                    window.innerWidth <= 768 ? -0.5 : -2;
                model.position.y = basePosition + bobbingAmplitude * Math.sin(bobbingFrequency * time * 0.001);
            }
            renderer.render(scene, camera);
        };
        animate();

        camera.position.z = 5; // Set camera position

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            
            setIsMobile(width <= 768);
            
            // Обновление позиции и масштаба модели при изменении размера окна
            if (model) {
                if (width <= 480) {
                    model.scale.set(0.015, 0.015, 0.014);
                    model.position.x = 0;
                    model.position.y = 0;
                } else if (width <= 768) {
                    model.scale.set(0.017, 0.017, 0.016);
                    model.position.x = -2;
                    model.position.y = -0.5;
                } else {
                    model.scale.set(0.019, 0.019, 0.0175);
                    model.position.x = -3;
                    model.position.y = -2;
                }
            }
        };
        window.addEventListener('resize', handleResize);

        // Handle mouse movement
        const handleMouseMove = (event) => {
            // Normalize mouse coordinates to [-1, 1]
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup resources on unmount
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
