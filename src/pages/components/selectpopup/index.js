/**
 * 其它参数参考 bui.select 的api说明, 可以自定义自己的组件
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   // 静态编译
   <component id="groupselect" name="pages/components/selectpopup/index" type="radio" data='[{"name":"单选1","value":"group1"},{"name":"单选2","value":"group2"}]'></component>

   // 动态编译
   <component id="groupselect" name="pages/components/selectpopup/index" delay="true"></component>

   loader.delay({
       id:"groupselect",
       param: {
           type:"radio",
           data:[{"name":"单选1","value":"group1"},{"name":"单选2","value":"group2"}]
       }
   })

   // 父级监听改变
   loader.on("groupselect:change",function(val,vals){
       console.log(val)
   })
 */
loader.define(function(require, exports, module, global) {
    // 获取属性参数
    var params = bui.history.getParams(module.id);

    // 初始化数据行为存储, 静态编译, 只做第一次渲染,不做修改, 其它交由控件处理
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "select",
        data: {
            label: params.label || "",
            placeholder: params.placeholder || "请选择",
        },
        needStatic: true
    })


    // 初始化选择框
    var uiSelect = bui.select({
        trigger: `#${module.id} .bui-select`,
        title: params.title || "请选择",
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
        buttons: [{ name: "重置", className: "" }, { name: "确定", className: "primary-reverse" }],
        callback: function(e) {

            var text = $(e.target).text();
            if (text == "重置") {
                uiSelect.selectNone();
            } else {
                uiSelect.hide();
            }
        },
        onChange: function(e) {
            // 传参给外部监听
            loader.trigger(`${module.id}:change`, this.value(), this.values())
        }
    })

    return uiSelect;
})