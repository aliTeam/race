function loadTexture( path ) {

    var texture = new THREE.Texture( texture_placeholder );
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

    var image = new Image();
    image.onload = function () {

        texture.image = this;
        texture.needsUpdate = true;

    };
    image.src = path;

    return material;

}

function drawSky() {
    return new Promise(function(rs, rj){
        var mesh;

        texture_placeholder = document.createElement( 'canvas' );
        texture_placeholder.width = 128;
        texture_placeholder.height = 128;

        var context = texture_placeholder.getContext( '2d' );
        context.fillStyle = 'rgb( 200, 200, 200 )';
        context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

        /*loadTexture( 'img/skybox/px.jpg' ), // right
            loadTexture( 'img/skybox/ny.jpg' ), // bottom
            loadTexture( 'img/skybox/nx.jpg' ), // left
            loadTexture( 'img/skybox/py.jpg' ), // top
            loadTexture( 'img/skybox/pz.jpg' ), // back
            loadTexture( 'img/skybox/nz.jpg' )  // front*/
        var materials = [
            loadTexture( 'img/skybox/nx.jpg' ), // right
            loadTexture( 'img/skybox/ny.jpg' ), // bottom
            loadTexture( 'img/skybox/px.jpg' ), // left
            loadTexture( 'img/skybox/py.jpg' ), // top
            loadTexture( 'img/skybox/nz.jpg' ), // back
            loadTexture( 'img/skybox/pz.jpg' )  // front
        ];

        mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MeshFaceMaterial( materials ) );
        mesh.scale.x = - 1;
        scene.add( mesh );
        render();
        rs();
    });
}
