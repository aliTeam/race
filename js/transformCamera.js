function transformCamera() {

    return new Promise(function(resolve, reject) {

        function getQ(start, end) {
            return end-start > 0
        }
        function getPartChange(start, end, duration, step) {
            return (end-start)/(duration/step)
        }

        function modifyCamera(destX, destY, destZ, time, callback) {

            var partY = getPartChange(camera.position.y, destY, time, 16.7),
                partX = getPartChange(camera.position.x, destX, time, 16.7),
                partZ = getPartChange(camera.position.z, destZ, time, 16.7);
            var qX = getQ(camera.position.x, destX),
                qY = getQ(camera.position.y, destY),
                qZ = getQ(camera.position.z, destZ);
            function transform() {
                var sign = false;
                if(qY ? destY > camera.position.y : destY < camera.position.y) {
                    camera.position.y += partY;
                    sign = true;
                }
                if(qX ? destX > camera.position.x : destX < camera.position.x) {
                    camera.position.x += partX;
                    sign = true;
                }
                if(qZ ? destZ > camera.position.z : destZ < camera.position.z) {
                    camera.position.z += partZ;
                    sign = true;
                }
                if(sign) {
                    camera.lookAt({
                        x: cameraX,
                        y: cameraY,
                        z: cameraZ
                    });
                    render()
                    requestAnimationFrame(transform)
                }else{
                    callback()
                }
            }
            transform();
        }

        modifyCamera(/*2, 2, -12, 10000,*/0.5, 2, 4, 7000,function(){
            /*modifyCamera(-2, 1, -6, 3000, function() {
                modifyCamera(2, 1, 5, 7000, function() {
                    resolve();
                });
            })*/resolve();
        });
    })
}
