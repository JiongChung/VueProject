<template>
    <div class="pagination-item" v-show="showPage">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :pager-count="7"
            layout="prev, pager, next"
            :total="pageTotal">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props:["setTotalCount","setPageSize"],
    data(){
        return{
            pageTotal: 0,
            pageSize: 0,
            showPage: false
        }
    },
    mounted(){
        
    },
    watch: {
        'setTotalCount': function (newVal, oldVal) {
            this.updata();
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$emit('linsenPageChildEvent',val)
        },
        updata(){
            this.pageSize = this.setPageSize;
            this.pageTotal = this.setTotalCount;
            if(this.pageSize >= this.pageTotal){
                this.showPage = false;
            }else{
                this.showPage = true;
            }
            
        }
    }
}
</script>
<style lang="less" scoped>

</style>
