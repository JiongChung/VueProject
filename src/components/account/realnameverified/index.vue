<template>
    <div class="realnameverified">
        <el-tabs v-model="activeName">
            <el-tab-pane label="实名认证" name="first">
                实名认证
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="ts">
    import Vue from 'vue'
    export default Vue.extend({
        data(){
            return{
                activeName: 'first'
            }
        }
    })
</script>
<style lang="less" scoped>

</style>
