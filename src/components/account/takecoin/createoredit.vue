<template>
    <div class="createoreditpage">
        <div class="create-item">
            <el-tabs v-model="activeName">
                <el-tab-pane label="提币地址" name="first">
                    <h3 v-show="isCreatePage">新建ETH-Etherum提币地址</h3>
                    <h3 v-show="!isCreatePage">编辑ETH-Etherum提币地址</h3>
                    <span v-show="isCreatePage" class="tips">如果您无法成功创建地址，请参考<b>为什么创建地址会失败？</b></span>
                    <el-form :label-position="labelPosition" :model="userWithdrawAddess" class="takecionform">
                        <el-form-item label="地址说明">
                            <el-input v-model="userWithdrawAddess.tag" v-on:input="watchTag" placeholder="例如：imToken"></el-input>
                        </el-form-item>
                        <el-form-item label="提币地址">
                            <el-input v-model="userWithdrawAddess.address" v-on:input="watchAddress" placeholder="请输入提币地址"></el-input>
                        </el-form-item>
                        <el-checkbox @change="checkboxEvent" v-model="confirmChecked" v-show="isCreatePage">我承诺我已确认要新增ETH提币地址，并再次确认提币地址正确，如若地址错识，风险自行承担。</el-checkbox>
                        <span class="note" v-show="isCreatePage">注意：请勿从本平台提币至任何ICO个人个人众筹地址</span>
                        <span class="btn-color btn" v-bind:class="{disabled : !userWithdrawAddess.valid}" v-if="isCreatePage" @click="onSubmit('create')">立即创建</span>
                        <span class="btn-color btn" v-else @click="onSubmit('save')">立即保存</span>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isCreatePage: true,
            activeName: 'first',
            labelPosition: 'top',
            userWithdrawAddess: {
                tag: '',
                address: '',
                valid: false
            },
            confirmChecked: true,
            coinTypeSymbol: ''
        }
    },
    mounted: function(){
        console.log(this.$route.query.id)
        console.log(this.$route.query.type)
        // if(!(/(^[0-9]\d*$)/.test(this.$route.params.id))){
        //     this.isCreatePage = true;
        // }else{
        //     if(this.$route.params.id == 0){
        //         this.isCreatePage = true;
        //     }else{
        //         this.isCreatePage = false;
        //     }
        // }

        
    },
    methods: {
        onSubmit(name){
            this.userWithdrawAddess.coinTypeSymbol = this.$route.query.type;
            delete this.userWithdrawAddess.valid;
            console.log(this.userWithdrawAddess);
            let data = {userWithdrawAddess : this.userWithdrawAddess}
            let url = this.apiService + 'UserWallet/CreateOrUpdateUserWithdrawAddess';
            if(name == 'create'){
                this.$http.post(url, data).then(response => {
                    console.log(response);
                },err => {
                    console.log(err);
                    this.userWithdrawAddess.valid = true;
                    this.$message.error(err.body.error.message);
                });
            }
        },

        watchTag(){
            if(!this.userWithdrawAddess.tag){
                this.userWithdrawAddess.valid = false;
            }else{
                if(this.userWithdrawAddess.address && this.confirmChecked){
                    this.userWithdrawAddess.valid = true;
                }
            }
        },

        watchAddress(){
            if(!this.userWithdrawAddess.address){
                this.userWithdrawAddess.valid = false;
            }else{
                if(this.userWithdrawAddess.tag && this.confirmChecked){
                    this.userWithdrawAddess.valid = true;
                }
            }
        },

        checkboxEvent(){
            if(this.userWithdrawAddess.tag && this.userWithdrawAddess.address && this.confirmChecked){
                this.userWithdrawAddess.valid = true;
            }else{
                this.userWithdrawAddess.valid = false;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .createoreditpage{
        .create-item{
            h3{
                font-size: 18px;
                font-weight: normal;
                padding-top: 20px ;
            }
            .tips{
                padding-top: 20px;
                display: block;
                
                b{
                    font-weight: normal;
                    color: #017efe;
                }
            }
            .note{
                color: #017efe;
                padding-top: 20px;
                display: block;
            }

           .btn{
               display: inline-block;
               width: 180px;
               padding: 15px 0;
               text-align: center;
               margin-top: 40px;
               font-size: 16px;
           }
           .disabled{
               cursor: not-allowed;
               background: #58ceff;
           }

           .takecionform{
               padding-top: 30px;
           }
        }
    }
</style>
