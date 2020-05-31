<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">收益列表</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="no_data">
        <div class="data_tbm">
          <img src="../../assets/public_nodata.png"/>
        </div>
        <div class="data_text">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'earnings',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
      if (res.status === 0) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.init()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.earnings{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background-color: #01101D;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3, 26, 46, 1);
    padding: 0 16px;
    box-sizing: border-box;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .icon_left{
      width: 11px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_con{
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255, 255, 255, 1);
     }
    .icon_right{
      width: 22px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .content{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    .no_data{
      width: 100%;
      margin-top: 20px;
      .data_tbm{
        width: 61px;
        margin: 0 auto;
        img{
          width: 100%;
          display: block;
        }
      }
      .data_text{
        width: 100%;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,210,214,1);
        line-height:22px;
        margin-top: 5px;
      }
    }
  }
}
</style>
