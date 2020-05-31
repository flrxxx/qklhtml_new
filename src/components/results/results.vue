<template>
  <div class="results">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">推广业绩</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="big">
        <div class="leuoj">我的业绩</div>
        <div class="userinfo">
          <div class="name">
            <span class="name1">UID {{ name }}</span>
            <!-- <span class="name1">{{ name | hideHokl }}</span> -->
            <span class="name2" v-if="invite.grade_id == 0">矿友</span>
            <span class="name2" v-if="invite.grade">{{ invite.grade.title }}</span>
            <!-- <span class="name2">旷工</span> -->
          </div>
          <div class="name">
            <span class="results1">个人业绩</span>
            <span class="results1">{{ performance.own_buy }} T</span>
            <span class="results1">团队业绩</span>
            <span class="results1">{{ performance.kid_buy }} T</span>
          </div>
          <div class="task">距离下一等级还剩 {{ pert.num }} T</div>
          <div class="level">
            <div class="process">
              <div class="bak_ska" :style="{width: health}"></div>
            </div>
            <div class="level_num">{{ health }}</div>
          </div>
        </div>
      </div>
      <div class="my_team">业绩变化记录</div>
      <div class="zo_list" v-if="list.length > 0">
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="list_res">个人业绩 +{{ item.num }} T</div>
          <div class="list_time">{{ item.created_at }}</div>
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
  name: 'results',
  data () {
    return {
      health: '',
      name: '',
      invite: {},
      performance: {},
      pert: {},
      list: []
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    // *号省略
    hideHokl (val) {
      if (val.length > 0 && val.length <= 1) {
        return val
      } else if (val.length > 1 && val.length <= 2) {
        return `${val.substring(0, 1)}*`
      } else if (val.length > 2) {
        return `${val.substring(0, 1)}*${val.substring(val.length - 1)}`
      }
    }
  },
  methods: {
    init () {
      this.$post('/user/get/phone')
        .then(res => {
          this.name = res.data.user[0].UID
          this.invite = res.data.user[0]
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
      this.$post('/get/performance')
        .then(res => {
          this.pert = res
          this.performance = res.data
          this.health = res.percent + '%'
        })
      this.$post('/order/orderList', {pay_status: 1})
        .then(res => {
          this.list = res.data.data
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
.results{
  width: 100%;
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
    padding: 0 12px;
    box-sizing: border-box;
    margin-top: 10px;
    .big{
      width: 100%;
      padding: 8px 10px;
      box-sizing: border-box;
      background:rgba(3,26,46,1);
      border-radius:4px;
      margin-bottom: 8px;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0,210,214,0.8);
        text-align: left;
        box-sizing: border-box;
      }
      .buy_user1{
        width:100%;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:22px;
        margin-bottom: 20px;
      }
    }
    .userinfo{
      width: 100%;
      min-height: 140px;
      background: url('../../assets/team_user_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 23px 28px;
      box-sizing: border-box;
      .name{
        width: 100%;
        text-align: left;
        height: 30px;
        line-height: 30px;
        .name1{
          font-size:16px;
          font-weight:500;
          color:rgba(0,210,214,1);
          line-height:22px;
          display: inline-block;
          margin-right: 10px;
        }
        .name2{
          padding: 0 10px;
          height:14px;
          border-radius:9px;
          border:1px solid rgba(255,255,255,1);
          font-size:10px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:14px;
          display: inline-block;
          text-align: center;
        }
        .results1{
          font-size:12px;
          font-weight:400;
          color:rgba(0,210,214,1);
          display: inline-block;
          margin-right: 5px;
        }
      }
      .task{
        width:100%;
        height:14px;
        font-size:10px;
        font-weight:400;
        color:rgba(0,210,214,1);
        line-height:14px;
        text-align: left;
        margin-bottom: 2px;
      }
      .level{
        display: flex;
        align-items: center;
        .process{
          width:237px;
          height:17px;
          border:1px solid rgba(0,210,214,1);
          .bak_ska{
            height:17px;
            background:rgba(0,210,214,1);
          }
        }
        .level_num{
          padding: 0 8px;
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(0,210,214,1);
          line-height:17px;
        }
      }
    }
    .my_team{
      width:100%;
      height:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(0,210,214,1);
      line-height:22px;
      margin-bottom: 20px;
    }
    .my_team:after{
      content: '';
      display:block;
      width:40px;
      height:2px;
      background:rgba(0,210,214,0.8);
      border-radius:1px;
      margin: 0 auto;
      margin-top: 3px;
    }
    .zo_list{
      width: 100%;
      .list{
        width: 100%;
        padding: 10px 19px;
        background:rgba(3,26,46,1);
        border-radius:4px;
        text-align: left;
        margin-bottom: 8px;
        box-sizing: border-box;
        .list_res{
          height:29px;
          font-size:21px;
          font-weight:500;
          color:rgba(0,210,214,1);
          line-height:29px;
        }
        .list_time{
          height:14px;
          font-size:10px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:14px;
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
}
</style>
