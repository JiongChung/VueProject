<template>
    <div>
        <div class="setassetpassword" v-if="setEmailStatus">
            <div v-if="!setStatus">
                <h4>绑定邮箱</h4>
                <el-form ref="form" :model="setEmailForm" class="assetpasswordform">
                    <el-form-item>
                        <el-input v-model="setEmailForm.email" :disabled="isSendEmailCode" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item class="inputbox">
                        <el-input maxlength="6" v-model="setEmailForm.emailcode" placeholder="请输入验证码"></el-input>
                        <div class="getcode" @click="getEmailCode($event)">获取验证码</div>
                    </el-form-item>
                    <el-form-item class="el-form-item-center">
                        <!-- <button type="button" class="btn-color btn-submit" @click="getEmailCode($event)" v-if="!isSendEmailCode">下一步</button> -->
                        <button type="button" class="btn-color btn-submit" @click="onSubmit($event,'绑定邮箱成功')">绑定邮箱</button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <h4>修改邮箱</h4>
                <el-form ref="form" :model="setEmailForm" class="assetpasswordform">
                    <el-form-item v-if="isSendOriginalEmailCode">
                        <el-input v-model="setEmailForm.email" placeholder="请输入新的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item class="inputbox">
                        <el-input v-model="setEmailForm.emailcode" maxlength="6" placeholder="请输入验证码"></el-input>
                        <div class="getcode" id="getEmailCode" v-if="!isSendOriginalEmailCode" @click="getOriginalEmailCode($event)">获取验证码</div>
                        <div class="getcode" id="getEmailCode" v-else @click="getEmailCode($event)">获取验证码</div>
                    </el-form-item>
                    <el-form-item class="el-form-item-center">
                        <button type="button" class="btn-color btn-submit" v-if="!isSendOriginalEmailCode" @click="CheckOriginalEmailCode($event)">下一步</button>
                        <button type="button" class="btn-color btn-submit" v-else @click="onSubmit($event,'修改邮箱成功')">保存</button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['setStatus','setEmailStatus'],
    data(){
        return{
            isSendEmailCode: false,
            isSetEmailSuccess: false,
            setEmailForm: {
                email: '',
                emailcode: ''
            },
            loadingStatus: false,
            getEmailcodestatus: true,
            isSendOriginalEmailCode: false
        }
    },
    methods: {
        editSubmit(obj){

        },
        getOriginalEmailCode(obj){
            if(this.getEmailcodestatus){
                this.sendEmail(obj.target, 'originalemail');
            }else{
                let name = obj.target.className.split(' ');
                if(name.indexOf('loading') == -1){
                    this.getEmailcodestatus = true;
                    this.sendEmail(obj.target, 'originalemail');
                }
            }
        },
        
        CheckOriginalEmailCode(obj){
            if(this.loadingStatus)return;
            let url = this.apiService + 'Account/CheckOriginalEmailCode';
            this.loadingStatus = true;
            obj.target.classList.add('loading');
            let that = this;
            let btn = document.getElementById('getEmailCode');
            
            this.$http.post(url, {code: this.setEmailForm.emailcode}).then(response => {
                console.log(response);
                this.$notify({
                    title: '',
                    message: '验证码有效，请继续操作。',
                    type: 'success'
                });
                that.isSendOriginalEmailCode = true;
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
                that.setEmailForm.emailcode = '';
                that.commonService.getPhoneCodeNow(btn, 0 ,true,'获取验证码','重新发送', 'off');
            },err => {
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
                this.$message.error(err.body.error.message);
            });
            
        },
        saveSubmit(obj){

        },
        onSubmit(obj, tipsMessage){
            console.log(this.setStatus);
            if(this.loadingStatus)return;
            let status = false;
            if(!this.commonService.zValidate.email(this.setEmailForm.email)){
                status = true;
                this.$message.error('邮箱格式不正确');
            }
            if(!this.commonService.zValidate.int(this.setEmailForm.emailcode)){
                status = true;
                this.$message.error('验证码格式不正确');
            }
            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');

            let url = this.apiService + 'Account/BindEmail';
            let data = {};
            let that = this;
            data.email = this.setEmailForm.email;
            data.code = this.setEmailForm.emailcode;

            // setTimeout(() => {
            //     that.loadingStatus = false;
            //     obj.target.classList.remove('loading');
            //     this.$notify({
            //         title: '',
            //         message: '绑定邮箱成功',
            //         type: 'success'
            //     });

            //     that.$emit('listenSetEmail','bindemail');
            // },2000);

            this.$http.post(url, data).then(response => {
                console.log(response);
                this.$notify({
                    title: '',
                    message: tipsMessage,
                    type: 'success'
                });
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
                that.$emit('listenSetEmail','bindemail');
            },err => {
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
                that.$message.error(err.body.error.message);
            });
        },

        getEmailCode(obj){
            if(!this.commonService.zValidate.email(this.setEmailForm.email)){
                this.$message.error('邮箱格式不正确');
            }else{
                if(this.getEmailcodestatus){
                    this.sendEmail(obj.target, 'bindemail');
                }else{
                    let name = obj.target.className.split(' ');
                    if(name.indexOf('loading') == -1){
                        this.getEmailcodestatus = true;
                        this.sendEmail(obj.target, 'bindemail');
                    }
                }
            }
        },

        sendEmail(obj, type){
            let status = this.commonService.getPhoneCodeNow(obj, 60 ,true,'获取验证码','重新发送');
            this.getEmailcodestatus = status;
            if(type == 'bindemail'){
                this.SendEmailCode(this.apiService + 'Account/SendEmailCode');
            }else if(type == 'originalemail'){
                this.SendOriginalEmailCode(this.apiService + 'Account/SendOriginalEmailCode');
            }
        },
        SendOriginalEmailCode(url){
            this.$http.post(url).then(response => {
                this.$notify({
                    title: '',
                    message: '系统已经将验证码发到您的原始邮箱了，请查收。',
                    type: 'success'
                });
            },err => {
                console.log(err)
            });
        },
        SendEmailCode(url){
            let data = {};
            data.email = this.setEmailForm.email;
            data.codeType = 3;

            this.$http.post(url, data).then(response => {
                console.log(response);
                this.$notify({
                    title: '',
                    message: '系统已经将验证码发到您的邮箱了，请查收。',
                    type: 'success'
                });
            },err => {
                console.log(err)
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .setassetpassword{
        padding-top: 20px;
        h4{
            text-align: center;
            font-weight: normal;
            padding-bottom: 20px;
            font-size: 18px;
        }
        .text{
            display: block;
            text-align: center;
            padding-bottom: 40px;
        }

        .assetpasswordform{
            width: 400px;
            margin: auto;
            padding-top: 30px;
        }

        .el-steps-item{
            margin: auto;
            background: red;
            width: 400px;
        }

        .btn-color{
            width: 100%;
            font-size: 16px;
            margin-top: 20px;
        }

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
    @media only screen and (min-width: 320px) and (max-width:768px){
        
        .setassetpassword h4{
            text-align: left;
        }
        .setassetpassword .text{
            text-align: left;
            padding-bottom: 15px;
            line-height: 1.5;
            color: #999999;
        }
        .setassetpassword{
            padding-top: 0;
        }
        .setassetpassword .assetpasswordform{
            width: 100%;
            padding-top: 0;
        }
        
        .setassetpassword.setemail h4{
            text-align: center;
            padding-top: 10px;
        }
        
        .setassetpassword .four .setsuccess h4{
            text-align: center;
        }
        .setassetpassword .four .setsuccess span{
            padding-top: 0;
            padding-bottom: 20px;
        }

        
    }
</style>
