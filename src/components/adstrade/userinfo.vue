<template>
    <div class="userinfopage">
        <div class="userinfo-item clearfix">
            <div class="item">
                <span class="img">
                    <img src="../../assets/images/pic.jpg" alt="">
                </span>
                <span class="name">Username</span>
                <span class="userstatus">
                    用户在线
                </span>
            </div>
            <div class="item">
                <span>
                    <em>评价数：</em>+491 / 0
                </span>
                <span>
                    <em>好评度：</em>100.00%
                </span>
                <span>
                    <em>信任数：</em>25
                </span>
                <span>
                    <em>历史成交：</em>5-20BTC
                </span>
                <span>
                    <em>交易次数：</em>952次
                </span>
            </div>
            <div class="item">
                <span><em>邮箱验证：</em>已完成<i class="el-icon-circle-check"></i></span>
                <span><em>手机验证：</em>已完成<i class="el-icon-circle-check"></i></span>
                <span><em>实名验证：</em>未完成</span>
                <span><em>进阶验证：</em>已完成<i class="el-icon-circle-check"></i></span>
            </div>
            <div class="item">
                <span>
                    <em>注册时间：</em>2018-6-20
                </span>
                <span>
                    <em>最后登录：</em>2008-5-5
                </span>
                <div class="options" v-if="isUserlogin">
                    <b class="btn-color">
                        加入信任名单
                    </b>
                    <b class="btn-color">
                        加入黑名单
                    </b>
                </div>
            </div>
        </div>
        <div class="userinfo-record">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="评价记录" name="first">
                    <div class="evaluationrecord clearfix">
                        <div class="sortitem">
                            <span class="title">分类</span>
                            <ul class="clearfix">
                                <li class="active">全部</li>
                                <li>有内容</li>
                            </ul>
                        </div>
                        <div class="evaluationtype">
                            <span class="title">评价类型</span>
                            <ul class="clearfix">
                                <li class="active">全部</li>
                                <li>好评</li>
                                <li>中评</li>
                                <li>差评</li>
                            </ul>
                        </div>
                    </div>
                    <div class="recordlist">
                        <!-- <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="usertrade"
                                label="广告交易">
                            </el-table-column>
                            <el-table-column
                                prop="appraise"
                                label="评价"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                label="评价内容">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="评价时间">
                            </el-table-column>
                            <el-table-column
                                prop="evaluationuser"
                                label="评价用户">
                            </el-table-column>
                        </el-table> -->
                        <ol class="clearfix">
                            <li>广告交易</li>
                            <li>评价</li>
                            <li>评价内容</li>
                            <li>评价时间</li>
                            <li>评价用户</li>
                        </ol>
                        <ul class="clearfix" v-for="item in tableData">
                            <li>{{item.usertrade}}</li>
                            <li>{{item.appraise}}</li>
                            <li>{{item.content}}</li>
                            <li>{{item.date}}</li>
                            <li>{{item.evaluationuser}}</li>
                        </ul>
                        <v-page></v-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="出售记录" name="second">
                    <div class="salesrecord">
                        <ol class="clearfix">
                            <li>出售币种</li>
                            <li>收款币种</li>
                            <li>出售单价</li>
                            <li>交易限额</li>
                            <li>交易方式</li>
                            <li>最后更新</li>
                            <li>广告状态</li>
                            <li>操作</li>
                        </ol>
                        <ul class="clearfix">
                            <li><em>出售币种</em>USDT</li>
                            <li><em>收款币种</em>CNY</li>
                            <li><em>出售单价</em>6.84 CNY</li>
                            <li><em>交易限额</em>100 - 97,794.96 CNY</li>
                            <li>
                                <em>交易方式</em>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yinhaozhanghao_blue_"></use>
                                </svg>
                            </li>
                            <li><em>最后更新</em>2018-02-12 12:26</li>
                            <li><em>广告状态</em>已上架</li>
                            <li><span class="btn-color">查看</span></li>
                        </ul>
                        <ul class="clearfix">
                            <li><em>出售币种</em>USDT</li>
                            <li><em>收款币种</em>CNY</li>
                            <li><em>出售单价</em>6.84 CNY</li>
                            <li><em>交易限额</em>100 - 97,794.96 CNY</li>
                            <li>
                                <em>交易方式</em>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yinhaozhanghao_blue_"></use>
                                </svg>
                            </li>
                            <li><em>最后更新</em>2018-02-12 12:26</li>
                            <li><em>广告状态</em>已上架</li>
                            <li><span class="btn-color">查看</span></li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="购买广告" name="third">
                    <div class="salesrecord">
                        <ol class="clearfix">
                            <li>购买币种</li>
                            <li>付款币种</li>
                            <li>购买单价</li>
                            <li>交易限额</li>
                            <li>交易方式</li>
                            <li>最后更新</li>
                            <li>广告状态</li>
                            <li>操作</li>
                        </ol>
                        <ul class="clearfix">
                            <li><em>购买币种</em>USDT</li>
                            <li><em>付款币种</em>CNY</li>
                            <li><em>购买单价</em>6.84 CNY</li>
                            <li><em>交易限额</em>100 - 97,794.96 CNY</li>
                            <li>
                                <em>交易方式</em>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yinhaozhanghao_blue_"></use>
                                </svg>
                            </li>
                            <li><em>最后更新</em>2018-02-12 12:26</li>
                            <li><em>广告状态</em>已上架</li>
                            <li><span class="btn-color">查看</span></li>
                        </ul>
                        <ul class="clearfix">
                            <li><em>购买币种</em>USDT</li>
                            <li><em>付款币种</em>CNY</li>
                            <li><em>购买单价</em>6.84 CNY</li>
                            <li><em>交易限额</em>100 - 97,794.96 CNY</li>
                            <li>
                                <em>交易方式</em>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yinhaozhanghao_blue_"></use>
                                </svg>
                            </li>
                            <li><em>最后更新</em>2018-02-12 12:26</li>
                            <li><em>广告状态</em>已上架</li>
                            <li><span class="btn-color">查看</span></li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import Pagination from '../page/index';
    import '../../../static/fonts/iconfont.js';
    export default {
        components: {
            'v-page': Pagination
        },
        data(){
            return{
                isadstradepage: true,
                activeName: 'first',
                tableData: [
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '好评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    },
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '中评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    },
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '好评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    },
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '中评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    },
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '好评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    },
                    {
                        usertrade: 'User出售数字货币',
                        appraise: '中评',
                        content: '用户没有留下评价内容',
                        date: '2018-12-20',
                        evaluationuser: '14****96'
                    }
                ],

                isUserlogin: false
            }
        },
        mounted(){
            if(this.isadstradepage){
                document.getElementById('adstradenav').classList.add('active');
            }
            if(this.commonService.islogin()){
                this.isUserlogin = true
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>
<style lang="less" scoped>
    .userinfo-item{
        background: rgba(255,255,255,0.1);
        padding: 40px 20px;
        border-radius: 5px;
        margin-top: 20px;

        .item{
            float: left;
            width: 25%;
            span{
                display: block;
                padding-bottom: 30px;
            }
            span:last-child{
                padding-bottom: 0
            }

            .img{
                width: 100px;
                height: 120px;
                margin: auto;
                border-radius: 50%;

                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }

            .name{
                text-align: center;
                font-size: 18px;
            }
            .userstatus{
                color: #45bd51;
                text-align: center
            }

            .el-icon-circle-check{
                margin-left: 10px;
                color: #017efe;
                font-size: 16px;
            }

            .el-icon-check{
                margin-left: 10px;
                color: #017efe;
                font-size: 16px;
                font-weight: 600
            }

            .options{
                padding-top: 20px;
                
                b{
                    font-weight: normal;
                    float: left;
                    padding: 10px 20px;
                    margin-right: 20px;
                }
                b:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .userinfo-record{
        background: rgba(255,255,255,0.1);
        margin-top: 20px;
        border-radius: 5px;
        padding: 10px 40px;

        .evaluationrecord{
            height: 40px;
            line-height: 40px;

            .title{
                font-size: 16px;
                background: rgba(12, 31, 44, 0.4);
                float: left;
                padding: 0 20px;
                border-radius: 3px;
                margin-right: 30px;
            }

            li{
                float: left;
                margin-right: 30px;
                cursor: pointer;
            }
            .active{
                color: #017efe;
            }
        }
        .sortitem,.evaluationtype{
            float: left;
            width: 50%;
        }

        .recordlist{
            padding-top: 30px;

            ol,ul{
                display: flex;
                text-indent: 15px;
            }
            ol{
                color: #999999;
            }
            li{
                float: left;
                width: 20%;
                padding: 10px 0;
            }
            li:nth-child(1){
                width: 25%
            }
            li:nth-child(3){
                width: 35%
            }
            li:nth-child(2),
            li:nth-child(5){
                width: 10%;
            }
        }
    }

    .salesrecord{
        ol,ul{
            display: flex;
        }
        li{
            float: left;
            width: 10%;
            padding: 10px 0;

            em{
                display: none;
            }
        }
        li:nth-child(4){
            width: 20%;
        }
        li:nth-child(5),
        li:nth-child(6){
            width: 15%;
        }
        ol{
            color: #999999;
        }
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .userinfopage{
            padding: 0 15px;
        }
        .userinfo-item{
            padding: 15px;
        }
        .userinfo-item .item{
            float: none;
            width: 100%;
            padding-bottom: 20px;
        }
        .userinfo-item .item:last-child{
            padding-bottom: 0;
        }
        .userinfo-item .item .img{
            height: 110px;
        }
        .userinfo-item .item span{
            padding-bottom: 10px;
        }
        .userinfo-item .item span em{
            color: #999999;
        }

        .userinfo-record .sortitem, .userinfo-record .evaluationtype{
            float: none;
            width: 100%;
            margin-bottom: 15px;
        }

        .userinfo-record{
            margin-top: 15px;
            padding: 0px 15px;
        }
        .userinfo-record .evaluationrecord{
            line-height: 1;
            height: auto;
        }
        .userinfo-record .evaluationrecord .title{
            display: inline-block;
            float: none;
            padding: 5px 15px;
            margin-bottom: 10px;
            margin-right: 0;
        }
        .userinfo-record .recordlist ol{
            display: none;
        }
        .userinfo-record .recordlist ul{
            display: block;
            padding-bottom: 15px;
            text-indent: 0;
        }
        .userinfo-record .recordlist li{
            width: 100% !important;
            float: none;
            padding: 5px 0;
        }
        .userinfo-record .recordlist{
            padding-top: 0;
        }
        .userinfo-record .recordlist li:nth-child(4),
        .userinfo-record .recordlist li:nth-child(5){
           color:#999999;
        }

        .salesrecord ol{
            display: none;
        }
        .salesrecord ul{
            display: block;
            padding-bottom: 20px;
        }
        .salesrecord li{
            float: none;
            width: 100% !important;
            padding: 0 0 10px;
        }
        .salesrecord li:last-child{
            margin-top: 10px;
        }
        .salesrecord li .btn-color{
            padding: 7px 30px;
        }
        .salesrecord li em{
            display: inline;
            color: #999999;
            padding-right: 10px;
        }
    }
</style>
