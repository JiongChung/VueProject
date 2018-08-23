<template>
    <div class="login">
        <div class="login-item">
            <div class="info">
                <ul>
                    <li>
                        <h4>自由交易虚拟货币</h4>
                        <span>强大的广告系统，让交易数字币安全又快速</span>
                    </li>
                    <li>
                        <h4>场外交易可以很简单</h4>
                        <span>不论是购买、出售数字币，都可立即上手</span>
                    </li>
                    <li>
                        <h4>最全面的交易种类</h4>
                        <span>支持 BTC / ETH 等主流货币，及多种交易方式</span>
                    </li>
                </ul>
            </div>
            <div class="login-box">
                <h4>登录</h4>
                <form 
                    @submit="checkForm"
                    action="#"
                    method="post"
                    novalidate="true">
                    <ul>
                        <li class="inputbox">
                            <input class="validate" v-on:input="watchphoneNumber" v-model="userNameOrEmailAddressOrPhoneNumber" autocomplete="off" rule="phone" type="text" msg="请输入正确的手机号码" name="userNameOrEmailAddressOrPhoneNumber" placeholder="请输入您的手机号">
                            <span class="err-tips" v-if="phoneNumberStatus">请输入正确的手机号码</span>
                        </li>
                        <li class="inputbox">
                            <input id="pwd" v-on:input="watchPassword" autocomplete="off" v-model="password" name="password" rule="password" type="password" class="validate" maxlength="20" msg="请输入8位至20位英文数字组合密码" placeholder="请输入您的密码">
                            <span class="err-tips" v-if="passwordStatus">请输入8位至20位英文数字组合密码</span>
                            <span class="err-tips" v-if="passwordStatusErr">登录密码错误</span>
                        </li>
                        <li class="submit">
                            <input type="submit" id="loginsubmitbtn" value="登录">
                        </li>
                        <li class="forgot">
                            <a href="javascript:;">忘记密码？</a>
                            <span class="register">还没有账号？<router-link to="/register">注册</router-link></span>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: "Login",
        data(){
            return{
                userNameOrEmailAddressOrPhoneNumber: '',
                password: '',
                loginStatus: false,
                phoneNumberStatus: false,
                passwordStatus: false,
                passwordStatusErr: false
            }
        },
        beforeRouteEnter (to, from, next) {
            window.localStorage.setItem('__routepath',from.fullPath);
            next();
        },
        mounted: function(){
            // this.commonService.routepath(this.$route.path)
        },
        methods:{
            checkForm: function(e){
                if(this.loginStatus == true){
                    e.preventDefault();
                    return false;
                }
                let status = false;
                if(!this.commonService.zValidate.phone(this.userNameOrEmailAddressOrPhoneNumber)){
                    status = true;
                    this.phoneNumberStatus = true;
                }
                if(!this.commonService.zValidate.password(this.password)){
                    status = true;
                    this.passwordStatus = true;
                }
                if(status){
                    e.preventDefault();
                    return false;
                }
                let _url = '//api.bi.ceo/api/TokenAuth/Authenticate';
                let fullPath = window.localStorage.getItem('__routepath');
                let PostData = {};
                PostData.userNameOrEmailAddressOrPhoneNumber = this.userNameOrEmailAddressOrPhoneNumber;
                PostData.password = this.password;

                let that = this;
                this.loginStatus = true;
                let loginsubmitbtn = document.getElementById('loginsubmitbtn');
                loginsubmitbtn.classList.add('loading');
                
                this.$http.post(_url,PostData).then(function(res){
                    that.loginStatus = false;
                    let data = res.body.result;
                    that.commonService.TokenCommonSet.setCookie('__accessToken',data.accessToken);
                    that.commonService.TokenCommonSet.setCookie('__userId',data.userId);
                    if(fullPath.indexOf('register') > -1 || fullPath.indexOf('login')){
                        this.$router.push('/');
                    }else{
                        this.$router.push(fullPath);
                    }
                },function(err){
                    that.loginStatus = false;
                    loginsubmitbtn.classList.remove('loading');
                    that.passwordStatusErr = true;
                });
                e.preventDefault();
                return false;
            },

            watchphoneNumber: function(e){
                this.phoneNumberStatus = false;
            },

            watchPassword: function(e){
                this.passwordStatus = false;
                this.passwordStatusErr = false;
            }
        }
    })
</script>





<style lang="less" scoped>
    .login{
        background: url(../../assets/images/login_bg.png) no-repeat top center;
        padding: 50px 10%;

        .login-item{
            min-height: 600px;
            background: rgba(255,255,255,0.1);
            display: flex;

            .info{
                width: 50%;
                background: rgba(0,0,0,0.2);
                flex: 1;
                padding:100px  0;

                li{
                    padding: 30px 100px;

                    h4{
                        font-size: 20px;
                        font-weight: normal;
                        padding-bottom: 20px;
                    }

                    span{
                        display: block;
                        font-size: 16px;
                    }
                }
            }

            .login-box{
                width: 50%;
                flex: 1;
                padding: 100px  0;

                h4{
                    font-size: 30px;
                    font-weight: normal;
                    padding: 0 100px;
                }

                input{
                    background: rgba(255,255,255,0.4);
                    border-radius: 30px;
                    padding: 10px 20px;
                    width: 100%;
                    color: #ffffff;
                    font-size: 16px;
                }
                
                ul{
                    padding: 40px 100px 0;

                    li{
                        padding-bottom: 50px;
                        max-width: 80%;
                        position: relative;

                        .err-tips{
                            position: absolute;
                            top: 45px;
                            left: 10px;
                            color: #ff0000;
                        }
                    }

                    li.submit input{
                        background: linear-gradient(to right, #00B4FF, #0080FF);
                        cursor: pointer;
                    }
                    li.submit input.loading{
                        background: #f4f4f4 url(../../assets/images/loading_3.gif) no-repeat center center;
                        text-indent: -9999px;
                    }
                    li.forgot{
                        display: flex;

                        .register{
                            flex: 1;
                            text-align: right;
                        }
                    }
                }

                ::-webkit-input-placeholder {
                    color: #eeeeee;
                }
                :-moz-placeholder {
                    color: #eeeeee;
                }
                ::-moz-placeholder {
                    color: #eeeeee;
                }
                :-ms-input-placeholder {
                    color: #eeeeee;
                }
            }
        }
    }
</style>
