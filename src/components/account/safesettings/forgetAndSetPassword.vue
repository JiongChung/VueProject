<template>
    <div class="forgetpasswordpage" v-if="setForgetPassWord">
        <div class="find-item" v-if="isFindStatus">
            <h4 class="title">
                找回资金密码
            </h4>
            <span class="text">
                请通过手机或邮箱来找回资金密码
            </span>
            <div class="setpassword-item">
                <div class="tabs">
                    <ul class="clearfix">
                        <li 
                        v-for="(item,index) in tabs" 
                        :class="{active:index == num}"
                        @click="tab(index)">{{item}}</li>
                    </ul>
                </div>
                <div class="tabContent">
                    <div v-show="tabContents.tabs1 == num">
                        <div class="find-from-phone">
                            <el-form ref="form" :model="setPassByPhone">
                                <el-form-item>
                                    <el-input v-model="setPassByPhone.phone" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item class="inputbox">
                                    <el-input v-model="setPassByPhone.phonecode" maxlength="6" placeholder="请输入验证码"></el-input>
                                    <div class="getcode" @click="getPhoneCode($event)">获取验证码</div>
                                </el-form-item>
                                <el-form-item class="el-form-item-center">
                                    <button type="button" class="btn-color btn-submit" @click="onSubmitByPhone($event)" >下一步</button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div v-show="tabContents.tabs2 == num">
                        <div class="find-from-email">
                            <el-form ref="form" :model="setPassByEmail">
                                <el-form-item>
                                    <el-input v-model="setPassByEmail.email" placeholder="请输入邮箱地址"></el-input>
                                </el-form-item>
                                <el-form-item class="inputbox">
                                    <el-input v-model="setPassByEmail.emailcode" maxlength="6" placeholder="请输入验证码"></el-input>
                                    <div class="getcode" @click="getEmailCode($event)">获取验证码</div>
                                </el-form-item>
                                <el-form-item class="el-form-item-center">
                                    <button type="button" class="btn-color btn-submit" @click="onSubmitByEmail($event)" >下一步</button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="set-item" v-else>
            <h4 class="title">
                找回资金密码
            </h4>
            <span class="text">
                请按要求设置您的新资金密码
            </span>
            <div class="setpassword-item set-password-item">
                <el-form ref="form" :model="savePassByPhone">
                    <el-form-item>
                        <el-input v-model="savePassByPhone.currentTradePassword" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="savePassByPhone.currentTradeConfirmPassword" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="el-form-item-center">
                        <button type="button" class="btn-color btn-submit" @click="saveSubmit($event)">完成</button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['setForgetPassWord'],
    data(){
        return{
            tabs: ["手机找回", "邮箱找回"],
            tabContents: {
                tabs1: 0,
                tabs2: 1
            },
            num: 0,
            setPassByPhone:{
                phone: '',
                phonecode: ''
            },
            getphonecodestatus: true,
            isFindStatus : true,
            savePassByPhone: {
                currentTradePassword: '',
                currentTradeConfirmPassword: ''
            },
            loadingStatus: false,
            setPassByEmail: {
                email: '',
                emailcode: ''
            }
        }
    },
    methods: {
        tab(index) {
            this.num = index;
        },
        getEmailCode(obj){
            if(!this.commonService.zValidate.email(this.setPassByEmail.email)){
                this.$message.error('邮箱格式不正确');
            }else{
                if(this.getphonecodestatus){
                    this.sendPhoneCode(obj.target, 'email');
                }else{
                    let name = obj.target.className.split(' ');
                    if(name.indexOf('loading') == -1){
                        this.getphonecodestatus = true;
                        this.sendPhoneCode(obj.target, 'email');
                    }
                }
            }
        },
        onSubmitByEmail(obj){
            let status = false;
            if(!this.commonService.zValidate.email(this.setPassByEmail.email)){
                status = true;
                this.$message.error('邮箱格式不正确');
            }
            if(!this.commonService.zValidate.int(this.setPassByEmail.emailcode)){
                status = true;
                this.$message.error('验证码格式不正确');
            }
            if(status){
                return false;
            }

           
            console.log('aaa');
        },
        onSubmitByPhone(obj){
            let that = this;
            if(this.loadingStatus)return;
            let status = false;
            if(!this.commonService.zValidate.phone(this.setPassByPhone.phone)){
                status = true;
                this.$message.error('手机号码格式不正确');
            }
            if(!this.commonService.zValidate.int(this.setPassByPhone.phonecode)){
                status = true;
                this.$message.error('手机验证码格式不正确');
            }
            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');
            let url = this.apiService + 'Account/FindTradePassByPhone';
            let data = {};
            data.phoneNumber = this.setPassByPhone.phone;
            data.code = this.setPassByPhone.phonecode;
            
            this.$http.post(url, data).then(response => {
                console.log(response);
                that.isFindStatus = false;
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
            },err => {
                console.log(err);
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
            });
        },
        saveSubmit(obj){
            if(this.loadingStatus)return;
            let that = this;
            if(this.loadingStatus)return;
            let status = false;
            if(!this.commonService.zValidate.password(this.savePassByPhone.currentTradePassword)){
                status = true;
                this.$message.error('请输入8位至20位英文数字组合密码');
            }
            if(!this.commonService.zValidate.password(this.savePassByPhone.currentTradeConfirmPassword)){
                status = true;
                this.$message.error('请输入8位至20位英文数字组合密码');
            }
            if(this.savePassByPhone.currentTradePassword != this.savePassByPhone.currentTradeConfirmPassword && this.savePassByPhone.currentTradeConfirmPassword.length > 7){
                status = true;
                this.$message.error('两次密码输入不相同');
            }
            if(status){
                return false;
            }
            this.loadingStatus = true;
            obj.target.classList.add('loading');

            let url = this.apiService + 'Account/CreateOrUpdateTradePassword';
            let data = {};
            data.currentTradePassword = this.savePassByPhone.currentTradePassword;
            data.type = 'Phone';
            data.isReset = true;
            data.phoneNumber = this.setPassByPhone.phone;
            data.code = this.setPassByPhone.phonecode;

            this.$http.post(url, data).then(response => {
                console.log(response);
                this.$notify({
                    title: '密码重置成功',
                    message: '您重置了资金密码，24小时内限制提币和卖币。',
                    type: 'success'
                });
                that.$emit('listenTradePassword','forgetsave');
                that.isFindStatus = true;
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
            },err => {
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
            });
        },
        getPhoneCode(obj){
            if(!this.commonService.zValidate.phone(this.setPassByPhone.phone)){
                this.$message.error('手机号码格式不正确');
            }else{
                if(this.getphonecodestatus){
                    this.sendPhoneCode(obj.target, 'phone');
                }else{
                    let name = obj.target.className.split(' ');
                    if(name.indexOf('loading') == -1){
                        this.getphonecodestatus = true;
                        this.sendPhoneCode(obj.target, 'phone');
                    }
                }
            }
        },
        sendPhoneCode(obj, type){
            let status = this.commonService.getPhoneCodeNow(obj, 60 ,true,'获取验证码','重新发送');
            this.getphonecodestatus = status;
            if(type == 'phone'){
                this.SendSmsCode(this.apiService + 'Account/SendSmsCode');
            }else{
                this.SendEmailCode(this.apiService + 'Account/SendEmailCode');
            }
        },
        SendEmailCode(url){
            let data = {};
            data.phoneNumber = this.setPassByEmail.phone;
            data.codeType = 5;
            this.$http.post(url, data).then(response => {
                console.log(response)
            },err => {
                console.log(err)
            });
        },
        SendSmsCode(url){
            let data = {};
            data.email = this.setPassByPhone.email;
            data.codeType = 5;
            this.$http.post(url, data).then(response => {
                console.log(response)
            },err => {
                console.log(err)
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .forgetpasswordpage{
        padding-top: 20px;
        h4.title{
            font-size: 16px;
            font-weight: normal;
            text-align: center;
        }
        .text{
            display: block;
            text-align: center;
            padding: 15px 0;
        }

        .setpassword-item{
            width: 400px;
            margin: 0 auto;
            padding: 20px 0;

            .tabs ul{
                border: solid 1px #007eff;
                border-radius: 5px;
            }
            .tabs li{
                float: left;
                width: 50%;
                padding: 15px 0;
                text-align: center;
                font-size: 16px;
                cursor: pointer;
            }
            .tabs li.active{
                background: #007eff;
            }

            .tabContent{
                padding-top: 30px;

                .inputbox{
                    position: relative;

                    .getcode{
                        position: absolute;
                        top: 0;
                        right: 10px;
                        bottom: 0;
                        margin: auto;
                        color: #007eff;
                        cursor: pointer;
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }

            .btn-color{
                width: 100%;
                padding: 15px 0;
                font-size: 16px;
            }
        }
    }
    @media only screen and (min-width: 320px) and (max-width:768px){
        
      .forgetpasswordpage{
          padding-top: 0;
      }
      .forgetpasswordpage .setpassword-item{
          width: 100%;
      }
        
    }
</style>
