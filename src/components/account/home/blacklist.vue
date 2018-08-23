<template>
    <div class="blacklistpage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="黑名单" name="first">
                <div class="blacklist" v-if="lists.length == 0">
                    <div class="nodata">
                        没有数据
                    </div>
                </div>
                <div class="blacklist" v-if="lists.length > 0">
                    <ol class="clearfix">
                        <li>用户名</li>
                        <li>交易次数</li>
                        <li>评价数</li>
                        <li>操作</li>
                    </ol>
                    <ul>
                        <li>
                            <span class="img"><img src="../../../assets/images/6.png" alt=""></span>
                            UserName
                        </li>
                        <li>
                            10
                        </li>
                        <li>
                            80%
                        </li>
                        <li>
                            <span class="btn-color" @click="removeBlackList(0)">移出黑名单</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name: 'BlackList',
        data(){
            return{
                activeName: 'first',
                lists: [
                    {name: 'a'}
                ]
            }
        },
        methods: {
            removeBlackList(id) {
                console.log(id)
                this.$confirm('确定要将此用户移出黑名单?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            }
        }
    }
</script>
<style lang="less" scoped>
    .blacklist{
        padding-top: 30px;
        ol{
             display: flex;
             padding-bottom: 10px;

             li{
                 float: left;
                 width: 20%;
             }

             li:nth-child(1){
                width: 40%;
                text-indent: 20px;
            }
        }

        ul{
            margin-top: 10px;
            background: rgba(12, 31, 44, 0.4);
            padding: 10px 20px;
            display: flex;

            li{
                float: left;
                line-height: 35px;
                width: 20%;

                .img{
                    float: left;
                    line-height: 1;
                    padding-right: 10px;
                }
            }

            li:nth-child(1){
                width: 40%;
            }
        }
    }
</style>
