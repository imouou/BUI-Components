/**
 * 其它参数参考 bui.select 的api说明, 可以自定义自己的组件
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   // 静态编译
   <div class="section-title">输入框</div>
    <component id="name" name="pages/components/input/index" value=""></component>
    <div class="section-title">密码框</div>
    <component id="password" name="pages/components/input/index" type="password" icon="icon-eye" control="toggle"></component>

   // 动态编译
   <component id="groupradio" name="pages/components/input/index" delay="true"></component>

   loader.delay({
       id:"password",
       param: {
           type:"text",
           icon:"icon-eye"
       }
   })

   // 父级监听改变
   loader.on("groupradio:change",function(val,vals){
       console.log(val)
   })

 */
loader.define(function(require, exports, module, global) {

    // 获取属性参数
    var params = bui.history.getParams(module.id);
    var timer=null;
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "input",
        data: {
            label: params.label || "昵称",
            placeholder: params.placeholder || "请输入",
            type: params.type || "text",
            icon: params.icon || "icon-remove",
            value: params.value || "",
            control: params.control||"empty",
            time: params.time || 10,
            btn: {
                label: "发送验证码",
                disabled: false
            }
        },
        needStatic: true,
        methods: {
            send: function () {
                var hasDisabled=this.$data.btn.disabled;
                
                if (!hasDisabled) {
                    this.btn.disabled=true;
                    bui.hint("验证码发送成功")
                    timer.restart();
                }
            },
            empty: function() {
                // 清空数据
                this.value = "";
            },
            toggle: function() {
                // 切换类型
                if (this.$data.type == "text") {
                    this.type = "password";
                } else {
                    this.type = "text";
                }
            },
            clickicon: function(method) {
                method && this[method] && this[method]();
                loader.trigger(`${module.id}:clickicon`);
            }
        },
        mounted: function () {
            // 验证码示例
            var $btnSend=$(this.$refs.btnsend);
            var that=this;
            timer = bui.timer({
                onEnd: function () {
                    that.btn.label="重新获取验证码";
                    that.btn.disabled=false;
                },
                onProcess: function(e) {
                    var valWithZero = e.count < 10 ? "0" + e.count : e.count;
                    that.btn.label=valWithZero+"后重新获取";
                },
                time: this.$data.time
            });

        }
    })
    return bs;
})