<template>
  <div class="helpDetails">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">咨询详情</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="ddo">
        <div class="zixun">
          <span class="shu"></span>
          <span class="zx_text">我的咨询</span>
        </div>
        <div class="gureo">
          {{ detail.ask }}
        </div>
        <div class="time">{{ detail.created_at }}</div>
      </div>
      <div class="ddo">
        <div class="zixun">
            <span class="shu"></span>
            <span class="zx_text">客服解答</span>
          </div>
          <div class="gureo">
            {{ detail.result ? detail.result : '客服未回复' }}
          </div>
          <div class="time">{{ detail.result ? detail.updated_at : '客服未回复' }}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'helpDetails',
  data () {
    return {
      id: '',
      detail: {}
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    init () {
      this.$post('/question/ask/' + this.id)
        .then(res => {
          this.detail = res.data
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.helpDetails{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(1, 16, 29, 1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3,26,46,1);
    padding: 0 16px;
    box-sizing: border-box;
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
    margin-top: 30px;
    .ddo{
      width:100%;
      background:rgba(3,26,46,1);
      border-radius:4px;
      padding: 15px 17px;
      box-sizing: border-box;
      margin-bottom: 16px;
    }
    .zixun{
      width: 100%;
      text-align: left;
      height: 40px;
      display: flex;
      align-items: center;
      .shu{
        width: 5px;
        height: 15px;
        display: inline-block;
        background:rgba(0, 210, 214, 0.8);
        margin-right: 5px;
      }
      .zx_text{
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0, 210, 214, 1);
        line-height:22px;
      }
    }
    .gureo{
      margin-left: 10px;
      width:100%;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0, 210, 214, 1);
      line-height:20px;
      text-align: left;
    }
    .time{
      width:100%;
      height:17px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0, 210, 214, 1);
      line-height:17px;
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
