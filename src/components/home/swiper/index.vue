<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in listImg" :style="{ background: 'url(' + str.url + ') no-repeat center top' }"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';

    import a from '../../../assets/images/banner.jpg'
    import b from '../../../assets/images/banner.jpg'
    import c from '../../../assets/images/banner.jpg'
    import d from '../../../assets/images/banner.jpg'

    export default {
        name: 'Banner',
        data() {
            return {
                listImg: [
                    {url: a},
                    {url: b},
                    {url: c},
                    {url: d}
                ]
            }
        },
        mounted() {
            console.log('mounted', this)
            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: true,
                loop: true,
                speed: 500,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>
<style lang="less" scoped>
    .swiper-container {
        width: 100%;
        height: 700px;
    }
    .swiper-slide{
        width: 100% !important
    }
</style>
