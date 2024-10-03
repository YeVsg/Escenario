var scene = null, 
camera = null, 
renderer = null, 
controls = null,
light = null,
cube1 = null,
cube2 = null;


var figuresGeo = []; 

const size = 20, 
division = 20;

function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x524E4E);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

     //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 5);
    controls.update();

    //orbit helper
    const gridHelper = new THREE.GridHelper(size, division);
    scene.add(gridHelper);

   createLight("directionalLight");

   const texture = new THREE.TextureLoader().load('../src/img/facesimage/uv_test_bw_1024.png');
   const geometryBox1 = new THREE.BoxGeometry( 1, 1, 1 ); 
    const materialBox1 = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                        map: texture,
                                                        side: THREE.DoubleSide
    } ); 
   cube1 = new THREE.Mesh( geometryBox1, materialBox1 ); 
  cube1.position.x = -2;
  cube1.position.y = 2;
  scene.add( cube1 );

  var materialCube = [ new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face1.jpg'), side: THREE.DoubleSide} ),
                      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face2.png'), side: THREE.DoubleSide} ),
                      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face3.jpg'), side: THREE.DoubleSide} ),
                      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face4.jpg'), side: THREE.DoubleSide} ),
                      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face5.png'), side: THREE.DoubleSide} ),
                      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/face6.jpg'), side: THREE.DoubleSide} )
  ];

  const geometryBox2 = new THREE.BoxGeometry( 1, 1, 1 ); 
    const materialBox2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  cube2 = new THREE.Mesh( geometryBox2, materialCube );
  cube2.position.x = 2;
  cube2.position.y = 2;
  scene.add( cube2 );

const texturePlane = new THREE.TextureLoader().load('../src/img/facesimage/water.png');
const geometry = new THREE.PlaneGeometry( 30, 20 );
const material = new THREE.MeshBasicMaterial( {map: texturePlane, color: 0xffffff, side: THREE.DoubleSide, transparent: true} );
const plane = new THREE.Mesh( geometry, material );
plane.position.z = 5;
scene.add( plane );

    camera.position.z = 5;
    animate();
}

function createLight(typeLight){
  switch (typeLight) {
    case "ambient":
      light = new THREE.AmbientLight( 0x404040 ); // soft white light
      scene.add( light );
      
      break;
      case "pointLight":
        light = new THREE.PointLight(0xffffff, 1, 100);
        pointlight.position.set(0, 3, 3);
        scene.add(light);
        break;

      case "directionalLight":
        light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( light );
        alert("directionalLight");

  
    default:
      break;
  }
}

function animate() {
    requestAnimationFrame(animate);
    cube1.rotation.y +=0.01;
    cube2.rotation.x +=0.01;
    controls.update();
    renderer.render(scene, camera);
}

function createGeometry(geometryType) {
    let geometry = null;
    let params = null;

    switch (geometryType) {
        case 'Box':
            params = prompt("Ingresa las dimensiones de la caja (ancho, alto, profundidad)", "1,1,1");
            if (params) {
                let [width, height, depth] = params.split(',').map(Number);
                geometry = new THREE.BoxGeometry(width, height, depth);
            }
            break;
        case 'Torus':
            params = prompt("Ingresa los parámetros del torus (radio, tubo, segmentos radiales, segmentos tubulares)", "10,3,16,100");
            if (params) {
                let [radius, tube, radialSegments, tubularSegments] = params.split(',').map(Number);
                geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
            }
            break;
        case 'Cone':
            params = prompt("Ingresa los parámetros del cono (radio, altura, segmentos radiales)", "5,10,32");
            if (params) {
                let [radius, height, radialSegments] = params.split(',').map(Number);
                geometry = new THREE.ConeGeometry(radius, height, radialSegments);
            }
            break;
        default:
            alert("Figura no reconocida");
            return;
    }

    if (geometry) {
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            wireframe: false
        });
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
        figuresGeo.push(object);  
    }
}

function trasladarOBJ() {
    if (figuresGeo.length > 0) {
        let selectedFigure = figuresGeo[figuresGeo.length - 1];  // Última figura creada
        let params = prompt("Ingresa la traslación en x, y, z", "10,0,0");
        if (params) {
            let [x, y, z] = params.split(',').map(Number);
            selectedFigure.position.set(x, y, z);
        }
    }
}

function escalarOBJ() {
    if (figuresGeo.length > 0) {
        let selectedFigure = figuresGeo[figuresGeo.length - 1];
        let params = prompt("Ingresa la escala en x, y, z", "2,2,2");
        if (params) {
            let [x, y, z] = params.split(',').map(Number);
            selectedFigure.scale.set(x, y, z);
        }
    }
}

function rotarOBJ() {
    if (figuresGeo.length > 0) {
        let selectedFigure = figuresGeo[figuresGeo.length - 1];
        let params = prompt("Ingresa la rotación en grados en x, y, z", "45,0,0");
        if (params) {
            let [x, y, z] = params.split(',').map(Number);
            selectedFigure.rotation.set(
                THREE.Math.degToRad(x),
                THREE.Math.degToRad(y),
                THREE.Math.degToRad(z)
            );
        }
    }
}

function limpiarEscena() {
    for (let i = figuresGeo.length - 1; i >= 0; i--) {
        scene.remove(figuresGeo[i]);  
        figuresGeo[i].geometry.dispose();  
        figuresGeo[i].material.dispose();  
    }
    figuresGeo = [];  
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

