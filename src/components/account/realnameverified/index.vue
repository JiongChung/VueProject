<template>
    <div class="realnameverified">
        <el-tabs v-model="activeName">
            <el-tab-pane label="实名认证" name="first">
                <div class="verified-main">
                    <qrcode 
:value="qrcodeUrl" 
:options="{ size: 170 }">
</qrcode>
                    <dl>
                        <dt>姓名：</dt>
                        <dd>
                            <input type="text" name="realname" v-model="realname" placeholder="请输入您的姓名">
                        </dd>
                    </dl>
                    <dl>
                        <dt>身份证号码：</dt>
                        <dd>
                            <input type="text" name="idnumber" v-model="idnumber" placeholder="请输入您的身份证号码">
                        </dd>
                    </dl>
                    <div class="btn-box">
                        <button type="button" class="btn-color">下一步</button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    import VueQrcode from '@xkeshi/vue-qrcode';

    export default Vue.extend({
        components: {
            qrcode : VueQrcode
        },
        data(){
            return{
                activeName: 'first',
                realname: '',
                idnumber: '',
                qrcodeUrl: 'https://api.megvii.com/faceid/lite/do?token=e88fc14f92588e0be1ace79ded5bf1d6'
            }
        },
        mounted: function(){
            // this.get_token();
            this.GetSign();
            this.GetIdentity(this.apiService + 'Account/GetIdentity');
        },
        methods:{
            GetIdentity(url){
                this.$http.get(url).then(response => {
                    console.log(response);
                });
            },
            GetSign(){
                let apikey = '3Oetva6HpRxkMavwuhL9jG2KzjISuFp4';
                let apisecret = 'rcrcql3ejhXoCdwRe8qhjRuu9iU9lHA0';
                let validdurtion = 100;
                let currenttime = parseInt(new Date().getTime()/1000);
                let expiretime = currenttime + validdurtion;
                let randomnumber = Math.floor(Math.random()*Math.pow(10,10));
                console.log(currenttime)
            }
        }
    })
</script>
<style lang="less" scoped>
    .verified-main{
        margin: 0 auto;
        width: 400px;
        padding: 20px 0 0;
        dl{
            padding-bottom: 30px;
        }
        dd{
            padding-top: 10px;

            input{
                width: 100%;
                padding: 15px;
                border-radius: 5px;
                background: rgba(12, 31, 44, 0.4);
                color: #ffffff
            }
        }

        .btn-box{
            padding-top: 20px;
            button{
                width: 100%;
                padding: 15px 0;
                font-size: 16px;
            }
        }
    }
</style>
