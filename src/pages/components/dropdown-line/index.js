loader.define(function(require, exports, module) {

    // 获取参数
    var params = bui.history.getParams(module.id);
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "dropdownline",
        data: {
            label: params.label || "请选择",
            placeholder: params.placeholder || "请选择",
            value: params.value || ""
        },
        needStatic: true,
        mounted: function() {
            var that = this;

        }
    })

    return bs;
})