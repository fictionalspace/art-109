// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
let scene, camera, renderer, cone, room, baked;


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models




// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

function init() {
     scene = new THREE.Scene();

     const light = new THREE.DirectionalLight(0xffffff, 3);
     light.position.set(1,1,5);
     scene.add(light);
     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

     renderer = new THREE.WebGLRenderer({ antialias: true});
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.body.appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.ConeGeometry( 2, 10, 16 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const texture = new THREE.TextureLoader().load('textures/ice.jpg');
const material = new THREE.MeshBasicMaterial( { map: texture } );
cone = new THREE.Mesh( geometry, material );
scene.add( baked );

camera.position.z = 5;

const loader = new GLTFLoader(); // to load 3d models
loader.load('models/room.glb', function (gltf){
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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
