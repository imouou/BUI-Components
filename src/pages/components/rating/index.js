loader.define(function(require, exports, module) {

    // 获取参数
    var params = bui.history.getParams(module.id);

    // 评分星星 js 初始化:
    var uiRating = bui.rating({
        id: `#${module.id} .bui-rating`,
        value: params.value || 0,
        stars: params.stars || 5,
        disabled: params.disabled || false,
        half: params.half || false,
        onChange: function() {
            loader.trigger(`${module.id}:change`, {
                id: module.id,
                value: this.value()
            })
        }
    });
    return uiRating;
})