var cyRes = {
    "code" : "0000",
    "mess" : "查询成功",
    "data" : [ {
        "name" : "批发和零售业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "F",
        "num" : 4157,
        "proportion" : 20.16
    }, {
        "name" : "农、林、牧、渔业",
        "industry" : "第一产业",
        "industryCode" : "1",
        "industryphy" : "A",
        "num" : 1856,
        "proportion" : 9.00
    }, {
        "name" : "租赁和商务服务业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "L",
        "num" : 1399,
        "proportion" : 6.78
    }, {
        "name" : "制造业",
        "industry" : "第二产业",
        "industryCode" : "2",
        "industryphy" : "C",
        "num" : 1385,
        "proportion" : 6.72
    }, {
        "name" : "交通运输、仓储和邮政业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "G",
        "num" : 1169,
        "proportion" : 5.67
    }, {
        "name" : "信息传输、软件和信息技术服务业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "I",
        "num" : 998,
        "proportion" : 4.84
    }, {
        "name" : "科学研究和技术服务业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "M",
        "num" : 897,
        "proportion" : 4.35
    }, {
        "name" : "住宿和餐饮业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "H",
        "num" : 637,
        "proportion" : 3.09
    }, {
        "name" : "居民服务、修理和其他服务业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "O",
        "num" : 457,
        "proportion" : 2.22
    }, {
        "name" : "建筑业",
        "industry" : "第二产业",
        "industryCode" : "2",
        "industryphy" : "E",
        "num" : 422,
        "proportion" : 2.05
    }, {
        "name" : "金融业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "J",
        "num" : 389,
        "proportion" : 1.89
    }, {
        "name" : "房地产业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "K",
        "num" : 319,
        "proportion" : 1.55
    }, {
        "name" : "文化、体育和娱乐业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "R",
        "num" : 170,
        "proportion" : 0.82
    }, {
        "name" : "卫生和社会工作",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "Q",
        "num" : 60,
        "proportion" : 0.29
    }, {
        "name" : "教育",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "P",
        "num" : 57,
        "proportion" : 0.28
    }, {
        "name" : "水利、环境和公共设施管理业",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "N",
        "num" : 38,
        "proportion" : 0.18
    }, {
        "name" : "电力、热力、燃气及水生产和供应业",
        "industry" : "第二产业",
        "industryCode" : "2",
        "industryphy" : "D",
        "num" : 12,
        "proportion" : 0.06
    }, {
        "name" : "国际组织",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "T",
        "num" : 5,
        "proportion" : 0.02
    }, {
        "name" : "公共管理、社会保障和社会组织",
        "industry" : "第三产业",
        "industryCode" : "3",
        "industryphy" : "S",
        "num" : 2,
        "proportion" : 0.01
    }, {
        "name" : "采矿业",
        "industry" : "第二产业",
        "industryCode" : "2",
        "industryphy" : "B",
        "num" : 1,
        "proportion" : 0.00
    } ]
};
var cy_data = cyRes.data;
var dhxRes={
    "code" : "0000",
    "mess" : "查询成功",
    "data" : [ {
        "num" : 12487,
        "descrip" : "第一产业",
        "percent" : 89.17
    }, {
        "num" : 1012,
        "descrip" : "第二产业",
        "percent" : 7.22
    }, {
        "num" : 504,
        "descrip" : "第三产业",
        "percent" : 3.59
    } ]
};
var dhx_data = dhxRes.data;

var heiRes = {
    "code" : "0000",
    "mess" : "查询成功",
    "data" : [{
        title:'第一产业',
        number:1200,
        percent:12
    },{
        title:'第二产业',
        number:4000,
        percent:40
    },{
        title:'第三产业',
        number:4800,
        percent:48
    }]
};
var hei_data= heiRes.data;

var jyl_data= {
    "code" : "0000",
    "mess" : "查询成功",
    "data" : [ [ {
        "month" : 1,
        "year" : 2016,
        "nowTax" : 5.0
    }, {
        "month" : 2,
        "year" : 2018,
        "nowTax" : 15.0
    }, {
        "month" : 3,
        "year" : 2018,
        "nowTax" : 50.0
    } ], [ {
        "month" : 1,
        "year" : 2017,
        "lastTax" : 0.1
    }, {
        "month" : 2,
        "year" : 2017,
        "lastTax" : 38.0
    }, {
        "month" : 3,
        "year" : 2017,
        "lastTax" : 42.0
    }, {
        "month" : 4,
        "year" : 2017,
        "lastTax" : 69.0
    }, {
        "month" : 5,
        "year" : 2017,
        "lastTax" : 49.0
    }, {
        "month" : 6,
        "year" : 2017,
        "lastTax" : 60.0
    }, {
        "month" : 7,
        "year" : 2017,
        "lastTax" : 59.0
    }, {
        "month" : 8,
        "year" : 2017,
        "lastTax" : 55.0
    }, {
        "month" : 9,
        "year" : 2017,
        "lastTax" : 69.0
    }, {
        "month" : 10,
        "year" : 2017,
        "lastTax" : 25.0
    }, {
        "month" : 11,
        "year" : 2017,
        "lastTax" : 18.0
    }, {
        "month" : 12,
        "year" : 2017,
        "lastTax" : 17.0
    } ]]
};

var three_data = {
    "success" : true,
    "openLoginForm" : null,
    "message" : "查询成功",
    "resUrl" : null,
    "data" : {
        "code" : "0001",
        "listRe" : [ {
            "descrip" : "第一产业",
            "cnt" : 12,
            "percent" : "0.12"
        }, {
            "descrip" : "第二产业",
            "cnt" : 10,
            "percent" : "0.10"
        }, {
            "descrip" : "第三产业",
            "cnt" : 78,
            "percent" : "0.78"
        } ]
    }
}