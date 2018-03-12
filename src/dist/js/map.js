
/**
 * echart init*/
var mapChart = echarts.init(document.getElementById('mapJx'));


/**
 * 初始化变量*/
// 获取浙江地区的json文件
var uploadedDataURL = "../dist/json/zhejiang.json";
//浙江省坐标
var geoCoordMap = {
    '丽水市':[119.5642,28.1854],
    '杭州市':[119.5313,29.8773],
    '温州市':[120.498,27.8119],
    '宁波市':[121.5967,29.6466],
    '舟山市':[122.2559,30.2234],
    '台州市':[121.1353,28.6688],
    '金华市':[120.0037,29.1028],
    '衢州市':[118.6853,28.8666],
    '绍兴市':[120.564,29.7565],
    '嘉兴市':[120.9155,30.6354],
    '湖州市':[119.8608,30.7782]
};
//地图圆圈大小
var maxSize4Pin = 30, minSize4Pin = 3;
//地图json获取完成deffer
var mapDeffer = $.Deferred();


/**
 * 获取浙江省地图*/
$.getJSON(uploadedDataURL, function(geoJson) {
    echarts.registerMap('zhejiang', geoJson);
    mapDeffer.resolve();
});
/**
 * 更改地图ajax*/
changeMapAjax();
var mapList = {};
function changeMapAjax(code) {
    if( code && mapList[code]){
        renderMap(mapList[code]);
        return;
    }
    $('#loading-modal').show();
    setTimeout(function () {
        var res = {
            "code" : "0000",
            "msg" : "查询成功",
            "data" : {
                "list" : {
                    "total" : 4078739,
                    "shilist" : [ {
                        "number" : 674050,
                        "name" : "丽水市"
                    }, {
                        "number" : 188124,
                        "name" : "杭州市"
                    }, {
                        "number" : 174819,
                        "name" : "温州市"
                    }, {
                        "number" : 489514,
                        "name" : "宁波市"
                    }, {
                        "number" : 135096,
                        "name" : "舟山市"
                    }, {
                        "number" : 104239,
                        "name" : "台州市"
                    }, {
                        "number" : 758553,
                        "name" : "金华市"
                    }, {
                        "number" : 353740,
                        "name" : "衢州市"
                    }, {
                        "number" : 424487,
                        "name" : "绍兴市"
                    }, {
                        "number" : 268558,
                        "name" : "嘉兴市"
                    }, {
                        "number" : 488675,
                        "name" : "湖州市"
                    } ]
                }
            }
        };
        if(res.code == '0000' && res.data!=''){
            code = code?code:'all';
            mapList[code] = res.data.list;
            mapDeffer.then(function () {
                renderMap(res.data.list);
                $('#loading-modal').hide();
            });
        }else{
            console.error(res.msg)
        }
    },300)
}


/**
 *
 * 大地图*
 *
 * */
function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].number)
            });
        }
    }
    return res;
}
function renderMap(data1) {
    $('#provTotal').html(data1.total || '-');
    var data = data1.shilist;
    var max = 0, min = 0; // todo
    data.sort(function (a, b) {
        return b.number - a.number;
    });
    max = data[0].number;
    min = data[data.length-1].number;

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
                    return params.data.name + ' : ' + params.data.number +' 人';
                }else{
                    return params.data.name + ' : ' + params.data.value[2] +' 人';
                }
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                color:style.map_normal.mapBack
            }
        },
        geo: {
            show: true,
            map: 'zhejiang',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: style.map_normal.mapBack,
                    borderColor: style.map_normal.mapBorder
                },
                emphasis: {
                    areaColor:style.map_hover.mapBack,
                    borderColor: style.map_hover.mapBorder
                }
            }
        },
        series : [
            {//市
                name: 'credit_num',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    if(val[2]){
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = maxSize4Pin - a*max;
                        return a*val[2]+b;
                    }else{
                        return 4;
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: style.basic_color.basic2
                    }
                }
            },
            {//地图
                type: 'map',
                map: 'zhejiang',
                geoIndex: 0,
                animation: false,
                data: data
            },
            {
                name: 'has num',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    if (val[2]) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = maxSize4Pin - a * max;
                        return a * val[2] + b;
                    } else {
                        return 0;
                    }
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: style.basic_color.basic1,
                        shadowBlur: 10,
                        shadowColor: style.basic_color.basic1
                    }
                },
                zlevel: 1
            }
        ]
    };
    mapChart.setOption(option);
}

