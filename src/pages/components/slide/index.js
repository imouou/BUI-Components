/**
 * 聊天对话模板
 * 默认模块名: pages/components/chatbar/index
 * @return {[object]}  [ 返回一个对象 ]
 * @example
 * 
 * // html 页面引入组件
 * <component id="charbar" name="pages/components/chatbar/index"></component>
 * 
 * // js 
 * 
 * loader.on(`chatbar:sendmessage`,function(text){
        console.log("点击了发送按钮,发送了内容:"+text);
   })
 * 
 */
loader.define(function(require, exports, module) {

    var params = bui.history.getParams(module.id);

    // 焦点图 js 初始化:
    var uiSlide = bui.slide({
        id: `#${module.id} .bui-slide`,
        height: params.height || 300,
        autopage: true,
        loop: params.loop == "false" ? false : true,
        data: params.data || [{
            image: "http://easybui.com/demo/images/banner01.png",
            url: "pages/ui_controls/bui.slide_title.html",
        }],
        callback: function(e) {
            var index = this.index();
            loader.trigger(`${module.id}:click`, index);
        }
    });

    uiSlide.on("to", function() {
        var index = this.index();

        loader.trigger(`${module.id}:to`, index);
    })
})