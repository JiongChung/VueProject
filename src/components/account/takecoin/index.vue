<template>
    <div class="takecoinpage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="充值提币记录" name="first">
                <div class="takecoinitem">
                    <el-button type="primary" @click="getETH">ETH</el-button>
                    <el-button @click="getVC">VC</el-button>
                    <div class="takecoinist">
                        <!-- <ol class="clearfix">
                            <li>类型</li>
                            <li>币种</li>
                            <li>时间</li>
                            <li>数量</li>
                            <li>状态</li>
                            <li>确认数</li>
                        </ol>
                        <ul class="clearfix">
                            <li>类型</li>
                            <li>币种</li>
                            <li>时间</li>
                            <li>数量</li>
                            <li>状态</li>
                            <li>确认数</li>
                        </ul> -->

                        <el-table
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="地址">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name: 'TakeCoin',
        data() {
            return {
                activeName: 'first',
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ]
            };
        },
        methods: {
            getETH(){
                console.log(0)
            },

            getVC(){
                console.log(0)
            }
        }
    }
</script>
<style lang="less" scoped>
    .takecoinitem{
        padding-top: 20px;

        .takecoinist{
            padding-top: 20px;

            ol,ul{
                padding:15px 10px;
                li{
                    float: left;
                    width: 16.66%;
                }
            }
            ol{
                color: #999999;
            }
            ul{
                background: rgba(12, 31, 44, 0.4);
                font-size: 12px;
                margin-bottom: 10px;
                border-radius: 5px;
            }
            ul:hover{
                background: rgba(255,255,255,0.1)
            }
        }
    }
</style>
