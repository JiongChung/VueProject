<template>
    <div class="takecoinapplypage">
        <div class="takecoinapply-item">
            <h1>提交ETH-Ethereum提币申请</h1>
            <span class="text">请注意，提币请求一旦发送到区块链网络中，便不可撤回。<b>查看提币功能说明</b></span>
            <div class="take-note"><span><i class="icon iconfont">&#xe691;</i>发起提币请求后，请到【注册邮箱】确认，即可发送到区块链网络中。</span></div>
            <div class="takecoin-main">
                <div class="takecoin-show">
                    <ol class="clearfix">
                        <li>币种</li>
                        <li>说明</li>
                        <li>地址</li>
                        <li>帐户余额</li>
                    </ol>
                    <ul class="clearfix">
                        <li>ETH</li>
                        <li>不知说明了什么</li>
                        <li>0x05sdgdfg20566sfsdft655ewsfdfsdfwe665885fsdf</li>
                        <li>0.035874874ETH</li>
                    </ul>
                </div>
                <div class="fee">
                    <span><i class="icon iconfont">&#xe691;</i>提币手续费将从提币数量中扣除<i class="icon iconfont">&#xe691;</i>单次提币数量不可小于0.003ETH</span>
                </div>
                <div class="take-options">
                    <ul class="clearfix">
                        <li>
                            <label>提币数量</label>
                            <span class="coin-num">当前可提币数量：<b>0.02551254455ETH</b></span>
                            <input type="number" placeholder="提币手续费将从提币数量中扣除">
                        </li>
                        <li>
                            <label>提币备注</label>
                            <input type="text" placeholder="例如：提币到imToken">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="verification">
                <h2><span>手机短信验证</span></h2>
                <div class="phonecode">
                    <i class="icon iconfont">&#xe6a2;</i>
                    <input type="number" placeholder="请输入手机验证码">
                    <span class="getcode">获取验证码</span>
                </div>
                <el-checkbox v-model="checked">我承诺我已确认此笔提币请求信息正确，并再次确认提币地址正确，如若提币地址错误，风险自行承担。</el-checkbox>
                <div class="btn-color">立即提币</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            checked: true
        }
    }
}
</script>
<style lang="less" scoped>
    .takecoinapplypage{
        padding: 30px 0;
        background: rgba(255,255,255,0.1);
        margin-top: 20px;
        border-radius: 5px;
    }

    .takecoinapply-item{
        h1{
            background: #017eff;
            padding: 15px 0;
            font-size: 30px;
            font-weight: normal;
            text-align: center;
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .text{
            display: block;
            padding-top: 20px;
            text-align: center;

            b{
                font-weight: normal;
                color: #017eff;
            }
        }

        .take-note{
            text-align: center;
            padding-top: 20px;

            i{
                font-size: 24px;
                margin-right: 5px;
            }

            span{
                background: #017eff;
                border-radius: 3px;
                box-shadow: 0 0 5px rgba(0,0,0,0.5);
                display: inline-block;
                padding: 10px 20px;
            }
        }

        .takecoin-main{
            background: rgba(12, 31, 44, 0.4);
            border-radius: 3px;
            padding: 15px 25px 30px;
            margin-top: 30px;

            .takecoin-show{
                ol,ul{
                    display: flex;
                    text-indent: 20px;
                }
                ol{
                    color: #999999;
                }
                ul{
                    border-radius: 3px;
                    border:solid 1px #0167c9;
                    padding: 15px 0;
                    margin-top: 10px;
                }
                li{
                    float: left;
                    width: 25%
                }
                li:nth-child(1){
                    width: 10%
                }
                li:nth-child(3){
                    flex: 1
                }
                li:nth-child(4){
                    width: 15%
                }
            }
            

            .fee{
                text-align: center;
                padding-top: 15px;

                span{
                    background: #017eff;
                    border-radius: 3px;
                    padding: 10px 30px;
                    display: inline-block;

                    .icon{
                        font-size: 20px;
                        margin-right: 5px;
                    }
                    .icon + .icon{
                        margin-left: 30px;
                    }
                }
            }

            .take-options{
                padding-top: 40px;

                li{
                    float: left;
                    width: 50%;
                    padding-right: 3%;
                }
                li + li{
                    padding-left: 3%;
                    padding-right: 0;
                }
                label{
                    float: left;
                }

                .coin-num{
                    float: right;
                    color: #999999;

                    b{
                        font-weight: normal;
                        color:#017eff;
                        font-size: 16px;
                    }
                }

                input{
                    width: 100%;
                    clear: both;
                    padding: 15px;
                    background: transparent;
                    border:solid 1px #0167c9;
                    border-radius: 3px;
                    color: #ffffff;
                    margin-top: 15px;
                }
            }
        }

        .verification{
            width: 400px;
            margin: 0 auto;
            padding-top: 50px;

            h2{
                font-size: 18px;
                font-weight: normal;
                text-align: center;

                span{
                    position: relative;
                    padding-bottom: 15px;
                }
                span:before{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    display: block;
                    content: '';
                    background: #017eff;
                    border-radius: 5px;
                    height: 6px;
                }
            }

            .phonecode{
                position: relative;
                margin-top: 50px;
                .icon{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 15px;
                    margin: auto;
                    color: #017eff;
                    font-size: 20px;
                }
                input{
                    width: 100%;
                    background: rgba(12, 31, 44, 0.4);
                    padding: 20px 15px 20px 45px;
                    color: #ffffff;
                    border-radius: 5px;
                }
                .getcode{
                    color: #017eff;
                    height: 20px;
                    line-height: 20px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 15px;
                    margin: auto;
                    cursor: pointer;
                }
            }

            .btn-color{
                text-align: center;
                padding: 15px 0;
                margin-top: 30px;
                font-size: 16px;
            }
        }
    }
</style>
