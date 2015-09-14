function doBuilding() {

    var buildingGroup = new THREE.Group();
    var d_building = [
        {width: 5, length: 5, coords: {x: -23, z: 0}, height: 10},
        {width: 5, length: 5, coords: {x: -23, z: 7}, height: 12},
        {width: 5, length: 5, coords: {x: -29,z: 7}, height: 9},
        {width: 5, length: 4, coords: {x: -40,z: 7}, height: 10},
        {width: 5, length: 8, coords: {x: 35,z: 0}, height: 10},
        {width: 5, length: 8, coords: {x: 35,z: 7}, height: 8},
        {width: 5, length: 7, coords: {x: 26,z: 0}, height: 6},
        {width: 5, length: 7, coords: {x: 26,z: 7}, height: 10},
        {width: 7, length: 8, coords: {x: 28,z: 23}, height: 5},
        {width: 7, length: 10, coords: {x: 38,z: 23}, height: 4},
        {width: 5, length: 8, coords: {x: -25,z: 17}, height: 6},
        {width: 5, length: 7, coords: {x: -17,z: 17}, height: 10},
        {width: 6, length: 8, coords: {x: -25,z: 24}, height: 5},
        {width: 6, length: 7, coords: {x: -15,z: 24}, height: 6}
    ];


    function Building(cube, length, width, height, coords) {
        this.cube = cube;
        this.length = length;
        this.width = width;
        this.height = height;
        this.coords = coords;
        this.currHeight = 1;
    }



    scene.add(buildingGroup);

    return new Promise(function(resolve, reject) {
        var plainY = 0;

        function init(collOfBuildings) {
            collOfBuildings.forEach(function(building, index){
                var texture = THREE.ImageUtils.loadTexture( "./img/brick.png" );
                var geometry = new THREE.BoxGeometry(building.length, 1, building.width);
                var material = new THREE.MeshPhongMaterial({map: texture});
                var cube = new THREE.Mesh(geometry, material);

                geometry.verticesNeedUpdate = true;
                cubeStore.push(new Building(cube, building.length, building.width, building.height, {
                    x: building.coords.x,
                    z: building.coords.z
                }));
                cube.castShadow = true;
                cube.receiveShadow = true;
                cube.position.set(building.coords.x, plainY, building.coords.z);
                buildingGroup.add(cube);


            });

            // tdg add
            (function() {
                var LAWN  = {};
                /**
                 * 创建草堆
                 * @param  {[array]} positions [每颗草的位置]
                 * @return {[object]}           [草堆]
                 */
                LAWN.createGrassTufts = function (positions) {
                    var geometry    = new THREE.PlaneGeometry(0.4, 0.2)
                    // .makeTranslation ( x, y, z )平移矩阵
                    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, geometry.parameters.height/4, 0 ) );

                    // normals 法线
                    geometry.faces.forEach(function(face){
                        face.vertexNormals.forEach(function(normal){
                            normal.set(0.0,1.0,0.0).normalize()
                        })
                    })

                    // create each tuft and merge their geometry for performance
                    var mergedGeo   = new THREE.Geometry();
                    for(var i = 0; i < positions.length; i++){
                        var position    = positions[i]
                        var baseAngle   = Math.PI*2*Math.random()

                        var nPlanes = 2
                        for(var j = 0; j < nPlanes; j++){
                            var angle   = baseAngle+j*Math.PI/nPlanes

                            // First plane
                            var object3d    = new THREE.Mesh(geometry, material);
                            object3d.rotateY(angle);
                            object3d.position.copy(position);
                            object3d.updateMatrix();
                            mergedGeo.merge(object3d.geometry, object3d.matrix);

                            // The other side of the plane
                            var object3d    = new THREE.Mesh(geometry, material);
                            object3d.rotateY(angle+Math.PI);
                            object3d.position.copy(position);
                            object3d.updateMatrix();
                            mergedGeo.merge(object3d.geometry, object3d.matrix);
                        }
                    }

                    var textureUrl  = 'img/grass01.png';
                    var texture = THREE.ImageUtils.loadTexture(textureUrl);
                    var material    = new THREE.MeshPhongMaterial({
                        map         : texture,
                        color     : 'grey',
                        emissive    : 'darkgreen',
                        alphaTest   : 0.7
                    })
                    var mesh    = new THREE.Mesh(mergedGeo, material);
                    return mesh;
                };

                LAWN.createGround = function (width, height) {
                    var textureUrl  = 'img/grasslight-small.jpg';
                    var texture = THREE.ImageUtils.loadTexture(textureUrl);

                    /*texture.wrapS   = THREE.RepeatWrapping;
                    texture.wrapT   = THREE.RepeatWrapping;
                    texture.repeat.x= 10;
                    texture.repeat.y= 10;
                    texture.anisotropy = renderer.getMaxAnisotropy();*/

                    var geometry    = new THREE.PlaneGeometry(width, height)
                    var material    = new THREE.MeshPhongMaterial({
                        map: texture,
                        emissive: 'green',
                    })
                    var mesh    = new THREE.Mesh(geometry, material);
                    mesh.rotateX(-Math.PI/2);
                    return mesh;
                };

                var grassGroup = new THREE.Group();

                // 草平面
                //grassGroup.add(LAWN.createGround(1,1));

                // 生成草堆，并控制位置
                function addTufts(n, url, width, height, posX, posZ, emissiveColor) {
                    var nTufts  = n;
                    var positions   = new Array(nTufts)
                    for(var i = 0; i < nTufts; i++){
                        var position    = new THREE.Vector3()
                        position.x  = (Math.random()-0.5)*width*Math.cos(Math.PI/2 * Math.random());
                        position.z  = (Math.random()-0.5)*height*Math.sin(Math.PI/2 * Math.random());
                        positions[i]    = position;
                    }
                    var mesh    = LAWN.createGrassTufts(positions);

                    // load the texture
                    var textureUrl      = url;
                    var material        = mesh.material;
                    material.map        = THREE.ImageUtils.loadTexture(textureUrl);
                    material.alphaTest  = 0.7;
                    if (emissiveColor) {
                        material.emissive = emissiveColor;
                    }

                    mesh.position.x = posX;
                    mesh.position.z = posZ;
                    grassGroup.add(mesh);
                }

                addTufts(1000, 'img/grass02.png', 3, 4, 1.5, -4);
                addTufts(500, 'img/grass02.png', 1, 1, 0, 5);
                addTufts(500, 'img/grass02.png', 1, 1, 5, 20);
                scene.add(grassGroup);
            })();

            // 蒙古大汉
            (function(){
                var manager = new THREE.LoadingManager();
                var loader = new THREE.OBJLoader( manager );

                loader.load( 'obj/blender.obj', function ( object ) {
                    // object.position.y = - 20;
                    scene.add( object );
                });
            })();

        }

        function animate() {
            var shouldNext = false;
            cubeStore.forEach(function(building, index) {
                //Á½¸öÔªËØX/YÖá·½ÏòÖØµþ
                var cube = building.cube;
                if (building.height > building.currHeight) {
                    building.currHeight += 0.2;
                    var geometries = cube.geometry.vertices;
                    geometries[0].y = geometries[1].y = geometries[4].y = geometries[5].y = building.currHeight;
                    shouldNext = true;
                    renderer.clear();
                }

                cube.geometry.verticesNeedUpdate = true;
            });
            if(shouldNext) {
                render();
                requestAnimationFrame(animate);
            }else{
                resolve();
            }
            stats.update();
        }

        init(d_building);
        animate();
    })
}
