<template>
    <div class="adstradepage">
        <v-fiter 
            :setCoinoptions="coinoptions" 
            :setCountryoptions="countryoptions" 
            :setPaymentoptions="paymentoptions"
            v-on:linsenSearchChildEvent="showSearchDataFromChild"
            :setCoinType="CoinType"
        ></v-fiter>
        <div class="adslist-item">
            <div class="ads-left">
                <div class="latesttools">
                    <h4 class="title">
                        <span>CNY</span>
                        <span>ETH</span>
                    </h4>
                    <div class="dealtools">
                        <ul class="clearfix">
                            <li>
                                <span class="text">最新成效均价</span>
                                <span class="info">3526 CNY</span>
                            </li>
                            <li>
                                <span class="text">市场价</span>
                                <span class="info">3826 CNY</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="latestdeals commonbox">
                    <h4 class="title">最近交易</h4>
                    <div class="dealsbox">
                        <ol class="clearfix">
                            <li>时间</li>
                            <li>金额(CNY)</li>
                            <li>数量(ETH)</li>
                        </ol>
                        <ul class="clearfix">
                            <li>11:10</li>
                            <li>3000</li>
                            <li>1.1472</li>
                        </ul>
                        <ul class="clearfix">
                            <li>11:10</li>
                            <li>3000</li>
                            <li>1.1472</li>
                        </ul>
                        <ul class="clearfix">
                            <li>11:10</li>
                            <li>3000</li>
                            <li>1.1472</li>
                        </ul>
                        <ul class="clearfix">
                            <li>11:10</li>
                            <li>3000</li>
                            <li>1.1472</li>
                        </ul>
                    </div>
                </div>
                <div class="commonproblem commonbox">
                    <h4 class="title">常见问题</h4>
                    <ul class="clearfix">
                        <li><a href="">如何使用OTCBTC？</a></li>
                        <li><a href="">如何使用OTCBTC？</a></li>
                        <li><a href="">如何使用OTCBTC？</a></li>
                    </ul>
                </div>
            </div>
            <div class="ads-right">
                <div class="adstradelist">
                    <ul class="fiter clearfix">
                        <li class="active" @click="adsTradeFiter($event,0)">价格最低</li>
                        <li @click="adsTradeFiter($event,1)">信用最高</li>
                    </ul>
                    <div class="adstradedata-show">
                        <div v-html="loadingHtml" v-show="isloading"></div>
                        <v-adslist :setAdstype="2" :AdsListData="AdsListData" :setCoinType="CoinType" v-on:listenLoadChildEvent="showLoadingStatusFromChild"></v-adslist>
                        <v-page :setPageSize="MaxResultCount" :setTotalCount="TotalCount" v-on:linsenPageChildEvent="showPageStatusFromChild"></v-page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AdsList from './adsList';
    import FiterData from './fiter';
    import Pagination from '../page/index';
    export default {
        components: {
            'v-adslist': AdsList,
            'v-page': Pagination,
            'v-fiter': FiterData
        },
        data(){
            return{
                isadstradepage: true,
                MaxResultCount: 20,
                SkipCount: 0,
                TradeType: 2,
                // adsTradeList: [],
                AdsListData: [],
                loadingHtml: '',
                isloading: true,
                CoinType: 'ETH',
                Currency: '',
                PayemntType: '',
                CountryCode: '',
                TotalCount: 0,
                countryoptions: [],
                coinoptions: [],
                paymentoptions: [],
            }
        },
        mounted(){
            this.loadingHtml = this.commonService.isloading();
            if(this.isadstradepage){
                document.getElementById('adstradenav').classList.add('active');
            }
            this.GetTradeAds(this.apiService + 'TradeAds/GetTradeAds');
            this.getCoinType(this.apiService+'CoinType/GetListAsync');
            this.getCountry(this.apiService+'Country/GetCountry');
            // this.getCurrencyType(this.apiService+'CurrencyType/GetCurrencyType');
            this.getAllPaymentMethod(this.apiService+'PaymentMethod/GetAllPaymentMethod');
        },
        methods:{
            showLoadingStatusFromChild(data){
                this.isloading = data;
            },
            showPageStatusFromChild(data){
                this.SkipCount = this.MaxResultCount * (data - 1);
                this.isloading = true;
                this.GetTradeAds(this.apiService + 'TradeAds/GetTradeAds');
            },
            showSearchDataFromChild(data){
                this.CoinType = data.CoinType;
                this.CountryCode = data.CountryCode;
                this.PayemntType = data.PayemntType;
                this.SkipCount = 0;
                this.isloading = true;
                this.GetTradeAds(this.apiService + 'TradeAds/GetTradeAds');
            },
            getCoinType(url){
               this.$http.get(url).then(response => {
                    this.coinoptions = response.body.result.items;
                },err => {
                    console.log(err)
                }); 
            },
            getCountry(url){
               this.$http.get(url).then(response => {
                    this.countryoptions = response.body.result.items;
                },err => {
                    console.log(err)
                }); 
            },
            getAllPaymentMethod(url){
               this.$http.get(url).then(response => {
                    this.paymentoptions = response.body.result;
                },err => {
                    console.log(err)
                }); 
            },
            GetTradeAds(url){
                let params = {};
                params.MaxResultCount = this.MaxResultCount;
                params.SkipCount = this.SkipCount;
                params.TradeType = this.TradeType;
                params.CoinType = this.CoinType ? this.CoinType : undefined;
                params.Currency = this.Currency ? this.Currency : undefined;
                params.PayemntType = this.PayemntType ? this.PayemntType : undefined;
                params.CountryCode = this.CountryCode ? this.CountryCode : undefined;

                // let params = {MaxResultCount :, SkipCount : this.SkipCount, TradeType : this.TradeType,}
                this.$http.get(url, {params:params}).then(response => {
                    this.AdsListData = response.body.result.items;
                    this.TotalCount = response.body.result.totalCount;
                    // console.log(response)
                },err => {
                    console.log(err)
                });
            },
            
            adsTradeFiter(obj, index){
                this.commonService.TabsFiter(obj);
                console.log(index)
            }
        }
    }
</script>
<style lang="less" scoped>
 

.adslist-item{
    display: flex;
    padding-top: 20px;

    .ads-left{
        float: left;
        width: 420px;
        margin-right: 20px;
        border-radius: 3px;

        h4.title{
            font-size: 18px;
            font-weight: normal;
            padding: 10px 0 20px;
            text-align: center;
            border-bottom: solid 1px rgba(255,255,255,0.2);
        }

        .commonbox{
            padding:10px 0;
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
            margin-top: 20px;
        }

        .latesttools{
            background: rgba(255,255,255,0.1);

            .title{
               

                span{
                    display: inline-block;
                    padding: 10px 0 0;
                }
                span + span{
                    margin-left: 20px;
                }
            }
        }

        .dealtools{
            padding: 20px 0;

            li{
                float: left;
                width: 50%;
                text-align: center;

                span{
                    display: block;
                    line-height: 2;
                }

                span + span{
                    font-size: 18px;
                    color: #017efe
                }
            }
        }

        .latestdeals{
            .dealsbox{
                padding: 10px 20px;

                ol,ul{
                    li{
                        float: left;
                        width: 33.33%;
                        padding: 5px 0;
                    }
                    li:last-child{
                        text-align: right;
                    }
                    li:nth-child(2){
                        text-align: center;
                    }
                }
                ol{
                    color: #999999;
                    padding-bottom: 5px;
                }
            }
        }
        .commonproblem{
            ul{
                padding:10px 30px;
            }
            li{
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                padding-left: 10px;
            }
            li:before{
                position: absolute;
                top: 0;
                left: 0;
                width: 3px;
                height: 3px;
                background: #fff;
                bottom: 0;
                margin: auto;
                display: block;
                content: "";
                border-radius: 50%;
            }
        }
    }
    .ads-right{
        float: right;
        flex: 1;
        padding:10px 0;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;

        .adstradelist{
            .fiter{
                padding: 10px 0 20px;
                border-bottom: solid 1px rgba(255,255,255,0.2);
                li{
                    float: left;
                    margin-left: 40px;
                    font-size: 18px;
                    position: relative;
                    cursor: pointer;
                }
                li.active:before{
                    position: absolute;
                    bottom: -22px;
                    left:0;
                    background: #017efe;
                    height: 4px;
                    width: 100%;
                    border-radius: 4px;
                    display: block;
                    content: "";
                }
            }

            .adstradedata{
                padding: 10px;
                ol,ul{
                    li{
                        float: left;
                        width: 15%;
                        padding: 10px 0;

                        span{
                            display: block;
                        }
                        span:first-child{
                            margin-top: 3px;
                        }

                        .normal{
                            color: #999999;
                            padding-top: 10px;
                            font-size: 12px;
                        }

                        .alipay,.wechat{
                            width: 24px;
                            height: 24px;
                            display: inline-block;
                            padding-right: 10px;
                            background: red;
                            margin-top: 8px;
                        }

                        .btn-color{
                            display:inline-block;
                            padding: 10px 15px;
                        }
                    }
                    li:nth-child(1){
                        width: 25%;
                    }
                    li:nth-child(4){
                        width: 20%;
                    }
                    li:nth-child(2){
                        width: 17%;
                    }
                    li:nth-child(6){
                        width: 8%;
                    }
                }
                ol{
                   padding: 10px 0;
                    li:first-child{
                        text-indent: 30px;
                    }
                }
                ul{
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                    margin-bottom: 10px;

                    li:first-child{
                        position: relative;
                        padding-left: 60px;
                        min-height: 60px;

                        .img{
                            width: 40px;
                            position: absolute;
                            height: 40px;
                            top: 10px;
                            left: 10px;
                            border-radius: 50%;

                            img{
                                width: 40px;
                                height: 40px;
                                border: 50%;
                                border:solid 2px #dddddd;
                                border-radius: 50%
                            }
                        }
                    }
                }
            }

            .adstradedata-show{
                position: relative;
                min-height: 150px;
            }
        }
    }
}
@media only screen and (min-width: 320px) and (max-width:768px){
    .adslist-item{
        display: block;
        padding:  0 15px;
    }
    .adslist-item .ads-left{
        float: none;
        width: 100%;
    }
    .adslist-item .ads-right{
        float: none;
        flex: auto;
        margin-top: 15px;
    }
    
    .adslist-item .ads-left .commonproblem{
        display: none;
    }
}
</style>
