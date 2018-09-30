<template>
    <div class="takecoinpage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="充值提币记录" name="first">
                <div class="takecoinitem">
                    <div class="tabs">
                        <ul class="clearfix">
                            <li 
                            v-for="(item,index) in tabs" 
                            :class="{active:index == num}"
                            @click="tab(index)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="tabContent">
                        <div class="takecoinist">
                            <ol class="clearfix">
                                <li>类型</li>
                                <li>币种</li>
                                <li>时间</li>
                                <li>数量</li>
                                <li>状态</li>
                                <li>确认数</li>
                            </ol>
                            <div v-html="loadingHtml" v-show="isloading"></div>
                            <div class="nodata" v-show="coinlist.length == 0 && !isloading">暂无数据</div>
                            <ul class="clearfix" v-for="item in coinlist">
                                <li>类型</li>
                                <li>币种</li>
                                <li>时间</li>
                                <li>数量</li>
                                <li>状态</li>
                                <li>确认数</li>
                            </ul>
                        </div>
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
                tabs: ["ETH", "VC"],
                num: 0,
                tabContents:[0,1],
                loadingHtml: '',
                isloading: true,
                coinlist: [],
            };
        },
        mounted: function(){
           this.loadingHtml = this.commonService.isloading();
           this.tab(0);
        },
        methods: {
            tab(index) {
                this.num = index;
                this.GetUserWithdrawAddess(this.apiService + 'UserWallet/GetUserWithdrawAddess');
            },
            GetUserWithdrawAddess(url){
                if(this.num == 0){
                    url = url + '?CoinTypeSymbol=eth'
                }else{
                    url = url + '?CoinTypeSymbol=vc'
                }
                this.isloading = true;
                this.coinlist = [];
                this.$http.get(url).then(response => {
                    this.coinlist = response.body.result.items;               
                    console.log(response.body.result.items)
                    this.isloading = false;
                },err => {
                    console.log(err)
                });
                console.log(url)
            }
        }
    }
</script>
<style lang="less" scoped>
    .takecoinitem{
        margin-top: 20px;
        position: relative;
        min-height: 150px;

        .tabs{
            li{
                float: left;
                font-size: 16px;
                padding: 7px 25px;
                border:solid 1px #017eff;
                margin-right: 20px;
                border-radius: 3px;
                cursor: pointer;
            }
            .active{
                background: #017eff
            }
        }
        .takecoinist{
            padding-top: 20px;

            ol,ul{
                display: flex;
            }
            ol{
                color: #999999;
            }
            li:first-child{
                text-indent: 20px;
            }
            li{
                float: left;
                width: 15%;
                padding: 15px 0;
            }
            ul{
                background: rgba(12, 31, 44, 0.4);
                border-radius: 5px;
                margin-bottom: 10px
            }
            ul:hover{
                background: rgba(255,255,255,0.1);
            }
        }
    }
</style>
