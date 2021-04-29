$(function(){
        update_history();
        // 绑定回车事件
        $(document).keydown(function(event){ 
            if(event.keyCode==13){ 
                $("#search").click(); 
            } 
        }); 

        // 搜索点击事件
        $("#search").click(function(){
            var keywords = $("#keywords").val();
            history(keywords); //添加到缓存
            update_history(); //更新搜索历史
        })

        // 清空搜索历史
        $("#empty").click(function(){
            mystorage.remove('keywords');
            $("#history").html(" ");
        })
    })

    /**
     * [update_history 更新搜索历史]
     * @return {[type]} [description]
     */
    function update_history(){
        console.log(mystorage.get("keywords"));
        var history = mystorage.get("keywords");
        if (history) {
            var html = "";
            $.each(history,function(i,v){
                html += "<a class='btn btn-default' href='javascript:;' role='button'>"+v+"</a>"
            })
            $("#history").html(html);
        };
    }

                

    /**
     * [history //搜索历史函数存储]
     * @param  {[type]} value [搜索词]
     * @return {[type]}       [description]
     */
    function history(value){  
        var data = mystorage.get("keywords");
        if (!data) {
            var data = []; //定义一个空数组
        }else if(data.length === 10){ //搜索历史数量
            data.shift();  //删除数组第一个元素有
        }else{
            
        };
        if (value) {  //判断搜索词是否为空
            if (data.indexOf(value)<0) {  //判断搜索词是否存在数组中
                data.push(value);    //搜索词添加到数组中
                mystorage.set("keywords",data);  //存储到本地化存储中
            };
        };
    }

    /**
     * [mystorage 存储localstorage时候最好是封装一个自己的键值，在这个值里存储自己的内容对象，封装一个方法针对自己对象进行操作。避免冲突也会在开发中更方便。]
     * @param  {String} ){                 var ms [description]
     * @return {[type]}     [description]
            console.log(mystorage.set('tqtest','tqtestcontent'));//存储
            console.log(mystorage.set('aa','123'));//存储
            console.log(mystorage.set('tqtest1','tqtestcontent1'));//存储
            console.log(mystorage.set('tqtest1','newtqtestcontent1'));//修改
            console.log(mystorage.get('tqtest'));//读取
            console.log(mystorage.remove('tqtest'));//删除
            mystorage.clear();//整体清除
     */
    var mystorage = (function mystorage(){
        var ms = "mystorage";
        var storage=window.localStorage;
        if(!window.localStorage){
            alert("浏览器不支持localstorage");
            return false;
        }
        var set = function(key,value){
            //存储
            var mydata = storage.getItem(ms);
            if(!mydata){
                this.init();
                mydata = storage.getItem(ms);
            }
            mydata = JSON.parse(mydata);
            mydata.data[key] = value;
            storage.setItem(ms,JSON.stringify(mydata));
            return mydata.data;
        };
        var get = function(key){
            //读取
            var mydata = storage.getItem(ms);
            if(!mydata){
                return false;
            }
            mydata = JSON.parse(mydata);
            return mydata.data[key];
        };
        var remove = function(key){
            //读取
            var mydata = storage.getItem(ms);
            if(!mydata){
                return false;
            }
            mydata = JSON.parse(mydata);
            delete mydata.data[key];
            storage.setItem(ms,JSON.stringify(mydata));
            return mydata.data;
        };
        var clear = function(){
            //清除对象
            storage.removeItem(ms);
        };
        var init = function(){
          storage.setItem(ms,'{"data":{}}');
        };
        return {
            set : set,
            get : get,
            remove : remove,
            init : init,
            clear : clear
        };
    })();
