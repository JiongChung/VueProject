<template>
    <div class="mywallet">
        <el-tabs v-model="activeName">
            <el-tab-pane label="我的钱包" name="first">
                <div class="allassetitem clearfix">
                    <div class="asset">
                        <span class="title">
                            当前总资产估值：
                        </span>
                        <span class="btc">
                            0.01211541BTC
                        </span>
                        <span class="cny">
                            45.12CNY
                        </span>
                    </div>
                    <div class="serachitem">
                        <el-input placeholder="请输入内容" v-model="assetSearch" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="assetlist">
                    <el-checkbox v-model="hidezero">隐藏0资产钱包</el-checkbox>
                    <ol class="clearfix">
                        <li>币种</li>
                        <li>总额</li>
                        <li>可用余额</li>
                        <li>下单冻结</li>
                        <li>锁仓</li>
                        <li>资产估值</li>
                        <li>操作</li>
                    </ol>
                    <div v-html="loadingHtml" v-show="isloading"></div>
                    <ul class="clearfix" v-for="item in tableData">
                        <li><span class="pc" v-show="!isPC">币种：</span>{{item.symbol}}</li>
                        <li><span class="pc" v-show="!isPC">总额：</span>{{item.total}}</li>
                        <li><span class="pc" v-show="!isPC">可用余额：</span>{{item.available}}</li>
                        <li><span class="pc" v-show="!isPC">下单冻结：</span>{{item.frozen}}</li>
                        <li><span class="pc" v-show="!isPC">锁仓：</span>{{item.lock}}</li>
                        <li><span class="pc" v-show="!isPC">资产估值：</span>{{item.asset}}</li>
                        <li>
                            <el-button @click="takeCoinOut(item.id)" class="take" type="text" size="small">提币</el-button>
                            <el-button @click="recharge(item.id)" type="text" size="small" class="btn-color recharge">充值</el-button>
                            <el-button @click="lock(item.id)" type="text" size="small" class="lock">锁仓</el-button>
                        </li>
                    </ul>
                    <!-- <v-page :setPageSize="MaxResultCount" :setTotalCount="TotalCount" v-on:linsenPageChildEvent="showPageStatusFromChild"></v-page> -->
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Pagination from '../../page/index';
    export default {
        name: 'MyWallet',
        components: {
            'v-page': Pagination
        },
        data(){
            return{
                activeName: 'first',
                assetSearch:'',
                hidezero: false,
                tableData:[],
                loading: true,
                isPC: true,
                loadingHtml: '',
                isloading: true,
            }
        },
        mounted: function(){
           this.isPC = this.commonService.getWindowWidth() < 769 ? false : true;
           this.loadingHtml = this.commonService.isloading();
           this.GetUserWalletBalance(this.apiService + 'UserWallet/GetUserWalletBalance');
        },
        methods: {
            GetUserWalletBalance(url){
                this.$http.get(url).then(response => {
                    this.tableData = response.body.result.items;
                    this.isloading = false;
                    // console.log(response.body.result.items);
                },err => {
                    console.log(err)
                });
            },
            search() {
                console.log('submit!');
            },

            takeCoinOut(id) {
                console.log(id);
            },

            recharge(id){
                console.log(id);
            },

            lock(id){
                console.log(id);
            }
        },

        watch: {
            hidezero: { 
                handler(curVal,oldVal){
                    console.log(curVal);
                },
                deep: true, 
            },

            // hidezero(curVal){
            //     console.log(curVal);
            // }
        }
    }
</script>
<style lang="less" scoped>
    .allassetitem{
        padding-top: 30px;

        .asset{
            float: left;
            position: relative;
            padding-left: 150px;

            span{
                display: block;
            }
            span + span{
                font-size: 16px;
            }
            .title{
                position: absolute;
                top: 0;
                left: 0;
                color: #999999;
                
            }
            .btc{
                padding-bottom: 10px;
            }
        }

        .serachitem{
            float: right;
        }
    }

    .assetlist{
        margin-top: 30px;
        position: relative;
        min-height: 150px;

        ol,ul{
            display: flex;
        }
        ol{
            color: #999999;
            padding-top: 15px;
        }
        li{
            float: left;
            width: 15%;
            padding: 10px 0;
            line-height: 20px;
        }
        li:nth-child(1){
            width: 8%;
            text-indent: 15px;
        }
        li:nth-child(7){
            flex: 1;
        }
        ul{
            background: rgba(12, 31, 44, 0.4);
            border-radius: 3px;
            margin-bottom: 15px;
        }
        ul:hover{
            background: rgba(255,255,255,0.1);
        }

        .el-button+.el-button{
            margin-left: 0;
        }
    }
    .take{
        border: solid 1px #017EFF;
        padding: 3px 5px;
        margin-right: 10px;
        cursor: pointer;
    }
    .recharge{
        padding: 3px 5px;
        margin-right: 10px;
        cursor: pointer;
    }
    .lock{
        border: solid 1px #017EFF;
        padding: 3px 5px;
        cursor: pointer;
    }

    .assetdatalist{
        margin-top: 20px;
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .allassetitem{
            padding-top: 0;
        }

        .allassetitem .asset{
            padding-left: 0;
            float: none;
        }
        .allassetitem .asset .title{
            position: static;
            padding-bottom: 10px;
        }
        .allassetitem .serachitem{
            float: none;
            padding-top: 10px;
        }
        .assetlist ol{
            display: none;
        }
        .assetlist ul{
            display: block;
            padding: 0 15px 5px;
            border-radius: 5px;
            margin-top: 15px;
            margin-bottom: 0;

            .pc{
                color: #999999
            }
        }
        .assetlist li,
        .assetlist li:nth-child(1){
            width: 100%;
            float: none;
            text-indent: 0;
            line-height: 1;
        }
    }
</style>
