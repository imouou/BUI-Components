loader.define(function(require, exports, module, global) {

    //例如: <component id="chat" name="xxxx"></component>
    // 点击了发送以后的事件
    loader.on(`chatbar:sendmessage`, function(val) {
        console.log(val)

        loader.trigger(`chatlist:receivemessage`, val);
    })
})