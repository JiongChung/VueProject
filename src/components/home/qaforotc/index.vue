<template>
    <div class="qaforotc">
        <div class="item">
            <h4>新手入门</h4>
            <ul class="clearfix">
                <li>
                    <a href="javascript:void(0);">如何购买数字币</a>
                </li>
                <li>
                    <a href="javascript:void(0);">BI.CEO 使用指南</a>
                </li>
                <li>
                    <a href="javascript:void(0);">如何出售数字币？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">如何充值ETH（以币安为例）</a>
                </li>
                <li>
                    <a href="javascript:void(0);">如何出售数字币？(发布广告出售）</a>
                </li>
                <li>
                    <a href="javascript:void(0);">流畅打开国外网站</a>
                </li>
            </ul>
        </div>
        <div class="item">
            <h4>交易问题</h4>
            <ul class="clearfix">
                <li>
                    <a href="javascript:void(0);">如何查支付宝打款人的实名信息？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">如何使用「信任名单」和「黑名单」？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">已付款订单超时取消了怎么办？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">买家太慢或无响应怎么办？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">BI.CEO 的评分机制</a>
                </li>
            </ul>
        </div>
        <div class="item">
            <h4>安全相关</h4>
            <ul class="clearfix">
                <li>
                    <a href="javascript:void(0);">如何鉴别欺诈行为？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">如何防止在交易中被骗？</a>
                </li>
                <li>
                    <a href="javascript:void(0);">什么是二步验证？</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
       name: 'QaforOtc' 
    }
</script>
<style lang="less" scoped>
    .qaforotc{
        padding: 30px 0;
        display: flex;

        .item{
            width: 33.33%;
            float: left;

            h4{
                font-size: 24px;
                font-weight: normal;
                position: relative;
                padding-left: 20px;
                margin-bottom: 20px; 
            }
            h4:before{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: 8px;
                height: 24px;
                background: #5787f5;
                display: block;
                content: "";
                border-radius: 5px;
                margin: auto;
            }

            ul{
                background: rgba(255,255,255,0.1);
                padding:20px 30px;
                border-radius: 5px;
                min-height: 300px;

                li{
                    padding: 15px 0;

                    a{
                        position: relative;
                        padding-left: 20px;
                        font-size: 14px;
                    }
                    a:hover{
                        color:#fff
                    }
                    a:before{
                        position: absolute;
                        bottom: 0;
                        top: 0;
                        left: 0;
                        width: 8px;
                        height: 8px;
                        background: #20d6d7;
                        display: block;
                        content: "";
                        margin: auto
                    }
                }
            }
        }

        .item + .item{
            padding-left: 3%
        }
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .qaforotc{
            display: block;
            padding: 0;
        }
        .qaforotc .item{
            float: none;
            width: 100%;
            padding: 0 15px;
            margin-bottom: 20px;
        }
        .qaforotc .item h4{
            margin-bottom: 10px;
        }
        .qaforotc .item ul{
            min-height: auto;
            padding: 0 15px;
        }
        .qaforotc .item ul li{
            padding: 10px 0;
        }

        .qaforotc .item + .item{
            padding-left: 15px;
        }
    }
</style>
