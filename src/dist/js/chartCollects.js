/**
 * echart init*/
var cyfxChart = echarts.init(document.getElementById('cyfxChart'));//产业分析
var cyslChart = echarts.init(document.getElementById('cyslChart'));//产业数量
var cyslChart2 = echarts.init(document.getElementById('cyslChart2'));//产业数量
var jyl_kbzxtChart = window.echarts.init(document.getElementById('jyl_kbzxtChart'));//降雨量

/**
 * 初始化变量*/
var dycy=[],decy=[],dscy=[],cyNum;
var dhxOption;

function _init() {
    getDHXTOTALDATA(dhx_data);
    getCYDataFromInj(cy_data);
    heiShow(hei_data);
    get_kbzxtChart(jyl_data);
    get_nsnl_kblhxChart(three_data);
}


/**
 *
 * 行业门类
 *
 * */
function get_cyLegendData(){
    return [{
        name:'第一产业',
        textStyle: {color:style.basic_color.basic3}
    }, {
        name:'第二产业',
        textStyle: {color:style.basic_color.basic1}
    }, {
        name:'第三产业',
        textStyle: {color:style.basic_color.basic2}
    }]
}
function get_cyGroupData() {
    return cyNum.map(function(v,i){
        return {
            value: v.num,
            name: v.name,
            itemStyle: {normal: {color:v.color}},
            industryCode:v.industryCode
        }
    });
}
function get_cyDetailData(){
    var color = {
        '第一产业':style.basic_color.basic3,
        '第二产业':style.basic_color.basic1,
        '第三产业':style.basic_color.basic2
    };
    return dycy.concat(decy).concat(dscy).map(function (v,i) {
        return {
            value: v.num,
            name: v.name,
            itemStyle: {normal: {color:color[v.industry]}},
            industryphy:v.industryphy
        }
    })
}
/*渲染数据*/
function getCYDataFromInj(data) {
    var cy = data;
    var total = 0;
    var tenTotal=0;
    var dyNum = 0;
    var deNum = 0;
    var dsNum = 0;
    for(var j = 0;j< cy.length; j++){
        total += cy[j].num;
    }
    for(var i = 0;i < (cy.length>10?10:cy.length);i++){
        tenTotal += cy[i].num;
        if(cy[i].industry == '第一产业'){
            dyNum += cy[i].num;
            dycy.push(cy[i])
        }else if(cy[i].industry == '第二产业'){
            deNum += cy[i].num;
            decy.push(cy[i])
        }else{
            dsNum += cy[i].num;
            dscy.push(cy[i])
        }
    }
    var otherTotal = total - tenTotal;
    dsNum = dsNum + otherTotal;

    var tenCY = dycy.concat(decy).concat(dscy).sort(function (a,b) {
        return b.num - a.num;
    });
    dscy.push({
        name:'其它',
        num:otherTotal,
        industry:'第三产业'
    });
    otherTotal && tenCY.push({
        name:'其它',
        num:otherTotal,
        industry:'第三产业'
    });
    cyNum = [{
        name :'第一产业',
        num:dyNum,
        color:color_rgba('basic3',0.2)
    },{
        name :'第二产业',
        num:deNum,
        color:color_rgba('basic1',0.2)
    },{
        name :'第三产业',
        num:dsNum,
        color:color_rgba('basic2',0.2)
    }];

    $('.legend-mofang').html(tenCY.map(function (v,i) {
        return  '<div class="legend-click" style="height: 20px;" data-industryphy="'+ v.industryphy +'" data-name="'+ v.name+'"> ' +
            '<span class="ellipsis" title="'+v.name+'">' + (i+1) +'.' +  v.name + '</span> ' +
            '<span style="text-align: right">&nbsp;'+  v.num +'</span> ' +
            '</div>';
    }).join(''));

    var cyfxOption = {
        backgroundColor: 'transparent',
        textStyle:{
            fontSize: 12
        },
        tooltip: {
            show: true,
            formatter: '{b}:<br/>  {d}%'
        },
        legend: {
            top: "85%",
            left: "2%",
            itemWidth: 10,
            itemHeight:10,
            itemGap:10,
            selectedMode: false,
            select:false,
            data: get_cyLegendData()
        },

        series: [{
            name: '',
            type: 'pie',
            radius: ['35', '59'],
            center: ['30%', '48%'],
            label: {normal: {formatter: '{d}%  {b}', show:false}},
            hoverAnimation: true, //鼠标移入变大
            avoidLabelOverlap: true, ////是否启用防止标签重叠
            itemStyle: { //图形样式
                normal: {
                    borderColor: '#1e2239',
                    borderWidth: 1,
                    labelLine: {length: 20, length2: 25, smooth: 0, show: false}
                }
            },
            data: get_cyDetailData()
        },{
            name: '',
            type: 'pie',
            radius: ['57', '79'],
            center: ['30%', '48%'],
            label: {normal: {show: false}},
            silent:true,
            hoverAnimation: false, //鼠标移入变大
            data: get_cyGroupData()
        }]
    };
    cyfxChart.setOption(cyfxOption);
}



/**
 *
 * 波浪柱形图*
 *
 * */
function heiShow(data) {

    $('.hb-title-container.hei-title').each(function (index) {
        $(this).html(data[index].title);
    });
    $('.hei-num').each(function (index) {
        $(this).html(data[index].number);
    });
    $('.hb-chart').each(function (index) {
        $(this).data('code',data[index].code);
        $(this).data('name',data[index].title);
    });

    function dealLiqData(val) {
        if(val < 0.1){
            return val+0.1;
        }else{
            return val;
        }
    }
    var minliq = 8;
    if(data[0].percent <minliq || data[1].percent <minliq || data[2].percent <minliq ){
        data[0].percent = (data[0].percent + minliq)<=100 ? (data[0].percent + minliq):data[0].percent;
        data[1].percent = (data[1].percent + minliq)<=100 ? (data[1].percent + minliq):data[1].percent;
        data[2].percent = (data[2].percent + minliq)<=100 ? (data[2].percent + minliq):data[2].percent;
    }
    var containers = document.getElementsByClassName('hei');

    var options = [{
        series: [{
            type: 'liquidFill',
            data: [data[0].percent/100] ,
            shape: 'rect',
            radius:'200%',
            amplitude:'2%',
            waveLength:'20%',
            period: 800,
            animationDuration: 2000,
            color:[style.basic_color.basic2],
            backgroundStyle: {
                color:color_rgba('reactBack',0.4)
            },
            itemStyle:{
                normal:{
                    opacity:0.8
                }
            },
            label:{
                normal:{
                    show:false,
                    fontSize:12,
                    fontWeight:'normal',
                    color:'transparent',
                    insideColor:'transparent',
                    position:['50%','20%']
                }
            },
            outline: {
                show: false
            },
            waveAnimation: true // 禁止左右波动
        }]
    }, {
        series: [{
            type: 'liquidFill',
            data: [data[1].percent/100],
            shape: 'rect',
            radius:'200%',
            amplitude:'2%',
            waveLength:'20%',
            period: 1500,
            color:[style.basic_color.basic2],
            backgroundStyle: {
                color:color_rgba('rectBack',0.4)
            },
            itemStyle:{
                normal:{
                    opacity:0.8
                }
            },
            label:{
                normal:{
                    show:false,
                    fontSize:12,
                    fontWeight:'normal',
                    color:'transparent',
                    insideColor:'transparent',
                    position:['50%','20%']
                }
            },
            outline: {
                show: false
            },
            waveAnimation: true // 禁止左右波动
        }]
    },{
        series:[{
            type: 'liquidFill',
            data:  [data[2].percent/100],
            shape: 'rect',
            radius:'200%',
            amplitude:'2%',
            waveLength:'20%',
            period: 2000,
            color:[style.basic_color.basic2],
            backgroundStyle: {
                color:color_rgba('rectBack',0.4)
            },
            itemStyle:{
                normal:{
                    opacity:0.8
                }
            },
            label:{
                normal:{
                    show:false,
                    fontSize:12,
                    fontWeight:'normal',
                    color:'transparent',
                    insideColor:'transparent',
                    position:['50%','20%']
                }
            },
            outline: {
                show: false
            },
            waveAnimation: true // 禁止左右波动
        }]
    }];

    var charts = [];
    for (var i = 0; i < options.length; ++i) {
        var chart = echarts.init(containers[i]);
        chart.setOption(options[i]);
        charts.push(chart);
    }
}



/**
 *
 * 多环形*
 *
 * */
function getDHXTOTALDATA(data) {
    getData_dhx(cyslChart,'产业数量',data);
    getData_dhx(cyslChart2,'产业数量',data);
}
function getData_dhx(whichEcharts,title,data) {
    var dhx_title;
    var dhx_x_data =[];
    var dhx_y_data = [];
    function getDataFromInj() {
        dhx_title = title;
        var data1 = data.sort(function (a,b) {
            return b.percent - a.percent;
        });
        for(var i = 0;i < data1.length; i ++){
            dhx_x_data.push(data1[i].descrip);
            dhx_y_data.push(data1[i].percent.toFixed(2));
        }


        if(data.length == 0){
            dhx_y_data=['','','',''];
        }else if(data.length == 1){
            dhx_y_data = [dhx_y_data[0],'','','']
        }else if(data.length == 2){
            dhx_y_data = [dhx_y_data[0],dhx_y_data[1],'','']
        }else if(data.length == 3){
            dhx_y_data = [dhx_y_data[0],dhx_y_data[1],dhx_y_data[2],'']
        }

        function getData(percent,colorStyle) {
            return [{
                value: percent,
                name: percent,
                itemStyle: {
                    normal: {
                        color:colorStyle
                    }
                }
            }, {
                value: 100 - percent,
                itemStyle: {
                    normal: {
                        color: '#3d3d3c'
                    }
                }
            }];
        }
        var placeHolderStyle = {
            normal: {
                label: {show: false},
                labelLine: {show: false}
            }
        };
        dhxOption = {
            title: {
                text: dhx_title,
                top: '85%',
                left: '15%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: "normal",
                    color: style.small_title
                }
            },
            backgroundColor: 'transparent',
            color:[style.basic_color.basic2,style.basic_color.basic1,style.basic_color.basic2,style.basic_color.basic1],
            legend: {
                top: 7,
                left:54,
                itemWidth: 42,
                itemHeight:1,
                itemGap:1,
                data: dhx_x_data,
                textStyle:{
                    fontSize: 12,
                    color: [style.basic_color.basic2,style.basic_color.basic1,style.basic_color.basic2,style.basic_color.basic1]
                },
                formatter:function(name){
                    var oa = dhxOption.series;
                    for(var i = 0; i < dhxOption.series.length; i++){
                        if(name==oa[i].name){
                            return oa[i].data[0].value  + "%" + ': ' +name ;
                        }
                    }
                },
                selectedMode: false,
                orient: "vertical"

            },
            series: [{
                name: dhx_x_data[0],
                type: 'pie',
                silent:true,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [41, 51],
                center: ['30%', '45%'],
                itemStyle: placeHolderStyle,
                data: getData(dhx_y_data[0],style.basic_color.basic2)
            }, {
                name: dhx_x_data[1],
                type: 'pie',
                silent:true,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [30, 40],
                center: ['30%', '45%'],
                itemStyle: placeHolderStyle,
                data: getData(dhx_y_data[1],style.basic_color.basic1)
            }, {
                name: dhx_x_data[2],
                type: 'pie',
                silent:true,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [19, 29],
                center: ['30%', '45%'],
                itemStyle: placeHolderStyle,
                data: getData(dhx_y_data[2],style.basic_color.basic2)
            }, {
                name: dhx_x_data[3],
                type: 'pie',
                silent:true,
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [8, 18],
                center: ['30%', '45%'],
                itemStyle: placeHolderStyle,
                data: getData(dhx_y_data[3],style.basic_color.basic1)
            }]
        };
    }
    getDataFromInj();
    whichEcharts.setOption(dhxOption);


    whichEcharts.on('click', function (e) {
        // console.log(e.data.name);
    });

}



/**
 * 三个圈，map创建
 * */
$('#nsnl').html(new Array(3).join(',').split(',').map(function (v,i) {
    return '<div class="nsnlChart" id="nsnl'+ i +'"></div>';
}));
var nsnlCharts = [].map.call($('.nsnlChart'),function (v,i) {
    return window.echarts.init(document.getElementById(v.id));
});
/**
 * 三个圈，获取数据
 * */
function get_nsnl_kblhxChart(res) {
    if(res.data.listRe.length){
        var data = res.data.listRe;
        var dhx_x_data =[];
        var dhx_y_data = [];
        var dhx_total_value = 0;
        for(var i = 0;i < data.length; i ++){
            dhx_x_data.push(data[i].descrip);
            dhx_y_data.push(data[i].cnt);
            dhx_total_value +=data[i].cnt;
        }
        if(dhx_total_value  == 0){
            dhx_total_value=1;
        }
        function getData(value,colorStyle,fontColor) {
            return [{
                value: value,
                itemStyle: {
                    normal: {
                        color:colorStyle
                    }
                },
                label: {
                    normal: {
                        formatter:'{d}%',
                        position:'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: fontColor
                        }
                    }
                }
            }, {
                value: dhx_total_value - value,
                itemStyle: {
                    normal: {
                        color: '#3d3d3c'
                    }
                },
                label: {
                    normal: {
                        formatter:value+'家',
                        position:'center',
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'normal',
                            color: fontColor
                        }
                    }
                }
            }];
        }
        nsnlCharts.forEach(function (v,i) {
            var color = [style.basic_color.basic1,style.basic_color.basic2];
            v.setOption({
                backgroundColor: 'transparent',
                title: {
                    top:'65%',
                    left:'center',
                    text: dhx_x_data[i],
                    textStyle:{
                        fontSize: 12,
                        color: color[i%2]
                    }
                },
                series: [{
                    name: dhx_x_data[i],
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    radius: [29, 35],
                    center: ['50%', '35%'],
                    data: getData(dhx_y_data[i],color[i%2],'#fff')
                }]
            });
            v.on('mouseover',function () {
                v.setOption({
                    series:[{
                        data:getData(dhx_y_data[i], color[i % 2],'#fb8f44')
                    }]
                })
            });
            v.on('mouseout',function () {
                v.setOption({
                    series:[{
                        data:getData(dhx_y_data[i], color[i % 2],'#fff')
                    }]
                })
            });
        });

    }
}



/**
 * 折线图*
 * */

function get_kbzxtChart(data) {
    /**降雨量情况*/
    if(data.code == '0000'){
        if(data.data && data.data.length > 0) {
            var _kbzxt_x_data=[],_kbzxt_y_data1=[],_kbzxt_y_data2=[];
            var year = 2018;
            // var _kbzxtTitle = [data.data[1][0].year+'',data.data[0][0].year+''];
            var _kbzxtTitle = [year-1+'',year+''];

            for(var i = 0; i< data.data[0].length;i++){
                _kbzxt_y_data1.push(data.data[0][i].nowTax);
            }

            for(var i = 0; i< data.data[1].length;i++){
                _kbzxt_x_data.push(data.data[1][i].month+'月');
                _kbzxt_y_data2.push(data.data[1][i].lastTax);
            }

            var color =[style.basic_color.basic1,style.basic_color.basic2];
            var kbzxtChart = {
                backgroundColor:'transparent',
                color: color,
                tooltip: {
                    trigger:'axis'
                },
                type:'line',
                grid: {
                    left: '6%',
                    right: '5%',
                    top: '20%',
                    bottom: '10%',
                    containLabel: true
                },
                legend: {
                    top:'12%',
                    selectedMode: true,
                    show:true,
                    data: _kbzxtTitle,
                    textStyle:{
                        fontSize: 12,
                        color: color
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisTick:{show:true},
                    axisLine:{
                        show:true,
                        lineStyle:{color:'#ccc'}
                    },
                    axisLabel:{
                        textStyle:{color:'#fff'}
                    },

                    data:_kbzxt_x_data
                },
                yAxis: {
                    type:'value',
                    axisLine:{
                        show:true,
                        lineStyle:{color:'#ccc'}
                    },
                    axisLabel:{
                        textStyle:{color:'#fff'}
                    },
                    splitLine:{show: false}//网格线
                },
                series: [
                    {
                        name:_kbzxtTitle[0],
                        type:'line',
                        smooth:false,
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{offset: 0, color: color_rgba('basic1',0.4)},
                                        {offset: 0.2, color: color_rgba('basic1',0.3)},
                                        {offset: 0.3, color: color_rgba('basic1',0.2)},
                                        {offset: 0.8, color: color_rgba('basic1',0.05)},
                                        {offset: 1, color: color_rgba('basic1',0)}]
                                }
                            }
                        },

                        symbol: 'emptyCircle',
                        symbolSize:4,
                        showSymbol:false,
                        itemStyle: {
                            normal: {
                                color:color[0],
                                borderColor: color_rgba('basic1',0.2),
                                borderWidth: 15 // 标注边线线宽，单位px，默认为1
                            }
                        },

                        label: {
                            normal: {show: true, position: 'top'}//值显示
                        },
                        data:_kbzxt_y_data2
                    }, {
                        name:_kbzxtTitle[1],
                        type:'line',
                        smooth:false,
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{offset: 0, color: color_rgba('basic2',0.4)},
                                        {offset: 0.2, color: color_rgba('basic2',0.3)},
                                        {offset: 0.3, color: color_rgba('basic2',0.2)},
                                        {offset: 0.8, color: color_rgba('basic2',0.05)},
                                        {offset: 1, color: color_rgba('basic2',0)}]
                                }
                            }
                        },

                        symbol: 'emptyCircle',
                        symbolSize:4,
                        showSymbol:false,
                        itemStyle: {
                            normal: {
                                color:color[1],
                                borderColor: color_rgba('basic2',0.2),
                                borderWidth: 15 // 标注边线线宽，单位px，默认为1
                            }
                        },
                        label: {
                            normal: {show: true, position: 'top'}//值显示
                        },
                        data:_kbzxt_y_data1
                    }
                ]
            };
            jyl_kbzxtChart.setOption(kbzxtChart);
        }
    }
}


_init();