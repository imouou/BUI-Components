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

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "chatbar",
        data: {
            message: "",
            canSend: "disabled"
        },
        methods: {
            send: function() {
                var val = this.message;

                if (this.canSend == "" || this.canSend == "primary") {
                    loader.trigger(`${module.id}:sendmessage`, val);
                    this.message = "";
                } else {
                    return false;
                }
            }
        },
        watch: {
            message: function(val) {
                if (val) {
                    this.canSend = "primary";
                } else {
                    this.canSend = "disabled";
                }
            }
        }
    })
    return bs;
})