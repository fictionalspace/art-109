// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
let scene, camera, renderer, cone, room, baked, controls, audio, isPlaying = false;


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

// Audio setup
const listener = new THREE.AudioListener();
camera.add(listener);
audio = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/sappheiros-passion.mp3', function(buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(false);
    audio.setVolume(0.5);
});



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
            camera.position.set(-2.67, 20, -40);
            camera.rotation.set(-35.53 * (Math.PI / 180), 47.50 * (Math.PI / 180), 18.08 * (Math.PI / 180));
            break;
        case 'mp3':
            camera.position.set(12, 25, -45);
            camera.rotation.set(-68.73 * (Math.PI / 180), 24.10 * (Math.PI / 180), 35.68 * (Math.PI / 180));
            break;
        case 'lamp':
            camera.position.set(2.228, 5.753, -8.850);
            camera.rotation.set(18 * (Math.PI / 180), -19.61 * (Math.PI / 180), -12.07 * (Math.PI / 180));
            break;
        case 'books':
            camera.position.set(-19, 17, -20);
            camera.rotation.set(0, 7 * (Math.PI / 180), 0);
            break;
        case 'pics':
            camera.position.set(-2.67, 20, -40);
            camera.rotation.set(0, 0, 0);
            break;
    }
}
// Event listeners for button clicks
document.getElementById('default').addEventListener('click', function() {
    changeCameraAngle('default');
    showPopup("This is just a place to chill out in.");
});
document.getElementById('chest').addEventListener('click', function() {
    changeCameraAngle('chest');
    showPopup("A treasure chest full of old sentiments.");
});

document.getElementById('bear').addEventListener('click', function() {
    changeCameraAngle('bear');
    showPopup("A little companion which aided you during those restless nights. It's still on guard.");
});
document.getElementById('plant').addEventListener('click', function() {
    changeCameraAngle('plant');
    showPopup("Bits of green, a gift to remind you of the eventual peace in the future.");
});

document.getElementById('mp3').addEventListener('click', () => {
    changeCameraAngle('mp3');
    toggleAudio();
    showPopup("Back before everything is now on phones, a well used and respected device, thank you.");
});

document.getElementById('lamp').addEventListener('click', function() {
    changeCameraAngle('lamp');
    showPopup("For those late night studying, the lamp's light which allowed those stressful nights.");
});

document.getElementById('books').addEventListener('click', function() {
    changeCameraAngle('books');
    showPopup("A vast collection of knowledge, some contain information, mix of emotions, - records that stands against time.");
});
document.getElementById('pics').addEventListener('click', function() {
    changeCameraAngle('pics');
    showPopup("Proof of your beginnings, momentos of the past, how do you do now?");
});

function toggleAudio() {
    if (audio.isPlaying) {
        audio.stop();
    } else {
        audio.play();
    }
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 5000);
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
