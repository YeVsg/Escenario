var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    //figuresGeo = [],
    mylight = null;
    //cube1 = null,
    //cube2 = null;

 
const size = 20,
    division = 20;
 
function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('../src/img/facesimage/estrellas.png');
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight, // RelaciÃ³n Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
    //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

    /*
    //orbit helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );
    */
    camera.position.z = 20;
    

    //gestiona la creacion del tipo de luz
    
    createlight('directionalLight');

    figures();

    animate();

}


function createlight(typeLight){

  //var e = document.getElementById("theLight");
  //var typeLight = e.value;
  //var text = e.options[e.selectedIndex].text;

  switch(typeLight) {
      
    case 'ambient':
    
      mylight = new THREE.AmbientLight( 0xFFFFFF, 90000000000000); // soft white light
      scene.add( mylight );
    break;

    case 'directionalLight':
      mylight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      scene.add( mylight );
    break;

    case 'pointLight':
      mylight= new THREE.PointLight( 0xffffff, 10, 100);
      mylight.position.set( 0, 5, 6 );
      scene.add( mylight );

      const sphereSize = 2;
      const pointLightHelper = new THREE.PointLightHelper( mylight, sphereSize );
      scene.add( pointLightHelper );
    break;

    case 'spot':
      mylight = new THREE.Spotmylight( 0xffffff );
      mylight.position.set( 10, 10, 10 );

      scene.add( mylight );
    break;
  }
}

function animate() {
    requestAnimationFrame(animate);

    controls.update
    renderer.render( scene, camera );
}

// Resize by Screen Size
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function figures(){

    var edificio1;

  const texture = new THREE.TextureLoader().load('../src/img/facesImage/uv_test_bw_1024.png');

   

    var materialedificio1 = [/*new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/arboles.png'), side: THREE.DoubleSide, transparent: true })*/,
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/arboles.png'), side: THREE.DoubleSide, transparent: true} ),
      //new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg'), side: THREE.DoubleSide, transparent: true} ), //techo
      //new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventanatecho1.jpg'), side: THREE.DoubleSide, transparent: true} ), //piso
      //new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/arboles.png'), side: THREE.DoubleSide, transparent: true} ),
      //new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/arboles.png'), side: THREE.DoubleSide, transparent: true} ),
];

    const geometryBox1 = new THREE.BoxGeometry( 5, 10, 30.5 ); 
    const materialBox1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, map: texture, side: THREE.DoubleSide} ); 
    edificio1 = new THREE.Mesh( geometryBox1, materialedificio1 );

    edificio1.position.x = -12.5;
    edificio1.position.y = 4.1;
    edificio1.position.z = 0;
    scene.add( edificio1 );


  var edificio1, edificio2, carretera;



  
    //terreno  todo el mapa

    const geometry = new THREE.PlaneGeometry( 30, 30 );

    const texturePlano = new THREE.TextureLoader().load('../src/img/facesimage/grass.jpeg');

    const material = new THREE.MeshBasicMaterial( { 
                                                    side: THREE.DoubleSide,
                                                    map: texturePlano, 
                                                    color: 0x7d7f7d, // White color, ensuring no color multiplication
                                                    transparent: false} );

    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(90*(Math.PI)/180);
    scene.add( plane );


  

    const calle = new THREE.BoxGeometry( 10, 30, 0.1 );

    const textureCalle = new THREE.TextureLoader().load('../src/img/facesimage/carretera.jpeg');

    const materialCalle = new THREE.MeshBasicMaterial( { 
      side: THREE.DoubleSide,
      map: textureCalle, 
      color: 0x7d7f7d, 
      transparent: false} );

    const planeCalle = new THREE.Mesh( calle, materialCalle );
    planeCalle.rotateX(90*(Math.PI)/180);
    planeCalle.position.y= 0.1;
    scene.add( planeCalle );

    var arbol6

    const geoarbol6 = new THREE.ConeGeometry(2, 5, 60); 
    const materialarbol6 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol6 = new THREE.Mesh( geoarbol6, materialarbol6); 

    arbol6.position.x = -10.5;
    arbol6.position.y = 5;
    arbol6.position.z = 5;
    scene.add( arbol6 );

    var tronco6

    const geotronco6 = new THREE.BoxGeometry( 0.5, 3, 0.5 ); 
    const materialtronco6 = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco6= new THREE.Mesh( geotronco6, materialtronco6); 

    tronco6.position.x = -10.5;
    tronco6.position.y = 1.1;
    tronco6.position.z = 5;
    scene.add( tronco6 );

    var arbol5

    const geoarbol5 = new THREE.ConeGeometry(2, 5, 60); 
    const materialarbol5 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol5 = new THREE.Mesh( geoarbol5, materialarbol5); 

    arbol5.position.x = -10.5;
    arbol5.position.y = 5;
    arbol5.position.z = -11;
    scene.add( arbol5 );

    var tronco5

    const geotronco5 = new THREE.BoxGeometry( 0.5, 3, 0.5 ); 
    const materialtronco5 = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco5= new THREE.Mesh( geotronco5, materialtronco5); 

    tronco5.position.x = -10.5;
    tronco5.position.y = 1.1;
    tronco5.position.z = -11;
    scene.add( tronco5 );

    var arbol4

    const geoarbol4 = new THREE.ConeGeometry(3, 7, 60); 
    const materialarbol4 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol4 = new THREE.Mesh( geoarbol4, materialarbol4); 

    arbol4.position.x = -10.1;
    arbol4.position.y = 5;
    arbol4.position.z = 11;
    scene.add( arbol4 );

    var tronco4

    const geotronco4 = new THREE.BoxGeometry( 1, 2, 1 ); 
    const materialtronco4 = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco4= new THREE.Mesh( geotronco4, materialtronco4); 

    tronco4.position.x = -10.1;
    tronco4.position.y = 1.1;
    tronco4.position.z = 11;
    scene.add( tronco4 );
    
    var arbol3

    const geoarbol3 = new THREE.ConeGeometry(5, 7, 60); 
    const materialarbol3 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol3 = new THREE.Mesh( geoarbol3, materialarbol3); 

    arbol3.position.x = 10.1;
    arbol3.position.y = 5;
    arbol3.position.z = 11;
    scene.add( arbol3 );

    var tronco3

    const geotronco3 = new THREE.BoxGeometry( 1, 2, 1 ); 
    const materialtronco3 = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco3= new THREE.Mesh( geotronco3, materialtronco3); 

    tronco3.position.x = 10.1;
    tronco3.position.y = 1.1;
    tronco3.position.z = 11;
    scene.add( tronco3 );

    
    var arbol2

    const geoarbol2 = new THREE.ConeGeometry(3, 7, 60); 
    const materialarbol2 = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol2 = new THREE.Mesh( geoarbol2, materialarbol2); 

    arbol2.position.x = 10.1;
    arbol2.position.y = 5;
    arbol2.position.z = 5;
    scene.add( arbol2 );

    var tronco2

    const geotronco2 = new THREE.BoxGeometry( 1, 2, 1 ); 
    const materialtronco2 = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco2 = new THREE.Mesh( geotronco2, materialtronco2); 

    tronco2.position.x = 10.1;
    tronco2.position.y = 1.1;
    tronco2.position.z = 5;
    scene.add( tronco2 );





    var tronco

    const geotronco = new THREE.BoxGeometry( 1, 2, 1 ); 
    const materialtronco = new THREE.MeshBasicMaterial( {color: 0x452608} ); 
    tronco = new THREE.Mesh( geotronco, materialtronco); 

    tronco.position.x = 10.1;
    tronco.position.y = 1.1;
    tronco.position.z = -11.5;
    scene.add( tronco );

    

   

    

    var arbol

    const geoarbol = new THREE.ConeGeometry(5, 7, 60); 
    const materialarbol = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/arbol.jpg')}); 
    arbol = new THREE.Mesh( geoarbol, materialarbol); 

    arbol.position.x = 10.1;
    arbol.position.y = 5;
    arbol.position.z = -11.5;
    scene.add( arbol );

    

    var edificio3;

    const geoEdificio3 = new THREE.BoxGeometry( 8, 10, 9.5 ); 
    const materialEdificio3 = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/ladocasaAbnd.jpg'), side: THREE.DoubleSide },),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/casaAbandonada.jpeg'), side: THREE.DoubleSide} ), //frontal
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/techocasaAbnd.jpg'), side: THREE.DoubleSide} ), //techo
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventanatecho1.jpg'), side: THREE.DoubleSide} ), //piso
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/ladocasaAbnd.jpg'), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/ladocasaAbnd.jpg'), side: THREE.DoubleSide} ), //lado izquierdo
  ]; 
    edificio3 = new THREE.Mesh( geoEdificio3, materialEdificio3); 

    edificio3.position.x = 10.1;
    edificio3.position.y = 5.1;
    edificio3.position.z = -3.3;
    
    scene.add( edificio3 );

    var materialedificio2 = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/frente.png'), side: THREE.DoubleSide },),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/lados.jpg'), side: THREE.DoubleSide} ),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/techocasaAbnd.jpg'), side: THREE.DoubleSide} ), //techo
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/techo.jpeg'), side: THREE.DoubleSide} ), //piso
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/lados.jpg'), side: THREE.DoubleSide} ),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesimage/lados.jpg'), side: THREE.DoubleSide} ),
  ];
  
    const edf2 = new THREE.BoxGeometry( 7, 7, 7 ); 
    edificio2 = new THREE.Mesh( edf2, materialedificio2 );
  
    edificio2.position.x = -10.1;
    edificio2.position.y = 3.6;
    edificio2.position.z = -3.3;
    scene.add( edificio2 )

    var luna;

    const geoluna = new THREE.SphereGeometry( 6, 32, 20 ); 
    const materialLuna = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/luna.jpg')}); 
    luna = new THREE.Mesh( geoluna, materialLuna ); 

    luna.position.x = -20;
    luna.position.y = 25;
    luna.position.z = 20;

    scene.add( luna );

    
const materialBase = new THREE.MeshStandardMaterial({ color: 0x333333 });
const materialLampara = new THREE.MeshStandardMaterial({ color: 0xffffe0, emissive: 0xffff99 });


const baseGeometry = new THREE.CylinderGeometry(1, 1.5, 2, 32);
const baseFarol = new THREE.Mesh(baseGeometry, materialBase);
baseFarol.position.set ( 7, 1, 7 );


const posteGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8, 32);
const posteFarol = new THREE.Mesh(posteGeometry, materialBase);
posteFarol.position.set ( 7, 3, 7 );


const lamparaGeometry = new THREE.SphereGeometry(1, 16, 16);
const lamparaFarol = new THREE.Mesh(lamparaGeometry, materialLampara);
lamparaFarol.position.set( 7, 8, 7 );




const farol = new THREE.Group();
farol.add(baseFarol);
farol.add(posteFarol);

farol.add(lamparaFarol);


scene.add(farol);


const materialBase2 = new THREE.MeshStandardMaterial({ color: 0x333333 });
const materialLampara2 = new THREE.MeshStandardMaterial({ color: 0xffffe0, emissive: 0xffff99 });


const baseGeometry2 = new THREE.CylinderGeometry(1, 1.5, 2, 32);
const baseFarol2 = new THREE.Mesh(baseGeometry2, materialBase2);
baseFarol2.position.set( -8, 1, -9 );


const posteGeometry2 = new THREE.CylinderGeometry(0.2, 0.2, 8, 32);
const posteFarol2 = new THREE.Mesh(posteGeometry2, materialBase2);
posteFarol2.position.set( -8, 4, -9 );


const lamparaGeometry2 = new THREE.SphereGeometry(1, 16, 16);
const lamparaFarol2 = new THREE.Mesh(lamparaGeometry2, materialLampara2);
lamparaFarol2.position.set( -8, 8, -9 );




const farol2 = new THREE.Group();
farol2.add(baseFarol2);
farol2.add(posteFarol2);

farol2.add(lamparaFarol2);


scene.add(farol2);
}

