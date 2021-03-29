loader.define(function(require, exports, module) {

    // 获取参数
    var params = bui.history.getParams(module.id);
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "dropdown",
        data: {
            placeholder: params.placeholder || "请选择",
            value: ""
        },
        needStatic: true,
        mounted: function() {
            var that = this;
            var uiDropdown = bui.dropdown({
                id: `#${module.id} .bui-dropdown`,
                data: params.data || [{
                    name: "广州",
                    value: "广州"
                }],
                //设置relative为false,二级菜单继承父层宽度
                relative: params.relative || false,
                value: params.value,
                onChange: function(e) {
                    that.value = this.value();

                    loader.trigger(`${module.id}:change`, {
                        id: module.id,
                        value: this.value()
                    })
                }
            });
        }
    })

    return bs;
})