<template>
    <div>
        <div class="tradesettingspage" v-if="tradesettingspage">
            <el-tabs v-model="activeName">
                <el-tab-pane label="收款账号" name="first">
                    <div class="tradetipsbox">
                        <ul>
                            <li>请设置您能支持的支付或收款方式，请务必保障是您本人所有的账号。</li>
                            <li>您所设置的信息，将可自动呈现在您所发布的普通广告交易信息中。</li>
                        </ul>
                    </div>
                    <div class="tradesettinglist">
                        <ol class="clearfix">
                            <li>交易方式</li>
                            <li>设置</li>
                            <li>是否在订单中显示</li>
                            <li>操作</li>
                        </ol>
                        <div v-html="loadingHtml" v-show="isloading"></div>
                        <ul class="clearfix" v-for="item in UserPaymentMethodList">
                            <li>
                                <span class="img"><img src="../../../assets/images/6.png" alt=""></span>
                                {{item.paymentMethodName}}
                            </li>
                            <li>
                                用户信息：{{item.accountInfo}}
                            </li>
                            <li>
                                <span v-if="item.isShowOrder">是</span>
                                <span v-if="!item.isShowOrder">否</span>
                            </li>
                            <li>
                                <span class="btn-color" @click="EditAccount(item.paymentMethodId)">设置</span>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tradesettingsoptions" v-if="tradesettingsoptions">
            <el-tabs v-model="activeName">
                <el-tab-pane label="编辑支付方式" name="first">
                    <div class="tradeeditbox">
                        <el-form ref="form" :model="form">
                            <h4 v-if="form.paymentMethodId == 1">银行账号信息</h4>
                            <h4 v-if="form.paymentMethodId == 2">支付宝信息</h4>
                            <h4 v-if="form.paymentMethodId == 3">微信信息</h4>
                            <h4 v-if="form.paymentMethodId == 4">PayPal信息</h4>
                            <textarea id="banktxt" name="banktxt" v-model="form.accountInfo">
                                姓	名：陈小龙
                                开  户  行：中国银行
                            </textarea>
                            <h4>上传收款二维码/账户信息</h4>
                            <div class="uploadpic">
                                <input type="file" class="uploadbtn">
                            </div>
                            <label class="ordershow">
                                <el-checkbox v-model="form.isShowOrder">展示在订单页面</el-checkbox>
                            </label>
                            <div class="submit">
                                <el-button type="primary" @click="onSubmit" class="btn">提交</el-button>
                                <span class="cancel" @click="cancelEdit">取消并返回</span>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    export default Vue.extend({
        data(){
            return{
                activeName: 'first',
                tradesettingspage: true,
                tradesettingsoptions: false,
                UserPaymentMethodList: [],
                form: {
                    accountInfo: '',
                    isShowOrder: false,
                    qrCodeId: '',
                    paymentMethodId: 0
                },
                loadingHtml: '',
                isloading: true
            }
        },
        mounted: function(){
           this.GetAllForUser(this.apiService + 'UserPaymentMethod/GetAllForUser');
           this.loadingHtml = this.commonService.isloading();
        },
        methods:{
            onSubmit(){
                let url = this.apiService + 'UserPaymentMethod/CreateOrUpdateUserPaymentMethod';
                this.$http.post(url,this.form).then(res => {
                    console.log(res)
                });
            },

            cancelEdit: function(){
                this.tradesettingspage = true;
                this.tradesettingsoptions = false;
            },

            EditAccount: function(index){
                this.form.paymentMethodId = index;
                this.tradesettingspage = false;
                this.tradesettingsoptions = true;
                for(let i=0; i<this.UserPaymentMethodList.length; i++){
                    if(this.UserPaymentMethodList[i].paymentMethodId == index){
                        this.form.accountInfo = this.UserPaymentMethodList[i].accountInfo;
                        this.form.isShowOrder = this.UserPaymentMethodList[i].isShowOrder;
                        break;
                    }
                }
            },

            GetAllForUser(url){
                this.$http.get(url).then(response => {
                    this.isloading = false;
                    this.UserPaymentMethodList = response.body.result.items;
                });
            }
        }
    })
</script>
<style lang="less" scoped>
    .tradetipsbox{
        background: rgba(12, 31, 44, 0.4);
        padding: 10px 20px;
        margin-top: 10px;

        li{
            position: relative;
            padding: 10px 0 10px 20px;
        }
        li:before{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 10px;
            height: 10px;
            background: #017EFF;
            display: block;
            content: "";
            border-radius: 50%;
            margin: auto;
        }
    }
    .tradesettinglist{
        margin-top: 30px;
        position: relative;
        min-height: 150px;

        ol{
            display: flex;
            padding-bottom: 10px;
            padding-top: 10px;

            li{
                float: left;
            }

            li:nth-child(1){
                width: 180px;
                text-align: center;
            }
            li:nth-child(2){
                flex: 1;
            }
            li:nth-child(3){
                width: 200px;
                text-align: center;
            }
            li:nth-child(4){
                width: 100px;
                text-align: center;
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
            }
            li:nth-child(1){
                width: 160px;
                
                .img{
                    float: left;
                    line-height: 1;
                    padding-right: 10px;
                }
            }
            li:nth-child(2){
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 37px;
            }
            li:nth-child(3){
                width: 200px;
                text-align: center;
            }
            li:nth-child(4){
                width: 100px;
                text-align: center;
                float: right;
                margin-right: -20px;
            }
        }
    }

    .tradeeditbox{
        padding-top: 20px;

        h4{
            font-weight: normal;
            padding-bottom: 10px;
        }

        textarea{
            width: 100%;
            background: rgba(12, 31, 44, 0.4);
            padding: 10px 20px;
            line-height: 2;
            color:#ffffff;
            height: 140px;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
            margin-bottom: 30px;
            border-radius: 3px;
        }

        .uploadpic{
            padding: 15px 20px;
            background: rgba(12, 31, 44, 0.4);
            border-radius: 3px;
        }

        .ordershow{
            margin-top: 20px;
            display: block;
            position: relative;
            cursor: pointer;

            .el-checkbox{
                color: #ffffff;
            }
        }

        .submit{
            padding-top: 50px;

            .btn{
                background: linear-gradient(to right, #00B4FF, #0080FF);
                padding: 10px 0;
                width: 180px;
                text-align: center;
                color: #ffffff;
                cursor: pointer;
                font-size: 16px;
                border-radius: 5px;
                float: left;
            }

            .cancel{
                border: 1px solid #017EFF;
                padding: 11px 0;
                width: 180px;
                text-align: center;
                color: #ffffff;
                cursor: pointer;
                font-size: 16px;
                border-radius: 5px;
                float: left;
                margin-left: 20px                
            }
        }
    }
</style>
