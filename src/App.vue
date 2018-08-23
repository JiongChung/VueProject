<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
     </div>
</template>

<script>
    import Header from './components/header/Header'
    import Footer from './components/footer/index'

    export default {
        name: 'App',
        components: { Header, Footer }
    }
</script>

<style>
    @import './assets/css/style.css';
</style>
