<template>
    <div class="outsidetrade">
        <div class="title">
            <h4>OTC VC场外交易区</h4>
            <span class="text">支持多国法币购买 BTC 、 ETH 、 LTC 、 EOS 、 BCH 、 NEO 、 QTUM 、 ZEC 、 USDT 等多种主流数字货币</span>
            <span class="text">下单 => 微信／支付宝转账=> 成交</span>
            <span class="img"></span>
        </div>
        <div class="tradelist">
            <ul class="clearfix">
                <li>
                    <div class="item">
                        <h4>BTC</h4>
                        <span class="price">
                            价格：55451CNY
                        </span>
                        <span class="limit">
                            交易限额：2000-201779CNY
                        </span>
                        <span class="payment">
                            付款方式：支付宝
                        </span>
                        <span class="buy">
                            <a href="javascript:;">购买</a>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <h4>BTC</h4>
                        <span class="price">
                            价格：55451CNY
                        </span>
                        <span class="limit">
                            交易限额：2000-201779CNY
                        </span>
                        <span class="payment">
                            付款方式：支付宝
                        </span>
                        <span class="buy">
                            <a href="javascript:;">购买</a>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <h4>BTC</h4>
                        <span class="price">
                            价格：55451CNY
                        </span>
                        <span class="limit">
                            交易限额：2000-201779CNY
                        </span>
                        <span class="payment">
                            付款方式：支付宝
                        </span>
                        <span class="buy">
                            <a href="javascript:;">购买</a>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <h4>BTC</h4>
                        <span class="price">
                            价格：55451CNY
                        </span>
                        <span class="limit">
                            交易限额：2000-201779CNY
                        </span>
                        <span class="payment">
                            付款方式：支付宝
                        </span>
                        <span class="buy">
                            <a href="javascript:;">购买</a>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'OutsideTrade'
    }
</script>
<style lang="less" scoped>
    .outsidetrade{
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
                padding-top: 10px;
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

        .tradelist{
            padding: 30px 1%;
            display: flex;

            ul{
                width: 100%;

                li{
                    width: 25%;
                    text-align: center;
                    float: left;

                    .item{
                        width: 291px;
                        height: 330px;
                        background: url(../../../assets/images/dikuang.png) no-repeat;
                        margin: 0 auto;
                        padding:40px 30px 30px;

                        h4{
                            color: #008CD7;
                            font-size: 36px;
                            border-bottom: solid 2px #008CD7;
                            display: inline-block;
                            padding: 0 5px 5px;
                        }

                        span{
                            display: block;
                            font-size: 16px;
                            padding-top: 30px;
                        }

                        .buy{
                            padding: 30px 10% 0;

                            a{
                                background: linear-gradient(to right, #00B4FF, #0080FF);
                                padding: 10px 0;
                                display: block
                            }
                            a:hover{
                                background: linear-gradient(to right, #0080FF, #00B4FF);
                            }
                        }
                    }
                }
            }
        }
    }
</style>