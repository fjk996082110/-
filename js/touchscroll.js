/**
 *

 *
 *
 * @param outerSelector
 * @param innerSelector
 * @constructor
 *
 * 构造函数
 Touchscroll

 作用
 快速实现内容的可滑动, 并且有惯性移动, 边界回弹效果, 加滚动条

 使用示例
 new Touchscroll('#main', '#content');

 new Touchscroll('#main', '#content', {
    start: function(){},
    move: function(){},
    end: function(){},
    step: function(){}
  });


 依赖
 transformCSS.js
 tweenTransition.js
 */

function Touchscroll(outerSelector, innerSelector, callback) {
    //获取元素
    var main = document.querySelector(outerSelector);
    var content = main.querySelector(innerSelector);
    var isYueJie = false;
    var scrollBar = null;

    //绑定触摸开始事件
    main.addEventListener('touchstart', function (e) {
        //获取初始位置
        main.y = e.changedTouches[0].clientY;
        main.t = transformCSS(content, 'translateY');
        //当前的触摸时间
        main.startTime = Date.now();
        //清空定时器
        if (content.timer && content.timer.translateY) clearInterval(content.timer.translateY);
        if (scrollBar.timer && scrollBar.timer.translateY) clearInterval(scrollBar.timer.translateY);
        //阻止默认行为 防止产生菜单
        e.preventDefault();
        //执行用户的自定义回调
        if (callback && typeof callback === 'object' && typeof callback.start === 'function') callback.start();
    });

    //绑定触摸滑动事件
    main.addEventListener('touchmove', function (e) {
        //获取触摸滑动后的触点位置
        main._y = e.changedTouches[0].clientY;
        //计算新的 translateY 的值
        var translateY = main._y - main.y + main.t;
        //设置
        transformCSS(content, 'translateY', translateY);
        //移动滚动条的位置 scrollBar
        var ty = -transformCSS(content, 'translateY') / content.offsetHeight * main.offsetHeight;
        //设置
        transformCSS(scrollBar, 'translateY', ty);
        //执行用户的自定义回调
        if (callback && typeof callback === 'object' && typeof callback.move === 'function') callback.move();
    });

    //触摸结束事件
    main.addEventListener('touchend', function (e) {
        //获取当前元素的 translateY 的值
        var translateY = currentTranslateY = transformCSS(content, 'translateY');
        //计算位移差
        main._y = e.changedTouches[0].clientY;
        var disY = main._y - main.y;
        //计算时间差
        main.endTime = Date.now();
        var disTime = main.endTime - main.startTime;
        //计算速度
        var v = disY / disTime;
        //计算出额外的位移
        var s = v * 200;
        //计算最终的位置
        translateY += s;

        //检测边界
        if (translateY >= 0) {
            translateY = 0;
            isYueJie = true;
        }

        //下边边界
        var minTranslateY = -(content.offsetHeight - main.offsetHeight);
        if (translateY <= minTranslateY) {
            translateY = minTranslateY;
            isYueJie = true;

        }
        //如果 传递了 step 回调
        if (callback && typeof callback === 'object' && typeof callback.step === 'function') {
            tweenTransition(content, 'translateY', currentTranslateY, translateY, 500, 20, isYueJie ? 'back' : 'pinghua', callback.step);
        } else {
            tweenTransition(content, 'translateY', currentTranslateY, translateY, 500, 20, isYueJie ? 'back' : 'pinghua');
        }
        //获取当前的滚动条的位置
        var currentTy = transformCSS(scrollBar, 'translateY');
        //计算滚动条最终的位置
        var ty = -translateY / content.offsetHeight * main.offsetHeight;
        tweenTransition(scrollBar, 'translateY', currentTy, ty, 500, 20, isYueJie ? 'back' : 'pinghua');

        isYueJie = false;

        //执行用户的自定义回调
        if (callback && typeof callback === 'object' && typeof callback.end === 'function') callback.end();
    });

    //滚动条初始化操作
    function init() {
        //设定容器为相对定位
        main.style.position = 'relative';
        //创建一个滚动条
        scrollBar = document.createElement('div');
        //设定样式
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // width: 4px;
        // height: 100px;
        // background: rgba(0, 0, 0, 0.4);
        // border-radius: 2px;
        scrollBar.style.position = 'absolute';
        scrollBar.style.right = '0';
        scrollBar.style.top = '0';
        scrollBar.style.width = '4px';
        scrollBar.style.background = 'rgba(0,0,0,0.5)';
        scrollBar.style.borderRadius = '2px';
        setScrollBar();
        //将滚动条元素插入到容器中
        main.appendChild(scrollBar);
    }
    function setScrollBar() {
        //计算高度
        var h = main.offsetHeight / content.offsetHeight * main.offsetHeight;
        scrollBar.style.height = h + 'px';
    }
    init();
    //暴露函数
    this.setScrollBar=setScrollBar;
    
}