/**
 * define config 4 color
 */
var style ={
    basic_color :{ //图表填充基础色
        basic1:'#00f7fa', //填充基础色一, 包含地图散点、第二产业配色, 默认色系亮绿
        basic2:'#1eafdf', //填充基础色二, 包含饼图第一产业配色, 默认色系浅蓝
        basic3:'#286ddf' //填充基础色三, 包含饼图第三产业配色, 默认色系深蓝
    },
    map_normal:{
        mapBack:'#153A4E', //右侧区块地图区块背景
        mapBorder:'#000' //右侧区块地图区块边框
    },
    map_hover :{

        mapBack:'#5E7C8B', //右侧区块地图区块背景 hover时
        mapBorder:'#fff' //右侧区块地图区块边框 hover时
    },
    small_title :'#03afe2' //右侧区块静态标题,包括三个饼图标题
};


function color_rgba(name,opacity) {  //基础色
    var basic_rgba = {
        basic1: 'rgba(0,247,250,' + opacity + ')',//色系亮绿
        basic2: 'rgba(30,175,223,' + opacity + ')',//色系浅蓝
        basic3: 'rgba(40,109,223,' + opacity + ')',//色系深蓝
        reactBack:'rgba(9,33,59,'+opacity+')'//柱状图条形图背景色
    };
    return basic_rgba[name];
}