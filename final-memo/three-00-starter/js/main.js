// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
let scene, camera, renderer, cone, room, baked, controls, cameraTarget, cameraLerpAlpha;


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models




// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

function init() {
     scene = new THREE.Scene();
//set light strength and position
     const light = new THREE.DirectionalLight(0xffffff, 4);
     light.position.set(10, 10, 10);
     scene.add(light);
     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

     //set background image
     const textureLoader = new THREE.TextureLoader();
     textureLoader.load('textures/night-bg.jpeg', function(texture) {
         scene.background = texture;
     });


     renderer = new THREE.WebGLRenderer({ antialias: true});
     renderer.setSize(window.innerWidth, window.innerHeight);
    let container = document.getElementById( 'canvas' );
    container.appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.ConeGeometry( 2, 10, 16 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const texture = new THREE.TextureLoader().load('textures/ice.jpg');
const material = new THREE.MeshBasicMaterial( { map: texture } );
cone = new THREE.Mesh( geometry, material );
scene.add( baked );
//sets camera position
camera.position.set (5, 10, 22);

const loader = new GLTFLoader(); // to load 3d models
loader.load('models/memo-room.glb', function (gltf){
    const room = gltf.scene;
    

    room.scale.set (2,2,2);
    
    scene.add(room);
})




}


function animate() {
	requestAnimationFrame( animate );

	cone.rotation.x += 0.01;
	cone.rotation.y += 0.01;

	renderer.render( scene, camera );
}

// Function to handle button clicks and change camera angles
function changeCameraAngle(angle) {
    // Example: Change camera angle based on button clicked
    switch (angle) {
        case 'default':
            camera.position.set(5, 10, 22);
            break;
        case 'chest':
            camera.position.set(6.076, 7.694, -11.165);
            camera.rotation.set(-145.43 * (Math.PI / 180), 23.94 * (Math.PI / 180), 164.26 * (Math.PI / 180));
            break;
        case 'bear':
            camera.position.set(2.097, 11.693, 5.332);
            camera.rotation.set(-151.61 * (Math.PI / 180), 24.07 * (Math.PI / 180), 167.57 * (Math.PI / 180));
            break;
         case 'plant':
            camera.position.set(4.349, 15.470, -19.761);
            camera.rotation.set(-35.53 * (Math.PI / 180), 47.50 * (Math.PI / 180), 18.08 * (Math.PI / 180));
            break;
        case 'mp3':
            camera.position.set(8.269, 14, -20);
            camera.rotation.set(-68.73 * (Math.PI / 180), 24.10 * (Math.PI / 180), 35.68 * (Math.PI / 180));
            break;
        case 'lamp':
            camera.position.set(2.228, 5.753, -8.850);
            camera.rotation.set(18 * (Math.PI / 180), -19.61 * (Math.PI / 180), -12.07 * (Math.PI / 180));
            break;
        case 'books':
            camera.position.set(-19, 9, 0.805);
            camera.rotation.set(0, 7 * (Math.PI / 180), 0);
            break;
        case 'pics':
            camera.position.set(-2.67, 12.323, -19.123);
            camera.rotation.set(0, 0, 0);
            break;
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
