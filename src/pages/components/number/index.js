loader.define(function(require, exports, module) {

    // 获取参数
    var params = bui.history.getParams(module.id);

    var distance = bui.number({
        id: `#${module.id} .bui-number`,
        onChange: function() {
            var val = this.value();
            loader.trigger(`${module.id}:change`, {
                id: module.id,
                value: val
            })
        }
    })
    return distance;
})