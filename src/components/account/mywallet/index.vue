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
                    <el-table
                        :data="tableData"
                        v-loading="loading"
                        element-loading-background="rgba(0, 0, 0, 0.3)"
                        style="width: 100%" class="assetdatalist">
                            <el-table-column
                                prop="cointype"
                                label="币种"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="total"
                                label="总额"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="balance"
                                label="可用余额"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="freeze"
                                label="下单冻结"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="locked"
                                label="锁仓"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="valuation"
                                label="资产估值"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="takeCoinOut(scope.row.id)" class="take" type="text" size="small">提币</el-button>
                                <el-button @click="recharge(scope.row.id)" type="text" size="small" class="btn-color recharge">充值</el-button>
                                <el-button @click="lock(scope.row.id)" type="text" size="small" class="lock">锁仓</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name: 'MyWallet',
        data(){
            return{
                activeName: 'first',
                assetSearch:'',
                hidezero: false,
                tableData: 
                [
                    {
                        id: 1,
                        cointype: 'BTC',
                        total: '963.0258711',
                        balance: '520.36958521',
                        freeze: '0.128855544',
                        locked: '0.3258744485',
                        valuation: '963287812 CNY'
                    },
                    {
                        id: 2,
                        cointype: 'ETH',
                        total: '963.0258711',
                        balance: '520.36958521',
                        freeze: '0.128855544',
                        locked: '0.3258744485',
                        valuation: '963287812 CNY'
                    }
                ],
                loading: true
            }
        },
        methods: {
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
        padding-top: 30px;
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
</style>
