<template>
    <div id="header-item">
        <div class="header clearfix">
            <div class="logo">

            </div>
            <button class="top-menu" type="button" @click="showTopMenu = !showTopMenu">
                <i></i>
            </button>
            <div class="header-nav" v-if="isPC">
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li id="adstradenav"><router-link to="/adstrade">场外交易</router-link></li>
                    <li><router-link to="/help">帮助中心</router-link></li>
                    <li><router-link to="/download">下载APP</router-link></li>
                </ul>
                <div class="login-item">
                    <ul>
                        <li class="needlogin" v-if="!isLoginNow"><router-link to="/login">登录</router-link></li>
                        <li class="needlogin" v-if="!isLoginNow"><router-link to="/register">注册</router-link></li>
                        <li v-if="isLoginNow"><router-link to="/invitefriends">邀请好友</router-link></li>
                        <li v-if="isLoginNow">
                            <el-dropdown @command="assetsCommand" v-if="isPC">
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
                            <div class="isphone-dropdown" v-else>
                                <span class="el-dropdown-link" @click="Assetsitem = !Assetsitem">
                                    资产管理<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-collapse-transition>
                                    <ul v-show="Assetsitem">
                                        <li><a href="">我的帐号</a></li>
                                        <li><a href="">我的钱包</a></li>
                                        <li><a href="">充值提币记录</a></li>
                                        <li><a href="">退出</a></li>
                                    </ul>
                                </el-collapse-transition>
                            </div>
                        </li>
                        <li>
                            <el-dropdown @command="languageCommand" class="language-link" v-if="isPC">
                                <span class="el-dropdown-link">
                                    简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">简体中文</el-dropdown-item>
                                    <el-dropdown-item command="b">繁体中文</el-dropdown-item>
                                    <el-dropdown-item command="c">English</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div class="isphone-dropdown" v-else>
                                <span class="el-dropdown-link" @click="Languageitem = !Languageitem">
                                    简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-collapse-transition>
                                    <ul v-show="Languageitem">
                                        <li><a href="">简体中文</a></li>
                                        <li><a href="">繁体中文</a></li>
                                        <li><a href="">English</a></li>
                                    </ul>
                                </el-collapse-transition>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <el-collapse-transition v-else>
                <div class="header-nav" v-show="showTopMenu">
                    <ul>
                        <li><router-link to="/">首页</router-link></li>
                        <li id="adstradenav"><router-link to="/adstrade">场外交易</router-link></li>
                        <li><router-link to="/help">帮助中心</router-link></li>
                        <li><router-link to="/download">下载APP</router-link></li>
                    </ul>
                    <div class="login-item">
                        <ul>
                            <li class="needlogin" v-if="!isLoginNow"><router-link to="/login">登录</router-link></li>
                            <li class="needlogin" v-if="!isLoginNow"><router-link to="/register">注册</router-link></li>
                            <li v-if="isLoginNow"><router-link to="/invitefriends">邀请好友</router-link></li>
                            <li v-if="isLoginNow">
                                <el-dropdown @command="assetsCommand" v-if="isPC">
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
                                <div class="isphone-dropdown" v-else>
                                    <span class="el-dropdown-link" @click="Assetsitem = !Assetsitem">
                                        资产管理<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-collapse-transition>
                                        <ul v-show="Assetsitem">
                                            <li><router-link to="/account">我的帐号</router-link></li>
                                            <li><router-link to="/mywallet">我的钱包</router-link></li>
                                            <li><router-link to="/takecoin">充值提币记录</router-link></li>
                                            <li><a href="">退出</a></li>
                                        </ul>
                                    </el-collapse-transition>
                                </div>
                            </li>
                            <li>
                                <el-dropdown @command="languageCommand" class="language-link" v-if="isPC">
                                    <span class="el-dropdown-link">
                                        简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="a">简体中文</el-dropdown-item>
                                        <el-dropdown-item command="b">繁体中文</el-dropdown-item>
                                        <el-dropdown-item command="c">English</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <div class="isphone-dropdown" v-else>
                                    <span class="el-dropdown-link" @click="Languageitem = !Languageitem">
                                        简体中文<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-collapse-transition>
                                        <ul v-show="Languageitem">
                                            <li><a href="">简体中文</a></li>
                                            <li><a href="">繁体中文</a></li>
                                            <li><a href="">English</a></li>
                                        </ul>
                                    </el-collapse-transition>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-collapse-transition>
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
                isLoginNow: false,
                isPC: true,
                Assetsitem: false,
                Languageitem: false,
                showTopMenu: false
            }
        },
        
        mounted(){
            this.isLoginNow = this.commonService.islogin();
            this.isPC = this.commonService.getWindowWidth() < 769 ? false : true;
            this.showTopMenu = this.commonService.getWindowWidth() < 769 ? false : true;
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
            .top-menu{
                position: absolute;
                top: 14px;
                height: 1px;
                width: 40px;
                background: rgba(255,255,255,0.1);
                right: 10px;
                color: #ffffff;
                padding: 15px 10px;


                i{
                    display:block;
                    background: #ffffff;
                    height: 1px;
                }
                i:before{
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    height: 1px;
                    background: #ffffff;
                    display: block;
                    content: "";
                }
                i:after{
                    position: absolute;
                    bottom: 9px;
                    left: 0;
                    left: 10px;
                    right: 10px;
                    height: 1px;
                    background: #ffffff;
                    display: block;
                    content: "";
                }
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
                    float: left;
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

    @media only screen and (min-width: 767px)
    {
        .top-menu{
            display: none;
        }
    }
    @media only screen and (min-width: 320px) and (max-width:768px){
        
        #header-item{
            background: #071f41;
            height: auto;
        }
        #header-item .header .logo {
            width: 81px;
            height: 27px;
            background-size: 100%;
            float: none;
            margin: auto
        }
        #header-item .header .header-nav{
            float: none;
        }
        #header-item .header .header-nav .login-item{
            float: none;
            padding-left: 0;
            margin-top: 0;
        }
        #header-item .header .header-nav ul{
            float: none;
        }
        #header-item .header .header-nav li{
            display: block;
            width: 100%;
            border-bottom: dashed 1px #18417b;
            padding: 15px 25px;
        }
        #header-item .header .header-nav .login-item li{
            padding: 15px 25px;
        }
        #header-item .header .header-nav .login-item .needlogin{
            float: left;
            width: 50%;
        }
        #header-item .header .header-nav .login-item .language-link{
            border:none;
            padding: 0;
        }
        
        #header-item .header .header-nav .login-item .needlogin a{
            border:solid 1px #0e3f85;
            display: block;
            border-radius: 5px;
            text-align: center;
        }
        #header-item .header .header-nav .login-item li:last-child{
            width: 100%;
            clear: both;
        }
        #header-item .header{
            padding:15px 0;
        }
        .isphone-dropdown .el-dropdown-link{
            color:#cbcdca 
        }
    }
</style>
