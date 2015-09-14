function initViews() {
    views.forEach(function(view, index) {
        var camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 1000000 );
        camera.position.x = view.eye[ 0 ];
        camera.position.y = view.eye[ 1 ];
        camera.position.z = view.eye[ 2 ];
        camera.lookAt({
            x: cameraX,
            y: cameraY,
            z: cameraZ
        });
        view.camera = camera;
    })
}

function render(rer) {
    rer = rer || renderer;
    renderer.clear();
    views.forEach(function(view, index) {
        var left   = Math.floor( window.innerWidth  * view.left );
        var width  = Math.floor( window.innerWidth  * view.width );
        var height = Math.floor( window.innerHeight * view.height );

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setViewport( left, 0, width, height );
        renderer.render( scene, camera );
    })
}

function initGlobal() {
    scene = new THREE.Scene();
    var lightSurrounding = new THREE.AmbientLight(0x111);

    scene.add(lightSurrounding);

    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(2, 10, 20).normalize();
    light.castShadow = true;
    light.shadowCameraNear = 8;
    light.shadowCameraFar = 30;
    light.shadowDarkness = 0.5;
    light.shadowCameraVisible = true;
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;


    scene.add( light );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(6, 1, 26);
    camera.lookAt({
        x: cameraX,
        y: cameraY,
        z: cameraZ
    });
/*
    camera.lookAt({
        x: 2,
        y: 1.1,
        z: 22
    });*/
    renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setClearColor( 0x000000 );
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false
    //renderer = new THREE.WebGLRenderer({antialias: true});
    //renderer.setPixelRatio( window.devicePixelRatio );

    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    render()
}
