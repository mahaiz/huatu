/**
 * Created by hx on 2017/9/7.
 */
//document.domain='test.mahai.hexun.com';
function lineIndex(_conId,_url,_poolId,_type,_isHome) {
    var _chart;
        //_url='http://test.mahai.hexun.com:8210/2017/huatu/data/data.json';
    //_url='http://test.mahai.hexun.com:8210/lhjx/data/data.json';
    var _lineIndex={
        loaded:false,
        init:function(){
            _chart = new Highcharts.Chart({
                chart: {
                    spacingBottom: 3,
                    //marginTop:35,
                    margin:[_isHome?5:35,10,20,10],
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
                        //console.log('legend:',this)
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

                    enableMouseTracking:false,
                    //linecap:"line",
                    //zoneAxis:'x',
                    zIndex:0
                },{
                    type:'line',
                    id:'sseYield',
                    enableMouseTracking:false,
                    name:'上证指数',
                    color:'#ffff00',
                    zIndex:1
                }/*,{
                    type:'column',
                    id:'homeY',
                    color:'#ff3c4c',
                    threshold:null,
                    borderWidth:0,
                    pointWidth: 1.5,
                    showInLegend:false,
                    visible:_isHome,
                    zIndex:2,
                    enableMouseTracking:false
                }*/],
                xAxis:
                    {
                        id: 'dateX',
                        tickWidth:0,
                        lineWidth:0,
                        endOnTick: true,
                        //gridLineWidth:1,
                        labels:{
                            //y:-20,
                            style:{
                                color:'#ffffff',
                                fontSize:'11px'
                            },
                            /*formatter:function(){
                                console.log("this.value=",this.value);
                                //return
                            }*/
                            //enabled:false
                        },
                        //opposite:true,
                        //startOnTick: true,
                        //type:'datetime',
                        showLastLabel: true
                    }
                    ,
                yAxis: {
                    id: 'axis_Y',
                    lineWidth:0,
                    title: {
                        //text: 'Y-Axis'
                        enabled:false
                    },
                    //showFirstLabel:false,
                    //showLastLabel:false,
                    gridLineWidth:0,
                    //showEmpty:true,
                    endOnTick:true,
                    startOnTick:true,
                    //tickPositioner:null,
                    labels: {
                        align:'left',
                        x:0,
                        style:{color:'#ffffff'},
                        formatter:function(){//
                            return _isHome?'':this.value.toFixed(2)+'%';
                        }
                    }
                },

            })
        },
        loadData:function(__chart){
            //console.log("_chart0=",__chart,this)
            if(_lineIndex.loaded)return ;
            try{

                $.ajax({
                    url: _url+'/'+_poolId+'/'+_type,//+'?'+(new Date()).getTime(),//
                    type: 'GET',     // 请求类型，常用的有 GET 和 POST
                    dataType:'json',
                    data: {
                        // 请求参数
                    },
                    success: function(_data) { // 接口调用成功回调函数
                        // data 为服务器返回的数据
                        //console.log("parseFloat(_data.result)=",parseFloat(_data.result))
                        if ( $.isEmptyObject(_data) || parseFloat(_data.result)!=1 || !$.isArray(_data.data.poolYield)) {
                            _chart.setTitle(null, {text: ""});
                            _data.data={
                                "poolYield": [],
                                "sseYield": [],
                                "date": []
                            };
                        }
                        _lineIndex.loaded=true;
                        //_data.data={};
                        var _tps=[],_min= 0,_poolYield0=[],_max=0,_min=0,_ys=[],_diff=0
                            _poolYield=$.isArray(_data.data.poolYield)?$.map(_data.data.poolYield,function(_item){
                            return parseFloat(_item);
                        }).reverse():[0],
                            _sseYield=$.isArray(_data.data.sseYield)?$.map(_data.data.sseYield,function(_item){
                            return parseFloat(_item);
                        }).reverse():[0],
                            _date=$.isArray(_data.data.date)?$.map(_data.data.date,function(_item,_i){
                                _tps.push(_i);
                                return _item.substr(4,2)+(_isHome?'-':'/')+_item.substr(6,2);
                            }).reverse():[0,1,2,3,4,5,6,7];

                        console.log('_sseYield=',_sseYield)
                        if(_poolYield.length<=1){
                            _max=0.5;
                            _min=-0.5;
                        }else{
                            _max=Math.max.apply({},_poolYield);
                            _min=Math.min.apply({},_poolYield);
                        }

                        if(!_isHome && _sseYield.length>0){
                            _max=Math.max(_max,Math.max.apply({},_sseYield));
                            _min=Math.min(_min,Math.min.apply({},_sseYield));
                            //console.log('_sseYield:max,min=',_max,_min,_sseYield)
                        }
                        if(_min<0)_max=Math.max(_max,Math.abs(_min));

                        console.log('max,min=',_max,_min)
                        _diff=(_max-(_min))/3;
                        console.log("_diff=",_diff)
                        _ys.push(0);
                        while (_ys[_ys.length-1]<_max){
                            _ys.push(_ys[_ys.length-1]+_diff);
                        }
                        while (_ys[0]>_min){
                            _ys.unshift(_ys[0]-_diff);
                        }
                        //console.log('ys=',_ys)
                        _poolYield0= $.map(_poolYield,function(_item){
                            return _item-0.2;
                        });
                        _chart.update({tooltip: {
                            formatter: function () {
                                return _date[this.x];//_isHome?this.x:_date[this.x];
                                /*return '<b>' + this.series.name + '</b><br/>' +
                                    (_isHome?this.x:_date[this.x]) + ': ' + this.y+'%';*/
                            }
                        },})
                        _chart.get('axis_Y').update({tickPositions:_ys});
                        //console.log('_tps=',_tps)
                        _chart.get('dateX').update($.extend({},{visible:!_isHome,tickPositions:_tps,
                            labels:{
                                formatter:function(){
                                 return _date[this.value] || this._value;
                                 }
                            }},{lineWidth:_poolYield.length<=0?1:0}));
                        _chart.setTitle(_isHome?null:{"text":_type?"近一个月收益走势":"累计总收益",x:_chart.plotLeft-8},null);
                        _chart.get('sseYield').setData(_sseYield,false);
                        //_isHome?_chart.get('homeY').setData(_poolYield0,false):_chart.get('homeY').remove();
                        _chart.get('poolYield').setData(_poolYield,true);
                        _chart.get('poolYield').update({showInLegend:!_isHome});
                        _chart.get('sseYield').update({showInLegend:!_isHome});
                        _isHome?_chart.get('sseYield').hide():_chart.get('sseYield').show();
                        var _p=_chart.get('poolYield').data;
                        //console.log('_p=',_p)
                        var _point,_text,_box;
                        if(_isHome && _p.length>0){
                            $.each(_p,function(_i,_point){
                                console.log('_point=',_point);
                                if(_i<=0)return true;
                                _chart.renderer.rect(
                                    _point.plotX + _chart.plotLeft-.05 ,
                                    _point.plotY + _chart.plotTop+2 ,
                                    1.5,
                                    _chart.plotHeight-_point.plotY
                                ).attr({
                                    'stroke-width': 0,
                                    stroke: 'red',
                                    fill: '#ff3c4c',
                                    zIndex: 5
                                }).add();
                            });
                            _point=_p[_p.length-1];
                            _text=_chart.renderer.text(
                                _date[_tps.length-1] ,
                                _point.plotX + _chart.plotLeft -45 ,
                                _point.plotY + _chart.plotTop + 15
                            ).css({
                                color: '#ee5050',
                                align: 'center',
                                'height':'10px'
                            }).attr({

                                zIndex: 7
                            }).add();
                            _box = _text.getBBox();
                            _chart.renderer.rect(_box.x - 9, _box.y - 3, _box.width + 18, _box.height + 6, 10)
                                .attr({
                                    fill: 'rgba(255, 255, 255, 0.95)',
                                    stroke: 'gray',
                                    'stroke-width': 0,
                                    zIndex: 6
                                })
                                .add();
                            /*_chart.renderer.label(_date[_tps.length-1] ,
                                    _point.plotX + _chart.plotLeft -50 ,
                                    _point.plotY + _chart.plotTop + 5,'rect',
                                    _point.plotX + _chart.plotLeft,
                                    _point.plotY + _chart.plotTop)
                                .css({
                                    color: '#ee5050',
                                    align: 'center',
                                    'height':'10px'
                                })
                                .attr({
                                    fill: 'rgba(255, 255, 255, 0.95)',
                                    padding: 8,
                                    r: 15,
                                    zIndex: 6
                                })
                                .add();*/
                        }

                        //if(_sseYield.length>1)_chart.tooltip.refresh(_p[_p.length-1],new Event("mouseOver"))
                        $('#'+_conId).on('mouseout mouseover',function(e){
                            //console.log('鼠标移动')
                            e.preventDefault();
                            e.stopPropagation();
                        })
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