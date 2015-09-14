
function showLogo() {
    return new Promise( function (resolve, reject) {

        var group, totalGroup;
        function initGroup() {
            group = new THREE.Group();
            totalGroup = new THREE.Group();
            totalGroup.add(group);
            scene.add(totalGroup);
        }

        function addShape(shape, color, x, y, z, rx, ry, rz, sx, sy, sz) {
            var rx = rx || 0;
            var ry = ry || 0;
            var rz = rz || 0;
            var sx = sx || 1;
            var sy = sy || 1;
            var sz = rz || 1;
            var i;
            var layerNum = 4;
            var points = shape.createPointsGeometry();
            for (i = -layerNum; i < layerNum; i++) {
                var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
                line.position.set( x, y, z - 30 * i);
                line.rotation.set( rx, ry, rz );
                line.scale.set( sx, sy, sz );
                group.add( line );
            }
        }

        var W = 100;
        var H = 3*W;
        var D = W/3;

        // FrameShape
        var frameShape = new THREE.Shape();
        frameShape.moveTo(-W/2, -H/2 + D);
        frameShape.lineTo(-W/2, -H/2);
        frameShape.lineTo(-3*W/2, -H/2);
        frameShape.lineTo(-3*W/2, H/2);
        frameShape.lineTo(-W/2, H/2);
        frameShape.lineTo(-W/2, H/2 - D);
        frameShape.lineTo(-3*W/2 + D, H/2 - D);
        frameShape.lineTo(-3*W/2 + D, -H/2 + D);

        // Track
        var trackW = 2.6*W;
        var trackShape = new THREE.Shape();

        trackShape.moveTo( -trackW/2, 0);
        trackShape.lineTo( trackW/2, 0);
        // radius = 0.5D
        trackShape.absarc( trackW/2, -0.5*D, 0.5*D, Math.PI/2, -Math.PI/2, true );
        trackShape.lineTo( -trackW/2, -D);
        trackShape.absarc( -trackW/2, -0.5*D, 0.5*D, 3*Math.PI/2, Math.PI/2, true );

        // HalfEllipse
        var ellipseW = 1.5*W;
        var halfEllipseShape = new THREE.Shape();
        halfEllipseShape.moveTo( -ellipseW/2, 0);
        halfEllipseShape.absarc( 0, 0, ellipseW/2, -Math.PI, 0, true );

        var person, person2;
        function initLogoPerson() {
            var geometry = new THREE.PlaneBufferGeometry(558/666*200, 200);
            var texture = THREE.ImageUtils.loadTexture( "img/person.png" );
            texture.minFilter = THREE.NearestFilter;
            var material = new THREE.MeshBasicMaterial({map:texture, transparent: true});
            person = new THREE.Mesh(geometry, material);

            //person.position.set(-20, 0, 0);
            totalGroup.add(person);

            // 反面
            person2 = new THREE.Mesh(geometry, material);
            person2.rotation.y += Math.PI;
            totalGroup.add(person2);

        }

        function initLogoText() {
            var geometry = new THREE.PlaneBufferGeometry(663, 106);
            var texture = THREE.ImageUtils.loadTexture( "img/text.png" );
            texture.minFilter = THREE.NearestFilter;
            var material = new THREE.MeshBasicMaterial({map:texture, transparent: true});
            var text = new THREE.Mesh(geometry, material);
            text.position.set(0, -500, 0);
            totalGroup.add(text);

            // 反面
            var text2 = new THREE.Mesh(geometry, material);
            text2.position.set(0, -500, 0);
            text2.rotation.y += Math.PI;
            totalGroup.add(text2);
        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function render_dg() {
            // /group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
            var destinationY = 0;
            render();
            if (group.position.y < destinationY) {
                group.position.y += 5;
            } else if (group.position.y === destinationY) {
                initLogoPerson();
                initLogoText();
                group.position.y += 5;
            }
            group.rotation.y += Math.PI/90;

            requestAnimationFrame(render_dg);
        }
        function threeStart() {
            //initThree();
            //initCamera();
            //initScene();
            initGroup();
            addShape(frameShape, 0x00ff00, 0, 0, 0);
            addShape(frameShape, 0x00ff00, 0, 0, 0, 0, 0, Math.PI);
            addShape(trackShape, 0x00ff00, 0, -200, 0);
            addShape(trackShape, 0x00ff00, 0, -250, 0, 0, 0, 0, 0.8);
            addShape(halfEllipseShape, 0x00ff00, 0, -300, 0, 0);
            var xx=0.004;
            totalGroup.scale.set(xx,xx,xx);
            totalGroup.position.x = 0.2;
            totalGroup.position.y = 4;
            totalGroup.position.z = -4.5;
            totalGroup.rotation.y = Math.PI;
            group.position.y = -1000;
            render_dg();

            window.addEventListener( 'resize', onWindowResize, false );

        }

        threeStart();
    });
}
