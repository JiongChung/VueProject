<template>
    <div>
        <app-header></app-header>
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
                    <h4>注册</h4>
                    <form 
                        @submit="checkForm"
                        action="#"
                        method="post"
                        novalidate="true">
                        <ul>
                            <li class="inputbox country">
                                <div class="countryphonecode">
                                    (+86) China
                                </div>
                                <input class="validate" v-on:input="watchphoneNumber" v-model="phoneNumber" autocomplete="off" rule="phone" type="text" msg="请输入正确的手机号码" name="phoneNumber" placeholder="请输入您的手机号">
                                <span class="err-tips" v-show="phoneNumberStatus">请输入正确的手机号码</span>
                                <span class="err-tips" v-show="phoneNumberOccupiedStatus">该手机号码已经注册了，请更新其它手机号码</span>
                            </li>
                            <li class="inputbox">
                                <input id="phonecode" maxlength="6" v-on:input="watchPhonecode" v-model="phonecode" name="phonecode" rule="phonecode" type="text" class="validate" msg="请输入有效手机验证码" placeholder="请输入手机验证码">
                                <span class="getcode" v-on:click="getPhoneCode">获取验证码</span>
                                <span class="err-tips" v-show="phonecodeStatus">请输入有效手机验证码</span>
                            </li>
                            <li class="inputbox">
                                <input id="pwd" name="password" v-on:input="watchPassword" v-model="password" rule="password" type="password" class="validate" maxlength="20" msg="请输入8位至20位英文数字组合密码" placeholder="请输入您的密码">
                                <span class="err-tips" v-show="passwordStatus">请输入8位至20位英文数字组合密码</span>
                            </li>
                            <li class="inputbox">
                                <input id="confirm_password" v-on:input="watchConfirmpassword" v-model="confirm_password" name="confirm_password" rule="password" type="password" class="validate" maxlength="20" msg="请输入8位至20位英文数字组合密码" placeholder="请再次输入密码">
                                <span class="err-tips" v-show="confirmStatus">请输入8位至20位英文数字组合密码</span>
                                <span class="err-tips" v-show="confirmTwiceStatus">两次密码输入不正确</span>
                            </li>
                            <li class="submit">
                                <input type="submit" value="注册">
                            </li>
                            <li class="terms">
                                <a href="javascript:;" class="text">注册即表示同意OTV  VC使用条款</a>
                                <span class="register">已经有账号？<router-link to="/login">登录</router-link></span>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    import Header from '../header/Header'
    export default Vue.extend({
        name: 'Register',
        inject: ['reload'],
        components: {
            'app-header' : Header
        },
        data(){
            return{
                phoneNumber: '',
                phonecode: '',
                password: '',
                confirm_password: '',
                phoneNumberStatus: false,
                phonecodeStatus: false,
                passwordStatus: false,
                confirmStatus: false,
                confirmTwiceStatus: false,
                phonecodeTimer: 60,
                getphonecodestatus: true,
                registerStatus: false,
                phoneNumberOccupiedStatus:false
            }
        },
        mounted: function(){
            // this.commonService.routepath(this.$route.path)
            if(this.commonService.islogin()){
                this.$router.push('/account');
                this.reload();
            }
        },
        methods:{
            checkForm: function(e){
                if(this.registerStatus == true){
                    e.preventDefault();
                    return false;
                }
                let status = false;
                if(!this.commonService.zValidate.phone(this.phoneNumber)){
                    status = true;
                    this.phoneNumberStatus = true;
                }
                if(!this.commonService.zValidate.int(this.phonecode)){
                    status = true;
                    this.phonecodeStatus = true;
                }
                if(!this.commonService.zValidate.password(this.password)){
                    status = true;
                    this.passwordStatus = true;
                }
                if(!this.commonService.zValidate.password(this.confirm_password)){
                    status = true;
                    this.confirmStatus = true;
                }
                if(this.password != this.confirm_password && this.confirm_password.length > 0 && this.confirm_password.length > 7){
                    status = true;
                    this.confirmTwiceStatus = true;
                }
                if(status){
                    e.preventDefault();
                    return false;
                }
                this.registerStatus = true;
                let _url = this.apiService+'Account/RegisterByPhone';
                let PostData = {};
                PostData.phoneNumber = this.phoneNumber;
                PostData.phoneNumberCode = this.phonecode;
                PostData.password = this.password;
                PostData.referrerUser = 0;
                PostData.captchaResponse = '';
                let that = this;
                this.$http.post(_url,PostData).then(function(res){
                    that.registerStatus = false;
                    console.log(res)
                    this.$router.push('/login');
                },function(){
                    that.registerStatus = false;
                    // alert('请求失败处理');   
                });
                e.preventDefault();
                return false;
            },

            watchphoneNumber: function(e){
                this.phoneNumberStatus = false;
                this.phoneNumberOccupiedStatus = false;
            },
            watchPhonecode: function(e){
                this.phonecodeStatus = false;
            },
            watchPassword: function(e){
                this.passwordStatus = false;
            },
            watchConfirmpassword: function(e){
                this.confirmStatus = false;
                this.confirmTwiceStatus = false;
            },
            getPhoneCode: function(e){
                if(!this.commonService.zValidate.phone(this.phoneNumber)){
                    this.phoneNumberStatus = true;
                }else{
                    if(this.getphonecodestatus){
                        this.getPhoneCodeNow(e.target);
                        this.SendSmsCode(this.apiService + 'Account/SendSmsCode', this.phoneNumber);
                    }
                }
            },
            getPhoneCodeNow: function(o){
                let that = this;
                if(this.phonecodeTimer === 0) {
                    o.innerHTML = "获取验证码";
                    this.phonecodeTimer = 60;
                    this.getphonecodestatus = true;
                } else {
                    this.getphonecodestatus = false;
                    o.innerHTML = '重新发送(' + this.phonecodeTimer + 's)';
                    this.phonecodeTimer--;
                    setTimeout(function() {
                        that.getPhoneCodeNow(o)
                    }, 1000);
                }
            },
            SendSmsCode(url, phone){
                let that = this;
                this.$http.post(url, {"phoneNumber": phone, "codeType": 1}).then(response => {
                    console.log(response);
                },err => {
                    that.phoneNumberOccupiedStatus = true;
                    console.log(err)
                });
            

                console.log(phone)
                
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
                padding: 50px  0;

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
                        
                        .getcode{
                            position: absolute;
                            top: 9px;
                            right: 20px;
                            height: 20px;
                            line-height: 20px;
                            font-size: 12px;
                            color: blue;
                            cursor: pointer;
                        }

                        .err-tips{
                            position: absolute;
                            top: 45px;
                            left: 10px;
                            color: #ff0000;
                        }
                    }
                    li.country .countryphonecode{
                        float: left;
                        width: 100px;
                        border-radius: 30px 0 0 30px;
                        line-height: 38px;
                        background: rgba(255,255,255,0.5);
                        padding-left: 10px;
                        text-align: center;
                        position: relative;
                    }

                    li.country{
                        input{
                            margin-left: -100px;
                            padding-left: 100px;
                            text-indent: 10px;
                        }
                    }

                    li.submit input{
                        background: linear-gradient(to right, #00B4FF, #0080FF);
                        cursor: pointer;
                    }
                    li.terms{
                        text-align: center;
                        margin-top: -30px;

                        .text{
                            display: inline-block;
                            padding-bottom: 10px;
                            border-bottom: solid 1px #21A8FE;
                        }
                        span{
                            display: block;
                            padding-top: 10px;
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
    @media only screen and (min-width: 320px) and (max-width:768px){
        .login{
            padding: 10px 15px;
            background-size: 100%;
        }
        .login .login-item{
            min-height: auto;
            display: block;
        }
        .login .login-item .info{
            display: none;
        }
        .login .login-item .login-box{
            flex: auto;
            width: 100%;
            padding: 0;
        }
        .login .login-item .login-box h4{
            padding: 15px 0;
            text-align: center;
        }
        .login .login-item .login-box ul{
            padding: 0 15px;
        }
        .login .login-item .login-box ul li{
            max-width: 100%;
            padding-bottom: 35px;
        }
    }
</style>
