loader.define(function(require, exports, module) {
    var pageview = {
        init: function() {
            // 加载延迟组件
            loader.delay({
                id: "#searchTab",
                param: {
                    tablistdata: [
                        { "name": "待办", "type": "todo", "listtemplate": "templateTodo" },
                        { "name": "已办", "type": "done", "listtemplate": "templateDone" }
                    ]
                }
            })
        }
    };

    pageview.init();

    return pageview;
})