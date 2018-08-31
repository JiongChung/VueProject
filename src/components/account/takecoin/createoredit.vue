<template>
    <div class="createoreditpage">
        <div class="create-item">
            <el-tabs v-model="activeName">
                <el-tab-pane label="提币地址" name="first">
                    <h3 v-show="isCreatePage">新建ETH-Etherum提币地址</h3>
                    <h3 v-show="!isCreatePage">编辑ETH-Etherum提币地址</h3>
                    <span v-show="isCreatePage" class="tips">如果您无法成功创建地址，请参考<b>为什么创建地址会失败？</b></span>
                    <el-form :label-position="labelPosition" :model="formLabelAlign" class="takecionform">
                        <el-form-item label="地址说明">
                            <el-input v-model="formLabelAlign.addressDescription" placeholder="例如：imToken"></el-input>
                        </el-form-item>
                        <el-form-item label="提币地址">
                            <el-input v-model="formLabelAlign.takeCoinAddress" placeholder="请输入提币地址"></el-input>
                        </el-form-item>
                        <el-checkbox v-model="confirmChecked" v-show="isCreatePage">我承诺我已确认要新增ETH提币地址，并再次确认提币地址正确，如若地址错识，风险自行承担。</el-checkbox>
                        <span class="note" v-show="isCreatePage">注意：请勿从本平台提币至任何ICO个人个人众筹地址</span>
                        <span class="btn-color btn" v-if="isCreatePage" @click="onSubmit('create')">立即创建</span>
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
            formLabelAlign: {
                addressDescription: '',
                takeCoinAddress: ''
            },
            confirmChecked: true
        }
    },
    methods: {
        onSubmit(name){
            console.log(name)
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

           .takecionform{
               padding-top: 30px;
           }
        }
    }
</style>
