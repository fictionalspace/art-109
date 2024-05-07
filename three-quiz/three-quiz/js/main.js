import * as THREE from 'three';

			import Stats from 'three/addons/libs/stats.module.js';
			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

			let camera, scene, renderer, startTime, object, stats;

			init();
			animate();

			function init() {
        //sets up the camera's 3D view, the dimension on the web, angle, close up, and positioning
				camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 0.25, 16 );
        
				camera.position.set( 0, 1.3, 3 );
        //prepares a scene to load in 
				scene = new THREE.Scene();

				// Lights
        //adds in a spotlight/main light like the sun above the object
				scene.add( new THREE.AmbientLight( 0xcccccc ) );
        //color of the light, in this case is white with a emit brigthness, higher number = more shine
				const spotLight = new THREE.SpotLight( 0xffffff, 60 );
				spotLight.angle = Math.PI / 5;
				spotLight.penumbra = 0.2;
        //position of the light
				spotLight.position.set( 2, 3, 3 );
				spotLight.castShadow = true;
        //distant of the shadow near by the object
				spotLight.shadow.camera.near = 3;
        //distant of the shadow fear by the object
				spotLight.shadow.camera.far = 10;
        //size - width and height of the light
				spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
				scene.add( spotLight );

        //position of the light projecting towards the object
				const dirLight = new THREE.DirectionalLight( 0x55505a, 3 );
				dirLight.position.set( 0, 3, 0 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.near = 1;
				dirLight.shadow.camera.far = 10;

				dirLight.shadow.camera.right = 1;
				dirLight.shadow.camera.left = - 1;
				dirLight.shadow.camera.top	= 1;
				dirLight.shadow.camera.bottom = - 1;

				dirLight.shadow.mapSize.width = 1024;
				dirLight.shadow.mapSize.height = 1024;
				scene.add( dirLight );

				// ***** Clipping planes: ***** https://threejs.org/docs/#api/en/materials/Material.clippingPlanes

				const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
				const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

				// Geometry
        //textures the object mesh
				const material = new THREE.MeshPhongMaterial( {
					color: 0x80ee10,
					shininess: 100,
          //Defines which side of faces will be rendered - front, back or both - https://threejs.org/docs/#api/en/materials/Material.side
					side: THREE.DoubleSide,

					// ***** Clipping setup (material): *****
					clippingPlanes: [ localPlane ],
					clipShadows: true,
          //alphaToCoverage = Boolean
					alphaToCoverage: true,

				} );
        //set up of the object TrousKnot Geometry
				const geometry = new THREE.TorusKnotGeometry( 0.4, 0.08, 95, 20 );

				object = new THREE.Mesh( geometry, material );
				object.castShadow = true;
				scene.add( object );
        
        //set up of the object plane geometry
				const ground = new THREE.Mesh(
					new THREE.PlaneGeometry( 9, 9, 1, 1 ),
					new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
				);
        //set up the plane's positioning to have the trous above the plane
				ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
				ground.receiveShadow = true;
				scene.add( ground );

				// Stats
        //FPS monitor gauge? https://www.tutorialspoint.com/threejs/threejs_stats.htm
				stats = new Stats();
				document.body.appendChild( stats.dom );

				// Renderer
        //The rendering process for the objects overall, so it's not slowed down in creating multiple frames every time
        //stopping here
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.shadowMap.enabled = true;
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				window.addEventListener( 'resize', onWindowResize );
				document.body.appendChild( renderer.domElement );

				// ***** Clipping setup (renderer): *****
				const globalPlanes = [ globalPlane ],
					Empty = Object.freeze( [] );
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
				renderer.localClippingEnabled = true;

				// Controls

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 1, 0 );
				controls.update();

				// GUI

//				const gui = new GUI(),
//					props = {
//						alphaToCoverage: true,
//					},
//					folderLocal = gui.addFolder( 'Local Clipping' ),
//					propsLocal = {

//						get 'Enabled'() {

//							return renderer.localClippingEnabled;

//						},
//						set 'Enabled'( v ) {

//							renderer.localClippingEnabled = v;

//						},

//						get 'Shadows'() {

//							return material.clipShadows;

//						},
//						set 'Shadows'( v ) {

//							material.clipShadows = v;

//						},

//						get 'Plane'() {

//							return localPlane.constant;

//						},
//						set 'Plane'( v ) {

//							localPlane.constant = v;

//						}

//					},
//					folderGlobal = gui.addFolder( 'Global Clipping' ),
//					propsGlobal = {

//						get 'Enabled'() {

//							return renderer.clippingPlanes !== Empty;

//						},
//						set 'Enabled'( v ) {

//							renderer.clippingPlanes = v ? globalPlanes : Empty;

//						},

//						get 'Plane'() {

//							return globalPlane.constant;

//						},
//						set 'Plane'( v ) {

//							globalPlane.constant = v;

//						}

//					};

//				gui.add( props, 'alphaToCoverage' ).onChange( function ( value ) {
//
//					ground.material.alphaToCoverage = value;
//					ground.material.needsUpdate = true;
//
//					material.alphaToCoverage = value;
//					material.needsUpdate = true;

//				} );
//				folderLocal.add( propsLocal, 'Enabled' );
//				folderLocal.add( propsLocal, 'Shadows' );
//				folderLocal.add( propsLocal, 'Plane', 0.3, 1.25 );

//				folderGlobal.add( propsGlobal, 'Enabled' );
//				folderGlobal.add( propsGlobal, 'Plane', - 0.4, 3 );

				// Start

				startTime = Date.now();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				const currentTime = Date.now();
				const time = ( currentTime - startTime ) / 1000;

				requestAnimationFrame( animate );

				object.position.y = 0.8;
				object.rotation.x = time * 0.5;
				object.rotation.y = time * 0.2;
				object.scale.setScalar( Math.cos( time ) * 0.125 + 0.875 );

				stats.begin();
				renderer.render( scene, camera );
				stats.end();

			}
