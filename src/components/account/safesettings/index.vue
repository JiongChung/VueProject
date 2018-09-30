<template>
    <div class="safepage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="安全设置" name="first">
                <div class="setlist"  v-if="showsetlist">
                    <ul>
                        <li class="clearfix">
                            <span class="name">资金密码</span>
                            <span class="text">提现、修改安全设置时输入</span>
                            <span class="options">
                                <b class="btn-color" ref='btnPassword' @click="setAssetPassword" v-if="!safeStatus.isTradePassword">立即设置</b>
                                <b class="btn-color" ref='btnPassword' @click="setAssetPassword" v-else>修改</b>
                            </span>
                        </li>
                        <li class="clearfix">
                            <span class="name">绑定邮箱</span>
                            <span class="text">用于登录、提币、修改安全时输入</span>
                            <span class="options">
                                <b class="btn-color" @click="setEmailNow" v-if="!safeStatus.isEmailAddress">立即设置</b>
                                <b class="btn-color" @click="setEmailNow" v-else>修改</b>
                            </span>
                        </li>
                        <li class="clearfix">
                            <span class="name">绑定手机</span>
                            <span class="text">提现、修改密码、及安全设置时用以收取验证短信</span>
                            <span class="options">
                                <b class="btn-color" @click="setPhoneNow" v-if="!safeStatus.isPhoneNumber">立即设置</b>
                                <b class="btn-color" @click="setPhoneNow" v-else>修改</b>
                            </span>
                        </li>
                        <li class="clearfix">
                            <span class="name">谷歌验证</span>
                            <span class="text">绑定后，登录、提现时需要谷歌二次验证</span>
                            <span class="options">
                                <b class="btn-color" @click="setGoogleNow" v-if="!safeStatus.isGoogleAuthenticator">启用</b>
                                <b class="btn-color" @click="setGoogleNow" v-else>修改</b>
                            </span>
                        </li>
                    </ul>
                </div>
                <app-settradepassword 
                    :setStatus="safeStatus.isTradePassword" 
                    :showpassword="showsetassetpassword"
                    v-on:listenTradePassword="showMsgFromTradePassword">
                </app-settradepassword>
                <app-forgetandsetpassword
                   :setForgetPassWord="isShowForgetPassWord"
                   v-on:listenTradePassword="showMsgFromTradePassword">
                </app-forgetandsetpassword>

                <app-setemail 
                    :setStatus="safeStatus.isEmailAddress" 
                    :setEmailStatus="isSetEmail"
                    v-on:listenSetEmail="showMsgFromEmail">
                </app-setemail>
                
                <app-setphone
                    :setStatus="safeStatus.isPhoneNumber" 
                    :setPhoneStatus="isSetPhone"
                    v-on:listenSetPhone="showMsgFromPhone">
                </app-setphone>
                
                <app-setgoogle
                    ref="google"
                    :setStatus="safeStatus.isGoogleAuthenticator" 
                    :setGoogleStatus="isSetGoogle"
                    v-on:listenSetGoogle="showMsgFromGoogle">
                </app-setgoogle>
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import SetTradePassword from './setTradePassword';
    import SetEmail from './setEmial';
    import ForgetAndSetPassword from './forgetAndSetPassword';
    import SetPhone from './setPhone';
    import SetGoogle from './setGoogle';
    export default {
        components: {
            'app-settradepassword' : SetTradePassword,
            'app-setemail' : SetEmail,
            'app-forgetandsetpassword' : ForgetAndSetPassword,
            'app-setphone' : SetPhone,
            'app-setgoogle' : SetGoogle
        },
        data(){
            return{
                showsetlist: true,
                showsetassetpassword: false,
                activeName: 'first',
                isSendEmailCode: false,
                isSetEmail: false,
                isSetEmailSuccess: false,
                isSetPhone: false,
                isSetGoogle: false,

                safeStatus: {
                    isEmailAddress: false,
                    isGoogleAuthenticator: false,
                    isPhoneNumber: false,
                    isTradePassword: false
                },
                isShowForgetPassWord: false
            }
        },
        mounted: function(){
           this.GetUserSecurityForAccount(this.apiService + 'Account/GetUserSecurityForAccount');
        },
        methods: {
            showMsgFromGoogle(data){
                this.isSetGoogle = false;
                this.showsetlist = true;
                if(data == 'bind'){
                    this.safeStatus.isGoogleAuthenticator = true;
                }else{
                    this.safeStatus.isGoogleAuthenticator = false;
                }                
            },
            showMsgFromPhone(data){
                console.log(data);
                this.isSetPhone = false;
                this.showsetlist = true;
                this.safeStatus.isPhoneNumber = true;
            },
            showMsgFromEmail(data){
                this.isSetEmail = false;
                this.showsetlist = true;
                this.safeStatus.isEmailAddress = true;
            },
            showMsgFromTradePassword(data){
                if(data == 'close'){
                    this.showsetassetpassword = false;
                    this.showsetlist = true;
                }else if(data == 'forget'){
                    this.showsetassetpassword = false;
                    this.isShowForgetPassWord = true;
                }else if(data == 'forgetsave'){
                    this.showsetassetpassword = false;
                    this.isShowForgetPassWord = false;
                    this.showsetlist = true;
                }else if(data == 'success'){
                    this.showsetassetpassword = false;
                    this.showsetlist = true;
                    this.safeStatus.isTradePassword = true;
                }
            },

            GetUserSecurityForAccount(url){
                this.$http.get(url).then(response => {
                    this.safeStatus = response.body.result;
                    // this.safeStatus.isPhoneNumber = false;
                });
            },
            setAssetPassword(){
                this.showsetlist = false;
                this.showsetassetpassword = true;
            },

            setEmailNow(){
                this.showsetlist = false;
                this.isSetEmail = true;
            },

            setPhoneNow(){
                this.showsetlist = false;
                this.isSetPhone = true;
            },

           

            setGoogleNow(){
                this.showsetlist = false;
                this.isSetGoogle = true;
                this.$refs.google.GetGoogleAuthenticator();
            }
        }
    }
</script>
<style lang="less" scoped>
    .safepage{
    
        .setlist{
            padding-top: 20px;
            li{
                background: rgba(12, 31, 44, 0.4);
                padding: 13px 20px;
                border-radius: 5px;
                line-height: 24px;
                margin-bottom: 20px;

                span{
                    float: left;
                    width:10%;

                    b{
                        float: left;
                        line-height: 1;
                        font-weight: normal
                    }
                }

                .name{
                    width: 20%;
                }
                .text{
                    width: 70%;
                }
            }

            li:hover{
                background: rgba(255,255,255,0.1)
            }
        }

        

        .setemail{

            h4{
                font-size: 20px;
                font-weight: normal;
            }
            span{
                display: block;
                text-align: center;
                padding-top: 20px;
            }
        }

        .setphonestep{
            width: 600px;
            margin: 0 auto;
            background: rgba(12, 31, 44, 0.4);
            border-radius: 30px;
            padding: 5px;

            span{
                float: left;
                border-radius: 30px;
                padding: 10px 20px;
            }
            span.gray{
                background: #cccccc
            }
            span.done{
                float: right;
            }
            span.new{
                margin-left: 145px;
            }
        }

        .setphonetips{
            text-align: center;
            padding-top: 30px;

            span{
                display: block;
                padding-top: 20px;
            }
        }

        .setphonebtn{
            text-align: center;
            padding-top: 30px;
            width: 180px;
            margin: 0 auto;

            span{
                display: block;
                padding: 10px 0
            }
        }

        .setoldphonecode{
            text-align: center;
            padding-top: 30px;

            b{
                color: #017EFF;
                font-weight: normal
            }

            .phonecodeitem{
                width: 300px;
                margin: 30px auto 0;
                position: relative;

                input{
                    background: rgba(12, 31, 44, 0.4);
                    border-radius: 3px;
                    padding: 10px;
                    width: 100%;
                }

                .getphonecode{
                    position: absolute;
                    top: 12px;
                    right: 10px;
                    color: #017EFF;
                    font-size: 12px;
                    cursor: pointer;
                    font-weight: normal
                }
            }
        }

        .setnewphone{
            width: 350px;
            margin:30px  auto 0;

            .getnewphonecode{
                position: absolute;
                top: 0;
                right: 10px;
                font-weight: normal;
                color: #017EFF;
                cursor: pointer;
                font-size: 12px;
            }
            .newphonebtn{
                width: 100%;
            }
        }

        .setsuccess{
            padding-top: 50px;
            text-align: center;

            h4{
                font-size: 20px;
                font-weight: normal;
            }
            span{
                display: block;
                padding-top: 20px;
            }
        }
        
    }
    @media only screen and (min-width: 320px) and (max-width:768px){
        .safepage .setlist li span{
            display: block;
            float: none;
            width: 100%;
        }
        .safepage .setlist li .name{
            width: 100%;
        }
        .safepage .setlist li .text{
            color: #999999;
            width: 100%;
            padding-bottom: 10px;
        }

        .safepage .setassetpassword h4{
            text-align: left;
        }
        .safepage .setassetpassword .text{
            text-align: left;
            padding-bottom: 15px;
            line-height: 1.5;
            color: #999999;
        }
        .safepage .setassetpassword{
            padding-top: 0;
        }
        .safepage .setassetpassword .assetpasswordform{
            width: 100%;
        }
        .safepage .setemail span{
            padding-top: 0;
            padding-bottom: 20px
        }
        .safepage .setassetpassword.setemail h4{
            text-align: center;
            padding-top: 10px;
        }
        .safepage .setphonestep{
            width: 100%;
            border-radius: 10px;
            padding: 1px
        }
        .safepage .setphonestep span{
            padding: 3px 7px;
            border-radius: 10px;
        }
        .safepage .setphonestep span.new{
            margin-left: 15%;
        }
        .safepage .setnewphone{
            width:100%;
        }
        .safepage .setassetpassword .four .setsuccess h4{
            text-align: center;
        }
        .safepage .setassetpassword .four .setsuccess span{
            padding-top: 0;
            padding-bottom: 20px;
        }
    }
</style>
