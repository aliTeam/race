var date = Date.now();
var mouseXOnMouseDown, targetRotation = 0;
var camera,
    container,
    renderer,
    scene,
    stats;
var theta = 0, radius = 50;
var cubeStore = [];
var views = [
{
    left: 0,
    bottom: 0,
    width: 0.5,
    height: 1,
    background: new THREE.Color().setRGB( 0.5, 0.5, 0.7 ),
    eye: [ 2, 10, 35 ],
    up: [ 0, 1, 0 ],
    fov: 30
},
{
    left: 0.5,
    bottom: 0,
    width: 0.5,
    height: 1,
    background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
    eye: [ 2, 10, 35 ],
    up: [ 0, 0, 1 ],
    fov: 45
}];

var cameraX = -1,
    cameraY = 0,
    cameraZ = -2;
var lr, ud, canControl = true;
var light;