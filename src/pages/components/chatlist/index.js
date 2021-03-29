loader.define(function(require, exports, module) {

    var params = bui.history.getParams(module.id);

    var uiList = bui.list({
        id: `#${module.id} .bui-scroll`,
        url: params.url || `${module.path}index.json`,
        // relative: true,
        children: ".bui-panel",
        pageSize: 6,
        data: params.data || {},
        // height: 500,
        refreshTips: {
            start: "",
            release: "",
            end: "",
            success: "",
        },
        //如果分页的字段名不一样,通过field重新定义
        field: {
            page: "page",
            size: "pageSize",
            data: "data"
        },
        scroll: false, // 不需要滚动加载事件
        commandRefresh: "prepend", // 刷新不使用覆盖,使用增加在前面,
        onLoad: function(mod, res) {
            // 第一次加载以后滚动到底部
            this.toBottom();
            // 第一次加载如果没有数据时,提醒
            if (res.data.length < 1) {
                bui.hint({
                    content: "暂无聊天记录",
                    position: "top",
                    appendTo: "main",
                })
            }
        },
        onRefresh: function(mod, res) {
            // 每次下拉以后判断是否是最后一页的数据
            if (res.data.length < this.config.pageSize) {
                bui.hint({
                    content: "已经最后一页",
                    position: "top",
                    appendTo: "main",
                })
            }
        },
        template: function(data) {
            var html = "";
            var that = this;
            if (data.length) {

                html += `
                    <div class="chat-line bui-box-center">
                        <div class="time">5月11日 08:30</div>
                    </div>`;
                data.forEach(function(el, index) {
                    // 别人说的
                    var chatUserLine = `<div class="chat-line bui-box-align-top chat-target">
                                <div class="chat-icon"><img src="${el.image}" alt=""></div>
                                <div class="span1">
                                    <div class="chat-content bui-arrow-left">${el.content}</div>
                                </div>
                            </div>`;
                    // 自己说的
                    var chatMineLine = myChatTpl(el);

                    html += el.uid == 2 ? chatMineLine : chatUserLine;
                });
            }

            return html;
        }
    })

    // 聊天模板
    var myChatTpl = function(el) {
        var html = `<div class="bui-box-align-top chat-mine">
                <div class="span1">
                    <div class="bui-box-align-right">
                        <div class="chat-content bui-arrow-right">
                        ${el.content}
                        </div>
                    </div>
                </div>
                <div class="chat-icon"><img src="${el.image||"images/applogo.png"}" alt=""></div>
            </div>`

        return html;
    }

    // 接收外部发送的message
    loader.on(`${module.id}:receivemessage`, function(val) {
        // console.log(val, 11)
        var html = myChatTpl({ content: val });
        router.$(".chat-panel").append(html);
        // 跳到底部
        uiList.toBottom();
    })

    return uiList;
})