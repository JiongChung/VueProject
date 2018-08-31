<template>
    <div>
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
                        <v-adslist :setAdstype="1" :AdsListData="AdsListData" :setCoinType="CoinType" v-on:listenLoadChildEvent="showLoadingStatusFromChild"></v-adslist>
                        <v-page :setPageSize="MaxResultCount" :setTotalCount="TotalCount" v-on:linsenPageChildEvent="showPageStatusFromChild"></v-page>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AdsList from './adsList';
    import Pagination from '../page/index';
    import FiterData from './fiter';
    export default {
        components: {
            'v-adslist': AdsList,
            'v-page': Pagination,
            'v-fiter': FiterData
        },
        data(){
            return{
                isadstradepage: true,
                adsoptions: [],
                adsValue: '',
                countryoptions: [],
                countryValue: '',
                coinoptions: [],
                coinValue: '',
                paymentoptions: [],
                paymentValue: '',
                MaxResultCount: 20,
                SkipCount: 0,
                TradeType: 1,
                AdsListData: [],
                loadingHtml: '',
                isloading: true,
                CoinType: 'ETH',
                Currency: '',
                PayemntType: '',
                CountryCode: '',
                TotalCount: 0
            }
        },
        mounted(){
            this.loadingHtml = this.commonService.isloading();
            if(this.isadstradepage == true){
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

                this.$http.get(url, {params:params}).then(response => {
                    this.AdsListData = response.body.result.items;
                    this.TotalCount = response.body.result.totalCount;
                },err => {
                    console.log(err)
                });
            },
            search(){
                console.log(0)
            },

            adsTradeFiter(obj, index){
                this.commonService.TabsFiter(obj);
                console.log(index)
            }
        }
    }
</script>
<style lang="less" scoped>
 .menubar{
    background: rgba(255,255,255,0.1);
    padding: 10px 15px;
    border-radius: 3px;
    margin-top: 20px;

    li{
        float: left;
        margin: 0 20px 0 10px;
        padding: 10px 0;
        cursor: pointer;
    }

    li.active{
        position: relative;
    }

    li.active:before{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        content: "";
        background: #017eff;
        height: 2px;
    }

    .adsoption{
        float: right;
    }
}

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

           .adstradedata-show{
                position: relative;
                min-height: 150px;
            }
        }
    }
}
</style>
