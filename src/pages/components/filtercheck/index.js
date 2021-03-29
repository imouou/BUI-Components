loader.define(function(require, exports, module) {

    var params = bui.history.getParams(module.id);
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "filtercheck",
        data: {
            data: params.data || [{value:"10",label:"10元"},{value:"20",label:"20元"},{value:"30",label:"30元"}],   // [{value:"",label:""}]
            value: params.value || "",
            column: params.column || "3",
            type: params.type || "radio",
            name: params.name || bui.guid()
        },
        methods: {
            change: function (val) {
                loader.trigger(`${module.id}:change`,val)
            }
        },
        needStatic: true,
        templates: {
            tplCheck: function (data) {
                var html="";
                data&&data.forEach((item, index) => {
                    // 是否选中
                    var hasCheck=item.value===this.value? "checked":"";
                    html +=`<div class="span1">
                            <input type="${this.$data.type}" class="bui-check" b-change="filtercheck.change(${item.value})" name="${this.$data.name||guidname}" value="${item.value}" uncheck="${item.label}" check="${item.label}" ${hasCheck}>
                        </div>`
                })
                return html;
            }
        },
        beforeMount: function(){
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function(){
            // 数据解析后执行
        }
    })
})