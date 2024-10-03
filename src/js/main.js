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
    scene.background = new THREE.Color(0x102c54);
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

  var edificio1, edificio2, carretera;

  const texture = new THREE.TextureLoader().load('../src/img/facesImage/uv_test_bw_1024.png');

    //edificio1

    var materialedificio1 = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventana1.jpg'), side: THREE.DoubleSide },),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventana1.jpg'), side: THREE.DoubleSide} ),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventanatecho1.jpg'), side: THREE.DoubleSide} ), //techo
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventanatecho1.jpg'), side: THREE.DoubleSide} ), //piso
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventana1.jpg'), side: THREE.DoubleSide} ),
      new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/edificioventana1.jpg'), side: THREE.DoubleSide} ),
];

    const geometryBox1 = new THREE.BoxGeometry( 3, 6, 3 ); 
    const materialBox1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, map: texture, side: THREE.DoubleSide} ); 
    edificio1 = new THREE.Mesh( geometryBox1, materialedificio1 );

    edificio1.position.x = -5.85;
    edificio1.position.y = 3.01;
    edificio1.position.z = 1.7;
    scene.add( edificio1 );

    //otro edificio con la misma textura que la anterior figulra

    const geometryBox2 = new THREE.BoxGeometry( 3, 8, 3 ); 
    const materialBox2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    edificio2 = new THREE.Mesh( geometryBox2, materialedificio1); 

    edificio2.position.x = -5.85;
    edificio2.position.y = 4.01;
    edificio2.position.z = 5.67;
    scene.add( edificio2 );

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

    const geoarbol = new THREE.ConeGeometry(3, 6, 60); 
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

    var luna;

    const geoluna = new THREE.SphereGeometry( 6, 32, 20 ); 
    const materialLuna = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../src/img/facesimage/luna.jpg')}); 
    luna = new THREE.Mesh( geoluna, materialLuna ); 

    luna.position.x = -20;
    luna.position.y = 25;
    luna.position.z = 20;

    scene.add( luna );

    



}

