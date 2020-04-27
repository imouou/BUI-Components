/**
 * params接收以下参数
 * params.listtemplate: "templateBuy" || "templateNews" || "templateTodo"
 * params.type: "cart" || "todo" || "done" 只是用来示例区分列表请求的不同参数
 * params.url: "" 请求的接口
 */
loader.define(function(require, exports, module) {

    // 每次请求回数据则增加1, 用来跟component的索引挂钩, 这样delay可以按一组一组数据编译,而不是每次都从头编译.
    var results = [];
    // 获取参数
    var params = bui.history.getParams(module.id);

    var pageview = {
        init: function() {
            // console.log(params)
            this.list = this.listInit(params);
        },
        listInit: function(opt) {
            // 根据外部的类型,来区分不同的模板
            var template = this.template(opt);
            if (this.list) {
                return this.list;
            }
            // 列表控件 js 初始化:
            var uiList = bui.list({
                id: `#${module.id} .bui-scroll`,
                // url: "http://rap2api.taobao.org/app/mock/84605/example/getNews",
                url: opt.url || `${module.path}/index.json`,
                pageSize: 5,
                data: {
                    type: opt.type
                },
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "pageSize",
                    data: "data"
                },
                callback: function(e) {},
                template: template,
                onRefresh: function() {
                    results = [];
                },
                onLoad: function(data, result) {

                    // 购物车模板需要编译子组件
                    if (params.type == "cart") {
                        // 按一组一组初始化
                        loader.component({
                            id: `.delaybuy${results.length}`
                        })
                        results.push(results.length);
                    }

                }
            });
            return uiList;
        },
        template: function(opt) {
            var tplFun = this["templates"][opt.listtemplate] || this["templates"]["templateNews"];

            return tplFun;
        },
        templates: {
            templateNews: function(data) {
                var html = "";
                data.forEach(function(el, index) {

                    html += `<li class="bui-btn bui-box">
                        <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title">${el.name}</h3>
                            <p class="item-text">${el.address}</p>
                            <p class="item-text">${el.distance}公里</p>
                        </div>
                    </li>`
                });
                return html;
            },
            templateBuy: function(data) {
                var html = "";
                data.forEach(function(el, index) {

                    html += `<li class="bui-btn bui-box-align-top">
                        <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title">${el.name}</h3>
                            <p class="item-text">${el.address}</p>
                            <p class="item-text">￥${el.price}</p>
                        </div>
                        <component class="delaybuy${results.length}" name="pages/components/number/index" commodityname="${el.name}"></component>
                    </li>`
                });
                return html;
            },
            templateTodo: function(data) {
                var html = "";
                data.forEach(function(el, index) {

                    html += `<li class="bui-btn bui-box">
                        <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title">${el.name}</h3>
                            <p class="item-text">${el.address}</p>
                        </div>
                        <span class="danger">待处理</span>
                    </li>`
                });
                return html;
            },
            templateDone: function(data) {
                var html = "";
                data.forEach(function(el, index) {

                    html += `<li class="bui-btn bui-box">
                        <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title">${el.name}</h3>
                            <p class="item-text">${el.address}</p>
                        </div>
                        <span class="success">已完成</span>
                    </li>`
                });
                return html;
            }
        }

    }

    pageview.init();

    return pageview;
})