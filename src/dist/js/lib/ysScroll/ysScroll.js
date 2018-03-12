/**
 * Created by 2087 on 2017/11/13.
 * 依赖jQuery
 * 支持版本 IE9+,CHROME50+
 * 使用实例
 *  var scroll = new YsScroll({
 *      id: String, //必需参数，需要滚动的容器id
 *      data:Array, //非必需参数，如果需要组件渲染数据，传入数据
 *       renderItem:function (item,index) {
 *           return htmlString;
 *       }, //单列数据渲染函数，如data不为空，则必需传入该函数
 *       pageNum: Number, //非必需参数， 单页显示的条数
 *       scrollBarHide: Booleans, //非必需参数， 滚动条是否隐藏，默认false
 *       preventHandScroll: Booleans, //非必需参数， 是否阻止手动滚动，默认false
 *       autoScroll: Booleans, //非必需参数， 是否可以自动滚动，默认false
 *       autoScrollSpeed: Number(s), //非必需参数， 自动滚动时单页速度，默认10
 *       autoScrollDelay: Number(ms) //非必需参数， 下次滚动的间隔，默认1000
 *       scrollBarStyle: StyleSheet //非必需参数， 滚动条容器样式，有默认样式
 *       scrollButtonStyle: StyleSheet //非必需参数， 滚动条样式，有默认样式
 *   });
 *   实例方法
 *   1. renderScrollHtml(data)
 *   根据新的数据重新渲染，并更新滚动条尺寸
 *   2. resize()
 *   当滚动容器尺寸发生变化或滚动容器内数据有增减，需调用resize()方法重新计算滚动条尺寸
 */

!function ($) {
    $('head').append('<style>.ys-scroll-item {display: -ms-flexbox;display: -webkit-flex;display: flex;-ms-flex-align: center;-webkit-align-items: center;align-items: center;}.ys-scroll-bar {height: 100%;width: 10px;position: absolute;top: 0;right: 0;background-color: #ddd;border-radius: 5px;}.ys-scroll-button {position: absolute;width: 100%;border-radius: 5px;background-color: #aaa;left: 0;top: 0;} </style>');
    var scrollData = {};
    function YsScroll(options) {
        var that = this;
        //必要参数判断
        if(!options.id || !$('#'+options.id).length) throw new Error('invalid id!');
        if(options.data && !$.isFunction(options.renderItem)) throw new Error('renderItem is not Function!');

        //生产随机id
        var rId = (function randomString(len) {
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }(12));
        this.rId = rId;
        //创建变量仓库
        scrollData[rId] = {};
        var $obj = $('#'+options.id).css('overflow','hidden').addClass('ys-scroll-container');

        this.renderScrollHtml = function(data) {
            var oh = $obj.height(),ow = $obj.width(),ih = options.pageNum?oh/(options.pageNum):0;
            scrollData[rId] = {
                $obj:$obj,
                oh:oh,
                ow:ow,
                ih:ih
            };
            if(options.data && options.data.length){
                $obj.html('<div class="ys-scroll-outer" style="height: 100%;width: '+ (ow+20) +'px;overflow-y: '+ (options.preventHandScroll?'hidden':'auto') +';padding-right: 20px" id="'+ rId +'">'+ data.map(function (v,i) {
                        if(!ih) return options.renderItem(v,i);
                        return '<div style="height:'+ ih +'px" class="ys-scroll-item" id="'+ rId+i +'">'+ options.renderItem(v,i) + '</div>'
                    }).join('')+'</div>');
            } else {
                $obj.html('<div class="ys-scroll-outer" style="height: 100%;width: '+ (ow+20) +'px;overflow-y: '+ (options.preventHandScroll?'hidden':'auto') +';padding-right: 20px" id="'+ rId +'">'+$obj.html()+'</div>')
            }
            $obj.append('<div class="ys-scroll-bar" id="'+ rId +'Bar"><div data-id="'+ rId +'" style="transform: translate(0,0)" class="ys-scroll-button"></div></div>');

            var $s = $('#'+rId),$sB = $('#'+rId+'Bar'),$sb = $sB.find('.ys-scroll-button');
            var sh = $s.children('div:last').position().top + $s.children('div:last').height(),sbh = oh*oh/sh;
            (sh<=oh || options.scrollBarHide || options.preventHandScroll)?$sB.hide():$sB.show();
            $sb.height(sbh);
            options.scrollBarStyle && $sB.css(options.scrollBarStyle);
            options.scrollButtonStyle && $sb.css(options.scrollButtonStyle);
            $sB.off('click').on('click',function (e) {
                if(e.target.id){
                    var oY = e.offsetY;
                    var top = $(this).find('.ys-scroll-button').css('transform');
                    top = top.split(',')[top.split(',').length-1].split(')')[0]-0;
                    if(oY<top){
                        that.screenScroll(-1)
                    }else if(oY>top+$(this).find('.ys-scroll-button').height()){
                        that.screenScroll(1)
                    }
                }
            });

            scrollData[rId].$s = $s;scrollData[rId].$sb = $sb;scrollData[rId].$sB = $sB;scrollData[rId].sh = sh;scrollData[rId].sbh = sbh;

            $s.on('scroll',function (e) {
                barScroll(rId,$s.scrollTop());
            });
        };
        this.renderScrollHtml(options.data);

        this.resize = function () {
            var oh = $obj.height(),ow = $obj.width(),ih = options.pageNum?oh/(options.pageNum):0;
            var $s = $('#'+rId),$sB = $('#'+rId+'Bar'),$sb = $sB.find('.ys-scroll-button');
            $s.width(ow+20);
            var sh = $s.children('div:last').position().top + $s.children('div:last').height(),sbh = oh*oh/sh;
            (sh<=oh || options.scrollBarHide || options.preventHandScroll)?$sB.hide():$sB.show();
            $sb.height(sbh);
            scrollData[rId].$obj = $obj;scrollData[rId].oh = oh;scrollData[rId].ow = ow;scrollData[rId].ih = ih;
            scrollData[rId].sh = sh;scrollData[rId].sbh = sbh;
        };

        this.screenScroll = function (type) {
            var _top = scrollData[that.rId].$s.scrollTop()+type*scrollData[that.rId].oh;
            scrollData[that.rId].$s.animate({scrollTop:_top},100)
        };

        var lastPageY = 0;
        var lastTransT = 0;
        var lastId = null;

        $('body').on('mousemove',function (e) {
            if(e.which == 1 && lastId){
                var nt = lastTransT + e.pageY-lastPageY;
                if(nt < 0) nt = 0;
                if(nt > scrollData[lastId].oh - scrollData[lastId].sbh) nt = scrollData[lastId].oh-scrollData[lastId].sbh;
                scrollData[lastId].$sb.css('transform','translate(0,'+ nt +'px)');
                contentScroll(lastId,nt);
            }
        }).on('mousedown','.ys-scroll-button',function (e) {
            if(e.which == 1){
                var $this = $(this);
                lastId = $this.data('id');
                lastPageY = e.pageY;
                var ot = $this.css('transform');
                ot = ot.split(',')[ot.split(',').length-1].split(')')[0]-0;
                lastTransT = ot;
                document.onselectstart = function () {
                    return false;
                }
            }
        }).on('mouseup',function () {
            if(lastId) lastId = null;
            document.onselectstart = function () {}
        });

        function contentScroll(id,top) {
            var _st = (scrollData[id].sh - scrollData[id].oh)*top/(scrollData[id].oh-scrollData[id].sbh);
            scrollData[id].$s.scrollTop(_st);
        }

        function barScroll(id,st) {
            var _top = (scrollData[id].oh - scrollData[id].sbh)*st/(scrollData[id].sh - scrollData[id].oh);
            _top = _top<=(scrollData[id].oh - scrollData[id].sbh)?_top:(scrollData[id].oh - scrollData[id].sbh);
            scrollData[id].$sb.css('transform','translate(0,'+ _top +'px)');
        }

        this.autoScroll = function () {
            if(scrollData[that.rId].sh-scrollData[that.rId].oh<0) return;
            var speed = options.autoScrollSpeed || 10;
            var delay = options.autoScrollDelay || 200;

            scrollData[that.rId].$s.animate({scrollTop:(scrollData[that.rId].sh-scrollData[that.rId].oh)},speed*((scrollData[that.rId].sh-scrollData[that.rId].oh)/scrollData[that.rId].oh)*1000,'linear',function () {
                setTimeout(function () {
                    scrollData[that.rId].$s.scrollTop(0);
                },delay/2);
                setTimeout(function () {
                    that.autoScroll();
                },delay);
            });
        };

        if(options.autoScroll){
            this.autoScroll();
        }
    }
    window.YsScroll = YsScroll;
}(jQuery);

