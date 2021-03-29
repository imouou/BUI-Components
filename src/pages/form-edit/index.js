/**
 * 空模块, xxx 为创建时候起的模块名
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   loader.require(["pages/xxx/xxx"],function(mod){
      // mod 指向xxx 抛出的方法
      mod.init()
   })
 */
loader.define(function(require, exports, module, global) {
    // 定义
    var pageview = {
        init: function() {
            // 这里初始化

            //例如: <component id="chat" name="xxxx"></component>
            loader.on(`groupselect:change`, function(val) {
                console.log(val)
            })

            loader.on("listview:clickitem", function(e) {
                console.log(e)
            })

            loader.waited(["listview", "groupselect"], function(listview, groupselect) {
                // list1为id
                // var distace = bui.history.getComponent("listview");
                // var distace2 = bui.history.getComponent("groupselect");
                // console.log(listview)
                // console.log(groupselect)
                    // console.log(levelselect)
            });

            // 手机跟验证码的交互
            loader.waited(["phone", "sendcode"], function(phone, sendcode) {
                // 监听输入的时候,如果是手机号且11位
                loader.on(`phone:input`,function(val){
                    if (/[0-9]{11}/.test(val)) {
                        sendcode.btn.disabled=false;
                    } else {
                        sendcode.btn.disabled=true;
                    }
                })
                
            });

            //例如: <component id="chat" name="xxxx"></component>



            // 点击删除
            loader.on("listview:clickbtn", function(e) {
                if (e.text === "删除") {
                    e.item.remove();
                }
            })

        }
    };

    // 第1次初始化
    pageview.init();


    // 抛出模块
    return pageview;
})