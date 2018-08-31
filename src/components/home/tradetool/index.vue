<template>
    <div class="tradetool">
        <ul class="clearfix">
            <li>
                <div class="item">
                    <h4>场外交易区</h4>
                    <span>使用法币购买/出售数字币</span>
                    <b>立即购买</b>
                </div>
            </li>
            <li>
                <div class="item">
                    <h4>币币交易区</h4>
                    <span>ETH/BTC换取各种数字币</span>
                    <b>立即购买</b>
                </div>
            <li>
                <div class="item">
                    <h4>投资入门</h4>
                    <span>带你鉴别区块链的投资机会</span>
                    <b>立即购买</b>
                </div>
            </li>
            <li>
                <div class="item">
                    <h4>手机客户端</h4>
                    <span>ios&android场外版</span>
                    <b>立即下载</b>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
       name: 'TradeTool' 
    }
</script>
<style lang="less" scoped>
    .tradetool{
        padding: 30px 0;
        display: flex;

        ul{
            width: 100%;
            height: 209px;

            li{
                width: 25%;
                float: left;
                text-align: center;

                .item{
                    background: url(../../../assets/images/KU.png) no-repeat;
                    width: 324px;
                    height: 209px;
                    margin: 0 auto;
                    padding: 50px 0;

                    h4{
                        font-size: 24px;
                    }
                    span{
                        display: block;
                        font-size: 16px;
                        color: #999999;
                        padding: 20px 0;
                    }
                    b{
                        border:solid 1px #0275ec;
                        border-radius: 5px;
                        background: none;
                        color: #fff;
                        padding: 10px 25px;
                        font-weight: normal;
                        display: inline-block;
                        cursor: pointer;
                    }
                    b:hover{
                        background: linear-gradient(to right, #00B4FF, #0080FF);
                    }
                }
            }
            
        }
    }
</style>
