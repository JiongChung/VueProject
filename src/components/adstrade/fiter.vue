<template>
    <div class="menubar clearfix">
        <ul>
            <li v-for="item in coinoptions" @click="FiterCoinType($event, item.shortName)" :class="{ 'active': item.isActive }">
                {{item.shortName}}
            </li>
        </ul>
        <div class="adsoption">
            <el-select v-model="adsValue" placeholder="请选择" style="width:100px;margin-right:5px;">
                <el-option
                    v-for="item in adsoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="countryValue" placeholder="请选择" style="width:100px;margin-right:5px;">
                <el-option
                    v-for="item in countryoptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.countryCode">
                </el-option>
            </el-select>
            <el-select v-model="coinValue" placeholder="请选择" style="width:100px;margin-right:5px;">
                <el-option
                    v-for="item in coinoptions"
                    :key="item.id"
                    :label="item.shortName"
                    :value="item.shortName">
                </el-option>
            </el-select>
            <el-select v-model="paymentValue" placeholder="请选择" style="width:120px;margin-right:5px;">
                <el-option
                    v-for="item in paymentoptions"
                    :key="item.value"
                    :label="item.displayText"
                    :value="item.displayText">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: ["setCoinoptions","setCountryoptions","setPaymentoptions","setCoinType"],
    data(){
        return{
            adsoptions: [
                {
                    value: 1,
                    label: '搜广告'
                },
                {
                    value: 2,
                    label: '搜用户'
                }
            ],
            adsValue: '',
            countryoptions: [],
            countryValue: '',
            coinoptions: [],
            coinValue: '',
            paymentoptions: [],
            paymentValue: '',
            parameter: {
                adsType: '',
                CoinType: '',
                PayemntType: '',
                CountryCode: ''
            }
        }
    },
    mounted(){
        this.coinValue = this.setCoinType;
    },
    watch: {
        setCoinoptions(newVal, oldVal) {
            this.updataCoin(this.coinValue);
        },
        setCountryoptions(newVal, oldVal) {
            this.updataCountry();
        },
        setPaymentoptions(newVal, oldVal) {
            this.updataPayment();
        }
    },
    
    methods: {
        search(){
            this.parameter.adsType = this.adsValue;
            this.parameter.CoinType = this.coinValue;
            this.parameter.PayemntType = this.paymentValue;
            this.parameter.CountryCode = this.countryValue;
            this.$emit('linsenSearchChildEvent',this.parameter);
        },
        updataCoin(name){
            this.coinoptions = this.setCoinoptions;
            for(let i=0; i<this.coinoptions.length; i++){
                this.coinoptions[i].isActive = false;
            }         
            for(let i=0; i<this.coinoptions.length; i++){
                if(this.coinoptions[i].shortName == name){
                    this.coinoptions[i].isActive = true;
                }
            }     
        },
        updataCountry(){
            this.countryoptions = this.setCountryoptions;
            
        },
        updataPayment(){
            this.paymentoptions = this.setPaymentoptions;
        },
        FiterCoinType(obj, name){
            this.commonService.TabsFiter(obj);
            this.parameter.CoinType = name;
            this.coinValue = name;
            this.$emit('linsenSearchChildEvent',this.parameter);
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
@media only screen and (min-width: 320px) and (max-width:768px){
    .menubar{
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 15px;
    }
    .menubar li{
        float: none;
        display: inline-block;
    }
    .menubar .adsoption{
        padding-top: 15px;
    }
}
</style>
