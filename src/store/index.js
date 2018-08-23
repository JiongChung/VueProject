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
    }
}