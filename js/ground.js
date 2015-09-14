function drawGround() {
    return new Promise(function(rs, rj){
        var texture2 = THREE.ImageUtils.loadTexture( "./img/bright_squares256.png" );
        texture2.anisotropy = 1;
        texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 512, 512 );
        //texture2.repeat.set( 400, 400 );

        var material2 = new THREE.MeshPhongMaterial({color: 0xFFFFFF, map: texture2});

        var ground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(100, 100),
            material2
        );
        ground.rotation.x = -Math.PI / 2;
        ground.scale.set(100, 100, 100);

        ground.castShadow = false;
        ground.receiveShadow = true;

        scene.add(ground);
        render();
        rs();
    })

}
