<template>
    <div id="header-item">
        <div class="header clearfix">
            <div class="logo">

            </div>
            <div class="header-nav">
                <div class="login-item">
                    <ul>
                        <li class="needlogin" v-if="!isLoginNow"><router-link to="/login">登录</router-link></li>
                        <li class="needlogin" v-if="!isLoginNow"><router-link to="/register">注册</router-link></li>
                        <li v-if="isLoginNow"><router-link to="/invitefriends">邀请好友</router-link></li>
                        <li v-if="isLoginNow">
                            <el-dropdown @command="assetsCommand">
                                <span class="el-dropdown-link">
                                    资产管理<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">我的帐号</el-dropdown-item>
                                    <el-dropdown-item command="b">我的钱包</el-dropdown-item>
                                    <el-dropdown-item command="c">充值提币记录</el-dropdown-item>
                                    <el-dropdown-item command="e">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li>
                            <el-dropdown @command="languageCommand" class="language-link">
                                <span class="el-dropdown-link">
                                    简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">简体中文</el-dropdown-item>
                                    <el-dropdown-item command="b">繁体中文</el-dropdown-item>
                                    <el-dropdown-item command="c">English</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li id="adstradenav"><router-link to="/adstrade">场外交易</router-link></li>
                    <li><router-link to="/help">帮助中心</router-link></li>
                    <li><router-link to="/download">下载APP</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Header',
        inject: ['reload'],
        data () {
            return {
                msg: 'header',
                isLoginNow: false
            }
        },
        
        mounted(){
            this.isLoginNow = this.commonService.islogin();
            console.log(0)
        },

         methods: {
            assetsCommand(command) {
                if(command == 'a'){
                    this.$router.push('/account');
                }
                if(command == 'e'){
                    this.commonService.TokenCommonSet.delCookie('Abp.AuthToken');
                    this.commonService.TokenCommonSet.delCookie('enc_auth_token');
                    this.commonService.TokenCommonSet.delCookie('__accessToken');
                    this.commonService.TokenCommonSet.delCookie('__userId');
                    window.localStorage.removeItem('__accessToken');
                    this.$router.push('/');
                    this.reload();
                }
            },
            languageCommand(command){
                this.$message('click on item ' + command);
            }
        }
    }
</script>
<style lang="less" scoped>
    #header-item{
        
        
        .header{
            
            margin:0 auto;
            padding: 19px 0;
        
            .logo{
                float: left;
                width: 162px;
                height: 53px;
                background: url(../../assets/images/logo.png) no-repeat;
            }
            .header-nav{
                float: right;
                padding: 20px 0 0;

                .login-item{
                    float: right;
                    padding-left: 100px;
                    margin-top: -8px;
                    
                    li{
                        padding: 0 10px;
                    }

                    .needlogin a, .language-link{
                        border:solid 1px #24478b;
                        border-radius: 20px;
                        padding: 5px 15px;
                    }

                    .dropdown{
                        position: absolute;
                        top: 0;
                        right: 0;
                        float: none;
                        display: none;
                        padding-top: 35px;

                        li{
                            display: block;
                            margin-bottom: 18px;
                        }
                    }

                    li:hover .dropdown{
                        display: block;
                    }
                }
                ul{
                    float: right;
                }
                li{
                    display: inline-block;
                    padding: 0 25px;
                    position: relative;
                    
                    a{
                        font-size: 16px;
                    }
                    a:hover{
                        color: #ffffff
                    }
                }
            }
        }

        #adstradenav.active a{
            background: #017eff;
            padding: 5px 20px;
            border-radius: 20px;
            color: #ffffff;
        }
    }
</style>
