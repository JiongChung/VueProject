<template>
    <div class="digitalassets">
        <div class="title">
            <h4>甄选全球优质数字资产交易</h4>
            <span class="text">24H全球实时行情,一站式场内场外服务,安全稳定,交易新体验</span>
            <span class="img"></span>
        </div>
        <div class="assetslist">
            <ul class="clearfix">
                <li>
                    <div class="item">
                        <span class="name">
                            <b>BTC</b> / VC
                        </span>
                        <span class="text">
                            0.141562 VC
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase rise">
                                +3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>ETC</b> / VC
                        </span>
                        <span class="text">
                            0.141562 VC
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>BCH</b> / VC
                        </span>
                        <span class="text">
                            0.141562 VC
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>XRP</b> / VC
                        </span>
                        <span class="text">
                            0.141562 VC
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>ADA</b> / ETH
                        </span>
                        <span class="text">
                            0.141562 ETH
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>NEO</b> / ETH
                        </span>
                        <span class="text">
                            0.141562 ETH
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>EOS</b> / ETH
                        </span>
                        <span class="text">
                            0.141562 ETH
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="item">
                        <span class="name">
                            <b>XMR</b> / ETH
                        </span>
                        <span class="text">
                            0.141562 ETH
                        </span>
                        <span class="price">
                            ￥1.95

                            <span class="increase drop">
                                -3.51%
                            </span>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'DigitalAssets'
    }
</script>
<style lang="less" scoped>
    .digitalassets{
        padding-top: 30px;
        color: #ffffff;

        .title{
            background: url(../../../assets/images/bt_bj.png) no-repeat center top;
            height: 188px;
            text-align: center;
            padding-top: 75px;
            position: relative;

            h4{
                font-size: 24px;
                z-index: 2;
                position: relative;
            }
            .text{
                display: block;
                font-size: 14px;
                padding-top: 20px;
                color: #999999;
                z-index: 2;
                position: relative;
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

        .assetslist{
            padding: 30px 0;
            display: flex;

            ul{
                width: 100%;

                li{
                    float: left;
                    width: 25%;
                    text-align: center;
                    padding: 0 2% 2%;

                    .item{
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        padding: 35px;
                        text-align: left;

                        span{
                            display: block;
                            font-size: 16px;
                        }

                        span + span{
                            padding-top: 30px;
                        }

                        .name{
                            b{
                                font-size: 24px;
                                font-weight: normal
                            }
                        }

                        .price{
                            position: relative;

                            .increase{
                                position: absolute;
                                top: 20px;
                                right: 0;
                                color: greenyellow;
                                padding-right: 20px
                            }

                            .rise:before{
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 4px;
                                height: 12px;
                                display: block;
                                content: "";
                                background: greenyellow;
                            }
                            .rise:after{
                                position: absolute;
                                top: -12px;
                                right: -5px;
                                width: 0;
                                height: 0;
                                border:7px solid transparent;
                                border-bottom-color:greenyellow;
                                display: block;
                                content: "";
                            }

                            .drop:before{
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 4px;
                                height: 12px;
                                display: block;
                                content: "";
                                background: greenyellow;
                            }
                            .drop:after{
                                position: absolute;
                                bottom: -7px;
                                right: -5px;
                                width: 0;
                                height: 0;
                                border:7px solid transparent;
                                border-top-color:greenyellow;
                                display: block;
                                content: "";
                            }
                        }
                    }
                }
            }
        }
    }
</style>

