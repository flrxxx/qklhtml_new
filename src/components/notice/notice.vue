<template>
  <div class="notice">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">公告</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div v-if="list.length > 0">
        <div class="list" v-for="(item, index) in list" :key="index" @click="notice(item.id)">
          <div class="tou" v-html="item.title"></div>
          <div class="details" v-html="item.content"></div>
          <div class="time">{{ item.created_at }}</div>
        </div>
      </div>
      <div class="no_data" v-if="list.length == 0">
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
  name: 'notice',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$post('/new/select?pageSize=20')
        .then(res => {
          this.list = res.data.data
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
    },
    notice (e) {
      this.$router.push({
        path: `/noticeDetail/${e}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.notice{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background-color: rgba(16,16,16,1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(26, 26, 26, 1);
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
    .list{
      width: 100%;
      margin-bottom: 5px;
      min-height: 98px;
      padding: 15px 10px;
      box-sizing: border-box;
      background:rgba(26, 26, 26, 1);
      border-radius:5px;
      .tou{
        width:100%;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0,209,255,1);
        line-height:22px;
        text-align: left;
        margin-bottom: 6px;
      }
      .details{
        width:100%;
        height:34px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255, 1);
        line-height:17px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
      }
      .time{
        width:100%;
        height:17px;
        font-size:12px;
        font-weight:400;
        color:rgba(255,255,255, 1);
        line-height:17px;
        text-align: right;
      }
    }
  }
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
</style>
