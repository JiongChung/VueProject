<template>
    <div class="publishpage">
        <div class="needlogin" v-if="!isuserlogin">
            <i class="el-icon-warning"></i>
            您需要登录或注册才能发布广告
        </div>
        <el-form ref="form" :model="form">
            <h1 class="title">
                发布普通广告
            </h1>
            <div class="publishtips">
                <p>发布自己的BTC交易广告适合经常交易的用户，如果您只想购买或者出售一次，建议您直接从广告列表中下单交易>新手发布广告前，我该注意什么</p>
                <p>广告规则：</p>
                <p>当前创建一则出售BTC广告是免费的</p>
                <p>订单成交手续费为成交额的0.5%，(例：成交金额为1BTC，则手续费为0.005BTC。使用OTB支付可获50%折扣)</p>
                <p>广告展示有效期为14天，且账户余额需大于0.025BTC，广告才显示于列表页</p>
            </div>
            <div class="pushitem">
                <div class="title"><b>我想</b> (必填)</div>
                <div class="pushtype">
                    <el-select v-model="form.tradeType" placeholder="请选择">
                        <el-option
                            v-for="item in tradeTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.coinTypeId" @change="CheckCoinType" placeholder="请选择">
                        <el-option
                            v-for="item in coinTypeIdOptions"
                            :key="item.id"
                            :label="item.shortName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.countryId" placeholder="请选择">
                        <el-option
                            v-for="item in countryIdOptions"
                            :key="item.id"
                            :label="item.countryCode"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.currencyTypeId" placeholder="请选择">
                        <el-option
                            v-for="item in currencyTypeIdOptions"
                            :key="item.id"
                            :label="item.symbol"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="pushitem">
                <div class="title"><b>出售价设置</b> (必填)</div>
                <div class="solditem clearfix">
                    <el-tabs v-model="activeName"  @tab-click="handleClick">
                        <el-tab-pane label="浮动价格" :disabled="priceTypeDisabled" name="first">
                            <div class="marketprice">
                                <div class="marketitem">
                                    <h4>市场价对标交易所</h4>
                                    <el-select v-model="Average" placeholder="请选择">
                                        <el-option
                                        v-for="item in Averageoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                                </div>
                                <div class="marketitem">
                                    <h4>您的报价</h4>
                                    <span class="yourprice">
                                        {{yourprice}}
                                    </span>
                                </div>
                                <div class="marketitem">
                                <h4>当前市场最低出售价</h4>
                                <span class="lowprice">
                                    52
                                </span>
                                </div>
                            </div>
                            <div class="premium">
                                <span class="text">
                                    溢价设置 <i>(注意：您的报价为浮动价格，实际交易价格将以用户下单时的价格为准关于浮动价格的说明)</i>
                                </span>
                                <div class="block">
                                    <el-slider
                                        v-model="form.premiumPer"
                                        :format-tooltip="formatTooltip"
                                        :show-tooltip="false"
                                        :show-input="true"
                                        :min="-70"
                                        :max="70"
                                        :debounce="100"
                                        :step="0.001"
                                        >
                                    </el-slider>
                                </div>
                                <div class="premiumtools clearfix">
                                    <div class="formula">
                                        计算公式：1000 CNY * <span>{{premiumRate}}</span>
                                    </div>
                                    <div class="premiumpricetips">
                                        (溢价率仅到小数点都三位)
                                    </div>
                                </div>
                            </div>
                            <div class="acceptlowprice">
                                <h4>可接受最低单<span>(留空，则不设置)</span></h4>
                                <input type="number" v-model="form.lowestPrice" id="acceptlowprice" name="acceptlowprice" placeholder="请输入可接受最低单">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="固定价格" name="second">
                            <div class="regularpricve">
                                <ul class="clearfix">
                                    <li>
                                        <span class="yourprice">
                                            您的报价
                                        </span>
                                        <input type="text" v-model="form.price" name="Youroffer" id="Youroffer" placeholder="请输入您的报价">
                                    </li>
                                    <li>
                                        <span class="yourprice">
                                            当前市场最低出售价
                                        </span>
                                        <div class="currentlowprice">5823</div>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="pushitem">
                <div class="title"><b>交易方式</b> (必填)</div>
                <div class="paymentlist">
                    <button type="button" v-for="item in paymentlist" @click="CheckPayment($event,item.value)">{{item.displayText}}</button>
                </div>
            </div>
            <div class="pushitem">
                <div class="title"><b>交易限额</b> (必填)</div>
                <div class="limititem">
                    <ul class="clearfix">
                        <li>
                            <div class="limittile">最小限额<span>(一次交易的最低交易限制)</span></div>
                            <div class="limitpride">
                                <input type="number" v-model="form.mixPrice"  name="limitlowpride" placeholder="请输入最小限额">
                                <b class="currency">CNY</b>
                            </div>
                        </li>
                        <li>
                            <div class="limittile">最大限额<span>(一次交易的最高交易限制)</span></div>
                            <div class="limitpride">
                                <input type="number" v-model="form.maxPrice"  name="limithighpride" placeholder="请输入最大限额">
                                <b class="currency">CNY</b>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pushitem">
                <div class="title"><b>交易说明</b> (建议填写)所有用户可见</div>
                <div class="transactiondescription">
                    <textarea name="transactiondescription" v-model="form.transDesc" id="transactiondescription" placeholder="1、订单有效期为15分钟，请您及时在有效期内付款并点击[标记付款已完成]按钮，我才可以释放数字货币给您
    2、如果您无法再15分钟内完成付款，请点击[延长订单有效期]按钮 
    3、开始交易后数字货币由系统锁定托管，请安心下单"></textarea>
                </div>
            </div>
            <div class="pushitem">
                <div class="title"><b>交易备注</b> (建议填写)客户下单后可见</div>
                <div class="transactiondescription">
                    <textarea name="transactionnote" v-model="form.transactionnote" id="transactionnote" placeholder="请勿在汇款备注内填写比特、BTC、VC等任何数字有关字眼，防止您的汇款被银行拦截  

    银行账号：XXXX XXXX XXXX XXXX 
    支付宝账号：XXXXXXXXXXX 
    微信账号：XXXXXXXXXXX 
    下单后可能直接加我微信跟我联系，我会尽快回复。"></textarea>
                </div>
            </div>
            <div class="pushitem">
                <div class="showhightoption" @click="isShowhightoption = !isShowhightoption">
                    显示高级选项
                    <i class="el-icon-arrow-down" id="hightoption_arrow"></i>
                </div>
            </div>
            <el-collapse-transition>
                <div class="hightoptionitem" v-if="isShowhightoption">
                    <div class="pushitem">
                        <div class="title"><b>自动回复消息</b> 选填</div>
                        <div class="autoitem">
                            <span class="text">问候语<i>（客户下单后，对话框自动发出此内容；留空，则不设置）</i></span>
                            <input type="text" name="greetings" v-model="form.greetings" placeholder="请输入你的问候语">
                        </div>
                        <div class="autoitem">
                            <span class="text">结束语<i>（订单完成后，对话框自动发出此内容；留空，则不设置）</i></span>
                            <input type="text" v-model="form.conclusion" name="conclusion" placeholder="请输入你的结束语">
                        </div>
                    </div>
                    <div class="pushitem">
                        <div class="title"><b>限制设置</b> 选填</div>
                        <div class="autoitem">
                            <span class="text">同时最大处理订单数（0=不限制）</span>
                            <input type="number" name="maximum" v-model="form.limitMinOrder" value="0">
                        </div>
                        <div class="autoitem">
                            <span class="text">卖家必须成交过几次</span>
                            <input type="number" name="dealTime" v-model="form.coProcess" value="0">
                        </div>
                        <div class="autoitem">
                            <el-checkbox v-model="form.limitMustRealAuth">卖家必须通过实名验证</el-checkbox>
                            <el-checkbox v-model="form.limitMustAdvancedAuth">卖家必须通过进阶验证</el-checkbox>
                            <div class="limitsettips">设置限制可以让您筛选出可信度更高的交易对象，但过多的限制也将降低您接收订单的机率。</div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
            <div class="pushitem">
                <div class="title"><b>注意事项</b></div>
                <div class="precautions">
                    <ul>
                        <li>OTV VC 为了保护用户的交易安全，将采用数字货币托管系统。严禁绕过平台私下交易，违者将自行承担责任，且永久封号</li>
                        <li>请在交易说明及交易备注中，详细写下您所希望的交易条件，以及您交易所需注意的事项，明确的信息将提升您的交易成功几率及评价。</li>
                        <li>请勿在OTV VC 尝试欺诈行为，违者将会导致被冻结，并承担法律责任。</li>
                        <li>发布广告后请履行契约精神，恶意抬价或是反悔，被投诉将冻结账户3-14天不等。</li>
                    </ul>
                </div>
            </div>
            <el-form-item>
                <el-button class="btn-color publishbtn" v-if="!isuserlogin" :disabled="!isuserlogin" type="primary" @click="onSubmit()">发布广告</el-button>
                <el-button v-else 
                    class="btn-color publishbtn" 
                    :disabled="isPublishNow" 
                    :class="{loading: isPublishNow}" 
                    id="PublishBtnNow" 
                    type="primary" 
                    @click="onSubmit($event)">
                        <b class="text" v-show="!isPublishNow">发布广告</b>
                        <i class="el-icon-loading" v-show="isPublishNow" style="font-size:20px"></i>
                </el-button>
            </el-form-item>
            <div class="publishattention">
                <h3>注意！注意！注意！务必详细阅读以下信息，以确保您的交易安全</h3>
                <ul>
                    <li>交易过程中，请先确认款项入账后在释放数字货币。</li>
                    <li>交易过程中，不要透露与您账户安全有关的敏感资讯</li>
                    <li>不要直接透露您的电子邮箱给买家，否则有可能会收到诈骗信件，及对账户安全造成危害。</li>
                    <li>永远确保您在正确的OTV VC 网站上，请将网站记录在书签上，避免误闯钓鱼网站。</li>
                    <li>OTC VC 员工不会以官方的名义与您进行交易，请不要与自称是OTC VC 的员工交易，避免利益损失。</li>
                </ul>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName: 'first',
            priceTypeDisabled: false,
            isPublishNow: false,
            isadstradepage: true,
            isuserlogin: false,
            form: {
                tradeType: 1,
                coinTypeId: 0,
                countryId: 0,
                currencyTypeId: 0,
                priceType: 0,
                premiumPer: 0,
                lowestPrice: 0,
                price: '',
                mixPrice: '',
                maxPrice: '',
                tradeAdsPaymentLists:[],
                transDesc: '',
                // transactionnote: '',
                // greetings:'',
                // conclusion: '',
                limitMinOrder: 0,
                coProcess: 0,
                limitMustRealAuth: true,
                limitMustAdvancedAuth: true,
                limitMustWhitelist: true,
                isPublish: true
            },
            
            tradeTypeOptions: [
                {
                    value: 1,
                    label: '出售'
                },
                {
                    value: 2,
                    label: '购买'
                }
            ],
            coinTypeIdOptions: [],
            countryIdOptions: [],
            currencyTypeIdOptions: [],
            Average:'',
            Averageoptions: [
                {
                    value: 1,
                    label: '平台最新成交均价(Average)'
                }
            ],
            
            
            
            premiumRate: 1,
            originalprice: 1000,
            yourprice: 1000,
            paymentlist: [],
            isShowhightoption: false
            
            
        }
    },
    inject: ['reload'],
    mounted(){
        if(this.isadstradepage){
            document.getElementById('adstradenav').classList.add('active');
        }
        this.isuserlogin = this.commonService.islogin();
        this.getCoinType(this.apiService+'CoinType/GetListAsync');
        this.getCountry(this.apiService+'Country/GetCountry');
        this.getCurrencyType(this.apiService+'CurrencyType/GetCurrencyType');
        this.getAllPaymentMethod(this.apiService+'PaymentMethod/GetAllPaymentMethod');
    },
    methods: {
        handleClick(tab, event) {
            // console.log(event);
        },
        CheckCoinType(val){
            let that = this;
            let Arr = this.coinTypeIdOptions;
            Arr.forEach(function(value, index, Arr){
                if(value.id == val && value.shortName == 'VC'){
                    that.activeName = 'second';
                    that.priceTypeDisabled = true;
                }else{
                    that.priceTypeDisabled = false;
                }
            })
        },
        formatTooltip(val) {
            this.premiumRate = (1 + Number((val/100).toFixed(5))).toFixed(5);
            this.yourprice = (this.originalprice * this.premiumRate).toFixed(2);
            //   this.premiumRate = 1 + val/10;
            console.log(val)
            return val / 10;
        },
        CheckPayment(obj, index){
            if(obj.srcElement.className == 'active'){
                obj.srcElement.classList.remove('active');
                for(let i=0; i<this.form.tradeAdsPaymentLists.length; i++){
                    if(this.form.tradeAdsPaymentLists[i] == index){
                        this.form.tradeAdsPaymentLists.splice(i, 1);
                    }
                }
            }else{
                obj.srcElement.classList.add('active');
                this.form.tradeAdsPaymentLists.push(index);
            }
        },
        onSubmit() {
            let that = this;
            let status = false;
            let PublishInfo = {
                "tradeAds": {}
            };
            if(this.activeName == 'first'){
                this.form.price = this.yourprice;
                this.form.priceType = 0;
            }else{
                this.form.priceType = 1;
                if(!this.form.price){
                    status = true;
                    this.$message('请输入您的报价');
                }
            }
            
            if(this.form.tradeAdsPaymentLists.length == 0){
                status = true;
                this.$message('请选择一个交易方式');
            }
            if(!this.form.mixPrice){
                status = true;
                this.$message('请输入最小限额');
            }
            if(!this.form.maxPrice){
                status = true;
                this.$message('请输入最大限额');
            }
            if(status){
                return false;
            }

            this.isPublishNow = true;

            this.form.userId = this.commonService.TokenCommonSet.getCookie('__userId');
            this.form.tradeAdsPayments = this.form.tradeAdsPaymentLists.join();  
            PublishInfo.tradeAds = this.form;
            let url = this.apiService + 'TradeAds/CreateOrUpdateTradeAds';
            this.$http.post(url,PublishInfo).then(response => {
                console.log(response)
                that.$message({
                    message: '发布成功',
                    type: 'success'
                });
                that.isPublishNow = false;
                that.reload();
            },err => {
                console.log(err);
                that.isPublishNow = false;
            });
        },

        getCoinType(url){
            this.$http.get(url).then(res => {
                this.coinTypeIdOptions = res.body.result.items;
                this.form.coinTypeId = res.body.result.items[0].id;
            }, err => {
                console.log(err)
            });
        },

        getCountry(url){
            this.$http.get(url,{"MaxResultCount":300,"SkipCount":0}).then(res => {
                this.countryIdOptions = res.body.result.items;
                this.form.countryId = res.body.result.items[0].id;
            }, err => {
                console.log(err)
            });
        },

        getCurrencyType(url){
            this.$http.get(url,{"MaxResultCount":300,"SkipCount":0}).then(res => {
                console.log(res)
                this.currencyTypeIdOptions = res.body.result.items;
                this.form.currencyTypeId = res.body.result.items[0].id;
            }, err => {
                console.log(err)
            });
        },

        getAllPaymentMethod(url){
            this.$http.get(url).then(res => {
                this.paymentlist = res.body.result;
            }, err => {
                console.log(err)
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .publishpage{
       background: rgba(255,255,2555,0.1);
       padding: 30px 250px;
       margin-top: 30px;
       border-radius: 5px;

       .needlogin{
           margin: -30px -250px 0 -250px;
           background: rgba(12, 31, 44, 0.5);
           padding: 20px 0;
           text-align: center;
           margin-bottom: 20px;
           border-radius: 3px 3px 0 0;
           color: #017EFF
       }

       h1.title{
           background: #017EFF;
           font-size: 24px;
           text-align: center;
           font-weight: normal;
           padding: 10px 0;
           border-radius: 3px;
       }
       .publishtips{
            background: rgba(255,255,2555,0.1);
            padding: 20px;
            line-height: 2;
       }

       .pushitem{
           margin-top: 30px;
           .title{
               color: #017EFF;
               margin-bottom: 25px;
           
                b{
                    font-size: 20px;
                    margin-right: 10px;
                    color: #ffffff;
                    font-weight: normal;
                    position: relative;
                    padding-bottom: 5px;
                }
                b:before{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: block;
                    content: "";
                    background: #017EFF;
                    height: 2px;
                }
           }
            
       }

       .marketprice{
           display: flex;

            .marketitem{
               float: left;
               width: 25%;
                padding-top: 10px;
               h4{
                   font-weight: normal;
                   padding-bottom: 15px;
               }

               .yourprice{
                   display: inline-block;
                   background: #017EFF;
                   border-radius: 3px;
                   line-height: 40px;
                   padding: 0 20px;
                   font-size: 18px;
                   min-width: 60px;
               }
               .lowprice{
                   display: block;
                   font-size: 18px;
                   color: #ffffff;
                   line-height: 40px;
               }
           }
           .marketitem:first-child{
               width: 40%;
               padding-right: 10%;
           }
       }

       .premium{
           padding-top: 20px;
           padding-left: 20px;
           
           .text{
               i{
                   color: #999999;
                   font-size: 12px;
               }
           }

            .premiumtools{
                padding-top: 10px;
                display: flex;

                .formula{
                    margin-right: 30px;
                    text-align: center;
                    float: left;
                    flex: 1;
                    color: #999999
                }
                .premiumpricetips{
                    float: right;
                    width: 250px;
                    text-align: center;
                    color: #999999
                }
            }
       }

       .acceptlowprice{
           padding-top: 20px;
           h4{
               font-weight: normal;
               padding-bottom: 10px;

               span{
                   color: #999999;
               }
           }
           input{
                border: #017EFF solid 1px;
                border-radius: 3px;
                color: #ffffff;
                padding: 10px;
                background: transparent;
                width: 300px;
            }
       }

       .regularpricve{
           li{
               float: left;
               width: 30%;

               span{
                   display: block;
                   padding: 10px 0;
               }

               input{
                     border: #017EFF solid 1px;
                    border-radius: 3px;
                    color: #ffffff;
                    padding: 10px;
                    background: #017EFF;
                    width: 200px;
               }
               ::-webkit-input-placeholder {
                    color: #ccc;
                }
                :-moz-placeholder {
                    color: #ccc;
                }
                ::-moz-placeholder {
                    color: #ccc;
                }
                :-ms-input-placeholder {
                    color: #ccc;
                }
                .currentlowprice{
                    padding: 11px 0;
                    font-size: 18px;
                }
           }
       }

       .paymentlist{
           button{
               padding: 10px 20px;
               border-radius: 3px;
               background: transparent;
               color: #ffffff;
               margin-right: 20px;
               border:solid 1px #017EFF;
               cursor: pointer;
           }
           button.active{
               background: #017EFF;
               color: #ffffff
           }
       }

       .limititem{
           li{
               float: left;
               width: 40%;
               padding-right: 10%;

               .limittile{
                   padding-bottom: 10px;
                   span{
                       color: #999999;
                       padding-left: 3px;
                       font-size: 12px;
                   }
               }

               .limitpride{
                   position: relative;
                   border:solid 1px #017EFF;
                   padding:0;
                   border-radius: 3px;

                   input{
                       background: transparent;
                       width: 100%;
                       padding:15px 50px 15px 15px;
                       color: #ffffff;
                   }

                   .currency{
                       position: absolute;
                       top: 0;
                       right:10px;
                       height: 16px;
                       line-height: 16px;
                       margin: auto;
                       bottom: 0;
                       font-weight: normal;
                   }
               }
           }
       }

       .transactiondescription{
           textarea{
                width: 100%;
                background: rgba(12, 31, 44, 0.4);
                padding:15px 20px;
                border-radius: 3px;
                color: #ffffff;
                line-height: 2;
                height: 200px;
                font-family: Arial, Helvetica, sans-serif
           }
       }

       .showhightoption{
           width: 200px;
           border-radius: 3px;
           border:solid 1px #017EFF;
           padding: 15px 0;
           margin: 0 auto;
           position: relative;
           text-align: center;
           cursor: pointer;

           i{
               position: absolute;
               top: 0;
               right: 10px;
               bottom: 0;
               margin: auto;
               height: 14px;
               transition: all 0.3s
           }
       }

       .showhightoption:hover i{
            transform:rotate(180deg);
            -ms-transform:rotate(180deg); 
            -moz-transform:rotate(180deg);
            -webkit-transform:rotate(180deg);
            -o-transform:rotate(180deg);
            transition: all 0.3s
       }

       .hightoptionitem{
           .autoitem{
               padding-bottom: 15px;

               .text{
                   display: block;
                   padding-bottom: 10px;

                    i{
                        color:#999999;
                        font-size: 12px;
                    }
               }    
                input{
                    background: transparent;
                    padding:15px 10px;
                    border-radius: 3px;
                    border:solid 1px #017EFF;
                    color: #ffffff;
                    width: 100%;
                }
           }
       }

       .limitsettips{
           padding-top: 20px;
       }
       .precautions{
            li{
                padding: 5px 0 5px 20px;
                position: relative;
                line-height: 1.5
            }
            li:before{
                position: absolute;
                top: 10px;
                width: 10px;
                height: 10px;
                background: #017EFF;
                left: 0;
                display: block;
                content: "";
                border-radius: 50%;
            }
            li:last-child{
                color: #017EFF;
            }

        }

        .publishbtn{
            margin: 20px auto;
            display: block;
            width: 200px;
            padding: 15px 0;
            font-size: 16px;
            
            b{
                font-weight: normal
            }
       }
       
       .publishattention{

           h3{
               font-size: 20px;
               font-weight: normal;
               color: #017EFF;
               padding-bottom: 10px;
           }

           li{
               padding: 5px 0 5px 10px;
               position: relative;
               line-height: 1.5;
           }
           li:before{
               position: absolute;
               top: 13px;
               left: 0;
               width: 4px;
               height: 4px;
               background: #ffffff;
               border-radius: 50%;
               display: block;
               content: ''
           }
       }
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .publishpage{
            padding: 0;
            margin-left: 15px;
            margin-right: 15px;
            margin-top: 10px;
        }
        .publishpage .pushitem{
            padding-left: 15px;
            padding-right: 15px;
        }

        .publishpage .marketprice{
            display:block;
        }
        .publishpage .marketprice .marketitem,
        .publishpage .marketprice .marketitem:first-child{
            width: 100%;
            padding-right: 0;
            float: none;
            padding-top: 15px;
        }
        .publishpage .marketprice .marketitem h4{
            padding-bottom: 5px;
        }
        .publishpage .marketprice .marketitem .lowprice{
            line-height: 1;
        }
        .publishpage .premium{
            padding-left: 0;
        }
        .publishpage .premium .premiumtools{
            display: block;
        }
        .publishpage .premium .premiumtools .formula{
            flex: auto;
            text-align: center;
            float: none;
        }
        .publishpage .premium .premiumtools .premiumpricetips{
            float: none;
            width: 100%;
            padding-top: 10px;
        }
        .publishpage .paymentlist button{
            margin-bottom: 10px;
        }
        .publishpage .limititem li{
            float: none;
            width: 100%;
            padding-right: 0;
            padding-bottom: 15px;
        }
        .publishpage .limititem li:last-child{
            padding-bottom: 0
        }
        .publishattention{
            padding: 0 15px 10px;
        }
        .publishpage .regularpricve li{
            float: none;
            width: 100%;
            padding-bottom: 10px;
        }
        .publishpage .regularpricve li .currentlowprice{
            padding: 0;
        }
        .publishpage .needlogin{
            margin: 0;
        }
    }
</style>
