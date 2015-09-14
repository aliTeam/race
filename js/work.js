/**
 * Created by lh100756 on 2015/7/28.
 */
onmessage = function () {
    var total = 1000;
    var xOffset = 50;
    var result = [];
    var group = Math.ceil(total/xOffset);

    var rainNum = [];

    for(var k = -1; k < 4;        k += 1) {
        var temp = [k, 0];
        rainNum.push(temp);

    }


    for(var k = -2; k < 5;        k += 1.432423) {
        var temp = [k, -2.5];
        rainNum.push(temp);

    }

    for(k = -3; k < 6;        k += 1) {
        var zSide;
        if (k%2 == 0) {
            zSide = -3.5;
        } else if (k%3 == 1) {
            zSide = -4
        } else{
            zSide = -5;
        }
        var temp = [k, zSide];
        rainNum.push(temp);

    }

    for(k = -3; k < 6;        k += 1) {
        var zSide;
        if (k%2 == 0) {
            zSide = -5.5;
        } else if (k%3 == 1) {
            zSide = -6
        } else{
            zSide = -7;
        }
        var temp = [k, zSide];
        rainNum.push(temp);

    }

    for (var j = 0; j < group; j++) {
        for(var i = 0; i < xOffset; i++) {
            position = {
                x: rainNum[j][0],
                y: i*0.3,
                z: rainNum[j][1]
            };
            result.push({
                position: position
            });
        }
    }
    postMessage(result);
};