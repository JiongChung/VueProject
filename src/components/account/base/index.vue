<template>
    <div class="basepage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本资料" name="first">
                <div class="avataritem">
                    <h4>个人头像</h4>
                    <div class="pic">
                        <span class="img">
                            <img src="../../../assets/images/avatar.jpg" id="Avatar" alt="">
                        </span>
                        <span class="text">上传新头像</span>
                        
                        <input type="file" id="imageUpload" ref="UploadAvatar" @change="UploadAvatar">
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </div>
                </div>
                <div class="formeditbox">
                    <el-form ref="form" :model="form">
                        <ul class="clearfix">
                            <li>
                                <span class="name">
                                    用户名<b>用户名只能修改一次,请慎重修改</b>
                                </span>
                                <input type="text" v-model="form.userName" class="inputchang" :disabled="form.userNameModificationCount > 0" name="username" placeholder="请输入用户名">
                            </li>
                            <li>
                                <span class="name">
                                    所在国家/地区
                                </span>
                                <el-select v-model="country" placeholder="请选择">
                                    <el-option
                                    v-for="item in countryoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <span class="name">
                                    界面语言
                                </span>
                                <el-select v-model="language" placeholder="请选择">
                                    <el-option
                                    v-for="item in languageoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <span class="name">
                                    手机号码
                                </span>
                                <input type="text" class="inputchang" name="phoneNumber" v-model="form.phoneNumber" placeholder="请输入手机号码">
                                <div class="ordercheckbox">
                                    <el-checkbox label="接收订单短信通知" name="type" v-model="form.isOrderPhoneNotice"></el-checkbox>
                                    <el-checkbox label="接收订单邮件通知" v-model="form.isOrderEmailNotice" name="type"></el-checkbox>
                                </div>
                            </li>
                        </ul>
                        <el-form-item class="el-form-item-center">
                            <el-button type="primary" @click="onSubmit" style="width:150px">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
                <div class="chnagepassword">
                    <span class="tips">
                        提醒您，在修改密码成功后的24小时之间将会暂时锁定提币功能，以确保账户安全。
                    </span>
                    <div class="passworditem">
                        <el-form ref="form" :model="passwordform">
                            <el-form-item>
                                <el-input type="password" v-model="passwordform.currentPassword" placeholder="请输入您原先的密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="passwordform.newPassword" placeholder="请输入您的新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="passwordform.confirmpassword" placeholder="请再次输入您的新密码"></el-input>
                            </el-form-item>
                            <button type="button" class="btn-color btn-submit" @click="savePassword($event)" >确认修改</button>
                        </el-form>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    export default Vue.extend({
        data(){
            return{
                activeName: 'first',
                countryoptions: [
                    {
                        value: '1',
                        label: '(+86)China'
                    }
                ],
                country: '',
                language: '',
                languageoptions: [
                    {
                        value: '1',
                        label: '简体中文'
                    },
                    {
                        value: '2',
                        label: '繁体中文'
                    },
                    {
                        value: '3',
                        label: 'English'
                    }
                ],
                form: {
                    userName: '',
                    emailAddress: '',
                    isEmailConfirmed: false,
                    isOrderEmailNotice: false,
                    isOrderPhoneNotice: false,
                    isPhoneNumberConfirmed: false,
                    phoneNumber: '',
                    userNameModificationCount: 0
                },
                passwordform: {
                    currentPassword: '',
                    newPassword:'',
                    confirmpassword: ''
                },
                initUsername: '',
                loadingStatus: false,
                uploadImageUrl : '',
                imageUrl: ''
            }
        },
        mounted: function(){
           this.GetUserProfileForEdit(this.apiService + 'Account/GetUserProfileForEdit');
        },
        methods: {
            handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file)
      },
            
            UploadAvatar(){
                this.uploadImageUrl = this.$refs.UploadAvatar.value;
                console.log(this.$refs.UploadAvatar.value)
                // console.log(this.$refs.UploadAvatar.files[0]);

                 if (window.FileReader) {    
                    var reader = new FileReader();    
                    reader.readAsDataURL(this.$refs.UploadAvatar.files[0]);   
                    reader.onloadend = function (e) {
                         document.getElementById('Avatar').src = e.target.result;
                    };    
                } 

            },
            UpdateProfilePicture(url){
                let data = {};
                // data.fileName = this.uploadImageUrl;
                data.fileName = 'C:/1.png';
                this.$http.put(url,data).then(response => {
                    console.log(response)
                });
            },
            onSubmit() {
                let status = false;
                if(!this.commonService.zValidate.phone(this.form.phoneNumber)){
                    status = true;
                    this.$message.error('手机格式错误，请重新输入');
                }
                if(status){
                    return false;
                }
                let url = this.apiService + 'Account/UpdateUserProfile';
                if(this.uploadImageUrl){
                    this.UpdateProfilePicture(this.apiService + 'Profile/UpdateProfilePicture');
                }
                
                this.$http.put(url,this.form).then(response => {
                    console.log(response)
                });
            },
            savePassword: function(obj){
                if(this.loadingStatus == true){
                    return false;
                }
                let status = false;
                if(!this.commonService.zValidate.password(this.passwordform.currentPassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合密码');
                }
                if(!this.commonService.zValidate.password(this.passwordform.newPassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合密码');
                }
                if(!this.commonService.zValidate.password(this.passwordform.confirmpassword)){
                    status = true;
                    this.$message.error('请输入8位至20位英文数字组合密码');
                }
                if(this.passwordform.newPassword != this.passwordform.confirmpassword && this.passwordform.confirmpassword.length > 0 && this.passwordform.confirmpassword.length > 7){
                    status = true;
                    this.$message.error('两次密码输入不正确');
                }
                if(status){
                    return false;
                }
                this.loadingStatus = true;
                obj.target.classList.add('loading');
                let url = this.apiService + 'Profile/ChangePassword';
                delete this.passwordform.confirmpassword;
                this.$http.post(url,this.passwordform).then(response => {
                    console.log(response);
                    this.$notify({
                        title: '',
                        message: '密码修改成功',
                        type: 'success'
                    });
                    this.passwordform.currentPassword = '';
                    this.passwordform.newPassword = '';
                    this.passwordform.confirmpassword = '';
                    this.loadingStatus = false;
                    obj.target.classList.remove('loading');
                }, err => {
                    this.$message.error('您原先的密码不正确');
                    this.loadingStatus = false;
                    obj.target.classList.remove('loading');
                });
            },

            GetUserProfileForEdit(url){
                this.$http.get(url).then(response => {
                    this.form = response.body.result;
                    this.initUsername = this.form.userName;
                });
            }
        }
    })
</script>
<style lang="less" scoped>
    .avataritem{
        padding-top: 20px;

        h4{
            padding-bottom: 20px;
            font-weight: normal
        }
        .pic{
            position: relative;
            padding-left: 150px;
            min-height: 130px;
        }
        .img{
            width: 130px;
            height: 130px;
            position: absolute;
            top: 0;
            left: 0;

            img{
                width: 130px;
                height: 130px;;
            }
        }
        
        .text{
            padding-bottom: 20px;
            padding-top: 20px;
            display: block
        }
    }

    .formeditbox{
        padding-top: 50px;

        li{
            float: left;
            width: 50%;
            padding-right: 5%;
            padding-bottom: 30px;

            .name{
                display: block;
                padding-bottom: 10px;

                b{
                    font-weight: normal;
                    color: #017EFF;
                    padding-left: 10px;
                }
            }

            .ordercheckbox{
                padding-top: 30px;
            }
        }
    }

    .chnagepassword{
        padding-top: 20px;

        .tips{
            display: block;
            padding-bottom: 30px;
        }

        .passworditem{
            width: 30%;
        }
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .avataritem{
            padding-top: 0;
        }
        .formeditbox{
            padding-top: 20px;
        }
        .formeditbox li{
            float: none;
            width: 100%;
        }
        .chnagepassword{
            padding-top: 0;
        }
        .chnagepassword .tips{
            line-height: 1.5;
            padding-bottom: 20px;
        }
        .chnagepassword .passworditem{
            width: 100%;
        }
    }
</style>
