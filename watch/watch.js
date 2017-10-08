(function () {
    var h, m, s;
    var start = function () {
        var canvas = document.getElementById('canvas-watch');
        var cxt = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var r = width / 2;
        var render = function () {
            cxt.clearRect(0, 0, width, height);
            cxt.save();
            cxt.translate(width / 2, height / 2);
            //外圆
            cxt.beginPath();
            cxt.lineWidth = r * 0.01;
            cxt.strokeStyle = '#333';
            cxt.arc(0, 0, r - r * 0.05, 0, 2 * Math.PI);
            cxt.stroke();
            cxt.closePath();
            //内圆
            cxt.beginPath();
            cxt.lineWidth = 1;
            var radi2 = r * 0.85;
            cxt.arc(0, 0, radi2, 0, 2 * Math.PI)
            cxt.stroke();
            cxt.closePath();
            var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            var i = 0;
            for (var deg = 0; deg < 360; deg = deg + 6) {
                var spotX = radi2 * Math.cos(deg * 2 * Math.PI / 360);
                var spotY = radi2 * Math.sin(deg * 2 * Math.PI / 360);
                //刻度半径
                var spot = r * 0.02;
                cxt.beginPath();
                cxt.fillStyle = '#ccc';
                if (deg % 30 == 0) {
                    cxt.fillStyle = '#333';
                    spot = r * 0.025;
                    var textX = (radi2 * 0.85) * Math.cos(deg * 2 * Math.PI / 360);
                    var textY = (radi2 * 0.85) * Math.sin(deg * 2 * Math.PI / 360);
                    cxt.font = r * 0.1 + "px Arial";
                    cxt.textBaseline = "middle";
                    cxt.textAlign = "center";
                    cxt.fillText(hours[i], textX, textY);
                    i++;
                }
                cxt.arc(spotX, spotY, spot, 0, 2 * Math.PI);
                cxt.fill();
                cxt.closePath();
            }
            cxt.beginPath();
            cxt.arc(0, 0, r * 0.05, 0, 2 * Math.PI);
            cxt.stroke();
            cxt.closePath();
        }
        var drawGuid = function () {
            var now = new Date();
            h = now.getHours();
            m = now.getMinutes();
            s = now.getSeconds();
            var drawHour = function (h, m) {
                h = h + m / 60;
                cxt.save();
                cxt.beginPath();
                cxt.rotate(2 * Math.PI / 12 * h);
                cxt.lineWidth = r * 0.05;
                cxt.lineCap = "round";
                cxt.moveTo(0, r * 0.4 * 0.2);
                cxt.lineTo(0, -r * 0.4 * 0.8);
                cxt.stroke();
                cxt.closePath();
                cxt.restore();
            }
            var drawMinute = function (m, s) {
                m = m + s / 60;
                cxt.save();
                cxt.beginPath();
                cxt.rotate(2 * Math.PI / 60 * m);
                cxt.lineWidth = 3;
                cxt.lineCap = "round";
                cxt.moveTo(0, r * 0.6 * 0.2);
                cxt.lineTo(0, -r * 0.6 * 0.8);
                cxt.stroke();
                cxt.closePath();
                cxt.restore();
            }
            var drawSecond = function (s) {
                cxt.save();
                cxt.beginPath();
                cxt.rotate(2 * Math.PI / 60 * s);
                cxt.strokeStyle = "#ff004f";
                cxt.lineWidth = 1;
                cxt.lineCap = "round";
                cxt.moveTo(0, r * 0.8 * 0.2);
                cxt.lineTo(0, -r * 0.8 * 0.8);
                cxt.stroke();
                cxt.closePath();
                cxt.restore();
            }
            drawHour(h, m);
            drawMinute(m, s);
            drawSecond(s);
        }
        setInterval(function () {
            render();
            drawGuid();
            cxt.restore();
        }, 30 / 1000)
    }
    start();
})()