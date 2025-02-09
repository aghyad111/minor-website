// Importeer Three.js
import * as THREE from 'three';

class SyriaThemeHandler {
    constructor() {
        this.syrianContent = {
            places: [
                {
                    title: "Antiek Damascus",
                    img: "https://live.staticflickr.com/4021/4685704317_a20e0298c8_b.jpg",
                    description: "Een van de oudste continu bewoonde steden ter wereld.",
                    details: "Damascus, de hoofdstad van Syrië, is een van de oudste continu bewoonde steden ter wereld. Met een rijke geschiedenis die duizenden jaren omspant, is het een centrum van beschaving, cultuur en handel geweest."
                },
                {
                    title: "Palmyra",
                    img: "https://lp-cms-production.imgix.net/news/2018/08/palmyra-restoration.jpg",
                    description: "De oude stad van handel en beschaving.",
                    details: "Palmyra was een belangrijk cultureel centrum in de oude wereld. Door zijn ligging was het een smeltkroes van verschillende beschavingen, met adembenemende architecturale overblijfselen die zijn historische betekenis weergeven."},
                {
                    title: "Kasteel van Aleppo",
                    img: "https://c1.staticflickr.com/5/4092/4947315751_9cf4b6744f_b.jpg",
                    description: "Een symbool van de veerkracht en geschiedenis van Syrië.",
                    details: "De Citadel van Aleppo is een van de grootste en oudste kastelen ter wereld. Zijn massieve muren en complexe architectuur vertellen verhalen van talloze beschavingen die deze regio hun thuis hebben genoemd."
                },
                {
                    title: "Hama",
                    img: "https://c2.staticflickr.com/8/7146/6775526861_d7040ee002_b.jpg",
                    description: "Beroemd om zijn oude waterraderen en rijke geschiedenis.",
                    details: "Hama is befaamd om zijn historische waterraderen (Norias) langs de Orontes-rivier. Deze enorme houten wielen werden eeuwenlang gebruikt voor irrigatie en vertegenwoordigen de vindingrijke techniek van de Syrische beschaving."
                }
            ]
        };
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const syriaNode = document.querySelector('.timeline-node:first-child');
        if (syriaNode) {
            syriaNode.addEventListener('click', () => this.activateSyriaTheme());
        }
    }

    createSyriaContent() {
        return `
            <div class="syria-theme">
                <div class="syria-hero">
                    <img 
                        src="https://live.staticflickr.com/4021/4685704317_a20e0298c8_b.jpg" 
                        alt="Damascus"
                        class="syria-hero-image"
                    />
                    <div class="syria-hero-content fade-in">
                        <h1 class="syria-hero-title">
                            <span>Ontdek</span> Syrië
                        </h1>
                    </div>
                </div>
                <div class="syria-featured">
                    <div class="syria-grid">
                        ${this.syrianContent.places.map((place, index) => `
                            <div class="syria-card interactive-card fade-in" data-index="${index}" style="animation-delay: ${index * 0.2}s">
                                <div class="syria-card-image-container">
                                    <img src="${place.img}" alt="${place.title}" class="syria-card-image" />
                                    <div class="syria-card-overlay">
                                        <div class="syria-card-details">
                                            <p>${place.details}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="syria-card-content">
                                    <h3 class="syria-card-title">${place.title}</h3>
                                    <p class="syria-card-description">${place.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <footer class="syria-footer">
                    <div class="syria-footer-container fade-in">
                        <div class="syria-footer-credits">
                            <p>© ${new Date().getFullYear()} | Ontdekkingsreis door Syrisch Erfgoed</p>
                        </div>
                    </div>
                </footer>
                
                <button class="back-button fade-in">← Terug</button>
            </div>
        `;
    }

    activateSyriaTheme() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            this.originalContent = document.body.innerHTML;
            
            document.body.innerHTML = this.createSyriaContent();
            
            this.addCardInteractivity();
            
            const backButton = document.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    document.body.innerHTML = this.originalContent;
                    this.reinitializeScripts();
                });
            }
        }, 500);
    }

    addCardInteractivity() {
        const interactieveKaarten = document.querySelectorAll('.interactive-card');
        
        interactieveKaarten.forEach(kaart => {
            const afbeelding = kaart.querySelector('.syria-card-image');
            const overlay = kaart.querySelector('.syria-card-overlay');
            
            kaart.addEventListener('mouseenter', () => {
                afbeelding.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            });
            
            kaart.addEventListener('mouseleave', () => {
                afbeelding.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            });
            
            kaart.addEventListener('click', () => {
                kaart.classList.toggle('details-expanded');
                
                if (kaart.classList.contains('details-expanded')) {
                    overlay.style.opacity = '1';
                    afbeelding.style.transform = 'scale(1.1)';
                } else {
                    overlay.style.opacity = '0';
                    afbeelding.style.transform = 'scale(1)';
                }
            });
        });
    }

    reinitializeScripts() {
        document.querySelectorAll('script[type="module"]').forEach(script => {
            const newScript = document.createElement('script');
            newScript.type = 'module';
            newScript.src = script.src;
            script.parentNode.replaceChild(newScript, script);
        });
    
        setTimeout(() => {
            const universe = new PortfolioUniverse();
    
            const tijdlijnScripts = document.querySelectorAll('.timeline-node');
            if (tijdlijnScripts.length) {
                const event = new Event('DOMContentLoaded');
                document.dispatchEvent(event);
            }
    
            this.setupEventListeners();
    
            const navigatieLinks = document.querySelectorAll('.nav-link');
            navigatieLinks.forEach(link => {
                link.addEventListener('mousemove', (e) => {
                    const rect = link.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    link.style.setProperty('--x', `${x}px`);
                    link.style.setProperty('--y', `${y}px`);
                });
            });
        }, 100);
    }
}

class PortfolioUniverse {
    constructor() {
        // Initialiseer kerncomponenten
        this.initializeScene();
        this.setupEventListeners();
        this.createIntersectionObserver();
        this.animate();
    }

    initializeScene() {
        // Scène-opzet
        this.scene = new THREE.Scene();
        
        // Camera-opzet met perspectief voor diepte
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Initialiseer WebGL-renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('journey-canvas'),
            antialias: true,
            alpha: true
        });
        
        // Stel renderer-grootte en pixelverhouding in
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Maak deeltjessysteem
        this.createParticles();
    }

    createParticles() {
        const deeltjesAantal = 1000;
        const deeltjes = new Float32Array(deeltjesAantal * 3);
        const kleuren = new Float32Array(deeltjesAantal * 3);

        for (let i = 0; i < deeltjesAantal * 3; i += 3) {
            deeltjes[i] = (Math.random() - 0.5) * 10;
            deeltjes[i + 1] = (Math.random() - 0.5) * 10;
            deeltjes[i + 2] = (Math.random() - 0.5) * 10;

            const verhouding = i / (deeltjesAantal * 3);
            kleuren[i] = 0.1 + verhouding * 0.15;     // R
            kleuren[i + 1] = 0.16 + verhouding * 0.7;  // G
            kleuren[i + 2] = 0.5 + verhouding * 0.3;   // B
        }

        const geometrie = new THREE.BufferGeometry();
        geometrie.setAttribute('position', new THREE.BufferAttribute(deeltjes, 3));
        geometrie.setAttribute('color', new THREE.BufferAttribute(kleuren, 3));

        const materiaal = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particleSystem = new THREE.Points(geometrie, materiaal);
        this.scene.add(this.particleSystem);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('mousemove', (e) => {
            const muisX = (e.clientX / window.innerWidth) * 2 - 1;
            const muisY = -(e.clientY / window.innerHeight) * 2 + 1;

            gsap.to(this.particleSystem.rotation, {
                x: muisY * 0.1,
                y: muisX * 0.1,
                duration: 2,
                ease: 'power2.out'
            });
        });
    }

    createIntersectionObserver() {
        const opties = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const waarnemer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.animateSection(entry.target);
                }
            });
        }, opties);

        document.querySelectorAll('.narrative-section').forEach(sectie => {
            waarnemer.observe(sectie);
        });
    }

    animateSection(sectie) {
        sectie.querySelectorAll('.timeline-node').forEach((node, index) => {
            gsap.from(node, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out'
            });
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.particleSystem) {
            this.particleSystem.rotation.x += 0.0002;
            this.particleSystem.rotation.y += 0.0001;

            const posities = this.particleSystem.geometry.attributes.position.array;
            const tijd = Date.now() * 0.001;

            for (let i = 0; i < posities.length; i += 3) {
                posities[i + 1] += Math.sin(tijd + posities[i]) * 0.001;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialiseer alles wanneer de DOM is geladen
document.addEventListener('DOMContentLoaded', () => {
    const universe = new PortfolioUniverse();
    window.syriaThemeHandler = new SyriaThemeHandler();

    // Verwijder laadscherm wanneer alles is geïnitialiseerd
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tijdlijnTimeline = document.querySelector('.journey-timeline');
    if (!tijdlijnTimeline) return;

    const nodes = tijdlijnTimeline.querySelectorAll('.timeline-node');
    const vorigBtn = tijdlijnTimeline.querySelector('.prev-btn');
    const volgendeBtn = tijdlijnTimeline.querySelector('.next-btn');
    const voortgangsContainer = tijdlijnTimeline.querySelector('.carousel-progress');

    // Controleer of alle nodige elementen bestaan
    if (!nodes.length || !vorigBtn || !volgendeBtn || !voortgangsContainer) return;

    // Wis bestaande voortgangspunten
    voortgangsContainer.innerHTML = '';

    // Maak voortgangspunten
    nodes.forEach((_, index) => {
        const stip = document.createElement('div');
        stip.classList.add('progress-dot');
        if (index === 0) stip.classList.add('active');
        stip.addEventListener('click', () => toonNode(index));
        voortgangsContainer.appendChild(stip);
    });

    const voortgangsStippen = voortgangsContainer.querySelectorAll('.progress-dot');

    function toonNode(index) {
        // Valideer index
        if (index < 0 || index >= nodes.length) return;

        // Verwijder actieve klasse en verberg alle nodes
        nodes.forEach(node => {
            node.classList.remove('active');
            node.style.display = 'none';
            node.style.opacity = '0';
        });

        // Deactiveer alle voortgangsstippen
        voortgangsStippen.forEach(stip => stip.classList.remove('active'));

        // Toon en activeer huidige node
        const huidigeNode = nodes[index];
        huidigeNode.classList.add('active');
        huidigeNode.style.display = 'block';
        
        // Animeer node verschijning
        setTimeout(() => {
            huidigeNode.style.opacity = '1';
        }, 50);

        // Activeer overeenkomstige voortgangsstip
        voortgangsStippen[index].classList.add('active');

        // Update knopstatus
        vorigBtn.disabled = index === 0;
        vorigBtn.style.opacity = index === 0 ? '0.5' : '1';
        
        volgendeBtn.disabled = index === nodes.length - 1;
        volgendeBtn.style.opacity = index === nodes.length - 1 ? '0.5' : '1';
    }

    // Eventlisteners voor navigatie
    vorigBtn.addEventListener('click', () => {
        const huidigeIndex = Array.from(nodes).findIndex(node => node.classList.contains('active'));
        if (huidigeIndex > 0) {
            toonNode(huidigeIndex - 1);
        }
    });

    volgendeBtn.addEventListener('click', () => {
        const huidigeIndex = Array.from(nodes).findIndex(node => node.classList.contains('active'));
        if (huidigeIndex < nodes.length - 1) {
            toonNode(huidigeIndex + 1);
        }
    });

    // Zorg ervoor dat de initiële status overeenkomt met de HTML
    const beginIndex = Array.from(nodes).findIndex(node => node.classList.contains('active'));
    toonNode(beginIndex);
});