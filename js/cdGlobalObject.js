/**
 * Created by MH on 2017/9/19.
 */


(function(_self){
    var _global={
        apiList:{//[测试域名,正式域名]
            //
            tgApiHost:['http://test.tgapi.tg.hexun.com/','http://tgapi.tg.hexun.com/'],
            //课程相关接口域名:我的课程,我的订单
            lessonHost:['http://test.apilesson.hexun.com/','http://apilesson.hexun.com/'],
            //财道相关接口域名:推荐,订阅,动态,收藏
            caiDaoHost:['http://test.apicaidao.hexun.com/','http://apicaidao.hexun.com/'],

        }
        ,hostList:{//公用静态资源域名地址
            css:['http://test.caidao.hexun.com/','http://imgcd.hexun.com/']////静态css文件,
            ,js:['http://test.caidao.hexun.com/','http://imgcd.hexun.com/']////静态js文件,
            ,img:['http://test.caidao.hexun.com/','http://imgcd.hexun.com/']////静态图片文件
        }
        //区分环境
        ,setHost:function() {
            var _host = window.location.host, _hostName = window.location.hostname
                ,_isTest=_host.match('test.') || _host.match('172.0') || _host.replace(/\s*/ig,'')==''
                ,_key;
            for(_key in _global.apiList){
                _global.apiList[_key]=_global.apiList[_key][_isTest?0:1];
            }
            for(_key in _global.hostList){
                _global.hostList[_key]=_global.hostList[_isTest?0:1];
            }
        }

        //获取url参数
        ,urlParams:{}
        ,setQuery:function(){
            var paramsUrl = location.search;
            paramsUrl.replace(
                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                function ($0, $1, $2, $3) {
                    _global.urlParams[$1] = $3;
                }
            );

        }
    }
    _global.setHost();
    _global.setQuery();
    _self.ApiHostGlobal=_global;
})(window);