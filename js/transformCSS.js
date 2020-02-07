/**
 函数名
 transformCSS

 作用
 * 设置元素的 transform 变形
 * 获取元素的 transform 变形样式值

 参数:
 * 元素对象
 * 变形样式的名称
 * 变形样式的样式值

 使用示例
 设置
 transformCSS(swiperWrapper, 'translateX', -375);
 transformCSS(swiperWrapper, 'rotate', 45);
 transformCSS(swiperWrapper, 'scale', 2);

 读取
 transformCSS(swiperWrapper, 'translateX');
 transformCSS(swiperWrapper, 'rotate');
 transformCSS(swiperWrapper, 'scale');

 */

function transformCSS(node, style, value) {
    //判断当前对象的仓库对象是否设置
    //示例 {translateX: 0, rotate: 45}
    if (node.store === undefined) {
        node.store = {
            translateZ:0
        };
    }


    //设置
    if (arguments.length === 3) {

        //将当前的信息 保存在对象中
        node.store[style] = value;
        // {translateX: 300, rotate: 45}   =>  translateX(300px) rotate(45deg)
        //空字符串
        var str = '';
        for (var i in node.store) {
            //判断样式单位
            switch (i) {
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    str += `${i}(${node.store[i]}px) `;
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                    str += `${i}(${node.store[i]}deg) `;
                    break;
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    str += `${i}(${node.store[i]}) `;
                    break;
            }
        }
        //设置元素的变形样式
        node.style.transform = str;
        /*
        switch (style) {
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                node.style.transform = `${style}(${value}px)`;
                break;

            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
                node.style.transform = `${style}(${value}deg)`;
                break;

            case 'scale':
            case 'scaleX':
            case 'scaleY':
            case 'scaleZ':
                node.style.transform = `${style}(${value})`;
                break;

        }
        */
    }

    //读取样式
    if (arguments.length === 2) {
        //判断 store 对象中是否存在当前获取的变形样式
        if (node.store[style] === undefined) {
            //判断样式是否为 scale 样式
            if (style.substr(0, 5) === 'scale') {
                return 1;
            } else {
                return 0;
            }
        } else {
            return node.store[style];
        }
    }
}

// transformCSS(swiperWrapper, 'translateX', 200);
// transformCSS(swiperWrapper, 'rotate', 200);
// transformCSS(swiperWrapper, 'scale', 200);







