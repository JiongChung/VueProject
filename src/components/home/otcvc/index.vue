<template>
    <div class="otcvc">
        <div class="title">
            <h4>为什么要选择OTC VC</h4>
            <span class="text">我们让来自不同国家的人都可以方便快捷的交易数字货币</span>
            <span class="text">支持微信/支付宝交易</span>
            <span class="img"></span>
        </div>
        <div class="otcvclist">
            <ul class="clearfix">
                <li>
                    <div class="item">
                        <h4>买卖自由</h4>
                        <span>支持多种数字货币的币币交易与场外交易买卖自由，双向交易，快捷方便</span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <h4>安全可靠</h4>
                        <span>冷储藏、SSL、多重加密等银行级别安全技术,十年金融安全团队,多重保障资产安全</span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <h4>交易便捷</h4>
                        <span>支持多终端,WEB、APP行情即时掌握,快速交易,贴心服务,全球市场,交易随时随地</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'OTCVC'
    }
</script>
<style lang="less" scoped>
    .otcvc{
        padding-top: 30px;
        color: #ffffff;

        .title{
            background: url(../../../assets/images/bt_bj.png) no-repeat center top;
            height: 188px;
            text-align: center;
            padding-top: 70px;
            position: relative;

            h4{
                font-size: 24px;
                position: relative;
                z-index: 2;
            }
            .text{
                display: block;
                font-size: 14px;
                padding-top: 15px;
                color: #999999;
                position: relative;
                z-index: 2;
            }
            .img{
                width: 202px;
                height: 201px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background: url(../../../assets/images/an_out.png) no-repeat;
                animation: rotateImg 5s linear infinite;
                -webkit-animation: rotateImg 5s linear infinite;
                z-index: 0;
            }
            
            @keyframes rotateImg {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            @-webkit-keyframes rotateImg {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }
        }

        .otcvclist{
            padding: 30px 5%;
            display: flex;

            ul{
                width: 100%;

                li{
                    width: 33.33%;
                    text-align: center;
                    float: left;

                    .item{
                        width: 348px;
                        height: 259px;
                        background: url(../../../assets/images/dikuang_1.png) no-repeat;
                        padding:50px 30px 30px;
                        margin: 0 auto;

                        h4{
                            font-size: 30px;
                            border-bottom: solid 2px #008CD7;
                            display: inline-block;
                            padding: 0 5px 10px;
                        }

                        span{
                            display: block;
                            padding:20px 30px;
                            line-height: 2;
                        }
                    }
                }
            }
        }
        
    }
</style>
