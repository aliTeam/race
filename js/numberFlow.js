
function doNumberFlow (result) {

    var total = 1000;
    var xOffset = 50;

    return new Promise( function (resolve, reject) {

        var textArray = [];
        var textGeo = [];

        function initLetter() {

            var height = 0.005,
                size = 0.2,
                font = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
                weight = "normal", // normal bold
                style = "normal"; // normal italic
            var lettersCol = ['0', '1'];
            var tempTextGeo;
            for (var i = 0; i < lettersCol.length; i++) {
                tempTextGeo = new THREE.TextGeometry( lettersCol[i], {
                    size: size,
                    height: height,
                    font: font,
                    weight: weight,
                    style: style
                });
                textGeo.push(tempTextGeo);
            }
            for (i = 0; i < result.length; i++) {
                var temp = result[i];
                initText(temp.position);
            }

            var renderModel = new THREE.RenderPass( scene, camera );
            var effectBloom = new THREE.BloomPass( 1.3 );
            var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

            effectCopy.renderToScreen = true;

            composer = new THREE.EffectComposer( renderer );

            composer.addPass( renderModel );
            composer.addPass( effectBloom );
            composer.addPass( effectCopy );
        }

        function initText(position) {

            var material = new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );
            textMesh1 = new THREE.Mesh( textGeo[Math.round(Math.random())], material);
            textMesh1.position.x = position.x;
            textMesh1.position.y = position.y;
            textMesh1.position.z = position.z;
            scene.add(textMesh1);
            textArray.push(textMesh1);

        }


        function startComposer() {
            var renderModel = new THREE.RenderPass( scene, camera );
            var effectBloom = new THREE.BloomPass( 1.3 );
            var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

            //effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );

            var width = window.innerWidth || 2;
            var height = window.innerHeight || 2;

            //effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );

            effectCopy.renderToScreen = true;

            composer = new THREE.EffectComposer( renderer );

            composer.addPass( renderModel );
            //composer.addPass( effectFXAA );
            composer.addPass( effectBloom );
            composer.addPass( effectCopy );
        }

        //ִ��
        var bgn, end;
        var startTime, currentTime;
        function threeStart() {
            initLetter();
            getRate();
            getGroup();
            startTime = new Date();
            startComposer();
            animateFall();
        }

        var rateArray = [];
        function getRate () {
            var group = Math.floor(total/xOffset);
            for (var i = 0; i < group; i++) {
                rateArray.push(Math.ceil(Math.random()*4 + 5));
            }
        }

        var groupArray = [];
        function getGroup() {

            var group = Math.floor(total/xOffset);
            var start, end, tempArray;
            for (var i = 0; i < group; i++) {
                start = i*xOffset;
                end = (i + 1)*xOffset;
                tempArray = [];
                for (var j = start; j < end; j++) {
                    tempArray.push(textArray[j]);
                }
                groupArray.push(tempArray);
            }

        }

        function render_inside() {
            //render();
            renderer.clear();
            //composer.render();
            render(composer);
            //render();
        }

        var greyItem = 0;
        var dY = 5, cY = 0;
        function animateFall() {

            for (var i = 0; i < groupArray.length; i++) {

                for (var j = 0; j < groupArray[i].length; j++) {
                    groupArray[i][j].position.y -= rateArray[i]*0.03;
                }
            }

            currentTime = new Date();
            if ((currentTime - startTime) < 4000) {
                stats.update();
                //renderer.render( scene, camera )
                /*if(cY < dY) {
                 cY += 0.05;
                 camera.lookAt({
                 x: 0,
                 y: cY,
                 z: 0
                 });
                 }*/

                requestAnimationFrame( animateFall );
                render_inside();
            } else {
                resolve();
            }

        }

        threeStart();
    });

}
