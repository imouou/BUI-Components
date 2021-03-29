loader.define(function(require, exports, module, global) {

    var pageview = {};

    // 主要业务初始化
    pageview.init = function() {
        // 获取最近的点
        window.map = new AMap.Map(`${module.id}`, {
            resizeEnable: true,
            zoom: 11,
            center: [116.397428, 39.90923]
        });

        var clickHandler = function(e) {
            console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');

            bui.back({
                callback: function(mod) {
                    mod.points.$replace([e.lnglat.getLng(), e.lnglat.getLat()]);
                }
            })

            loader.trigger(`${module.id}:click`, { lng: e.lnglat.getLng(), lat: e.lnglat.getLat() })
        };

        // 绑定事件
        map.on('click', clickHandler);
    }

    // 动态加载地图资源,再初始化,高德的这些路径需要在index首页引入才不会报错
    loader.import([
            "http://cache.amap.com/lbs/static/main1119.css",
            "http://cache.amap.com/lbs/static/es5.min.js",
            "http://webapi.amap.com/maps?v=1.4.5&key=c7c60f79d6b323835ee696ef855f10ca"
        ],
        function() {
            // 高度的地图初始化在这个工具里面
            loader.import(["http://cache.amap.com/lbs/static/addToolbar.js"], function() {
                // 初始化
                pageview.init();

            });
        });

    return pageview;
})