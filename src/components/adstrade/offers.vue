<template>
    <div class="offerspage clearfix">
        <div class="offers-left">
            <h3>
                交易说明
            </h3>
            <div class="dealsnote">
                <p>1、订单有效期为15分钟，请您及时在有效期内付款并点击【标记付款已完成】按钮，我才可以释放数字货币给您。</p>
                <p>2、如果您无法在15分钟内完成付款，请点击【延长订单有效期】按钮。</p>
                <p>3、开始交易后数字货币由系统锁定托管，请安心下单。</p>
            </div>
        </div>
        <div class="offers-right" v-if="isFirstStep">
            <div class="offers-pay-tips">
                <i class="icon iconfont ">&#xe691;</i>此广告的付款期限为15分钟，下单出售前请再次确认您是否同意买家设定的交易说明。
            </div>
            <div class="floatprice-item">
                <h4>当前浮云单价（CNY）2900</h4>
                <span>您不需要支付任何手续费，交易手续费将由广告发布者承担，请安心交易</span>
            </div>
            <div class="youroffers-item clearfix">
                <div class="item">
                    <h4>您想出售多少ETH</h4>
                    <input type="number" v-model="sold" name="sold">
                </div>
                <div class="item">
                    <i class="icon iconfont ">&#xe69c;</i>
                </div>
                <div class="item">
                    <h4>换取CNY</h4>
                    <input type="number" v-model="exchange" name="exchange">
                </div>
                <div class="item">
                    <h4>交易方式</h4>
                    <el-select v-model="paymentlist" placeholder="请选择">
                        <el-option
                        v-for="item in paymentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="yourbalance">
                您的帐户余额：<span class="total">0.0435551 ETH</span>
                <span class="note">
                    目前数字货币价格为系统自动计算，实际交易价格以发起交易的价格为准，请点击查看关于浮动价格的说明
                </span>
            </div>
            <div class="dealsbox">
                <div class="userinfo clearfix">
                    <span>
                        用户名<i>Jackson</i>
                    </span>
                    <span>
                        交易次数<i>155</i>
                    </span>
                    <span>
                        成交历史<i>63.055055055BTC</i>
                    </span>
                    <span>
                        好评度<i>99.54%</i>
                    </span>
                    <span>
                        评价数<i>+5826 / -2</i>
                    </span>
                </div>
                <div class="dealsinfo">
                    <ul class="clearfix">
                        <li>浮动单价</li>
                        <li>交易限额</li>
                        <li>交易方式</li>
                        <li>付款限期</li>
                        <li>状态</li>
                    </ul>
                    <ul class="clearfix">
                        <li>2900 CNY/ETH</li>
                        <li>1000~10000 CNY</li>
                        <li>
                            <svg class="icon" aria-hidden="true" style="font-size:18px;vertical-align:0">
                                <use xlink:href="#icon-zhifubao_icon"></use>
                            </svg>
                        </li>
                        <li>15w分钟</li>
                        <li>已上架</li>
                    </ul>
                </div>
            </div>
            <div class="dealsamount">
                <h4>交易数额</h4>
                <div class="dealsnumer">
                    <span>
                        0 ETH
                    </span>
                    <span>
                        <i class="icon iconfont ">&#xe69c;</i>
                    </span>
                    <span>
                        0 CNY
                    </span>
                </div>
                <div class="dealsterms">
                    <span><el-checkbox v-model="lockType">我已知悉点击“立即出售”之后交易的数字会被锁定15分钟，直到订单完成或取消</el-checkbox></span>
                    <span><el-checkbox v-model="seenType">我已阅读并确认以上交易信息</el-checkbox></span>
                </div>
                <div class="btn-color">
                    立即出售
                </div>
            </div>
            <div class="deals-direction">
                <div class="tips">
                    <p>1、交易发起前，请您确认已阅读并同意买家提出的条款，并再次确认交易内容无误后，再点击出售按钮。</p>
                    <p>2、交易发起后，请您尽快将您的收款账户发送给买家，务必使用站内聊天系统，避免资料外泄。</p>
                    <p>3、交易发起后，系统会自动将您的数字货币锁定，待买家转账完成并确认后，请您确认指定的收款账户是否入帐，并点击释放数字币完成交易。</p>
                    <p>4、建议您在交易前先查看买家信息，检视相关交易记录及评价，以減少交易纠纷。</p>
                    <p>5、交易过程请使用平台的聊天系统进行沟通，平台外的对话记录将无法作为交易纠纷的依据。</p>
                    <p>6、温馨提示：超过三笔取消订单，将被冻结当天下单权限。</p>
                </div>
                <ul class="verification">
                    <li>通过邮箱或手机验证，单笔购买限额：1000 CNY，购买总额上限：3000CNY，无法出售数字货币</li>
                    <li>通过实名验证，单笔交易限额：50000CNY</li>
                    <li>通过进阶验证，单笔交易限额：不限制（进往进阶验证）</li>
                    <li>若您想购买的金额大于目前单笔限额，可选通过验证再回来下单</li>
                </ul>
            </div>
        </div>
        <div class="offers-right" v-else>
            <div class="step-two">
                <h4 class="title">你向Coin Life购买ETH</h4>
                <div class="dealscontent">
                    <ol class="clearfix">
                        <li>交易金额</li>
                        <li>交易数量</li>
                        <li>单价</li>
                        <li>付款限期</li>
                        <li>交易方式</li>
                        <li>订单状态</li>
                    </ol>
                    <ul class="clearfix">
                        <li>10000CNY</li>
                        <li>0.00001557411ETH</li>
                        <li>2900CNY</li>
                        <li>2018-10-25 12:12:52</li>
                        <li>
                            <svg class="icon" aria-hidden="true" style="font-size:18px;vertical-align:0">
                                <use xlink:href="#icon-zhifubao_icon"></use>
                            </svg>
                        </li>
                        <li>已下单</li>
                    </ul>
                    <div class="ordernumber">
                        订单编号：5852sdfsdf5885
                    </div>
                    <div class="dealstotal clearfix">
                        <span class="fee">
                            交易手续费：免费
                        </span>
                        <div class="total">
                            总额：<span>1000CNY</span>
                            <i class="icon iconfont ">&#xe69d;</i>
                            兑换：0.00001557411ETH
                        </div>
                    </div>
                </div>
                <h4 class="title">你向Coin Life购买ETH</h4>
                <div class="payment-item clearfix">
                    <ul>
                        <li>
                            <svg class="icon" aria-hidden="true" style="font-size:24px;vertical-align:0;float:left;margin-right:10px;">
                                <use xlink:href="#icon-yinhaozhanghao_gray_"></use>
                            </svg>
                            银行帐号
                        </li>
                        <li class="active">
                            <svg class="icon" aria-hidden="true" style="font-size:20px;vertical-align:0;float:left;margin-right:10px;margin-top:3px;">
                                <use xlink:href="#icon-zhifubao_icon"></use>
                            </svg>
                            支付宝
                        </li>
                        <li>
                            <svg class="icon" aria-hidden="true" style="font-size:24px;vertical-align:0;float:left;margin-right:10px;">
                                <use xlink:href="#icon-weixin_gray_icon"></use>
                            </svg>
                            微信
                        </li>
                    </ul>
                    <div class="contact">
                        <span class="phone"><i class="icon iconfont">&#xe68e;</i></span>
                        <span class="user"><i class="icon iconfont">&#xe680;</i></span>
                    </div>
                </div>
                <div class="lock-order">
                    <h4>订单数字币已经由系统锁定托管</h4>
                    <span>使用微信、支付宝、银行卡转帐时，请<b>不要添加任何备注内容</b>！！！否则可能会被支付系统拦截</span>
                </div>
                <div class="hosting">
                    ETH托管时间重要剩余<b>13:50</b>逾期自动取消，请邻里付款并点击标记付款
                </div>
                <div class="pay-btn">
                    <span class="btn-color">标记付款已完成</span>
                    <span>延长订单有效期</span>
                    <span>取消交易</span>
                </div>
                <div class="pay-tips">
                    请勿随意取消订单，任意取消订单者，被交易对象投诉将影响系统信用分数，分数过低者帐号会被冻结数天。
                </div>
                <div class="sell-tips">
                    <ul>
                        <li>您不需要提供钱包地址给卖家，交易完成后数字货币将自动转入您在OTCVC上的钱包中</li>
                        <li>场外交易时间通常为5-60分钟，具体时间依据卖家是否在线，及确认帐款的时间而有所调整，请有耐心等待</li>
                        <li>若长时间未收到卖家的回复，或卖家未释放数字货币，您可以提交工单发起申诉，客服人员协助处理</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../../static/fonts/iconfont.js';
export default {
    data(){
        return{
            sold: 0,
            exchange: 0,
            paymentlist: '',
            paymentOptions: [
                {
                    value: 1,
                    label: '银行卡'
                },
                {
                    value: 2,
                    label: '支付宝'
                },
                {
                    value: 3,
                    label: '微信'
                }
            ],
            lockType: false,
            seenType: false,
            isFirstStep: false
        }
    }
}
</script>
<style lang="less" scoped>
    .offerspage{
        padding-top: 20px;
    }
    .offers-left{
        background: rgba(255,255,255,0.1);

        h3{
            font-size: 24px;
            font-weight: normal;
            text-align: center;
            padding: 30px 0 20px;
            border-bottom: solid 1px rgba(255,255,255,0.2)
        }

        .dealsnote{
            padding: 20px 40px;
            line-height: 1.5;
            font-size: 14px;

            p{
                padding: 5px 0;
            }
        }
    }

    .offers-pay-tips{
        margin-right: -70px;
        margin-left: -70px;
        background: #017eff;
        color: #fff;
        border-radius: 3px 3px 0 0;
        padding: 20px 0;
        font-size: 16px;
        padding-left: 50px;
        
        i{
            font-size: 20px;
            margin-right: 5px;
        }
    }

    .floatprice-item{
        padding-top: 50px;

        h4{
           font-size:18px;
           font-weight: normal;
        }
        span{
           color: #017efe;
           line-height: 1.5;
           padding-top: 10px;
           display: block
        }
    }
    .youroffers-item{
        padding-top: 30px;

        .item{
            float: left;
            margin-right: 30px;
            position: relative;
            min-width: 50px;
            min-height: 80px;

            .icon{
                position: absolute;
                bottom: 5px;
                left: 0;
                margin: auto;
                height: 40px;
                font-size: 40px;
                right:0;
                width: 40px;
                color: #6eb6ff
            }

            h4{
                font-weight: normal;
                padding-bottom: 15px;
                font-size: 16px;
            }
            input{
                border:solid 1px #017eff;
                border-radius: 3px;
                padding:15px 20px;
                background: transparent;
                color: #fff;
                font-size: 18px;
                width: 180px;
            }
        }
        .item:last-child{
            float: right;
        }
    }
    .yourbalance{
        padding-top: 30px;
        font-size: 16px;

        .total{
            color: #017efe
        }

        .note{
            padding-top: 10px;
            line-height: 1.5;
            display: block;
            font-size: 14px;
        }
    }
    .dealsbox{
        margin-top: 30px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);

        .userinfo{
            background: rgba(255,255,255,0.1);
            padding: 15px;
            display: flex;
            border-radius: 3px 3px 0 0;

            span{
                float: left;
                flex-grow: 1;

                i{
                    font-size: 16px;
                    padding-left: 8px;
                }
            }
        }

        .dealsinfo{
            padding: 20px;

            ul + ul{
                padding-top: 20px;
                font-size: 16px;
                color: #017efe;
            }
            li{
                float: left;
                width: 15%;
            }
            li:nth-child(1),
            li:nth-child(2){
                width: 30%
            }
            
            li:nth-child(5){
                width: 10%
            }
        }
    }

    .dealsamount{
        padding-top: 50px;
        padding-bottom: 50px;

        h4{
            font-weight: normal;
            text-align: center;
        }

        .dealsnumer{
            text-align: center;
            font-size: 36px;
            color: #017efe;
            padding-top: 20px;

            i{
                font-size: 30px;
                margin: 0 20px;
                color: #6eb6fe;
                vertical-align:0
            }
        }

        .dealsterms{
            padding: 30px 0;
            margin: 0 auto;
            width: 300px;
            text-align: left;

            span + span{
                display: block;
                padding-top: 10px;
            }
        }

        .btn-color{
            margin: 0 auto;
            text-align: center;
            width: 300px;
            padding: 15px 0;
            font-size: 16px;
        }
    }
    .deals-direction{
        padding: 30px 0;
        border-top: solid 1px rgba(255,255,255,0.2);

        p{
            line-height: 1.5;
            padding: 5px 0;
        }

        .tips p:last-child{
            color: #017efe;
        }

        .verification{
            margin-top: 20px;
            li{
                position: relative;
                padding-left: 20px;
                line-height: 1.5;
                padding-bottom: 5px;
            }
            li:before{
                position: absolute;
                top: 5px;
                left: 0;
                width: 10px;
                height: 10px;
                background: #017eff;
                border-radius: 50%;
                display: block;
                content: "";
            }
        }
    }

    .step-two{
        padding-top: 20px;

        h4.title{
            font-size: 18px;
            font-weight: normal
        }

        .dealscontent{
            border:solid 1px #0069cd;
            border-radius: 3px;
            padding: 20px 15px 15px;
            margin: 20px 0 30px;
            font-size: 12px;

            ol{
                color: #999999;
                padding-bottom: 10px;
                display: flex;
            }
            ul{
                display: flex;
                background: rgba(12, 31, 44, 0.4);
                border-radius: 3px;
                padding: 15px 0;
                line-height: 18px;
                height: 48px;
            }
            li{
                float: left;
                width: 10%;
            }
            li:nth-child(1),
            li:nth-child(2),
            
            li:nth-child(4){
                width: 20%;
            }
            li:nth-child(3){
                width: 15%
            }
            li:nth-child(5){
                width: 15%
            }
            li:first-child{
                text-indent: 10px;
            }

            .ordernumber{
                color: #999999;
                text-indent: 10px;
                padding-top: 20px;
                
            }

            .dealstotal{
                padding-top: 30px;
                color: #999999;

                .fee{
                    float: left;
                    padding-left: 10px;
                    padding-top: 5px;
                }

                .total{
                    float: right;
                    span{
                        color: #017efe;
                        font-size: 18px;
                    }
                    i{
                        color: #54a8ff;
                        font-size: 18px;
                        vertical-align: 0;
                        margin: 0 10px;
                    }
                }
            }
        }

        .payment-item{
            padding-top: 20px;
            ul{float: left;}
            li{
                float:left;
                padding: 7px 20px;
                border-radius: 3px;
                border: solid 1px #999999;
                margin-right: 20px;
                line-height: 24px;
            }
            li.active{
                border-color: #017efe;
            }
            .contact{
                float: right;

                span + span{
                    padding-left: 30px;
                }
                .icon{
                    font-size: 30px;
                    color: #017eff
                }

                 span + span .icon{
                   color: #999999
                }
            }

        }

        .lock-order{
            padding-top: 20px;

            h4{
                font-weight: normal;
                font-size: 16px;
                color: #017eff;
                padding-bottom: 10px;
            }
            span{color: #999999}
            b{
                font-weight: normal;
                color: #017eff
            }
        }

        .hosting{
            padding: 40px 0;
            text-align: center;

            b{
                font-weight: normal;
                color: #017efe;
            }
        }

        .pay-btn{
            text-align: center;

            span{
                width: 180px;
                padding: 15px 0;
                border-radius: 3px;
                border:solid 1px #017efe;
                display: inline-block;
                cursor: pointer;
            }
            
            span + span{
                margin-left: 10px;
            }
        }

        .pay-tips{
            color: #999999;
            text-align: center;
            padding: 20px 0
        }

        .sell-tips{
            border-top: solid 1px #017efe;
            padding-top: 20px;
            
            li{
                position: relative;
                padding-left: 20px;
                line-height: 1.5;
                padding-bottom: 5px;
            }
            li:before{
                position: absolute;
                top: 5px;
                left: 0;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #017efe;
                display: block;
                content: "";
            }
        }
    }
</style>
