/**
 * Created by hx on 2017/9/7.
 */
//document.domain='test.mahai.hexun.com';
function lineIndex(_conId,_poolId,_type) {
    var _chart,
        //_url='http://test.mahai.hexun.com:8210/2017/huatu/data/data.json';
    _url='http://test.mahai.hexun.com:8210/lhjx/data/data.json';
    var _lineIndex={
        init:function(){
            _chart = new Highcharts.Chart({
                chart: {
                    spacingBottom: 3,
                    //marginTop:35,
                    margin:[35,0,20,0],
                    renderTo:_conId,
                    type: 'area',
                    events: {
                        load: _lineIndex.loadData // ͼ�������Ϻ�ִ�еĻص�����
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
                    text: '��������',

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
                    categories: ['ƻ��', '��', '����', '�㽶', '����', '����', '��ݮ', '��ݮ']
                },*/
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y+'%';
                    }
                },
                plotOptions: {
                    series: {
                        events: {
                            legendItemClick: function () {
                                return false;
                            }
                        },
                        animation:false,
                        showInLegend:false,
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
                    type:'line',
                    id:'poolYield',
                    name:'��������',
                    color:'#ffffff',
                },{
                    type:'line',
                    id:'sseYield',
                    name:'��ָ֤��',
                    color:'#ffff00'
                }],
                xAxis:
                    {
                        id: 'dateX',
                        tickWidth:0,
                        lineWidth:0,
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
                    labels: {
                        align:'left',
                        x:0,
                        formatter: function () {
                            return this.value;
                        },
                        style:{color:'#ffffff'},
                        formatter:function(){
                            return this.value+'%';
                        }
                    }
                },

                /*
                * [{
                 name: 'С��',
                 data: [0, 1, 4, 4, 5, 2, 3, 7]
                 }, {
                 name: 'С��',
                 data: [1, 0, 3, null, 3, 1, 2, 1]
                 }]
                *
                noData: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: '#303030'
                    }
                }
                */
            })
        },
        loadData:function(){
            console.log("_chart=",_chart,this)
            try{

                $.ajax({
                    url: _url+'?427432',
                    type: 'GET',     // �������ͣ����õ��� GET �� POST
                    dataType:'json',
                    data: {
                        // �������
                    },
                    success: function(_data) { // �ӿڵ��óɹ��ص�����
                        // data Ϊ���������ص�����
                        if ( $.isEmptyObject(_data) || !$.isArray(_data.data.poolYield)) {
                            _chart.setTitle(null, {text: "��������"});
                        }

                        var _tps=[],
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
                        _chart.get('dateX').update({tickPositions:_tps,
                            labels:{
                                formatter:function(){
                                 console.log("this.value=",this.value);
                                 return _date[this.value] || this._value;
                                 }
                            }});
                        _chart.setTitle({"text":_type?"��һ������������":"�ۼ�������",x:_chart.plotLeft-8},null);
                        _chart.get('sseYield').setData(_sseYield,false);
                        _chart.get('poolYield').setData(_poolYield,true);
                        _chart.get('poolYield').update({showInLegend:true})
                        _chart.get('sseYield').update({showInLegend:!_type});
                        _type?_chart.get('sseYield').hide():_chart.get('sseYield').show();

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
    var _poolId='00001',_type=1;
   new lineIndex('container',_poolId,_type);
});