/**
 * 其它参数参考 bui.select 的api说明, 可以自定义自己的组件
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   // 静态编译
   <component id="groupradio" name="pages/components/select/index" type="radio" data='[{"name":"单选1","value":"group1"},{"name":"单选2","value":"group2"}]'></component>

   // 动态编译
   <component id="groupradio" name="pages/components/select/index" delay="true"></component>

   loader.delay({
       id:"groupradio",
       param: {
           type:"radio",
           data:[{"name":"单选1","value":"group1"},{"name":"单选2","value":"group2"}]
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

    var uiSelect = bui.select({
        id: `#${module.id} .bui-list`,
        type: params.type || "radio",
        direction: params.direction || "right",
        data: params.data || [{
            "name": "单选项1",
            "value": "group1"
        }, {
            "name": "单选项2",
            "value": "group2"
        }],
        value: params.value,
        popup: false,
        onChange: function(e) {
            // 传参给外部监听
            loader.trigger(`${module.id}:change`, this.value(), this.values())
        }
    })

    return uiSelect;
})