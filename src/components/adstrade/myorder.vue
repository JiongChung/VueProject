<template>
    <div>ff</div>
</template>
<script>
export default {
    data(){
        return{
            isadstradepage: true
        }
    },
    mounted(){
        if(this.isadstradepage){
            document.getElementById('adstradenav').classList.add('active');
        }
    },
}
</script>
<style lang="less" scoped>

</style>
