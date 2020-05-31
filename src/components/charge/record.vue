<template>
  <div class="record">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">我的订单</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="tab">
        <div class="tab1" :class="active == 1 ? 'active' : ''" @click="tab(1)">充值记录</div>
        <div class="tab1" :class="active == 2 ? 'active' : ''" @click="tab(2)">提现记录</div>
        <div class="tab1" :class="active == 3 ? 'active' : ''" @click="tab(3)">转账记录</div>
      </div>
      <div class="current" v-if="active == 1">
        <div class="zo_list" v-if="list.length > 0">
          <div class="list" v-for="(item, index) in list" :key="index">
            <div class="list_res">{{ item.arrival_currency_money | hideMiddle }} {{ item.unit }}</div>
            <div class="list_time">{{ item.created_at }}  {{ item.status == 1 ? '充币成功' : item.status == 0 ? '审核中' : item.status == 2 ? '审核失败' : '' }}</div>
          </div>
        </div>
        <div class="no_data" v-if="list.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
      </div>
      <div class="current" v-if="active == 2">
        <div class="zo_list" v-if="list2.length > 0">
          <div class="list">
            <div class="list_res">100 USDT</div>
            <div class="list_time">2020-04-15 19:23:17  提币成功</div>
          </div>
        </div>
        <div class="no_data" v-if="list2.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
      </div>
      <div class="current" v-if="active == 3">
        <div class="zo_list" v-if="list3.length > 0">
          <div class="list" v-for="(item, index) in list3" :key="index">
            <div class="list_res">{{ item.arrive_amount | hideMiddle }} {{ item.unit }}</div>
            <div class="list_time">{{ item.created_at }}  {{ item.type }}</div>
          </div>
        </div>
        <div class="no_data" v-if="list3.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      active: '',
      unit: '',
      list: [],
      list2: [],
      list3: []
    }
  },
  mounted () {
    this.active = this.$route.params.id
    this.unit = this.$route.params.unit
    this.init()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.active = this.$route.params.id
    }
  },
  filters: {
    // 保留小数后几位
    hideMiddle (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(8)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  methods: {
    init () {
      // 获取转账记录
      this.$post('/user/get/transfer', {unit: this.unit})
        .then(res => {
          this.list3 = res.data
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
      // 获取充值记录
      this.$post('/coin/recharge/get', {unit: this.unit})
        .then(res => {
          this.list = res.data
        })
    },
    back () {
      this.$router.go(-1)
    },
    tab (e) {
      if (e !== this.active) {
        this.active = e
        this.$router.push({
          path: `/record/${e}/${this.unit}`
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.record{
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
    .tab{
      width: 100%;
      height: 40px;
      display: flex;
      background:rgba(3,26,46,1);
      border-radius:4px;
      .tab1{
        width:calc(100% / 3);
        height:40px;
        font-size:14px;
        font-weight:400;
        background:rgba(3,26,46,1);
        color:rgba(0, 210, 214, 1);
        line-height:40px;
        border-radius:4px;
      }
      .active{
        background:rgba(0,210,214,0.8);
        color:rgba(1,16,29,1);
      }
    }
    .current{
      width: 100%;
      margin-top: 8px;
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
            font-weight:400;
            color:rgba(0, 210, 214, 0.8);
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
}
</style>
