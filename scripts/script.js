// Import Three.js
import * as THREE from 'three';

class PortfolioUniverse {
    constructor() {
        // Initialize core components
        this.initializeScene();
        this.setupEventListeners();
        this.createIntersectionObserver();
        this.animate();
    }

    initializeScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup with perspective for depth
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Initialize WebGL renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('journey-canvas'),
            antialias: true,
            alpha: true
        });
        
        // Set renderer size and pixel ratio
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particle system
        this.createParticles();
    }

    createParticles() {
        const particleCount = 1000;
        const particles = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Random positions in 3D space
            particles[i] = (Math.random() - 0.5) * 10;
            particles[i + 1] = (Math.random() - 0.5) * 10;
            particles[i + 2] = (Math.random() - 0.5) * 10;

            // Gradient colors from primary to secondary
            const ratio = i / (particleCount * 3);
            colors[i] = 0.1 + ratio * 0.15;     // R
            colors[i + 1] = 0.16 + ratio * 0.7;  // G
            colors[i + 2] = 0.5 + ratio * 0.3;   // B
        }

        // Create geometry and set attributes
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create material with custom properties
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        // Create and add particle system to scene
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Smooth scroll implementation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mouse movement effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            gsap.to(this.particleSystem.rotation, {
                x: mouseY * 0.1,
                y: mouseX * 0.1,
                duration: 2,
                ease: 'power2.out'
            });
        });
    }

    createIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.animateSection(entry.target);
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('.narrative-section').forEach(section => {
            observer.observe(section);
        });
    }

    animateSection(section) {
        // Animate progress bars
        section.querySelectorAll('.orbit-progress').forEach(progress => {
            const value = progress.parentElement.dataset.progress;
            progress.style.setProperty('--progress', `${value}%`);
        });

        // Animate timeline nodes
        section.querySelectorAll('.timeline-node').forEach((node, index) => {
            gsap.from(node, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out'
            });
        });

        // Animate projects
        section.querySelectorAll('.project-asteroid').forEach((project, index) => {
            gsap.from(project, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.particleSystem) {
            // Rotate particle system
            this.particleSystem.rotation.x += 0.0002;
            this.particleSystem.rotation.y += 0.0001;

            // Update particle positions for wave effect
            const positions = this.particleSystem.geometry.attributes.position.array;
            const time = Date.now() * 0.001;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

class ThemeController {
    constructor() {
        this.themes = {
            journey: {
                primary: '#1a2980',
                secondary: '#26d0ce',
                background: '#0a0c1a'
            },
            goals: {
                primary: '#2c3e50',
                secondary: '#3498db',
                background: '#0b1016'
            },
            projects: {
                primary: '#2980b9',
                secondary: '#16a085',
                background: '#0c1419'
            },
            contact: {
                primary: '#16a085',
                secondary: '#1abc9c',
                background: '#0a1612'
            }
        };

        this.setupThemeTransitions();
    }

    setupThemeTransitions() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.transitionToTheme(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50% 0px',
                threshold: 0
            }
        );

        document.querySelectorAll('.narrative-section').forEach(section => {
            observer.observe(section);
        });
    }

    transitionToTheme(themeKey) {
        const theme = this.themes[themeKey];
        if (!theme) return;

        gsap.to(document.documentElement, {
            duration: 1,
            ease: 'power2.inOut',
            '--color-primary': theme.primary,
            '--color-secondary': theme.secondary
        });

        gsap.to('body', {
            backgroundColor: theme.background,
            duration: 1,
            ease: 'power2.inOut'
        });
    }
}

class FormController {
    constructor() {
        this.setupForm();
        this.setupValidation();
    }

    setupForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    setupValidation() {
        document.querySelectorAll('.contact-form input, .contact-form textarea')
            .forEach(input => {
                input.addEventListener('blur', (e) => this.validateField(e.target));
                input.addEventListener('input', (e) => this.validateField(e.target));
            });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorMessage = 'Voer een geldig emailadres in';
                break;
            case 'text':
                isValid = value.length >= 2;
                errorMessage = 'Dit veld is verplicht';
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Voer minimaal 10 karakters in';
                break;
        }

        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.parentElement.querySelector('.error-message');
        field.classList.toggle('invalid', !isValid);
        if (errorElement) {
            errorElement.textContent = isValid ? '' : errorMessage;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        // Validate all fields before submission
        const isValid = Array.from(form.elements).every(element => {
            if (element.tagName === 'BUTTON') return true;
            return this.validateField(element);
        });

        if (!isValid) return;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                this.showSuccess();
                form.reset();
            } else {
                throw new Error('Formulier versturen mislukt');
            }
        } catch (error) {
            this.showError(error);
        }
    }

    showSuccess() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Bericht succesvol verzonden!';
        this.showMessage(message);
    }

    showError(error) {
        console.error('Form submission error:', error);
        const message = document.createElement('div');
        message.className = 'error-message';
        message.textContent = 'Er is iets misgegaan. Probeer het later opnieuw.';
        this.showMessage(message);
    }

    showMessage(messageElement) {
        const form = document.querySelector('.contact-form');
        form.appendChild(messageElement);
        setTimeout(() => messageElement.remove(), 5000);
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const universe = new PortfolioUniverse();
    const themeController = new ThemeController();
    const formController = new FormController();

    // Remove loader when everything is initialized
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add active class based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effect
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            link.style.setProperty('--x', `${x}px`);
            link.style.setProperty('--y', `${y}px`);
        });
    });
});

