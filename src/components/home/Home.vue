<template>
    <div class="home">
        <app-header></app-header>
        <app-banner></app-banner>
        <div class="wrap-item">
            <app-announcement></app-announcement>
            <app-tradetool></app-tradetool>
            <app-digitalassets></app-digitalassets>
            <app-outsidetrade></app-outsidetrade>
            <app-otcvc></app-otcvc>
            <app-qaforotc></app-qaforotc>
        </div>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    import Header from '../header/Header'
    import Banner from './swiper/index'
    import Announcement from './announcement/index'
    import TradeTool from './tradetool/index'
    import DigitalAssets from './digitalassets/index'
    import OutsideTrade from './outsidetrade/index'
    import OTCVC from './otcvc/index'
    import QaforOtc from './qaforotc/index'

    export default Vue.extend({
        name: 'Home',
        components: {
            'app-header' : Header,
            'app-banner': Banner,
            'app-announcement': Announcement,
            'app-tradetool': TradeTool,
            'app-digitalassets': DigitalAssets,
            'app-outsidetrade': OutsideTrade,
            'app-otcvc' : OTCVC,
            'app-qaforotc' : QaforOtc
        }
    })
</script>
<style lang="less" scoped>

</style>
