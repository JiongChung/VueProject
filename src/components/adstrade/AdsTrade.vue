<template>
    <div>
        <app-header></app-header>
        <div class="wrap">
            <div class="wrap-item">
                <div class="subnav">
                    <span class="arrow"></span>
                    <ul>
                        <li><router-link to="/selltrade">出售数字资产</router-link></li>
                        <li><router-link to="/adstrade">购买数字资产</router-link></li>
                        <li><router-link to="/publish">发布交易广告</router-link></li>
                        <li><router-link to="/myorder">我的订单</router-link></li>
                    </ul>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../header/Header'
    export default {
        name: 'AdsTrade',
        components: {
            'app-header' : Header
        }
    }
</script>
<style lang="less" scoped>
    .subnav{
        background: rgba(255,255,255,0.1);
        padding:10px 15px;
        border-radius: 3px;
        margin-top: -40px;
        position: relative;
        text-align: center;

        .arrow{
            width: 0;
            height: 0;
            border:10px solid transparent;
            border-bottom-color:rgba(255,255,255,0.1);
            position: absolute;
            top: -20px;
            left: 640px;
        }

        li{
            display: inline-block;
            position: relative;
            padding: 10px 20px;
            margin: 0 20px;
        }
        li .active{
            color: #017efe
        }
        li .active:before{
            position:absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 7px;
            height: 20px;
            border-radius: 5px;
            background: #017efe;
            display: block;
            content: "";
            margin: auto 
        }
    }

   
</style>
