<template>
    <div class="myaccount">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的帐号" name="first">
                <div class="gotomywallet">
                    充值、提币请点击导航 <router-link to="/mywallet">【我的钱包】</router-link>
                </div>
                <div class="tradesettings">
                    <h4 class="title">场外交易设置</h4>
                    <div class="settingsitem clearfix" @click="gottoTradeSetting">
                        <span class="name">
                            收款交易设置
                        </span>
                        <span class="text">
                            设置后，收款信息可展示在订单页面
                        </span>
                        <span class="arrow"></span>
                    </div>
                    <div class="settingsitem clearfix" @click="gottoWhitelist">
                        <span class="name">
                            信任发布
                        </span>
                        <span class="text">
                            将用户加入信任名单后，可在此处查看用户信息和他们发布的广告
                        </span>
                        <span class="arrow"></span>
                    </div>
                    <div class="settingsitem clearfix" @click="gottoBlacklist">
                        <span class="name">
                            黑名单
                        </span>
                        <span class="text">
                            将用户加入黑名单后，意味着该用户将不能与您进行交易
                        </span>
                        <span class="arrow"></span>
                    </div>
                </div>
                <div class="tradesettings">
                    <h4 class="title">币币交易设置</h4>
                    <div class="settingsitem clearfix">
                        <span class="name">
                            API管理
                        </span>
                        <span class="text">
                            创建API key可以与您借助第三方网站或移动应用使用DKSHF的行情查询，实时交易等服务
                        </span>
                        <span class="arrow"></span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="奖励中心" name="second">
                奖励中心
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    export default Vue.extend({
        data(){
            return{
                activeName: 'first'
            }
        },
        mounted: function(){
           
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },

           gottoTradeSetting: function(){
               this.$router.push('/tradesetting');
           },

           gottoWhitelist: function(){
               this.$router.push('/whitelist');
           },

           gottoBlacklist: function(){
               this.$router.push('/blacklist');
           }
        }
    })
</script>
<style lang="less" scoped>
    .gotomywallet a{color: #017EFF;text-decoration: none}

    .tradesettings{
        padding-top: 60px;

        h4.title{
            font-weight: normal;
            font-size: 16px;
        }

        .settingsitem{
            border:solid 1px #017EFF;
            border-radius: 5px;
            padding: 15px;
            position: relative;
            cursor: pointer;
            margin-top: 20px;

            .name{
                float: left;
                width: 150px;
                position: relative;
            }

            .name:before{
                position: absolute;
                top: 0;
                right: 0;
                width: 5px;
                height: 18px;
                background: #017EFF;
                display: block;
                content: '';
                bottom: 0;
                margin: auto;
                border-radius: 5px;
            }

            .text{
                float: left;
                padding-left: 20px;
            }

            .arrow{
                position: absolute;
                top: 0;
                right: 20px;
                bottom: 0;
                margin: auto;
                width: 20px;
                height: 20px;
                transform:rotate(135deg);
                -ms-transform:rotate(135deg);
                -moz-transform:rotate(135deg);
                -webkit-transform:rotate(135deg);
                -o-transform:rotate(135deg);
            }

            .arrow:before{
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 1px;
                background: #017EFF;
                display: block;
                content:'';
            }
            .arrow:after{
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 10px;
                background: #017EFF;
                display: block;
                content:'';
            }
        }

        .settingsitem:hover{
            background: rgba(255,255,255,0.1);
        }
    }
</style>
