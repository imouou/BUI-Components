loader.define(function(require, exports, module, global) {

    console.log(module.props)
    //搜索条的初始化
    var uiSearchbar = bui.searchbar({
        id: `#${module.id} .bui-searchbar`,
        callback: function(e, keyword) {
            // 点击搜索的时候触发其它业务
            loader.trigger(`${module.id}:search`, e, keyword);
        },
        onInput: function(e, keyword) {
            //实时搜索
            loader.trigger(`${module.id}:input`, e, keyword);
        },
        onRemove: function(e, keyword) {
            //删除关键词需要做什么其它处理
            loader.trigger(`${module.id}:remove`, e, keyword);
        }
    });
    return uiSearchbar;
})