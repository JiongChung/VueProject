<template>
    <div class="announcement">
        <div class="announcement-item">
            <span class="title">
                最新公告：
            </span>
            <div class="list">
                <ul class="clearfix">
                    <li>
                        关于 eosDAC 空投处理的公告（4-14）
                    </li>
                     <li>
                        BI.CEO 上线 OTB/USDT 交易对（4-13）
                    </li>
                     <li>
                        EOS 场外交易免手续费活动（4-12）
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Announcement"
    }
</script>
<style lang="less" scoped>
    .announcement{
        padding: 50px 0;

        .announcement-item{
            background: rgba(255,255,255,0.1);
            padding: 20px;
            height: 64px;
            line-height: 24px;
            display: flex;

            .title{
                float: left;
                position: relative;
                height: 24px;
                padding-left: 40px;
                font-size: 18px;
                font-weight: 600;
                padding-right: 50px;
            }

            .title:before{
                position: absolute;
                top: 0;
                left:0;
                display: block;
                content: "";
                width: 27px;
                height: 24px;
                background: url(../../../assets/images/bbs.png) no-repeat;
            }

            .list{
                float: left;
                flex: 1;

                li{
                    width: 33.33%;
                    float: left;
                    position: relative;
                    padding-left: 15px;
                    color: #36ffcd;
                }
                li:before{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 8px;
                    height: 8px;
                    background: #dddddd;
                    display: block;
                    content: "";
                    margin: auto;
                    border-radius: 50%;
                }
            }
        }
    }
</style>
