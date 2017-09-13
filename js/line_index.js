/**
 * Created by hx on 2017/9/7.
 */
//document.domain='test.mahai.hexun.com';
function lineIndex() {
    var _chart,
        _url='http://test.mahai.hexun.com:8210/2017/huatu/data/data.json';
    var _lineIndex={
        init:function(){

            Highcharts.setOptions({
                lang: {
                    noData: '暂无数据'
                }
            });
            _chart = new Highcharts.Chart({
                chart: {
                    spacingBottom: 3,
                    marginTop:25,
                    renderTo: 'container',
                    type: 'area',
                    events: {
                        load: _lineIndex.loadData // 图表加载完毕后执行的回调函数
                    }
                },
                title: {
                    style:{
                        color: '#FF00FF',
                        fontSize: '12px'
                    },
                    text: '收益走势',

                    align: 'left',
                    // floating: true,
                    verticalAlign: 'top',
                    widthAdjust:-10,
                    //x:'0px',
                    y:0
                },
                /*subtitle: {
                    text: '总收益率',
                    floating: true,
                    align: 'right',
                    verticalAlign: 'top',
                    useHTML:true,
                    y: 0
                },*/
                legend: {
                    layout: 'horizontal',//'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    squareSymbol:true,
                    itemStyle:{
                      fontSize:'10px',
                        "fontWeight": ""
                    },
                    //enabled:false,
                    //itemMarginTop:10,
                    labelFormatter:function(_v){
                        console.log('legend:',this)
                        return "<span style='font-size: 36px;'>"+this.name+"</span>"
                    },
                    y: -15,
                    floating: true,
                    borderWidth: 0,
                    //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    symbolRadius:5,
                    symbolWidth:6,
                    symbolHeight:6,
                    userHTML:true
                },
                /*xAxis: {
                    categories: ['苹果', '梨', '橘子', '香蕉', '葡萄', '李子', '草莓', '树莓']
                },*/
                yAxis: {
                    title: {
                        //text: 'Y-Axis'
                        enabled:false
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                    }
                },
                plotOptions: {
                    series: {
                        events: {
                            legendItemClick: function () {
                                return false;
                            }
                        },
                        marker:{
                            //enabled:false,
                            states:{
                                hover:{
                                    enabled:false
                                }
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    type:'line',
                    id:'poolYield',
                    name:'总收益率',
                    color:'#ff0000',
                },{
                    type:'line',
                    id:'sseYield',
                    name:'上证指数',
                    color:'#00ff00'
                }],
                xAxis: [
                    {
                        id: 'dateX',
                        //visible: false
                    }
                    ],

                /*
                * [{
                 name: '小张',
                 data: [0, 1, 4, 4, 5, 2, 3, 7]
                 }, {
                 name: '小潘',
                 data: [1, 0, 3, null, 3, 1, 2, 1]
                 }]
                * */
                noData: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: '#303030'
                    }
                }

            })
        },
        loadData:function(){
            try{
                $.ajax({
                    url: _url+'?427432',
                    type: 'GET',     // 请求类型，常用的有 GET 和 POST
                    dataType:'json',
                    data: {
                        // 请求参数
                    },
                    success: function(_data) { // 接口调用成功回调函数
                        // data 为服务器返回的数据
                        console.log('data=',_data.data);
                        //return
                        var _poolYield=$.map(_data.data.poolYield,function(_item){
                            return parseFloat(_item);
                        }),_sseYield=$.map(_data.data.sseYield,function(_item){
                            return parseFloat(_item);
                        });
                        console.log('data=',_data.data.sseYield,_poolYield,_data.data.date);
                        _chart.get('dateX').update({categories:_data.data.date});
                        _chart.get('poolYield').setData(_poolYield,false);
                        _chart.get('poolYield').show();//.update({visible:false});
                        _chart.setTitle({"text":"总收益走势",x:_chart.plotLeft-8});
                        _chart.get('sseYield').setData(_sseYield,true);
                    }
                });
            } catch (_e){
                console.log('d:')
            }

        }
    };
    _lineIndex.init();
    return _lineIndex;
}
$(function () {
   new lineIndex('container');
});