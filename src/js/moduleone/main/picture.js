require(['backbone'], function(backbone) {

    var picModel = Backbone.Model.extend({
        defaults: {
            picCode: "",
            picDescription: "",
            picUrl: ""
        }
    });

    var picModels = [{
            picCode: "1",
            picDescription: "第一张",
            picUrl: "1.jpg"
        }, {
            picCode: "2",
            picDescription: "第二张",
            picUrl: "2.jpg"
        }, {
            picCode: "3",
            picDescription: "第三张",
            picUrl: "3.jpg"
        }, {
            picCode: "4",
            picDescription: "第四张",
            picUrl: "4.jpg"
        }, {
            picCode: "5",
            picDescription: "第五张",
            picUrl: "5.jpg"
        }, {
            picCode: "6",
            picDescription: "第六张",
            picUrl: "6.jpg"
        }, {
            picCode: "7",
            picDescription: "第七张",
            picUrl: "7.jpg"
        }, {
            picCode: "8",
            picDescription: "第八张",
            picUrl: "8.jpg"
        }, {
            picCode: "9",
            picDescription: "第九张",
            picUrl: "9.jpg"
        }, {
            picCode: "10",
            picDescription: "第十张",
            picUrl: "10.jpg"
        }, {
            picCode: "11",
            picDescription: "第十一张",
            picUrl: "11.jpg"
        }, {
            picCode: "12",
            picDescription: "第十二张",
            picUrl: "12.jpg"
        }, {
            picCode: "13",
            picDescription: "第十三张",
            picUrl: "13.jpg"
        }, {
            picCode: "14",
            picDescription: "第十四张",
            picUrl: "14.jpg"
        }, {
            picCode: "15",
            picDescription: "第十五张",
            picUrl: "15.jpg"
        }, {
            picCode: "16",
            picDescription: "第十六张",
            picUrl: "16.jpg"
        }, {
            picCode: "17",
            picDescription: "第十七张",
            picUrl: "17.jpg"
        }, {
            picCode: "18",
            picDescription: "第十八张",
            picUrl: "18.jpg"
        }, {
            picCode: "19",
            picDescription: "第十九张",
            picUrl: "19.jpg"
        }, {
            picCode: "20",
            picDescription: "第二十张",
            picUrl: "20.jpg"
        }, {
            picCode: "21",
            picDescription: "第二十一张",
            picUrl: "21.jpg"
        }, {
            picCode: "22",
            picDescription: "第二十二张",
            picUrl: "22.jpg"
        }, {
            picCode: "23",
            picDescription: "第二十三张",
            picUrl: "23.jpg"
        }, {
            picCode: "24",
            picDescription: "第二十四张",
            picUrl: "24.jpg"
        }, {
            picCode: "25",
            picDescription: "第二十五张",
            picUrl: "25.jpg"
        }, {
            picCode: "26",
            picDescription: "第二十六张",
            picUrl: "26.jpg"
        }, {
            picCode: "27",
            picDescription: "第二十七张",
            picUrl: "27.jpg"
        }, {
            picCode: "28",
            picDescription: "第二十八张",
            picUrl: "28.jpg"
        }, {
            picCode: "29",
            picDescription: "第二十九张",
            picUrl: "29.jpg"
        }, {
            picCode: "30",
            picDescription: "第三十张",
            picUrl: "30.jpg"
        }, {
            picCode: "31",
            picDescription: "第三十一张",
            picUrl: "31.jpg"
        }, {
            picCode: "32",
            picDescription: "第三十二张",
            picUrl: "32.jpg"
        }, {
            picCode: "33",
            picDescription: "第三十三张",
            picUrl: "33.jpg"
        }, {
            picCode: "34",
            picDescription: "第三十四张",
            picUrl: "34.jpg"
        }, {
            picCode: "35",
            picDescription: "第三十五张",
            picUrl: "35.jpg"
        }, {
            picCode: "36",
            picDescription: "第三十六张",
            picUrl: "36.jpg"
        }, {
            picCode: "37",
            picDescription: "第三十七张",
            picUrl: "37.jpg"
        }, {
            picCode: "38",
            picDescription: "第三十八张",
            picUrl: "38.jpg"
        }, {
            picCode: "39",
            picDescription: "第三十九张",
            picUrl: "39.jpg"
        }, {
            picCode: "40",
            picDescription: "第四十张",
            picUrl: "40.jpg"
        }, {
            picCode: "41",
            picDescription: "第四十一张",
            picUrl: "41.jpg"
        }, {
            picCode: "42",
            picDescription: "第四十二张",
            picUrl: "42.jpg"
        }, {
            picCode: "43",
            picDescription: "第四十三张",
            picUrl: "43.jpg"
        }, {
            picCode: "44",
            picDescription: "第四十四张",
            picUrl: "44.jpg"
        }, {
            picCode: "45",
            picDescription: "第四十五张",
            picUrl: "45.jpg"
        }, {
            picCode: "46",
            picDescription: "第四十六张",
            picUrl: "46.jpg"
        }, {
            picCode: "47",
            picDescription: "第四十七张",
            picUrl: "47.jpg"
        }, {
            picCode: "48",
            picDescription: "第四十八张",
            picUrl: "48.jpg"
        }

    ];


    var picCollection = Backbone.Collection.extend({
        model: picModel
    });

    var picC = new picCollection(picModels);

    var picView = Backbone.View.extend({
        el: '.container',
        initialize:function(){
        	this.adapt()
        	this.addEvent();
            this.render();
        },
        render: function() {
            var piclist = this.collection.models;

            for (var i = 0; i < piclist.length; i++) {
                this.el.innerHTML += "<section id='main_section'>" 
                + "<header id='header'><h2>"+piclist[i].get('picDescription')
                +"</h2></header>" +
                 "<img src='../../img/moduleone/" + piclist[i].get('picUrl') + "'>" + "</section>"
            }
        },
        addEvent:function(){
        	var $this=this;
        	$(window).on('resize',$this.adapt);
        },
        adapt:function(){
        	$('.container').width($(window).width());
        }
    });

    var picC = new picCollection(picModels);


    var picv = new picView({
        collection: picC
    });

    picv.render();
});
