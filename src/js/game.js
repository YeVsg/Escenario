function createUI(){
    var gui = new dat.GUI();
    var param = {
        a: "OBJ",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometry');
    var player = g.add(param, 'a',["Mujer","Hombre", "Luigi", "Mario", "Otgw"]).name("Modelos 3D");

    player.onChange(function(myPlayer){
      console.log(myPlayer);
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

