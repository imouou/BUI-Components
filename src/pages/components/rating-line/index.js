loader.define(function(require, exports, module) {

    // 获取参数
    var params = bui.history.getParams(module.id);
    var uiRating = null;
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "rating",
        data: {
            label: params.label || "评分",
            value: params.value || 0
        },
        needStatic: true,
        mounted: function() {
            var that = this;
            // 评分星星 js 初始化:
            uiRating = bui.rating({
                id: `#${module.id} .bui-rating`,
                value: params.value || 0,
                stars: params.stars || 5,
                disabled: params.disabled || false,
                half: params.half || false,
                onChange: function() {
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