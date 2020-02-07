/*
 * @Author: your name
 * @Date: 2020-01-15 20:19:57
 * @LastEditTime : 2020-01-15 20:25:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ShangGuiGu\Demo\练习\懒加载\缩放和旋转\gesture.js
 */
function gesture(node,callback) {
    node.addEventListener('touchstart', function (e) {
        if(e.touches.length>=2){
            callback && typeof callback==='object' && typeof callback.start==='function'&&callback.start();
        }
        e.preventDefault();
    });
    node.addEventListener('touchmove', function (e) {
        if(e.touches.length>=2){
            callback && typeof callback==='object'&&typeof callback.change==='function'&&callback.change();
        }
        e.preventDefault();
    });
    node.addEventListener('touchend', function (e) {
        if(e.touches.length>=2){
            callback && typeof callback==='object'&&typeof callback.end==='function'&&callback.end();
        }
        e.preventDefault();
    });
}
