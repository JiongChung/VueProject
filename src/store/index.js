export default{
    referer: function(){
        return document.referrer.replace(/\$/g,"");
    },
    TokenCommonSet:{
        setCookie: function(name,value){ 
            let exp = new Date(); 
            exp.setTime(exp.getTime() + 24*60*60*1000); 
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
        },
        getCookie: function(name){ 
            let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]); 
            }
            else{
                return null; 
            }    
        },
        delCookie: function(name){ 
            let exp = new Date(); 
            exp.setTime(exp.getTime() - 1); 
            let cval = this.getCookie(name); 
            if(cval!=null){
                document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
            } 
        }
    },
    zValidate:{
        phone: function(phone){
            var myreg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            return myreg.test(phone);
        },
        email : function(email){
            var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,8}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
            return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
        },
        int : function(int){
            var myreg = /^[0-9]*[1-9][0-9]*$/;
            return myreg.test(int);
        },
        password : function(password){
            var myreg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
            return myreg.test(password);
        }
    },
    apiService: '//api.bi.ceo/api/services/app/',
    islogin: function(){
        var status = false;
        var token = this.TokenCommonSet.getCookie('__accessToken');
        var userId = this.TokenCommonSet.getCookie('__userId');
        if((token != null || token != 'null') && userId != null){
            status = true;
        }
        return status;
    },
    isloading: function(){
        var html = ''+ 
            '<div class="el-loading-item">'+
                '<div class="el-loading-mask"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>'+
           '</div>';
        return html;
    },
    formatDate: function(input){
        var d = new Date(input);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    },
    padDate: function(val){
        val=val<10?'0'+val:val;
        return val
    },
    minute : 1000 * 60,
    hour : 1000 * 60 * 60,
    day : 1000 * 60 * 60 * 24,
    halfamonth : 1000 * 60 * 60 * 24 * 15,
    month : 1000 * 60 * 60 * 24 * 30,
    getDateDiff: function (dateandtime) {
        var result = '';
        var idata = new Date(dateandtime).getTime()
        var now = new Date().getTime();
        var diffValue = now - idata;
        var monthC = diffValue / this.month;
        var weekC = diffValue / (7 * this.day);
        var dayC = diffValue / this.day;
        var hourC = diffValue / this.hour;
        var minC = diffValue / this.minute;
        if (monthC >= 1) {
            result = '大约' + parseInt(monthC) + "个月前上线";
        }
        else if (weekC >= 1) {
            result = '大约' + parseInt(weekC) + "周 前上线";
        }else if (dayC >= 1) {
            result = '大约' + parseInt(dayC) + "天 前上线";
        }else if (hourC >= 1) {
            result = '大约' + parseInt(hourC) + "个小时 前上线";
        }else if (minC >= 1) {
            result = parseInt(minC) + "分钟 前上线";
        }else{
            result = "不到一分钟 前上线";
        }
        return result;
    },
    TabsFiter: function(obj){
        var parent = obj.target.parentNode;
        var child = parent.childNodes;
        for(let i=0; i<child.length; i++){
            if(child[i].nodeName == "#text" && !/\s/.test(child.nodeValue)){
                parent.removeChild(child[i]);
            }
        }
        for(let i=0; i<child.length; i++){
            child[i].classList.remove('active');
        }
        obj.target.classList.add('active');
    },
    getWindowWidth: function(){
        return window.screen.width;
    }
}