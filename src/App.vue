<template>
    <div id="app">
        <!-- <Header></Header> -->
        <router-view v-if="isRouterAlive"></router-view>
        <v-footer></v-footer>
     </div>
</template>

<script>
    // import Header from './components/header/Header'
    import Footer from './components/footer/index'

    export default {
        name: 'App',
        provide(){
            return{
                reload: this.reload
            }
        },
        data(){
            return{
                isRouterAlive: true
            }
        },
        mounted: function(){
            if(!this.commonService.islogin()){
               window.localStorage.removeItem('__accessToken');
            }
        },
        methods: {
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                });
            }
        },
        components: { 
            'v-footer' : Footer
         }
    }
</script>

<style>
    @import './assets/css/style.css';
</style>
