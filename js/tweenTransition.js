(function (w) {
    /**
     *
     * @param node
     * @param style
     * @param init
     * @param end
     * @param duration
     * @param time
     * @param type
     * @param callback
     *
     * tweenTransition(box, 'translateX', 0, 500, 2000, 20, 'linear', function(){console.log(22)});
     */
    function tweenTransition(node, style, init, end, duration, time, type = 'linear', callback) {
        //过渡类型函数
        var tween = {
            linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            back: function (t, b, c, d, s) {
                if (s == undefined) s = 2;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            pinghua: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            }
        };

        //参数初始化
        var t = 0;
        var b = init;
        var c = end - init;
        var d = duration;
        /**
         * node.timer.left
         * node.timer.width
         * node.timer.rotate
         * @type {number}
         */
        //定时器对象属性的初始化
        if (node.timer === undefined) {
            node.timer = {};
        }
        node.timer[style] = setInterval(function () {
            //1. 定时器处理
            if (t >= d) {
                clearInterval(node.timer[style]);
                return;
            }
            //2. 时间自增
            t += time;
            //3. 计算
            var res = tween[type](t, b, c, d);
            //4. 样式设置  tweenTransition(box, 'left', 200, 500, 2000, 20);
            switch (style) {
                case 'width':
                case 'height':
                case 'left':
                case 'top':
                case 'right':
                case 'bottom':
                    node.style[style] = res + 'px';
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    transformCSS(node, style, res);
                    break;

                case 'opacity':
                    node.style[style] = res;
                    break;

                default:
                    node.style[style] = res + 'px';
                    break;
            }
            //执行用户的自定义回调
            if(typeof callback === 'function') callback();
        }, time);
    }

    w.tweenTransition = tweenTransition;

})(window);