function createUI(){
    var gui = new dat.GUI();
    var param = {
        a: "OBJ",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometry');
    g.add(param, 'a',["Mujer","Hombre", "Luigi", "Mario", "Otgw"]).name("Modelos 3D");

    var l = gui.addFolder('Luces');
    var colorLight = l.addColor(param, 'b').name("Color de luz");
     var intensityLight = l.add(param, 'c').min(0).max(1).step(0.1).name("Intensidad");

     colorLight.onChange(function(colorGet){
        console.log(colorGet);
        colorLight.color.setHex(Number(colorGet.toString().raplace('#','0x')))
     });

     intensityLight.onChange(function(intensityGet){
        light.intensity = intensityGet
     });

}

