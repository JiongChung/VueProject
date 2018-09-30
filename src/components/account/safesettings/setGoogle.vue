<template>
    <div class="setassetpassword" v-if="setGoogleStatus">
        <div class="setgoogle" v-if="!setStatus">
            <h4>请先扫二维码或手动输入秘钥，将手机上生成的动态验证码填到下面的输入框</h4>
            <div class="google-item clearfix">
                <div class="google-info">
                    <span class="name">
                        帐号名称：{{issuer}}
                    </span>
                    <span class="img">
                        <img :src="qrCode" id="qrCodeImage">
                    </span>
                    <span class="key">
                        密钥：<b>{{Key}}</b>
                    </span>
                </div>
                <div class="google-form">
                    <ul>
                        <li>
                            <input type="text" v-model="phone" placeholder="请输入手机号码">
                        </li>
                        <li>
                            <div class="inputbox">
                                <input type="text" maxlength="6" v-model="phoneCode" placeholder="请输入短信验证码">
                                <span class="getcode" id="gethonecode" @click="getcode($event)">发送验证码</span>
                            </div>
                        </li>
                        <li>
                            <div class="inputbox">
                                <input type="text" v-model="googleCode" placeholder="请输入谷歌验证码">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="googlecode-info">
                <h4>如何安装谷歌验证码？</h4>
                <ul>
                    <li><em>iPhone</em>手机在App Store中搜索Google Authenticator下载应用</li>
                    <li><em>Android</em>手机在安卓应用市场中搜索“谷歌身份验证器”，或搜索GoogleAuthenticator下载应用</li>
                    <li>绑定后，登录、提现、支付时需要谷歌二次验证，<a>查看详细教程</a></li>
                </ul>
                <div class="btn">
                    <button type="button" class="btn-color btn-submit" @click="UpdateGoogleAuthenticator($event)">验证并启用</button>
                </div>
            </div>
        </div>
        <div class="setgoogle" v-else>
            <div class="unbind">
                <h4>请输入6位数谷歌验证码来解绑谷歌验证</h4>
                <input ref="password" id="passwordpassword" type="password" maxlength="6" v-model="password"  />
                <ul class="clearfix" @click="focus">
                    <li><i v-if="passwordLength > 0"></i></li>
                    <li><i v-if="passwordLength > 1"></i></li>
                    <li><i v-if="passwordLength > 2"></i></li>
                    <li><i v-if="passwordLength > 3"></i></li>
                    <li><i v-if="passwordLength > 4"></i></li>
                    <li><i v-if="passwordLength > 5"></i></li>
                </ul>
                <div class="btn">
                    <button type="button" class="btn-color btn-submit" @click="UnbindGoogle($event)">解绑谷歌验证</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['setStatus','setGoogleStatus'],
    data(){
        return{
            phoneCode: '',
            googleCode: '',
            issuer: '',
            Key: '',
            qrCode: '',
            phone: '',
            getPhonecodestatus: true,
            loadingStatus: false,
            password:'',
            passwordLength:0,
        }
    },
    watch:{
        password(curVal){
            if(/[^\d]/g.test(curVal)){
                this.password = this.password.replace(/[^\d]/g,'');
            }else{
                this.passwordLength = curVal.length;
                if(this.passwordLength == 6){
                    // console.log(this.password);
                }
            }
        },
    },
    methods:{
        GetGoogleAuthenticator(){
            let url = this.apiService + 'Account/GetGoogleAuthenticator';
            let that = this;

            this.$http.get(url).then(response => {
                that.issuer = response.body.result.issuer;
                that.Key = response.body.result.googleAuthenticatorKey;
                that.qrCode = response.body.result.qrCodeSetupImageUrl;
                console.log(response.body.result);
            },err => {
                console.log(err);
            });
        },

        getcode(obj){
            if(!this.commonService.zValidate.phone(this.phone)){
                this.$message.error('手机格式不正确');
            }else{
                if(this.getPhonecodestatus){
                    this.sendCode(obj.target);
                }else{
                    let name = obj.target.className.split(' ');
                    if(name.indexOf('loading') == -1){
                        this.getPhonecodestatus = true;
                        this.sendCode(obj.target);
                    }
                }
            }
        },

        sendCode(obj){
            let status = this.commonService.getPhoneCodeNow(obj, 60 ,true,'获取验证码','重新发送');
            this.getPhonecodestatus = status;
            this.SendSmsCode(this.apiService + 'Account/SendSmsCode');
        },

        SendSmsCode(url){
            let data = {};
            data.phoneNumber = this.phone;
            data.codeType = 6;
            this.$http.post(url, data).then(response => {
                console.log(response);
            },err => {
                console.log(err);
            });
        },

        UpdateGoogleAuthenticator(obj){
            let status = false;
            if(this.loadingStatus)return;

            if(!this.commonService.zValidate.int(this.phoneCode)){
                status = true;
                this.$message.error('验证码格式不正确');
            }
            if(!this.googleCode){
                status = true;
                this.$message.error('谷歌验证码不能为空');
            }

            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');
            let btn = document.getElementById('gethonecode');
            let url = this.apiService + 'Account/UpdateGoogleAuthenticator';
            let data = {};
            data.code = this.phoneCode;
            data.googleCode = this.googleCode; 

            this.$http.put(url, data).then(response => {
                console.log(response);
                this.loadingStatus = false;
                this.phone = '';
                this.phoneCode = '';
                this.googleCode = '';
                obj.target.classList.remove('loading');  
                this.$emit('listenSetGoogle','bind');
                this.$notify({
                    title: '',
                    message: '绑定谷歌验证成功！！',
                    type: 'success'
                });
                this.commonService.getPhoneCodeNow(btn, 0 ,true,'获取验证码','重新发送', 'off');
            },err => {
                console.log(err);
                this.loadingStatus = false;
                obj.target.classList.remove('loading');  
                this.$message.error(err.body.error.message);                
                this.commonService.getPhoneCodeNow(btn, 0 ,true,'获取验证码','重新发送', 'off');
            });
        },

        focus(){
            this.$refs.password.focus();
        },

        UnbindGoogle(obj){
            let status = false;
            if(this.loadingStatus)return;
            if(this.passwordLength < 6){
                status = true;
                this.$message.error('请输入6位密码');     
            }
            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');
            let url = this.apiService + 'Account/UpdateGoogleAuthenticator';
            let data = {};
            data.googleCode = this.password;

            this.$http.put(url, data).then(response => {
                console.log(response);
                this.loadingStatus = false;
                this.password = '';
                obj.target.classList.remove('loading');  
                this.$emit('listenSetGoogle','unbind');
                this.$notify({
                    title: '',
                    message: '解绑谷歌验证成功！',
                    type: 'success'
                });
            },err => {
                console.log(err);
                this.loadingStatus = false;
                obj.target.classList.remove('loading');  
                this.$message.error(err.body.error.message); 
            });

        }
    }
}
</script>
<style lang="less" scoped>

.setgoogle{

        h4{
            font-size: 18px;
            font-weight: normal;
            padding-top: 20px;
        }
    
        .google-item{
            padding-top: 40px;
            
            .google-info{
                float: left;
                width: 300px;

                span{
                    display: block;

                    b{
                        font-weight: normal;
                        color: #ff0103;
                    }
                }
                .img{
                    height: 190px;
                }
                span + span{
                    padding-top: 10px;
                }
            }

            .google-form{
                float: left;

                label{
                    display: block;
                    width: 100%;
                    padding-bottom: 10px;
                }

                .inputbox{
                    position: relative;

                    .getcode{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 10px;
                        margin: auto;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        cursor: pointer;
                    }
                }

                li{
                    padding-bottom: 30px;

                    input{
                        width: 400px;
                        background: rgba(12, 31, 44, 0.4);
                        border-radius: 5px;
                        padding: 15px 10px;
                        color: #ffffff;
                    }
                }
            }
        }

        .googlecode-info{
            padding-top: 30px;
            width: 80%;
            margin: 0 auto;

            h4{
                font-size: 16px;
                padding-bottom: 15px;
            }
            li{
                line-height: 1.5;
                padding-bottom: 10px;

                em{
                    color: #017EFF;
                }
            }
            li:last-child{
                font-size: 16px;
                padding-top: 20px;

                a{
                    color: #017EFF;
                }
            }

            .btn{
                text-align: center;
                padding: 20px 0;

                .btn-color{
                    font-size: 16px;
                    padding: 10px 50px;
                }
            }
        }

    .unbind{
        h4{
            text-align: center;
            padding: 30px 0 20px;
        }

        input{
            opacity: 0;
            height: 0;
        }

        ul{
            width: 350px;
            height: 50px;
            margin: 0 auto;
            cursor: pointer;
        }
        li{
            text-align: center;
            line-height: 50px;
            background: rgba(12, 31, 44, 0.7);
            color: #ffffff;
            height: 50px;
            width: 50px;
            float: left;
            margin-right: 10px;
        }
        li:last-child{
            margin-right: 0;
        }
        li i{
            height: 10px;
            width: 10px;
            border-radius:50% ;
            background: #ffffff;
            display: inline-block;
        }

        .btn{
            text-align: center;
            padding-top: 50px;

            button{
                padding: 10px 50px;
                font-size: 16px;
            }
        }
    }
}

@media only screen and (min-width: 320px) and (max-width:768px){
    .setgoogle h4{
        font-size: 14px;
        padding: 0;
        line-height: 1.5;
    }

    .setgoogle .google-item{
        padding-top: 20px;
    }
    .setgoogle .google-item .google-info{
        width: 100%;
        float: none;
    }
    .setgoogle .google-item .google-form{
        float: none;
        padding-top: 20px;
    }
    .setgoogle .google-item .google-form li{
        padding-bottom: 10px;
    }
    .setgoogle .googlecode-info{
        padding-top: 0;
        width: 100%;
    }
    .setgoogle .unbind h4{
        
        padding: 5px 0 10px
    }
    .setgoogle .unbind li{
        width: 30px;
        height: 30px;
        line-height: 30px;
    }
    .setgoogle .unbind ul{
        width: 230px;
        height: 40px;
    }

    .setgoogle .unbind .btn{
        padding: 20px 0;
    }

    
}
</style>
