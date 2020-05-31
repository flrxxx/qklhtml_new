<template>
  <div class="noticeDetail">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">公告详情</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="ward" v-html="detail.title"></div>
      <!-- <div class="time">{{ detail.createTime }}</div> -->
      <div class="taectad" v-html="detail.content"></div>
      <!-- <div class="taectad">{{ rex }}</div> -->
      <div class="time">{{ detail.created_at }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noticeDetail',
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
    init () {
      this.$post('/info/select/' + this.id)
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
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.noticeDetail{
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
    padding: 0 27px;
    box-sizing: border-box;
    margin-top: 10px;
    text-align: left;
    .ward{
      width:100%;
      height:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(0, 210, 214, 1)!important;
      line-height:22px;
    }
    .time{
      width:100%;
      height:17px;
      font-size:12px;
      font-weight:400;
      color:rgba(0, 210, 214, 1)!important;
      line-height:17px;
      text-align: right;
    }
    .taectad{
      width:100%;
      font-size:14px;
      font-weight:400;
      color:rgba(0, 210, 214, 0.7)!important;
      line-height:17px;
      margin-top: 10px;
      text-align: left;
      // text-indent: 1em;
    }
    .taectad >>> p{
      color:rgba(0, 210, 214, 0.7)!important;
    }
    .taectad >>> span{
      color:rgba(0, 210, 214, 0.7)!important;
    }
  }
}
</style>
