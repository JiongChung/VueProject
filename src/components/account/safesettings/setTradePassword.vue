<template>
   <div class="setassetpassword" v-if="showpassword">
        <div v-if="!setStatus">
            <h4>设置资金密码</h4>
            <span class="text">资金密码将用于资金的提款，保护您的资金不被他人轻易盗用</span>
            <el-form ref="form" :model="setPasswordForm" class="assetpasswordform">
                <el-form-item>
                    <el-input type="password" v-model="setPasswordForm.currentTradePassword" placeholder="请输入8位至20位英文数字组合的资金密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="setPasswordForm.confirmTradePassword" placeholder="请再次输入资金密码"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-center">
                    <button type="button" class="btn-color btn-submit" @click="saveSetAssetPassword($event, 0)" >提交</button>
                    <span class="cancel" @click="cancelEdit">取消并返回</span>
                </el-form-item>
            </el-form>
        </div>
        <div v-else>
            <h4>修改资金密码</h4>
            <span class="text">资金密码将用于资金的提款，保护您的资金不被他人轻易盗用</span>
            <el-form ref="form" :model="EditPasswordForm" class="assetpasswordform">
                <el-form-item>
                    <el-input type="password" v-model="EditPasswordForm.currentTradePassword" placeholder="请输入原资金密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="EditPasswordForm.newTradePassword" placeholder="请输入新资金密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="EditPasswordForm.confirmTradePassword" placeholder="请再次输入资金密码"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-center">
                    <button type="button" class="btn-color btn-submit" @click="saveSetAssetPassword($event, 1)" >提交</button>
                    <span class="cancel" @click="ForgetPassword">忘记密码</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['setStatus','showpassword'],
    data(){
        return{
            isShowItem: false,
            loadingStatus: false,
            setPasswordForm: {
                currentTradePassword: '',
                confirmTradePassword: ''
            },
            EditPasswordForm: {
                currentTradePassword: '',
                newTradePassword: '',
                confirmTradePassword: ''
            }
        }
    },
    mounted: function(){
        // this.isShowItem = this.showpassword;
    },
    methods: {
        saveSetAssetPassword(obj, num){
            let status = false;
            if(this.loadingStatus)return;
            if(num == 0){
                if(!this.commonService.zValidate.password(this.setPasswordForm.currentTradePassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合的资金密码');
                }
                if(!this.commonService.zValidate.password(this.setPasswordForm.confirmTradePassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合的资金密码');
                }
                if(this.setPasswordForm.currentTradePassword != this.setPasswordForm.confirmTradePassword){
                    status = true;
                    this.$message.error('两次输入密码不正确');
                }
            }else{
                if(!this.commonService.zValidate.password(this.EditPasswordForm.currentTradePassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合的资金密码');
                }
                if(!this.commonService.zValidate.password(this.EditPasswordForm.newTradePassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合的资金密码');
                }
                if(!this.commonService.zValidate.password(this.EditPasswordForm.confirmTradePassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合的资金密码');
                }
                if(this.EditPasswordForm.newTradePassword != this.EditPasswordForm.confirmTradePassword){
                    status = true;
                    this.$message.error('两次输入密码不正确');
                }
            }
            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');
            
            let data = {};
            let url = this.apiService + 'Account/CreateOrUpdateTradePassword';
            if(num == 0){
                data = this.setPasswordForm;
                delete data.confirmTradePassword;
            }else{
                data = this.EditPasswordForm;
                delete data.confirmTradePassword;
            }
            
            this.$http.post(url,data).then(res => {
                this.loadingStatus = false;
                obj.target.classList.remove('loading');
                this.$notify({
                    title: '',
                    message: '设置资金密码成功',
                    type: 'success'
                });
                if(num == 0){
                    this.setPasswordForm.currentTradePassword = '';
                    this.setPasswordForm.confirmTradePassword = '';
                }else{
                    this.EditPasswordForm.currentTradePassword = '';
                    this.EditPasswordForm.newTradePassword = '';
                    this.EditPasswordForm.confirmTradePassword = '';
                }
                
                this.$emit('listenTradePassword','success');
            }, err => {
                this.$message.error(err.body.error.message);
                this.loadingStatus = false;
                obj.target.classList.remove('loading');
                if(num == 0){
                    this.setPasswordForm.confirmTradePassword = this.setPasswordForm.currentTradePassword;
                }else{
                    this.EditPasswordForm.confirmTradePassword = this.EditPasswordForm.newTradePassword;
                }
            });
        },
        cancelEdit(){
            this.$emit('listenTradePassword','close');
        },
        setShowitem(){
            this.isShowitem = true;
        },
        ForgetPassword(){
             this.$emit('listenTradePassword','forget');
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
