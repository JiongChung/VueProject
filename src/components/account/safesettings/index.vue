<template>
    <div class="safepage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="安全设置" name="first">
                <div class="setlist"  v-if="showsetlist">
                    <ul>
                        <li class="clearfix">
                            <span class="name">资金密码</span>
                            <span class="text">提现、修改安全设置时输入</span>
                            <span class="options"><b class="btn-color" @click="setAssetPassword">设置</b></span>
                        </li>
                        <li class="clearfix">
                            <span class="name">绑定邮箱</span>
                            <span class="text">用于登录、提币、修改安全时输入</span>
                            <span class="options"><b class="btn-color" @click="setEmailNow">设置</b></span>
                        </li>
                        <li class="clearfix">
                            <span class="name">绑定手机</span>
                            <span class="text">提现、修改密码、及安全设置时用以收取验证短信</span>
                            <span class="options"><b class="btn-color" @click="setPhoneNow">设置</b></span>
                        </li>
                        <li class="clearfix">
                            <span class="name">谷歌验证</span>
                            <span class="text">绑定后，登录、提现时需要谷歌二次验证</span>
                            <span class="options"><b class="btn-color" @click="setGoogleNow">启用</b></span>
                        </li>
                    </ul>
                </div>
                <div class="setassetpassword" v-if="showsetassetpassword">
                    <h4>修改资金密码</h4>
                    <span class="text">资金密码将用于资金的提款，保护您的资金不被他人轻易盗用</span>
                    <el-form ref="form" :model="setAssetPasswordForm" class="assetpasswordform">
                        <el-form-item>
                            <el-input v-model="setAssetPasswordForm.currentTradePassword" placeholder="请输入原资金密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="setAssetPasswordForm.newTradePassword" placeholder="请输入新资金密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="setAssetPasswordForm.confirmTradePassword" placeholder="请再次输入资金密码"></el-input>
                        </el-form-item>
                        <el-form-item class="el-form-item-center">
                            <el-button type="primary" @click="saveSetAssetPassword">确认修改</el-button>
                            <el-button>忘记密码</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="setassetpassword" v-if="isSetEmail">
                    <h4>绑定邮箱</h4>
                    <el-form ref="form" :model="setEmailForm" class="assetpasswordform">
                        <el-form-item>
                            <el-input v-model="setEmailForm.email" :disabled="isSendEmailCode" placeholder="请输入邮箱"></el-input>
                            <div v-if="isSendEmailCode">已经发验证码到你的邮箱了，请查收</div>
                        </el-form-item>
                        <el-form-item v-if="isSendEmailCode">
                            <el-input v-model="setEmailForm.emailcode" placeholder="请输入验证码"></el-input>
                        </el-form-item>
                        <el-form-item class="el-form-item-center">
                            <el-button type="primary" @click="getEmailCode" v-if="!isSendEmailCode">下一步</el-button>
                            <el-button type="primary" @click="saveEmailCode" v-if="isSendEmailCode">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="setassetpassword setemail" v-if="isSetEmailSuccess">
                    <h4>恭喜您，验证邮箱成功！</h4>
                    <span>
                        3秒后自动返回上一级页面
                    </span>
                </div>
                <div class="setassetpassword" v-if="isSetPhone">
                    <div class="setphonestep clearfix">
                        <span class="btn-color">验证旧手机</span>
                        <span class="new" :class="{ 'gray' : !isNewDone, 'btn-color' : isNewDone}">验证新手机</span>
                        <span class="done" :class="{ 'gray' : !isDone, 'btn-color' : isDone}">完成</span>
                    </div>
                    <div class="setphonetips" v-if="isSetDone">
                        <span>修改手机号，24小时内限制提币和卖币。</span>
                        <span>一个手机只能绑定一个账号。更换手机后，下次登录可使用新手机登录</span>
                    </div>
                    <div class="one" v-if="isOneStep">
                        <div class="setphonebtn">
                            <span class="btn-color" @click="sendOldPhoneCode">验证原手机</span>
                        </div>
                    </div>
                    <div class="two" v-if="isTwoStep">
                        <div class="setoldphonecode">
                            验证码已经发至 <b>185***963</b>
                            <div class="phonecodeitem">
                                <input type="text" name="phonecode" placeholder="请输入验证码" v-model="phoneCode">
                                <b class="getphonecode">获取验证</b>
                            </div>
                            <div class="setphonebtn">
                                <span class="btn-color" @click="goToNext">下一步</span>
                            </div>
                        </div>
                    </div>
                    <div class="three" v-if="isThreeStep">
                        <div class="setnewphone">
                            <el-form ref="form" :model="setNewPhoneForm">
                                <el-form-item>
                                    <el-input v-model="setNewPhoneForm.phoneNumber" placeholder="请输入新手机号" class="newphonenumber"></el-input>
                                </el-form-item>
                               <el-form-item>
                                    <el-input v-model="setNewPhoneForm.phonecode" placeholder="请输入验证码" class="newphonenumber"></el-input>
                                    <b class="getnewphonecode">获取验证</b>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="saveNewPhone" class="newphonebtn">下一步</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="four" v-if="isFourStep">
                        <div class="setsuccess">
                            <h4>恭喜您，手机修改成功！</h4>
                            <span>
                                3秒后自动返回上一级页面
                            </span>
                        </div>
                    </div>
                </div>
                <div class="setassetpassword" v-if="isSetGoogle">
                    <div class="setgoogle">
                        <h4>请先扫二维码或手动输入秘钥，将手机上生成的动态验证码填到下面的输入框</h4>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                showsetlist: true,
                showsetassetpassword: false,
                activeName: 'first',
                isSendEmailCode: false,
                isSetEmail: false,
                isSetEmailSuccess: false,
                isSetPhone: false,
                isDone: false,
                isNewDone: false,

                setAssetPasswordForm: {
                    currentTradePassword: '',
                    newTradePassword: '',
                    confirmTradePassword: ''
                },

                setEmailForm: {
                    email: '',
                    emailcode: ''
                },

                phoneCode: '',
                isOneStep: true,
                isTwoStep: false,
                isThreeStep: false,
                isFourStep: false,
                isSetDone: true,

                setNewPhoneForm: {
                    phoneNumber: '',
                    phonecode: ''
                },

                isSetGoogle: false
            }
        },
        methods: {
            setAssetPassword(){
                this.showsetlist = false;
                this.showsetassetpassword = true;
            },

            saveSetAssetPassword() {
                console.log(0)
            },

            setEmailNow(){
                this.showsetlist = false;
                this.isSetEmail = true;
            },

            getEmailCode(){
                this.isSendEmailCode = true;
            },

            saveEmailCode(){
                this.isSetEmailSuccess = true;
                this.isSetEmail = false;
                setTimeout(() => {
                    this.showsetlist = true;
                    this.showsetassetpassword = false;
                    this.isSendEmailCode =  false;
                    this.isSetEmailSuccess = false;
                    this.isSetEmail = false;
                    this.isSetPhone = false;
                },3000);
            },

            setPhoneNow(){
                this.showsetlist = false;
                this.isSetPhone = true;
            },

            sendOldPhoneCode(){
                this.isOneStep = false;
                this.isTwoStep = true;
            },

            goToNext(){
                this.isThreeStep = true;
                this.isTwoStep = false;
                this.isNewDone = true;
            },

            saveNewPhone(){
                this.isDone = true;
                this.isThreeStep = false;
                this.isFourStep = true;
                this.isSetDone = false;

                setTimeout(() => {
                    this.showsetlist = true;
                    this.isSetPhone = false;
                    this.isFourStep = false;
                },3000);
            },

            setGoogleNow(){

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

        .setassetpassword{
            padding-top: 20px;
            h4{
                text-align: center;
                font-weight: normal;
                padding-bottom: 20px;
            }
            .text{
                display: block;
                text-align: center;
                padding-bottom: 40px;
            }

            .assetpasswordform{
                width: 350px;
                margin: auto;
            }

            .el-steps-item{
                margin: auto;
                background: red;
                width: 400px;
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
</style>
