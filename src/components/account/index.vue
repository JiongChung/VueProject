<template>
    <div>
        <app-header></app-header>
        <div class="account">
            <div class="account-item clearfix">
                <div class="account-left">
                    <div class="userinfo">
                        <div class="profile">
                            <span class="img">
                                <img :src="profilePicture" alt="">
                            </span>
                            <span class="username">
                                {{userForAccount.userName}}
                            </span>
                            <span class="emailorphone">
                                {{userForAccount.phoneNumber}}
                            </span>
                            <span class="lastlogintime">
                                上次登录时间：{{userForAccount.lastLoginTime | DateFormat}}
                            </span>
                        </div>
                        <div class="profiletool">
                            <ul>
                                <li>
                                    <span class="title">
                                        安全等级：
                                    </span>
                                    <span class="progress"><i :style="{ width: securityLevelRate + '%' }"></i></span>
                                    <span v-if="userForAccount.securityLevel < 2 && userStatus">差</span>
                                    <span v-if="1 < userForAccount.securityLevel < 5 && userStatus">中</span>
                                    <span v-if="userForAccount.securityLevel > 4 && userStatus">高</span>
                                </li>
                                <li>
                                    <span class="title">
                                        评价数：
                                    </span>
                                    <b class="praise">+{{userForAccount.praiseCount}}</b> / -{{userForAccount.negativeCount}}
                                </li>
                                <li>
                                    <span class="title">
                                        资产估值：
                                    </span>
                                    <b class="praise" style="display:none">0.001452101BTC/ </b>
                                    {{userForAccount.asset}}CNY
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="account-nav">
                        <dl>
                            <dt>用户中心</dt>
                            <dd><router-link to="/account">我的帐号</router-link></dd>
                            <dd><router-link to="/base">基本资料</router-link></dd>
                            <dd><router-link to="/realnameverified">实名认证</router-link></dd>
                            <dd><router-link to="/safesettings">安全设置</router-link></dd>
                        </dl>
                        <dl>
                            <dt>资产中心</dt>
                            <dd><router-link to="/mywallet">我的钱包</router-link></dd>
                            <dd><router-link to="/takecoin">充值提币记录</router-link></dd>
                        </dl>
                    </div>
                </div>
                <div class="account-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    import Header from '../header/Header'
    import commonServiceStore from '../../store/index';
    export default Vue.extend({
        components: {
            'app-header' : Header,
        },
        
        data(){
            return{
                userStatus : false,
                securityLevelRate: 0,
                userForAccount: {
                    lastLoginTime: '',
                    asset: 0,
                    negativeCount: 0,
                    phoneNumber: '',
                    praiseCount: 0,
                    securityLevel: 0,
                    userName: ''
                },
                profilePicture: ''
            }
        },
        mounted: function(){
           this.GetUserForAccount(this.apiService + 'Account/GetUserForAccount');
           this.GetProfilePicture(this.apiService + 'Profile/GetProfilePicture');
           if(!this.commonService.islogin()){
               this.$router.push('/');
           }
        },
        methods:{
            GetUserForAccount(url){
                this.$http.get(url).then(response => {
                    this.userForAccount = response.data.result.userForAccount;
                    this.userStatus = true;
                    this.securityLevelRate = this.userForAccount.securityLevel / 5 * 100;
                },err => {
                    console.log(err)
                });
            },

            GetProfilePicture(url){
                this.$http.get(url).then(response => {
                    this.profilePicture = 'data:image/jpeg;base64,' + response.data.result.profilePicture;
                },err => {
                    console.log(err)
                });
            },

            padDate(va){
                va=va<10?'0'+va:va;
                return va
            }
        },

        filters: {
            DateFormat(val){
                return commonServiceStore.formatDate(val);
            }
        }
    })
</script>
<style lang="less" scoped>
        .account-item{
            .userinfo{
                background: rgba(2,57,88,0.8);
                padding: 20px;
                border-radius: 3px;

                .profile{
                    position: relative;
                    padding-left: 120px;
                    min-height: 80px;

                    span{
                        display: block;
                    }
                    .img{
                        position: absolute;
                        top: 0;
                        left: 15px;
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;

                        img{
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                        }
                    }

                    .username{
                        padding-bottom: 10px;
                    }
                    .lastlogintime{
                        padding-top: 20px;
                        color: #999999
                    }
                }

                .profiletool{
                    padding-top: 25px;

                    li{
                        margin-top: 10px;
                        position: relative;
                        padding-left: 100px;

                        .title{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100px;
                            text-align: right;
                        }

                        .progress{
                            width: 200px;
                            background: #f5f5f5;
                            height: 10px;
                            display: inline-block;
                            border-radius: 10px;
                            position: relative;

                            i{
                                position: absolute;
                                top: 0;
                                left: 0;
                                height: 10px;
                                background: linear-gradient(to right, rgb(0, 180, 255), rgb(0, 128, 255));
                                border-radius: 10px;
                            }
                        }

                        .praise{
                            font-weight: normal;
                            color: #0275D8;
                        }
                    }
                }
            }

            .account-nav{
                margin-top: 20px;
                font-size: 16px;
                text-align: center;
                color: #ffffff;

                dt{
                    margin-bottom: 1px;
                    background: rgba(255,255,255,0.25);
                    padding: 15px 0;
                    border-radius: 3px;
                }
                dd{
                    margin-bottom: 1px;

                    a{
                        display: block;
                        padding: 15px 0;
                        background: rgba(2,57,88,0.8);
                        border-radius: 3px;
                        color: #ffffff;
                        position: relative;
                    }
                    a:hover{
                        background: #017EFF;
                        text-decoration: none;
                    }
                    a.active{
                        background: #017EFF;
                        color: #ffffff;
                    }
                    a.active:before{
                        position: absolute;
                        top: 0;
                        left: 25%;
                        width: 30px;
                        height: 8px;
                        border-radius: 8px;
                        background: #ffffff;
                        margin: auto;
                        bottom: 0;
                        display: block;
                        content: "";
                    }
                }
            }
        }
</style>
