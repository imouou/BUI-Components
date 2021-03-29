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
    var uiLevelSelect = null;

    bui.ajax({
        url: params.url || `${module.path}index.json`,
        data: params.data || {}, //接口请求的参数
        // 可选参数
        method: params.method || "GET"
    }).then(function(result) {

        // 级联控件 js 初始化:
        uiLevelSelect = bui.levelselect({
            data: result.data || [{
                "n": "北京",
                "c": [{ "a": ["城区", "城区以外"], "n": "密云区" }]
            }],
            title: "所在地区",
            trigger: `#${module.id} .selected-val`,
            level: 3,
            field: {
                name: "n",
                data: ["c", "a"],
            },
            value: params.value,
            onChange: function() {
                loader.trigger(`${module.id}:change`, this.value())
            }
        })
    }, function(result, status) {
        // 失败 console.log(status)
    });

    return uiLevelSelect;
})