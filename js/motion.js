function bindMotion() {
    window.addEventListener("deviceorientation", orientationHandler, false);

    function orientationHandler(event) {
        if(!canControl) return canControl;
        if(!lr) lr = event.alpha;
        if(!ud) ud = event.gamma;

        var difflr, diffud;
        difflr = (event.alpha - lr) / 10;
        diffud = (event.gamma - ud) / 10;

        //cameraX += difflr;
        cameraY -= diffud;

        camera.lookAt({
            x: cameraX,
            y: cameraY,
            z: cameraZ
        });
        lr = event.alpha;
        ud = event.gamma;
        render();
    }
}
