/**
 * 树组件
 * 默认模块名: pages/components/tree/index
 * @return {[object]}  [ 返回一个对象 ]
 * @example
 * 
 * // html 页面引入组件
 * <component id="tree" name="pages/components/tree/index"></component>
 * 
 * // js 
 * 
 * loader.on(`tree:click`,function(){
        console.log("点击了按钮);
   })
 * 
 */
loader.define(function(require, exports, module) {

    // 模拟数据
    var data = [
        {id: 1, name: "办公管理", pid: 0 ,
            children:[
                { id: 2, name: "请假申请", pid: 1,
                    children:[
                        { id: 4, name: "请假记录", pid: 2 },
                    ],
                },
                { id: 3, name: "出差申请", pid: 1},
            ]
        },
        {id: 5, name: "系统设置", pid: 0 ,
            children:[
                { id: 6, name: "权限管理", pid: 5,
                    children:[
                        { id: 7, name: "用户角色", pid: 6 },
                        { id: 8, name: "菜单设置", pid: 6 },
                    ]
                },
            ]
        },
    ]

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "tree",
        data: {
           trees: module.props && module.props.data || data,
        },
        methods: {},
        templates: {
            tplTrees: function (data,pclass) {
                var html="";

                data.forEach((item, index) => {
                    let hasChildren=item&&item.children&&item.children.length;
                    // 是否有下一级图标
                    let hasChildrenIcon=hasChildren? `<i class="icon-accordion"></i>`:`<i class="icon-nosubmenu">&#xe620;</i>`;
                    let hasChildrenNext=hasChildren? ``:`<i class="icon-listright"></i>`;
                    let level= (pclass||"bui-tree-level") + `-${index}`;

                    html+=`<dt class="bui-btn bui-box ${level}">
                                ${hasChildrenIcon}
                                <div class="span1">${item.name}</div>
                            </dt>`
                    if (hasChildren) {
                    // 如果有子集菜单
                        html+=`<dd class="${level}"><dl class="bui-accordion">`;
                        html+=this.tplTrees(item.children,level);
                        html+=`</dl></dd>`;
                    }

                });
                
                return html;
            }
        },
        mounted: function () {
            // 初始化折叠插件
            var uiAccordion = bui.accordion({
                id: `#${module.id} .bui-accordion`,
                callback: function (e) {
                    loader.trigger(`${module.id}:click`,e)
                }
            });
        }
    })
})