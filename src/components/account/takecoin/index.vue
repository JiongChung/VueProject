<template>
    <div class="takecoinpage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="充值提币记录" name="first">
                <div class="takecoinitem">
                    <el-button type="primary" @click="getETH">ETH</el-button>
                    <el-button @click="getVC">VC</el-button>
                    <div class="takecoinist">
                        <el-table
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="type"
                                label="类型"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="coin"
                                label="币种"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="数量"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="confirmnumber"
                                label="确认数">
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
        }
    }
</style>
