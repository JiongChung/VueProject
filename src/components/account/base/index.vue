<template>
    <div class="basepage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本资料" name="first">
                <div class="avataritem">
                    <h4>个人头像</h4>
                    <div class="pic">
                        <span class="img">
                            <img src="../../../assets/images/avatar.jpg" alt="">
                        </span>
                        <span class="text">上传新头像</span>
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            multiple>
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </div>
                <div class="formeditbox">
                    <el-form ref="form" :model="form">
                        <ul class="clearfix">
                            <li>
                                <span class="name">
                                    用户名<b>用户名只能修改一次,请慎重修改</b>
                                </span>
                                <input type="text" class="inputchang" name="username" v-model="username" placeholder="请输入用户名">
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
                                <input type="text" class="inputchang" name="phoneNumber" v-model="phoneNumber" placeholder="请输入手机号码">
                                <div class="ordercheckbox">
                                    <el-checkbox-group v-model="form.type">
                                    <el-checkbox label="接收订单短信通知" name="type"></el-checkbox>
                                    <el-checkbox label="接收订单邮件通知" name="type"></el-checkbox>
                                </el-checkbox-group>
                                </div>
                            </li>
                        </ul>
                        <el-form-item class="el-form-item-center">
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
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
                                <el-input v-model="passwordform.currentPassword" placeholder="请输入您原先的密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="passwordform.newpasswords" placeholder="请输入您的新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="passwordform.confirmpassword" placeholder="请再次输入您的新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="savePassword">确认修改</el-button>
                            </el-form-item>
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
                username: '',
                phoneNumber: '',
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
                    type: [],
                },
                passwordform: {
                    currentPassword: '',
                    newpasswords:'',
                    confirmpassword: ''
                }
            }
        },
        methods: {
            handlePreview(file) {
                console.log(file);
            },
            onSubmit() {
                console.log('submit!');
            },
            savePassword: function(){
                console.log('submit!');
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
</style>
