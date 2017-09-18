/**
 * Created by hx on 2017/9/7.
 */
//document.domain='test.mahai.hexun.com';
function lineIndex(_conId,_url,_poolId,_type,_isHome) {
    var _chart;
        //_url='http://test.mahai.hexun.com:8210/2017/huatu/data/data.json';
    //_url='http://test.mahai.hexun.com:8210/lhjx/data/data.json';
    var _lineIndex={
        init:function(){
            _chart = new Highcharts.Chart({
                chart: {
                    spacingBottom: 3,
                    //marginTop:35,
                    margin:[35,10,20,0],
                    renderTo:_conId,
                    type: 'area',
                    events: {
                        load: _lineIndex.loadData // 图表加载完毕后执行的回调函数
                    },
                    backgroundColor:'rgba(0,0,0,0)',
                    style:{
                        color:'#ffffff'
                    }
                },
                title: {
                    style:{
                        color: '#FFFFFF',
                        fontSize: '12px'
                    },
                    text: '',

                    align: 'left',
                    // floating: true,
                    verticalAlign: 'top',
                    widthAdjust:-10,
                    //x:'0px',
                    y:3
                },
                subtitle: {
                    text: '',
                    floating: true,
                    align: 'center',
                    verticalAlign: 'middle',
                    useHTML:true
                    //y: 0
                },
                legend: {
                    layout: 'horizontal',//'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    squareSymbol:true,
                    itemStyle:{
                      fontSize:'12px',
                        "fontWeight": "",
                        color:'#ffffff'
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
                    symbolWidth:4,
                    symbolHeight:4,
                    userHTML:true
                },
                /*xAxis: {
                    categories: ['苹果', '梨', '橘子', '香蕉', '葡萄', '李子', '草莓', '树莓']
                },*/
                /*tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y+'%';
                    }
                },*/
                plotOptions: {
                    series: {
                        lineWidth:1,
                        events: {
                            legendItemClick: function () {
                                return false;
                            }
                        },
                        animation:false,
                        showInLegend:false,
                        states:{
                            hover:{
                                enabled:false
                            }
                        },
                        marker:{
                            enabled:false,
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
                    type:_isHome?'area':'line',
                    threshold:null,
                    fillOpacity:0.3,
                    id:'poolYield',
                    name:'总收益率',
                    color:"#ffffff",
                    softThreshold:false,
                    fillColor: {
                        linearGradient: [0, 0, 0, '100%'],
                        stops: [
                            [0.2, 'rgba(255 , 255 , 255,.5)'],
                            [0.9, 'rgba(255 , 255 , 255,0.01)']
                        ]
                    },
                    //linecap:"line",
                    zoneAxis:'x'
                },{
                    type:'line',
                    id:'sseYield',
                    name:'上证指数',
                    color:'#ffff00'
                },{
                    type:'line',
                    id:'dateX',
                    visible:false
                }],
                xAxis:
                    {
                        id: 'dateX',
                        tickWidth:0,
                        lineWidth:0,
                        //gridLineWidth:1,
                        labels:{
                            style:{color:'#ffffff'},
                            /*formatter:function(){
                                console.log("this.value=",this.value);
                                //return
                            }*/
                        },
                        //endOnTick:true,
                        //startOnTick: true,
                        //showLastLabel: true,
                    }
                    ,
                yAxis: {
                    title: {
                        //text: 'Y-Axis'
                        enabled:false
                    },
                    showFirstLabel:false,
                    gridLineWidth:0,
                    //showLastLabel:false,
                    endOnTick:false,
                    labels: {
                        align:'left',
                        x:0,
                        style:{color:'#ffffff'},
                        formatter:function(){//
                            return _isHome?'':this.value+'%';
                        }
                    }
                },

            })
        },
        loadData:function(){
            console.log("_chart=",_chart,this)
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
                        if ( $.isEmptyObject(_data) || !$.isArray(_data.data.poolYield)) {
                            _chart.setTitle(null, {text: "暂无数据"});
                        }

                        var _tps=[],_min= 0,_poolYield0=[],
                            _poolYield=$.isArray(_data.data.poolYield)?$.map(_data.data.poolYield,function(_item){
                            return parseFloat(_item);
                        }).reverse():[],
                            _sseYield=$.isArray(_data.data.sseYield)?$.map(_data.data.sseYield,function(_item){
                            return parseFloat(_item);
                        }).reverse():[],
                            _date=$.isArray(_data.data.date)?$.map(_data.data.date,function(_item,_i){
                                _tps.push(_i);
                                return _item.substr(4,2)+'/'+_item.substr(6,2);
                            }).reverse():[0,1,2,3,4,5,6,7];

                        /*$.each(_poolYield,function(_i,_item){
                         //console.log('_i,_item=',_i,_item);
                         _poolYield0.push({
                         value:_item,
                         color:'#ff0000'
                         })
                         });*/
                        //_min=Math.min.apply({},_poolYield);
                        //_poolYield0= $.map(_poolYield,function(_item){})
                        _chart.update({tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    (_isHome?this.x:_date[this.x]) + ': ' + this.y+'%';
                            }
                        },})
                        _chart.get('dateX').update(_isHome?{categories:_date,visible:false}:{tickPositions:_tps,
                            labels:{
                                formatter:function(){
                                 return _date[this.value] || this._value;
                                 }
                            }});
                        _chart.setTitle(_isHome?null:{"text":_type?"近一个月收益走势":"累计总收益",x:_chart.plotLeft-8},null);
                        _chart.get('sseYield').setData(_sseYield,false);
                        //_chart.get('dateX').setData(_date,false);
                        _chart.get('poolYield').setData(_poolYield,true);
                        _chart.get('poolYield').update({showInLegend:!_isHome});
                        _chart.get('sseYield').update({showInLegend:!_type&&!_isHome});
                        _type||_isHome?_chart.get('sseYield').hide():_chart.get('sseYield').show();

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