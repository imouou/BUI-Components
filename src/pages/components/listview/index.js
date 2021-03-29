/**
 * 其它参数参考 bui.select 的api说明, 可以自定义自己的组件
 * 默认模块名为路径: pages/xxx/xxx
 * @return {[object]}  [ 返回一个对象, 可以通过loader加载模块的方法.]
   @example

   // 静态编译
   <component id="groupradio" name="pages/components/form-select/index" type="radio" data='[{"name":"单选1","value":"group1"},{"name":"单选2","value":"group2"}]'></component>

   // 动态编译
   <component id="groupradio" name="pages/components/form-select/index" delay="true"></component>

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

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "listview",
        data: {
            list: params.data || [{ icon: "icon-menu", title: "我是标题1" }],
        },
        methods: {
            clickItem: function(e) {
                loader.trigger(`${module.id}:clickitem`, e);
            }
        },
        templates: {
            tplList: function(data) {
                var html = "";
                data.forEach(function(item, index) {
                    // 图标
                    var hasIcon = item.icon ? `<i class="${item.icon}"></i>` : "";

                    html += `<li b-click="listview.clickItem">
                        <div class="bui-btn bui-box">
                            ${hasIcon}
                            <div class="span1">${item.title}</div>
                            <i class="icon-listright"></i>
                        </div>
                    </li>`
                })
                return html
            }
        },
        mounted: function() {
            var that = this;
            // 侧滑列表 js 初始化: 
            var uiListview = bui.listview({
                id: `#${module.id} .bui-listview`,
                data: params.buttons || [{ "text": "删除", "classname": "danger" }],
                menuWidth: 80,
                callback: function(e) {
                    // e.target 为滑动出来的操作按钮
                    var target = $(e.target);

                    var text = target.text();
                    var parentItem = target.parents("li");
                    // 触发点击按钮事件
                    loader.trigger(`${module.id}:clickbtn`, { target: target, item: parentItem, index: parentItem.index(), text: text });

                    // 不管做什么操作,先关闭按钮
                    this.close();
                    e.stopPropagation();
                }
            });
        }
    })

    return bs;
})