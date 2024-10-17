var objetoActual;

function createUI(){
    var gui = new dat.GUI();
    var param = {
        a: "OBJ",
        b: "#FF00FF",
        c: 1,
        scale: 1  
    };

    var g = gui.addFolder('Geometry');
    var player = g.add(param, 'a',["Mujer","Hombre", "Luigi", "Mario", "Otgw", "Gregory"]).name("Modelos 3D");

    player.onChange(function(myPlayer){
      loadObjMtl(myPlayer, param.scale);
    });

    var scaleControl = g.add(param, 'scale').min(0.03).max(5).step(0.01).name("Escala");
    scaleControl.onChange(function(newScale) {
      if (objetoActual) {
         
         objetoActual.scale.set(newScale, newScale, newScale);
     }
      });

    var l = gui.addFolder('Luces');
    var colorLight = l.addColor(param, 'b').name("Color de luz");
     var intensityLight = l.add(param, 'c').min(0).max(1).step(0.1).name("Intensidad");

   colorLight.onChange(function(colorGet) {
      mylight.color.setHex(Number(colorGet.toString().replace('#','0x')));
   });


     intensityLight.onChange(function(intensityGet){
        mylight.intensity = intensityGet;
     });

   }

     function loadObjMtl(selectedModel, scale){
      // general Path, nameObj, nameMTL
      var generalPath = "../obj/modelos/";
      var fileObj, 
          fileMtl;

      switch (selectedModel) {
         case "Mujer":
             fileObj = "female02.obj";
             fileMtl = "female02.mtl";
             break;
         case "Hombre":
             fileObj = "male02.obj";
             fileMtl = "male02.mtl";
             break;
         case "Luigi":
             fileObj = "Luigi_obj.obj";
             fileMtl = "Luigi_obj.mtl";
             break;
         case "Mario":
             fileObj = "mario_obj.obj";
             fileMtl = "mario_obj.mtl";
             break;
         case "Otgw":
             fileObj = "OvertheGardenPJobj.obj";
             fileMtl = "OvertheGardenPJobj.mtl";
             break;
         case "Gregory":
             fileObj = "personaje.obj";
             fileMtl = "personaje.mtl";
             break;
         default:
             console.error("Modelo no reconocido");
             return;
     }

      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.setTexturePath(generalPath);
      mtlLoader.setPath(generalPath);
      mtlLoader.load(fileMtl, function(materials){
         materials.preload();

         var objLoader = new THREE.OBJLoader();
         objLoader.setMaterials(materials);
         objLoader.setPath(generalPath);
         objLoader.load(fileObj, function(object){
            if (objetoActual) {
               scene.remove(objetoActual); 
           }
            scene.add(object);
            object.scale.set(scale, scale, scale);
            objetoActual = object;
         });
      });
     }



