<template>
    <div class="takecoinlistpage">
        <div class="takecoinlist-item">
            <div class="backtoaccount">
                <span><router-link to="/mywallet"><i class="icon iconfont">&#xe692;</i>返回我的钱包</router-link></span>
            </div>
            <div class="takecoinlist-main">
                <h1>SAC - SAC提币</h1>
                <div class="take-tips">
                    <span class="tips">温馨提示：申请提币之前请您确认提币地址正确，交易一旦发送到区块链网络便不可撤回；发起手电筒请求后，请到注册邮箱确认，即可发送到区块链网络中。提币通常需要2-24小时完成到账。到帐后您将收到邮件通知。</span>
                    <div class="receive-item">
                        <h4>收不到那OTCVC发来的邮件怎么办？</h4>
                        <span class="note"><i class="icon iconfont">&#xe691;</i>您的帐户余额不足，暂时无法使用提币功能</span>
                    </div>
                </div>
                <div class="sac-address">
                    <div class="sac-tools clearfix">
                        <h2>SAC-SAC提币地址</h2>
                        <div class="tools">
                            <div class="text">
                                <span class="amount">
                                    每日提币额度：<b>500000/500000 SAC</b>
                                </span>
                                <span class="raise"><i class="el-icon-plus"></i>提高额度</span>
                                <span class="view"><i class="el-icon-tickets"></i>查看提币额度说明</span>
                            </div>
                            <div class="btn-color">新建地址</div>
                        </div>
                    </div>
                    <div class="address-item">
                        <ol class="clearfix">
                            <li>币种</li>
                            <li>说明</li>
                            <li>地址</li>
                            <li>操作</li>
                        </ol>
                        <div class="noaddress">
                            提SAC前需先建立地址
                        </div>
                        <ul class="clearfix">
                            <li>ETH</li>
                            <li>ccc</li>
                            <li>0x0258962589sdffghgffgh456767</li>
                            <li>
                                <span>编辑</span>
                                <span>删除</span>
                                <span class="btn-color">提币</span>
                            </li>
                        </ul>
                        <ul class="clearfix">
                            <li>ETH</li>
                            <li>ccc</li>
                            <li>0x0258962589sdffghgffgh456767</li>
                            <li>
                                <span>编辑</span>
                                <span>删除</span>
                                <span class="btn-color">提币</span>
                            </li>
                        </ul>
                    </div>
                    <div class="sac-tools clearfix">
                        <h2>提币历史记录</h2>
                    </div>
                    <div class="takecoinrecord">
                        <ol class="clearfix">
                            <li>币种</li>
                            <li>提币时间</li>
                            <li>数量</li>
                            <li>地址说明</li>
                            <li>状态</li>
                            <li>详情</li>
                        </ol>
                         <div class="noaddress">
                            暂时没有提币记录
                        </div>
                        <ul class="clearfix">
                            <li>ETH</li>
                            <li>2018-12-12 20:25:52</li>
                            <li>0.225511452</li>
                            <li>sdf568410565sdfgfddfgdfg6843511</li>
                            <li>已完成</li>
                            <li>查看</li>
                        </ul>
                        <ul class="clearfix">
                            <li>ETH</li>
                            <li>2018-12-12 20:25:52</li>
                            <li>0.225511452</li>
                            <li>sdf568410565sdfgfddfgdfg6843511</li>
                            <li>已完成</li>
                            <li>查看</li>
                        </ul>
                    </div>
                </div>
                <div class="commonproblem">
                    <h4 class="title">
                        <span>常见提币记录</span>
                    </h4>
                    <ul class="clearfix">
                        <li><a href="#">提币功能说明</a></li>
                        <li><a href="#">提币有手续费吗？</a></li>
                        <li><a href="#">为什么我的提币还没到帐？</a></li>
                        <li><a href="#">如何查询提币的TxID?</a></li>
                        <li><a href="#">如何提币到交易所？（以BTC提到Poloniex为例）</a></li>
                        <li><a href="#">如何提币到钱包？（以ETH提到imToken为例）</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .takecoinlistpage{
        padding: 30px 0;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.1);
        margin-top: 20px;

        .backtoaccount{
            float: right;

            span{
                display: block;
            }
            span a{
                border-radius: 3px;
                border:solid 1px #017eff;
                padding: 7px 15px;
            }
           
            .icon{
                font-size: 12px;
                color: #017eff;
                vertical-align:middle;
                margin-right: 10px;
            }
             span a:hover{
                background: #017eff;
                color: #ffffff;
                text-decoration: none;
            }
            span a:hover .icon{
                color: #ffffff;
            }
        }
        
        .takecoinlist-main{
            clear: both;
            padding-top: 30px;

            h1{
                background: #017eff;
                padding: 10px 0;
                font-size: 24x;
                font-weight: normal;
                text-align: center;
                border-radius: 3px;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            }

            .take-tips{
                width: 800px;
                margin: 0 auto;
                padding: 15px 0;

                .tips{
                    display: block;
                    line-height: 2;
                }

                .receive-item{
                    padding-top: 15px;

                    h4{
                        font-weight: normal;
                        color: #017eff;
                    }

                    .note{
                        background: #017eff;
                        border-radius: 3px;
                        display: block;
                        margin-top: 10px;
                        padding: 10px;

                        .icon{
                            font-size: 20px;
                            margin-right: 5px;
                        }
                    }
                }
            }

            .sac-address{
                background: rgba(12, 31, 44, 0.4);
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;

                .sac-tools{
                    h2{
                        float: left;
                        font-size: 18px;
                        font-weight: normal;
                        padding-bottom: 10px;
                        position: relative;
                    }
                    h2:before{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        display: block;
                        content: "";
                        height: 2px;
                        background: #017eff;
                    }
                    .tools{
                        float: right;
                        display: flex;

                        .text{
                            float: left;
                            color: #999999;
                            padding-right: 20px;

                            .amount{
                                display: block;
                                white-space: nowrap;
                                padding-bottom: 10px;

                                b{
                                    font-weight: normal;
                                    color: #017eff;
                                }
                            }
                            .raise{
                                float: left;
                                i{
                                    color: #017eff;
                                    font-weight: 600;
                                    margin-right: 5px;
                                }
                            }
                            .view{
                                float: right;
                                i{
                                    color: #017eff;
                                    margin-right: 5px;
                                }
                            }
                        }
                        .btn-color{
                            float: right;
                            flex: 1;
                            line-height: 28px;
                        }
                    }
                }

                .address-item{
                    padding-top: 10px;
                    padding-bottom: 20px;

                    ol{
                        color: #999999;
                        padding-bottom: 10px;
                    }
                    ol,ul{
                        display: flex;
                    }
                    ul{
                        border-radius: 3px;
                        border:solid 1px #0167c9;
                        margin-bottom: 10px;
                        li{
                           padding: 10px 0;
                           line-height: 26px;
                        }
                    }

                    li{
                        float: left;
                        width: 15%;

                        span{
                            display: inline-block;
                            border-radius: 3px;
                            padding: 5px 10px;
                            border:solid 1px #0167c9;
                            margin-right: 10px;
                            cursor: pointer;
                            line-height: 1;
                        }
                    }

                    li:first-child{
                        text-indent: 20px;
                    }

                    li:nth-child(3){
                        flex: 1;
                    }
                    li:nth-child(4){
                        width: 20%;
                    }
                }
            }

            .noaddress{
                border-radius: 3px;
                border:solid 1px #0167c9;
                padding: 15px 0;
                text-align: center;
                color: #999999;
            }

            .takecoinrecord{
                padding-top: 20px;
                ol{
                    color: #999999;
                    padding-bottom: 10px;
                }
                ul{
                    border: solid 1px #0167c9;
                    border-radius: 3px;
                    margin-bottom: 10px;
                    li{
                        padding: 15px 0;
                    }
                }

                li{
                    float: left;
                    width: 15%;
                }
                li:first-child{
                    text-indent: 20px;
                }
                li:nth-child(1){
                    width: 10%;
                }
                li:nth-child(2){
                    width: 20%;
                }
                li:nth-child(4){
                    width: 35%;
                }
                li:nth-child(5){
                    width: 10%;
                }
                li:nth-child(6){
                    width: 10%;
                }
            }

            .commonproblem{
                padding-top: 30px;

                .title{
                    font-weight: normal;
                    font-size: 18px;
                    padding-bottom: 20px;

                    span{
                        position: relative;
                        display: inline-block;
                        padding-bottom: 10px;
                    }
                    span:before{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        display: block;
                        content: "";
                        background: #017eff;
                        height: 2px;
                    }
                }

                li{
                    float: left;
                    width: 50%;
                    padding-right: 3%;
                    padding-bottom: 15px;

                    a{
                        border-radius: 3px;
                        border:solid 1px #0167c9;
                        padding: 15px;
                        display: block;
                        color: #ffffff;
                    }
                    a:hover{
                        text-decoration: none;
                        background: #017eff;
                        border-color: #017eff;
                    }
                }
            }
        }

    }
</style>
