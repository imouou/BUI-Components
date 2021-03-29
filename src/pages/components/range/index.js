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
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "range",
        data: {
            showvalue: params.showvalue || true,
            width: params.width || "100%",
            step: params.step || "1",
            min: params.min || "0",
            max: params.max || "255",
            value: params.value || "0"
        },
        needStatic: true,
        watch: {
            value: function(val) {
                loader.trigger(`${module.id}:change`, val);
            }
        }
    })
    return bs;
})