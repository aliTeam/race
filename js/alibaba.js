var extrudeSettings = {
    amount: 8,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
};
function alibaba(){
    //moveCamera()
    //return doNumberFlow();

    return new Promise(function(resolve, reject){
        //return cylinder()
        var group = new THREE.Group();


        var californiaPts = [];

        californiaPts.push( new THREE.Vector2 ( 22,55 ) );
        californiaPts.push( new THREE.Vector2 ( 193,33) );
        californiaPts.push( new THREE.Vector2 ( 201,92) );
        californiaPts.push( new THREE.Vector2 ( 30,113) );
        californiaPts.push( new THREE.Vector2 ( 22,55) );

        var firLeft = [];
        firLeft.push(new THREE.Vector2(89,241));
        firLeft.push(new THREE.Vector2(75,302));
        firLeft.push(new THREE.Vector2(85,361));
        firLeft.push(new THREE.Vector2(111,359));
        firLeft.push(new THREE.Vector2(111,352));
        firLeft.push(new THREE.Vector2(121,352));
        firLeft.push(new THREE.Vector2(122,357));
        firLeft.push(new THREE.Vector2(107,411));
        firLeft.push(new THREE.Vector2(137,416));
        firLeft.push(new THREE.Vector2(150,352));

        firLeft.push(new THREE.Vector2(142,304));
        firLeft.push(new THREE.Vector2(106,309));
        firLeft.push(new THREE.Vector2(118,248));
        firLeft.push(new THREE.Vector2(89,241));


        var firRight = [];
        firRight.push(new THREE.Vector2(156,274));
        firRight.push(new THREE.Vector2(182,325));
        firRight.push(new THREE.Vector2(191,389));
        firRight.push(new THREE.Vector2(220,386));
        firRight.push(new THREE.Vector2(211,322));
        firRight.push(new THREE.Vector2(192,281));
        firRight.push(new THREE.Vector2(179,261));
        firRight.push(new THREE.Vector2(156,274));


        var building21 = [];
        building21.push(new THREE.Vector2( 78, 107));
        building21.push(new THREE.Vector2(123, 101));
        building21.push(new THREE.Vector2( 132, 159));
        building21.push(new THREE.Vector2( 115, 158));
        building21.push(new THREE.Vector2( 91, 170));
        building21.push(new THREE.Vector2( 78, 107));

        var building2 = [];
        building2.push(new THREE.Vector2( 73, 117));
        building2.push(new THREE.Vector2( 69, 118));
        building2.push(new THREE.Vector2( 68, 144));
        building2.push(new THREE.Vector2( 20, 166));
        building2.push(new THREE.Vector2( 43, 205));
        building2.push(new THREE.Vector2( 24, 282));
        building2.push(new THREE.Vector2( 44, 289));
        building2.push(new THREE.Vector2( 64, 231));
        building2.push(new THREE.Vector2( 96, 215));
        building2.push(new THREE.Vector2( 76, 174));
        building2.push(new THREE.Vector2( 84, 170));
        building2.push(new THREE.Vector2( 73, 117));


        var building3 = [];
        building3.push(new THREE.Vector2( 187, 94));
        building3.push(new THREE.Vector2( 128, 102));
        building3.push(new THREE.Vector2( 136, 158));
        building3.push(new THREE.Vector2( 160, 206));
        building3.push(new THREE.Vector2( 165, 202));
        building3.push(new THREE.Vector2( 173, 215));
        building3.push(new THREE.Vector2( 167, 220));
        building3.push(new THREE.Vector2( 198, 276));
        building3.push(new THREE.Vector2( 187, 285));
        building3.push(new THREE.Vector2( 208, 321));
        building3.push(new THREE.Vector2( 217, 318));
        building3.push(new THREE.Vector2( 228, 332));
        building3.push(new THREE.Vector2( 244, 324));
        building3.push(new THREE.Vector2( 242, 295));
        building3.push(new THREE.Vector2( 209, 230));
        building3.push(new THREE.Vector2( 229, 221));
        building3.push(new THREE.Vector2( 225, 189));
        building3.push(new THREE.Vector2( 207, 198));
        building3.push(new THREE.Vector2( 198, 184));
        building3.push(new THREE.Vector2( 222, 173));
        building3.push(new THREE.Vector2( 217, 144));
        building3.push(new THREE.Vector2( 197, 150));
        building3.push(new THREE.Vector2( 191, 140));
        building3.push(new THREE.Vector2( 187, 94));

        function createShape(sp, height, realHeight) {
            height = height || 0.6;
            var shape = new THREE.Shape(sp);
            var points = shape.createPointsGeometry();
            var spacedPoints = shape.createSpacedPointsGeometry( 50 );

            var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            //var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color: 0xFFFFFF/*,
                 wireframe: true*/
            }));
            mesh.position.set(-18, -35 , -2);
            //mesh.rotation.set(0, 0, 0);
            mesh.scale.set(.14,.14,height);
            group.add(mesh);
            return createShape;
        }

        //createShape(californiaPts, 3)(firLeft)(firRight, 1.4)(building2, 1.2)(building3, 1.9)(building21,.5);
        group.rotation.set(Math.PI / 2, 0, 0);
        scene.add(group);

        var arrLine = [
            {arr: californiaPts, height: .6, currHeight: .1},
            {arr: firLeft, height: .4, currHeight: .1},
            {arr: firRight, height: 1.4, currHeight: .1},
            {arr: building2, height: .4, currHeight: .1},
            {arr: building3, height: 1.9, currHeight: .1}

        ];



        function animate(objs) {
            var shouldNext = false;
            objs.forEach(function(building, index) {
                if (building.height > building.currHeight) {
                    building.currHeight += 0.1;
                    createShape(building.arr, building.currHeight, building.height);
                    shouldNext = true;
                }else{
                    building.currHeight = building.height
                }
            });
            if(shouldNext) {
                render();
                requestAnimationFrame(function(){
                    animate(arrLine);
                });
            }else{
                cylinder()
                drawMeetingRoom();
                drawLogo();

                drawStructure();
                setTimeout(function(){hideLoading()}, 200);
                resolve();
            }
            stats.update();
        }

        render();
        animate(arrLine)
    });

}

function drawMeetingRoom() {
    var geometry = new THREE.BoxGeometry( 1, .4, .3 );
    var material = new THREE.MeshLambertMaterial( {color: 0xd33e20} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(2, 1.1, 22);
    cube.rotation.set(0, Math.PI / 2 - 0.2, 0);
    scene.add( cube );
    material = new THREE.MeshLambertMaterial( {color: 0xb799d} );
    5
    var cube2 = new THREE.Mesh( geometry, material );
    cube2.position.set(2.4, 1.7, 20.4);
    cube2.rotation.set(0, Math.PI / 2 - 0.2, 0);
    scene.add( cube2 );
}

function drawLogo() {
    var height = 0.3,
        size = .7,
        font = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
        weight = "normal", // normal bold
        style = "normal"; // normal italic
    var textGeo = new THREE.TextGeometry( 'Alibaba', {

        size: size,
        height: height,
        font: font,
        weight: weight,
        style: style
    });

    var textMesh = new THREE.Mesh(textGeo, new THREE.MeshPhongMaterial({
        color: 0x95939e
    }));
    textMesh.position.set(9,0,22);
    scene.add(textMesh);
    render();
}

function drawStructure() {

    var data = [[[0,0],[0,435],[600,435],[590,426],[10,426],[10,0],[0,0]],[[0,0],[600,0],[600,435],[590,426],[590,9],[0,9],[0,0]],[[42,9],[65,9],[120,37],[50,107],[39,99],[100,37],[42,9]],[[16,79],[51,110],[120,86],[121,38],[143,9],[161,9],[130,38],[130,84],[168,121],[205,80],[207,47],[166,9],[187,9],[220,42],[220,82],[175,124],[156,138],[119,100],[49,126],[14,93],[16,79]],[[176,126],[224,126],[261,85],[262,9],[276,9],[278,88],[229,138],[155,138],[176,126]],[[269,14],[373,79],[385,76],[281,2],[269,14],[441,33],[443,53],[343,113],[301,238],[289,230],[330,110],[441,33]],[[434,9],[441,93],[457,92],[455,9]],[[503,51],[452,88],[458,98],[514,59],[531,136],[590,174],[590,152],[554,129],[524,74],[554,71],[580,97],[592,88],[563,64],[590,10],[571,9],[559,49],[529,9],[518,9],[549,50],[534,59],[468,9],[443,9],[503,51]],[[49,124],[16,168],[16,195],[115,242],[125,232],[28,187],[30,168],[67,121],[49,124]],[[55,140],[55,200],[74,209],[151,204],[141,122],[130,110],[137,184],[66,138],[67,154],[140,195],[71,196],[64,130],[55,140]],[[124,233],[165,193],[234,183],[271,226],[262,229],[229,193],[170,202],[134,240],[124,233]],[[15,257],[65,263],[26,334],[86,342],[17,424],[16,405],[66,351],[16,342],[18,317],[49,270],[16,268],[15,257]],[[114,242],[52,263],[105,320],[69,350],[125,385],[101,425],[119,424],[139,385],[81,351],[121,320],[68,266],[122,248],[114,242]],[[123,235],[170,266],[277,87],[393,121],[384,134],[284,105],[173,283],[116,243],[123,235]],[[165,277],[174,277],[148,372],[242,320],[247,336],[134,392],[165,277]],[[175,270],[248,294],[264,364],[302,357],[307,369],[262,386],[266,425],[238,425],[254,374],[237,297],[174,277],[175,270]],[[190,243],[286,226],[239,293],[313,308],[304,362],[332,368],[362,249],[385,255],[358,344],[342,377],[397,423],[371,425],[335,386],[292,369],[295,328],[222,298],[269,237],[189,256],[190,243]],[[264,212],[388,248],[303,314],[305,305],[357,254],[272,237],[264,212]],/*[[394,121],[324,100],[363,247],[348,337],[332,372],[342,377],[360,337],[385,251],[345,124],[185,125],[394,121]],*/[[392,126],[437,107],[399,178],[379,237],[392,245],[410,187],[458,104],[447,91],[401,115],[392,126]],[[458,99],[453,200],[554,138],[539,131],[463,180],[468,91],[458,99]],[[444,99],[501,170],[589,150],[450,88],[444,99]],[[594,246],[573,261],[539,242],[536,198],[490,176],[479,189],[479,246],[450,272],[380,238],[365,249],[446,284],[347,340],[396,369],[390,408],[410,367],[372,342],[435,313],[489,251],[490,187],[523,205],[513,386],[531,387],[533,342],[590,324],[590,307],[531,331],[533,253],[557,287],[590,264],[594,246]],[[477,186],[478,248],[449,274],[377,240],[364,251],[446,284],[347,336],[396,369],[391,408],[410,368],[373,344],[433,312],[490,252],[490,187],[477,186]],[[444,301],[484,297],[530,335],[454,371],[530,387],[554,424],[533,424],[520,394],[435,375],[399,425],[374,423],[429,365],[427,364],[512,332],[485,307],[434,311],[444,301]]];


    function createShape(group, sp) {
        var shape = new THREE.Shape(sp);
        var points = shape.createPointsGeometry();
        var spacedPoints = shape.createSpacedPointsGeometry( 50 );

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        //var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            color: 0xE6E8FA/*,
             wireframe: true*/
        }));

        group.add(mesh);
        return createShape;
    }

    function createStru() {
        var group = new THREE.Group();
        data.forEach(function(item) {
            var d = [];
            item.forEach(function(itm) {
                d.push(new THREE.Vector2(itm[0], itm[1]))
            });
            createShape(group, d);
        });
        return group
    }



    var g1 = createStru();
    g1.rotation.set(Math.PI / 2, 0, 0);
    g1.position.set(1, 4 , 14);
    g1.scale.set(.018,.013,.03);


    var g2 = createStru();
    g2.rotation.set(0, Math.PI / 2 - 0.2, 0);
    g2.position.set(1.55, .5 , 23.5);
    g2.scale.set(.014,.004,.01);

    var g3 = createStru();
    g3.rotation.set(0, Math.PI / 2 + 0.2, 0);
    g3.position.set(8.46, .6 , 19.5);
    g3.scale.set(.008,.006,.01);


    scene.add(g1);
    scene.add(g2);
    scene.add(g3);

    render();
}

function cylinder() {
    function getCylinder(arr, width, height, sep) {
        var group = new THREE.Group();
        scene.add(group);
        arr.forEach(function(item) {
            var cy = new THREE.CylinderGeometry(width,width,height,18,3);
            var mesh = new THREE.Mesh(cy, new THREE.MeshPhongMaterial({
                color: 0xFFFFFF
            }));
            mesh.position.set(sep * item, 0, 0);
            group.add(mesh);
        })
        return group;
    }

    var g1 = getCylinder([0,1,2,3],.1, 2,1.5);
    g1.rotation.set(0, Math.PI / 2, 0);
    g1.position.set(1,3,19);

    var g2 = getCylinder([0,1,2,3,4,5,6,7],.054, 1,1);
    g2.rotation.set(0, Math.PI / 2 - 0.23, 0);
    g2.position.set(1.5,0,23);
    render();

    var g3 = getCylinder([0,1,2,3,4,5],.054, 1,1);
    g3.rotation.set(0, Math.PI / 2 + 0.15, 0);
    g3.position.set(8.5,0,19);
    render();
}