<template>
    <div class="adstradedata">
        <ol class="clearfix">
            <li>昵称</li>
            <li>信用</li>
            <li>交易方式</li>
            <li>交易限额</li>
            <li>浮动单价</li>
            <li>操作</li>
        </ol>
        <div v-show="isNodata" class="nodata-item">没有数据</div>
        <ul class="clearfix" v-for="item in adsTradeList">
            <li>
                <span class="name">
                    <router-link :to="'/userinfo/'+item.tradeAdsUser.userName">
                        {{item.tradeAdsUser.userName}}
                    </router-link>
                </span>
                <span class="date normal">
                    {{item.tradeAdsUser.lastLoginTime | DateFormat}}
                </span>
                <span class="img">
                    <router-link :to="'/userinfo/'+item.tradeAdsUser.userName">
                        <img src="../../assets/images/avatar.jpg" alt="">
                    </router-link>
                </span>
            </li>
            <li>
                <span class="praise">
                    交易{{item.tradeAdsUser.transactionCount}}
                </span>
                <span class="rate normal">
                    好评度：{{item.tradeAdsUser.praiseRate}}%
                </span>
            </li>
            <li>
                <b class="alipay clearfix" v-for="sub in item.tradeAdsPaymentMethods">
                    <!-- {{sub.paymentMethod.name}} -->
                    <i v-show="sub.paymentMethod.id == 1">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yinhaozhanghao_blue_"></use>
                        </svg>
                    </i>
                    <i v-show="sub.paymentMethod.id == 2" style="margin-top:3px">
                        <svg class="icon" aria-hidden="true" style="font-size:18px;vertical-align:0">
                            <use xlink:href="#icon-zhifubao_icon"></use>
                        </svg>
                    </i>
                    <i v-show="sub.paymentMethod.id == 3" style="margin-top:3px">
                        <svg class="icon" aria-hidden="true"  style="font-size:20px;vertical-align:0">
                            <use xlink:href="#icon-weixin_icon"></use>
                        </svg>
                    </i>
                    <i v-show="sub.paymentMethod.id == 4">
                        <svg class="icon" aria-hidden="true" style="font-size:26px;position: relative;left:-5px;">
                            <use xlink:href="#icon-paypal1"></use>
                        </svg>
                    </i>
                </b>
            </li>
            <li>
                <span class="limit">
                    {{item.mixPrice}}-{{item.maxPrice}}
                </span>
                <span class="currency normal">
                    CNY
                </span>
            </li>
            <li>
                <span class="price">
                    {{item.price}}
                </span>
                <span class="currency normal">
                    CNY/{{setCoinType}}
                </span>
            </li>
            <li>
                <router-link class="btn-color" v-if="adsType == 2" :to="'/offers/'+item.tradeAdsUser.userName+'?buy'">购买</router-link>
                <router-link class="btn-color" v-else :to="'/offers/'+item.tradeAdsUser.userName+'?sell'">出售</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import commonServiceStore from '../../store/index';
    import '../../../static/fonts/iconfont.js';
    export default {
        props:["AdsListData","setCoinType","setAdstype"],
        data(){
            return{
                adsTradeList: [],
                isFinish: false,
                isNodata: false,
                adsType: 0
            }
        },
        watch: {
            'AdsListData': function (newVal, oldVal) {
                this.updata();
            }
        },
        
        methods:{
            updata(){
                this.adsTradeList = this.AdsListData;
                console.log(this.adsTradeList);
                this.$emit('listenLoadChildEvent',this.isFinish);
                this.isNodata = false;
                if(this.adsTradeList.length == 0){
                    this.isNodata = true;
                }
                this.adsType = this.setAdstype;
            }
        },
        filters: {
            DateFormat(val){
                return commonServiceStore.getDateDiff(val);
            }
        }
    }
</script>
<style lang="less" scoped>
     .adstradedata{
        padding: 10px;
        min-height: 150px;
        position: relative;

        ol,ul{
            li{
                float: left;
                width: 15%;
                padding: 10px 0;

                span{
                    display: block;
                }
                span:first-child{
                    margin-top: 3px;
                }

                .normal{
                    color: #999999;
                    padding-top: 10px;
                    font-size: 12px;
                }

                .alipay,.wechat{
                    height: 24px;
                    margin-right: 10px;
                    margin-top: 8px;
                    float: left;

                    i{
                        float: left;
                    }
                    .icon{
                        font-size: 24px;
                    }
                }

                .btn-color{
                    display:inline-block;
                    padding: 10px 15px;
                }
                .btn-color:hover{
                    text-decoration: none;
                }
            }
            li:nth-child(1){
                width: 25%;
            }
            li:nth-child(4){
                width: 20%;
            }
            li:nth-child(2){
                width: 17%;
            }
            li:nth-child(6){
                width: 8%;
            }
        }
        ol{
            padding: 10px 0;
            li:first-child{
                text-indent: 30px;
            }
        }
        ul{
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
            margin-bottom: 10px;

            li:first-child{
                position: relative;
                padding-left: 60px;
                min-height: 60px;

                .img{
                    width: 40px;
                    position: absolute;
                    height: 40px;
                    top: 10px;
                    left: 10px;
                    border-radius: 50%;

                    img{
                        width: 40px;
                        height: 40px;
                        border: 50%;
                        border:solid 2px #dddddd;
                        border-radius: 50%
                    }
                }
            }
        }

        .nodata-item{
            text-align: center;
            padding: 50px 0;
        }
    }
</style>
