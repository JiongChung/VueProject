<template>
    <div class="swiper-container" id="swiper-set-height">
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
                ],
                isPC: true,
            }
        },
        mounted() {
            console.log('mounted', this);
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
            this.isPC = this.commonService.getWindowWidth() < 769 ? false : true;
            if(this.isPC == false){
                let HTML = document.getElementById('swiper-set-height');
                HTML.style.height = this.commonService.getWindowWidth() * 700 / 1920 +'px';
            }
            
        }
    }
</script>
<style lang="less" scoped>
    .swiper-container {
        width: 100%;
        height: 700px;
    }
    .swiper-slide{
        width: 100% !important;
        background-size: 100% !important;
    }

    @media only screen and (min-width: 320px) and (max-width:768px){
        .swiper-container {
            height: 350px;
        }
    }
</style>
