loader.define(function(require, exports, module) {

    var params=bui.history.getParams(module.id);

    var uiUpload = null;
    
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "upload",
        data: {
            url: params.url||"",
            data: params.data || [],
            showLocal: true,
            from: params.from || "camera", 
            value: "",
        },
        methods: {
            add: function () {
                var that=this;
                uiUpload.add({
                    "from": that.from,
                    "onSuccess": function(val, data) {
                        // $output.text(val);
                        if (that.$data.showLocal) {
                            this.toBase64({
                                onSuccess: function (url) {
                                    that.data.unshift({
                                        name: val.name,
                                        url: url
                                    })
                                    // 添加图片
                                    loader.trigger(`${module.id}:add`, name);
                                }
                            });
                        } else {
                            that.data.unshift({
                                name: val.name,
                            })
                            // 添加图片
                            loader.trigger(`${module.id}:add`, name);
                        }
                    }
                })
            },
            remove: function (name, icon) {
                // 移除dom
                $(icon).parents(".span1").remove();
                // 移除数据
                uiUpload.remove(name);
                // 移除图片
                loader.trigger(`${module.id}:remove`, name);
            }
        },
        templates: {
            tplPhoto: function (data) {
                var html="";
                data&&data.forEach(function (item, index) {
                    
                    html+=`<div class="span1">
                                <div class="bui-upload-thumbnail">
                                    <img src="${item.url}" alt="" />
                                    <i class="icon-remove" b-click="upload.remove(${item.name},$this)"></i>
                                </div>
                            </div>`
                });

                return html;
            }
        },
        mounted: function(){
            // 数据解析后执行
            uiUpload=bui.upload({
                url: this.$data.url,
                data: this.$data.data
            });

        }
    })

    return bs;
})