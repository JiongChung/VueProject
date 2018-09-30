<template>
    <div class="setassetpassword" v-if="setPhoneStatus">
        <div class="setphonestep clearfix">
            <span class="btn-color">验证旧手机</span>
            <span class="new" :class="{ 'gray' : !isNewDone, 'btn-color' : isNewDone}">验证新手机</span>
            <span class="done" :class="{ 'gray' : !isDone, 'btn-color' : isDone}">完成</span>
        </div>
        <div class="setphonetips" v-if="isSetDone">
            <span>修改手机号，24小时内限制提币和卖币。</span>
            <span>一个手机只能绑定一个账号。更换手机后，下次登录可使用新手机登录</span>
        </div>
        <div class="one" v-if="isOneStep">
            <div class="setphonebtn">
                <button type="button" class="btn-color btn-submit" @click="sendOldPhoneCode($event)">验证原手机</button>
            </div>
        </div>
        <div class="two" v-if="isTwoStep">
            <div class="setoldphonecode">
                验证码已经发至您的手机了，请查看。
                <div class="phonecodeitem">
                    <input type="text" name="phonecode" maxlength="6" placeholder="请输入验证码" v-model="phoneCode">
                </div>
                <div class="setphonebtn">
                    <button type="button" class="btn-color btn-submit" @click="goToNext($event)">下一步</button>
                </div>
            </div>
        </div>
        <div class="three" v-if="isThreeStep">
            <div class="setnewphone">
                <el-form ref="form" :model="setNewPhoneForm">
                    <el-form-item>
                        <el-input v-model="setNewPhoneForm.phoneNumber" placeholder="请输入新手机号" class="newphonenumber"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input maxlength="6" v-model="setNewPhoneForm.newphonecode"  placeholder="请输入验证码" class="newphonenumber"></el-input>
                        <b class="getnewphonecode" id="gethonecode" @click="getphonecode($event)">获取验证</b>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" class="btn-color btn-submit" @click="saveNewPhone($event)">下一步</button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="four" v-if="isFourStep">
            <div class="setsuccess">
                <h4>恭喜您，手机修改成功！</h4>
                <span>
                    3秒后自动返回上一级页面
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['setStatus','setPhoneStatus'],
    data(){
        return{
            isDone: false,
            isNewDone: false,
            isOneStep: true,
            isTwoStep: false,
            isThreeStep: false,
            isFourStep: false,
            isSetDone: true,
            phoneCode: '',
            setNewPhoneForm: {
                phoneNumber: '',
                newphonecode: ''
            },
            loadingStatus: false,
            getPhonecodestatus: true,
        }
    },
    methods: {
        sendOldPhoneCode(obj){
            if(this.loadingStatus)return;
            this.loadingStatus = true;
            obj.target.classList.add('loading');

            let url = this.apiService + 'Account/SendOriginalSmsCode';
            let that = this;

           
            this.$http.post(url).then(response => {
                console.log(response);
                that.isOneStep = false;
                that.isTwoStep = true;
                that.loadingStatus = false;
                obj.target.classList.remove('loading');                
            },err => {
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
            });
        },

        goToNext(obj){
            if(this.loadingStatus)return;
            let status = false;
            if(!this.commonService.zValidate.int(this.phoneCode)){
                status = true;
                this.$message.error('验证码格式不正确');
            }
            if(status){
                return false;
            }
            this.loadingStatus = true;
            obj.target.classList.add('loading');

            let url = this.apiService + 'Account/CheckOriginalSmsCode';
            let that = this;
           

            this.$http.post(url, {code : this.phoneCode}).then(response => {
                console.log(response);
                that.phoneCode = '';
                that.isThreeStep = true;
                that.isTwoStep = false;
                that.isNewDone = true;
                that.loadingStatus = false;
                obj.target.classList.remove('loading');              
            },err => {
                that.loadingStatus = false;
                obj.target.classList.remove('loading');
                console.log(err);
                this.$message.error(err.body.error.message);
            });
            
        },

       

        saveNewPhone(obj){
            if(this.loadingStatus)return;
            let status = false;

            if(!this.commonService.zValidate.phone(this.setNewPhoneForm.phoneNumber)){
                status = true;
                this.$message.error('手机格式不正确');
            }

            if(!this.commonService.zValidate.int(this.setNewPhoneForm.newphonecode)){
                status = true;
                this.$message.error('验证码格式不正确');
            }

            if(status){
                return false;
            }

            this.loadingStatus = true;
            obj.target.classList.add('loading');

            this.isDone = true;
            this.isSetDone = true;
            
            let that = this;
            let url = this.apiService + 'Account/BindPhone';
            let data = {};
            data.phoneNumber = this.setNewPhoneForm.phoneNumber;
            data.code = this.setNewPhoneForm.newphonecode;
            let btn = document.getElementById('gethonecode');
            this.$http.post(url, data).then(response => {
                console.log(response);
                that.isDone = false;
                that.isNewDone = false;
                that.isOneStep = true;
                that.isTwoStep = false;
                that.isThreeStep = false;
                that.loadingStatus = false;
                that.setNewPhoneForm.phoneNumber = '';
                that.setNewPhoneForm.newphonecode = '';
                obj.target.classList.remove('loading');  
                this.$emit('listenSetPhone','bindemail');
                this.$notify({
                    title: '',
                    message: '恭喜您，手机修改成功！',
                    type: 'success'
                });
            },err => {
                console.log(err);
                that.loadingStatus = false;
                obj.target.classList.remove('loading');  
                this.$message.error(err.body.error.message);
                that.commonService.getPhoneCodeNow(btn, 0 ,true,'获取验证码','重新发送', 'off');
            });
        },
        
        getphonecode(obj){
            if(!this.commonService.zValidate.phone(this.setNewPhoneForm.phoneNumber)){
                this.$message.error('手机格式不正确');
            }else{
                if(this.getPhonecodestatus){
                    this.sendCode(obj.target);
                }else{
                    let name = obj.target.className.split(' ');
                    if(name.indexOf('loading') == -1){
                        this.getPhonecodestatus = true;
                        this.sendCode(obj.target);
                    }
                }
            }
        },

        sendCode(obj){
            let status = this.commonService.getPhoneCodeNow(obj, 60 ,true,'获取验证码','重新发送');
            this.getPhonecodestatus = status;
            this.SendSmsCode(this.apiService + 'Account/SendSmsCode');
        },

        SendSmsCode(url){
            let data = {};
            data.phoneNumber = this.setNewPhoneForm.phoneNumber;
            data.codeType = 3
            this.$http.post(url, data).then(response => {
                console.log(response);
            },err => {
                console.log(err.body.error.message);
                this.$message.error(err.body.error.message);
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .setassetpassword{
        padding-top: 20px;
        h4{
            text-align: center;
            font-weight: normal;
            padding-bottom: 20px;
            font-size: 18px;
        }
        .text{
            display: block;
            text-align: center;
            padding-bottom: 40px;
        }

        .assetpasswordform{
            width: 400px;
            margin: auto;
            padding-top: 30px;
        }

        .el-steps-item{
            margin: auto;
            background: red;
            width: 400px;
        }


        .inputbox{
            position: relative;

            .getcode{
                position: absolute;
                top: 0;
                right: 10px;
                bottom: 0;
                margin: auto;
                color: #007eff;
                cursor: pointer;
                height: 20px;
                line-height: 20px;
            }
        }

        .setphonestep{
            width: 600px;
            margin: 0 auto;
            background: rgba(12, 31, 44, 0.4);
            border-radius: 30px;
            padding: 5px;

            span{
                float: left;
                border-radius: 30px;
                padding: 10px 20px;
            }
            span.gray{
                background: #cccccc
            }
            span.done{
                float: right;
            }
            span.new{
                margin-left: 145px;
            }
        }

        .setphonetips{
            text-align: center;
            padding-top: 30px;

            span{
                display: block;
                padding-top: 20px;
            }
        }

        .setphonebtn{
            text-align: center;
            padding-top: 30px;
            width: 300px;
            margin: 0 auto;

            button{
                display: block;
                padding: 10px 0;
                width: 100%;
                font-size: 16px;
            }
        }

        .setoldphonecode{
            text-align: center;
            padding-top: 30px;

            b{
                color: #017EFF;
                font-weight: normal
            }

            .phonecodeitem{
                width: 300px;
                margin: 30px auto 0;
                position: relative;

                input{
                    background: rgba(12, 31, 44, 0.4);
                    border-radius: 3px;
                    padding:18px 10px 17px;
                    width: 100%;
                    color: #ffffff;
                }

                .getphonecode{
                    position: absolute;
                    top: 12px;
                    right: 10px;
                    color: #017EFF;
                    font-size: 12px;
                    cursor: pointer;
                    font-weight: normal
                }
            }
        }

        .setnewphone{
            width: 350px;
            margin:30px  auto 0;

            .getnewphonecode{
                position: absolute;
                top: 0;
                right: 10px;
                font-weight: normal;
                color: #017EFF;
                cursor: pointer;
                font-size: 12px;
                bottom: 0;
                margin: auto;
                height: 20px;
                line-height: 20px;
            }
            .btn-color{
                width: 100%;
                font-size: 16px;
            }
            
        }

        .setsuccess{
            padding-top: 50px;
            text-align: center;

            h4{
                font-size: 20px;
                font-weight: normal;
            }
            span{
                display: block;
                padding-top: 20px;
            }
        }

    }
    @media only screen and (min-width: 320px) and (max-width:768px){
        
        .setassetpassword h4{
            text-align: left;
        }
        .setassetpassword .text{
            text-align: left;
            padding-bottom: 15px;
            line-height: 1.5;
            color: #999999;
        }
        .setassetpassword{
            padding-top: 0;
        }
        .setassetpassword .assetpasswordform{
            width: 100%;
        }
        
        .setassetpassword.setemail h4{
            text-align: center;
            padding-top: 10px;
        }
        
        .setassetpassword .four .setsuccess h4{
            text-align: center;
        }
        .setassetpassword .four .setsuccess span{
            padding-top: 0;
            padding-bottom: 20px;
        }

        .setassetpassword .setphonestep{
            width: 100%;
        }

        .setassetpassword .setphonestep span{
            font-size: 12px;
            padding: 5px 8px;
        }
        .setassetpassword .setphonestep span.new{
            margin-left: 17%;
        }
        .setassetpassword .setphonetips{
            padding-top: 0;
        }
        .setassetpassword .setphonetips span{
            line-height: 1.5;
        }
        .setassetpassword .setnewphone{
            width: 100%
        }
    }
</style>
