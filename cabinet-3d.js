// 3D Cabinet Explorer using Three.js
// Loads SketchUp COLLADA (.dae) models with exploded view animation

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/ColladaLoader.js';

let scene, camera, renderer, controls;
let currentCabinetType = 'wall'; // Start with wall since we have the model
let currentView = 'assembled';
let cabinetModel = null;
let componentGroups = {};
let selectedComponent = null;
let animating = false;
let raycaster, mouse;

// Component group definitions - map mesh names to logical groups
const componentMapping = {
    'sides': ['side_left', 'side_right', 'left_side', 'right_side', 'side', 'panel_side'],
    'top_bottom': ['top', 'bottom', 'top_panel', 'bottom_panel', 'shelf_top', 'shelf_bottom'],
    'back': ['back', 'back_panel', 'backing'],
    'doors': ['door', 'door_left', 'door_right', 'panel_door'],
    'shelves': ['shelf', 'adjustable_shelf', 'fixed_shelf'],
    'drawer_box': ['drawer', 'drawer_box', 'drawer_side', 'drawer_front', 'drawer_back', 'drawer_bottom'],
    'hardware': ['hinge', 'handle', 'pull', 'knob', 'slide'],
    'trim': ['trim', 'molding', 'edge_band', 'face_frame']
};

// Material for highlighting selected components
const selectedMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a9eff,
    roughness: 0.5,
    metalness: 0.3,
    emissive: 0x2060c0,
    emissiveIntensity: 0.5
});

// Initialize 3D scene
export function init3DViewer(containerId, initialType = 'wall', initialView = 'assembled') {
    console.log('Initializing 3D viewer in:', containerId);
    currentCabinetType = initialType;
    currentView = initialView;
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    console.log('Container dimensions:', container.clientWidth, 'x', container.clientHeight);

    // Clear existing content
    container.innerHTML = '';

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(45, 35, 45);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 25;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 40, 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-20, 20, -20);
    scene.add(fillLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.1 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Raycaster for component selection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Mouse click event for component selection
    renderer.domElement.addEventListener('click', onMouseClick, false);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Load cabinet model
    loadCabinetModel(currentCabinetType);

    // Start animation loop
    animate();
}

function onWindowResize() {
    const container = renderer.domElement.parentElement;
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Mouse click handler for component selection
function onMouseClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    if (!cabinetModel) return;
    
    const intersects = raycaster.intersectObjects(cabinetModel.children, true);
    
    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        selectComponentByMesh(clickedMesh);
    }
}

// Load cabinet model from COLLADA file
function loadCabinetModel(type) {
    // Remove existing model
    if (cabinetModel) {
        scene.remove(cabinetModel);
        componentGroups = {};
    }

    const loader = new ColladaLoader();
    const modelPath = type === 'wall' ? 'Wall Cabinet.dae' : 'Base Cabinet.dae';
    
    loader.load(
        modelPath,
        function (collada) {
            cabinetModel = collada.scene;
            
            // Scale and position model appropriately
            cabinetModel.scale.set(1, 1, 1);
            cabinetModel.position.set(0, 0, 0);
            
            // Enable shadows and apply proper materials
            let meshCount = 0;
            const defaultMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff, // White
                roughness: 0.6,
                metalness: 0.0,
                side: THREE.DoubleSide
            });
            
            cabinetModel.traverse((node) => {
                if (node.isMesh) {
                    meshCount++;
                    node.castShadow = true;
                    node.receiveShadow = true;
                    
                    // Replace any material with a visible default
                    // This handles missing textures from SketchUp export
                    node.material = defaultMaterial.clone();
                    
                    // Store as original material for later restoration
                    node.userData.originalMaterial = node.material;
                }
            });
            
            console.log('Meshes found:', meshCount);
            
            // Calculate bounding box to see model size
            const box = new THREE.Box3().setFromObject(cabinetModel);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            console.log('Model size:', size);
            console.log('Model center:', center);
            console.log('Model position:', cabinetModel.position);
            
            // Center the model and adjust camera to look at it
            cabinetModel.position.sub(center);
            camera.lookAt(0, 0, 0);
            controls.target.set(0, 0, 0);
            
            // Group components by type
            groupComponents();
            
            // Store assembled positions
            storeAssembledPositions();
            
            // Add to scene
            scene.add(cabinetModel);
            
            // Update component selector UI
            updateComponentSelector();
            
            // Apply current view if exploded
            if (currentView === 'exploded') {
                setExplodedView(false);
            }
            
            console.log('Cabinet model loaded:', modelPath);
            console.log('Component groups:', Object.keys(componentGroups));
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading model:', error);
        }
    );
}

// Group model meshes into logical components
function groupComponents() {
    if (!cabinetModel) return;
    
    // Initialize component groups
    Object.keys(componentMapping).forEach(groupName => {
        componentGroups[groupName] = [];
    });
    
    // Traverse all meshes and assign to groups
    cabinetModel.traverse((node) => {
        if (node.isMesh) {
            const meshName = node.name.toLowerCase();
            
            // Check which group this mesh belongs to
            for (const [groupName, keywords] of Object.entries(componentMapping)) {
                if (keywords.some(keyword => meshName.includes(keyword))) {
                    componentGroups[groupName].push(node);
                    node.userData.componentGroup = groupName;
                    break;
                }
            }
            
            // If no match found, add to 'other' group
            if (!node.userData.componentGroup) {
                if (!componentGroups['other']) {
                    componentGroups['other'] = [];
                }
                componentGroups['other'].push(node);
                node.userData.componentGroup = 'other';
            }
        }
    });
    
    // Remove empty groups
    Object.keys(componentGroups).forEach(key => {
        if (componentGroups[key].length === 0) {
            delete componentGroups[key];
        }
    });
}

// Store assembled positions for all components
function storeAssembledPositions() {
    if (!cabinetModel) return;
    
    cabinetModel.traverse((node) => {
        if (node.isMesh) {
            node.userData.assembledPosition = node.position.clone();
            node.userData.assembledRotation = node.rotation.clone();
        }
    });
}

// Select component by clicking
function selectComponentByMesh(mesh) {
    const groupName = mesh.userData.componentGroup;
    if (groupName) {
        selectComponent(groupName);
    }
}

// Select component group by name
export function selectComponent(groupName) {
    // Deselect previous
    if (selectedComponent) {
        const prevGroup = componentGroups[selectedComponent];
        if (prevGroup) {
            prevGroup.forEach(mesh => {
                mesh.material = mesh.userData.originalMaterial;
            });
        }
    }
    
    // Select new component
    selectedComponent = groupName;
    const group = componentGroups[groupName];
    
    if (group) {
        group.forEach(mesh => {
            mesh.material = selectedMaterial;
        });
        
        // Update UI to show selected component
        updateComponentSelectorUI(groupName);
        
        // If drawer box is selected, show explode drawer option
        if (groupName === 'drawer_box') {
            showDrawerExplodeOption();
        }
    }
}

// Deselect current component
export function deselectComponent() {
    if (selectedComponent) {
        const group = componentGroups[selectedComponent];
        if (group) {
            group.forEach(mesh => {
                mesh.material = mesh.userData.originalMaterial;
            });
        }
        selectedComponent = null;
        updateComponentSelectorUI(null);
    }
}

// Update the component selector UI in the sidebar
function updateComponentSelector() {
    // Get the component list element
    const componentList = document.getElementById('componentList');
    if (!componentList) return;
    
    // Clear existing list
    componentList.innerHTML = '';
    
    // Add component buttons
    Object.keys(componentGroups).forEach(groupName => {
        const button = document.createElement('button');
        button.className = 'component-btn';
        button.textContent = formatComponentName(groupName);
        button.onclick = () => window.selectComponent3D(groupName);
        componentList.appendChild(button);
    });
}

// Update UI to reflect selected component
function updateComponentSelectorUI(groupName) {
    const buttons = document.querySelectorAll('.component-btn');
    buttons.forEach(btn => {
        if (groupName && btn.textContent === formatComponentName(groupName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Format component name for display
function formatComponentName(name) {
    return name.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Show option to explode just the drawer box
function showDrawerExplodeOption() {
    // This will be handled by the main UI
    if (window.onDrawerBoxSelected) {
        window.onDrawerBoxSelected();
    }
}

// Toggle cabinet type
export function toggle3DCabinetType(type) {
    if (currentCabinetType === type) return;
    currentCabinetType = type;
    loadCabinetModel(type);
}

// Toggle view (assembled/exploded)
export function toggle3DView(view) {
    if (currentView === view || animating) return;
    currentView = view;
    setExplodedView(true);
}

// Explode entire cabinet
function setExplodedView(animate = true) {
    if (!cabinetModel) return;
    
    const duration = animate ? 1500 : 0;
    const startTime = Date.now();
    
    if (animating) return;
    animating = true;
    
    const animateExplosion = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        
        cabinetModel.traverse((node) => {
            if (node.isMesh && node.userData.assembledPosition) {
                const groupName = node.userData.componentGroup;
                
                if (currentView === 'exploded') {
                    // Move parts outward from center based on their group
                    const explodeDirection = getExplodeDirection(groupName, node.userData.assembledPosition);
                    node.position.lerpVectors(
                        node.userData.assembledPosition,
                        node.userData.assembledPosition.clone().add(explodeDirection),
                        eased
                    );
                } else {
                    // Return to assembled position
                    node.position.lerp(node.userData.assembledPosition, eased);
                }
            }
        });
        
        if (progress < 1) {
            requestAnimationFrame(animateExplosion);
        } else {
            animating = false;
        }
    };
    
    if (animate) {
        animateExplosion();
    } else {
        // Instant positioning
        cabinetModel.traverse((node) => {
            if (node.isMesh && node.userData.assembledPosition) {
                if (currentView === 'exploded') {
                    const groupName = node.userData.componentGroup;
                    const explodeDirection = getExplodeDirection(groupName, node.userData.assembledPosition);
                    node.position.copy(node.userData.assembledPosition.clone().add(explodeDirection));
                } else {
                    node.position.copy(node.userData.assembledPosition);
                }
            }
        });
    }
}

// Get explosion direction based on component group
function getExplodeDirection(groupName, originalPos) {
    const explodeDistance = 15;
    const direction = new THREE.Vector3();
    
    switch (groupName) {
        case 'sides':
            // Sides move outward left/right
            direction.x = originalPos.x > 0 ? explodeDistance : -explodeDistance;
            break;
        case 'top_bottom':
            // Top/bottom move up/down
            direction.y = originalPos.y > 0 ? explodeDistance : -explodeDistance;
            break;
        case 'back':
            // Back moves backward
            direction.z = -explodeDistance;
            break;
        case 'doors':
            // Doors move forward
            direction.z = explodeDistance * 1.2;
            break;
        case 'shelves':
            // Shelves move up slightly and forward
            direction.y = explodeDistance * 0.5;
            direction.z = explodeDistance * 0.3;
            break;
        case 'drawer_box':
            // Drawer moves forward
            direction.z = explodeDistance;
            break;
        case 'hardware':
            // Hardware moves with doors/drawers
            direction.z = explodeDistance * 1.3;
            break;
        default:
            // Default: move away from center
            direction.copy(originalPos).normalize().multiplyScalar(explodeDistance * 0.5);
    }
    
    return direction;
}

// Explode only the drawer box (special case)
export function explodeDrawerBox() {
    if (!cabinetModel || selectedComponent !== 'drawer_box') return;
    
    const drawerMeshes = componentGroups['drawer_box'];
    if (!drawerMeshes) return;
    
    animating = true;
    const duration = 1000;
    const startTime = Date.now();
    
    const animateDrawerExplosion = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        
        drawerMeshes.forEach((mesh) => {
            const meshName = mesh.name.toLowerCase();
            const explodeDir = new THREE.Vector3();
            
            // Explode drawer components individually
            if (meshName.includes('front')) {
                explodeDir.z = 10;
            } else if (meshName.includes('back')) {
                explodeDir.z = -10;
            } else if (meshName.includes('left') || meshName.includes('side_l')) {
                explodeDir.x = -10;
            } else if (meshName.includes('right') || meshName.includes('side_r')) {
                explodeDir.x = 10;
            } else if (meshName.includes('bottom')) {
                explodeDir.y = -5;
            }
            
            const targetPos = mesh.userData.assembledPosition.clone().add(explodeDir);
            mesh.position.lerpVectors(mesh.userData.assembledPosition, targetPos, eased);
        });
        
        if (progress < 1) {
            requestAnimationFrame(animateDrawerExplosion);
        } else {
            animating = false;
        }
    };
    
    animateDrawerExplosion();
}

// Reassemble drawer box
export function reassembleDrawerBox() {
    if (!cabinetModel) return;
    
    const drawerMeshes = componentGroups['drawer_box'];
    if (!drawerMeshes) return;
    
    animating = true;
    const duration = 1000;
    const startTime = Date.now();
    
    const animateReassemble = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        
        drawerMeshes.forEach((mesh) => {
            mesh.position.lerp(mesh.userData.assembledPosition, eased);
        });
        
        if (progress < 1) {
            requestAnimationFrame(animateReassemble);
        } else {
            animating = false;
        }
    };
    
    animateReassemble();
}

// Easing function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 + (--t) * 4 * t * t;
}

// Expose functions to window object
window.init3DViewer = init3DViewer;
window.toggle3DCabinetType = toggle3DCabinetType;
window.toggle3DView = toggle3DView;
window.selectComponent3D = selectComponent;
window.deselectComponent3D = deselectComponent;
window.explodeDrawerBox3D = explodeDrawerBox;
window.reassembleDrawerBox3D = reassembleDrawerBox;
window.dispose3DViewer = dispose3DViewer;

// Cleanup
export function dispose3DViewer() {
    if (renderer) {
        renderer.dispose();
        controls.dispose();
        renderer.domElement.removeEventListener('click', onMouseClick);
    }
    window.removeEventListener('resize', onWindowResize);
}
