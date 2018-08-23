<template>
    <div class="whitelistpage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="信任名单" name="first">
                <div class="whitelistlist" v-if="lists.length == 0">
                    <div class="nodata">
                        没有数据
                    </div>
                </div>
                <div class="whitelistlist" v-if="lists.length > 0">
                    <ol class="clearfix">
                        <li>被信任的人</li>
                        <li>交易次数</li>
                        <li>评价数</li>
                        <li>好评度</li>
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
                            320
                        </li>
                        <li>
                            80%
                        </li>
                        <li>
                            <span class="btn-color">查看用户主页</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name: 'Whitelist',
        data(){
            return{
                activeName: 'first',
                lists: [
                    
                ]
            }
        }
    }
</script>
<style lang="less" scoped>
    .whitelistlist{
        padding-top: 30px;
        ol{
             display: flex;
             padding-bottom: 10px;

             li{
                 float: left;
                 width: 20%;
             }

             li:nth-child(1){
                width: 30%;
                text-indent: 20px;
            }
            li:nth-child(2){
                width: 15%;
            }
            li:nth-child(3){
                width: 15%;
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
                width: 30%;
            }
            li:nth-child(2){
                width: 15%;
            }
            li:nth-child(3){
                width: 15%;
            }
        }
    }
</style>
