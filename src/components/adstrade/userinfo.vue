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
                    评价数：+491 / 0
                </span>
                <span>
                    好评度：100.00%
                </span>
                <span>
                    信任数：25
                </span>
                <span>
                    历史成交：5-20BTC
                </span>
                <span>
                    交易次数：952次
                </span>
            </div>
            <div class="item">
                <span>邮箱验证：已完成<i class="el-icon-circle-check"></i></span>
                <span>手机验证：已完成<i class="el-icon-circle-check"></i></span>
                <span>实名验证：未完成</span>
                <span>进阶验证：已完成<i class="el-icon-circle-check"></i></span>
            </div>
            <div class="item">
                <span>
                    注册时间：2018-6-20
                </span>
                <span>
                    最后登录：2008-5-5
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
                            <ul>
                                <li class="active">全部</li>
                                <li>有内容</li>
                            </ul>
                        </div>
                        <div class="evaluationtype">
                            <span class="title">评价类型</span>
                            <ul>
                                <li class="active">全部</li>
                                <li>好评</li>
                                <li>中评</li>
                                <li>差评</li>
                            </ul>
                        </div>
                    </div>
                    <div class="recordlist">
                        <el-table
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
                        </el-table>
                        <v-page></v-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="出售记录" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="购买广告" name="third">角色管理</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import Pagination from '../page/index';
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
        }
    }
</style>
