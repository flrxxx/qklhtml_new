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
          <div class="list" v-for="item in list2" :key="item.id">
            <div class="list_res">{{item.amount}} {{item.unit}} <font>（手续费 {{item.forward_fee}} {{item.unit}}）</font></div>
            <div class="list_time">{{item.created_at}}  <font>{{ item.status == '0'? '待审核':item.status =='1'? '提现成功':'提现失败'}}</font>  <font class="fail" v-if="item.status=='2'" @click="checkwhy(item.id)">查看原因</font> </div>
          </div>
          <!--<div class="nextpage" v-if="list2hasmore">查看更多</div>-->
          <!--<div class="nomore" v-else>没有更多了</div>-->
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
      // list2hasmore:false
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
      this.$post('/coin/tibi/get',{unit: this.unit})
        .then(res =>{
          // if(parseInt(res.data.last_page) > parseInt(res.data.current_page)){
          //   this.list2hasmore = true;
          // }
          this.list2 = res.data.data;

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
    .tab{
      width: 100%;
      height: 40px;
      display: flex;
      background:rgba(26,26,26,1);
      border-radius:4px;
      .tab1{
        width:calc(100% / 3);
        height:40px;
        font-size:14px;
        font-weight:400;
        background:rgba(26,26,26,1);
        color:rgba(0,209,255,1);
        line-height:40px;
        border-radius:4px;
      }
      .active{
        background:rgba(0,209,255,1);
        color:#fff;
      }
    }
    .current{
      width: 100%;
      margin-top:10px;
      .zo_list{
        width: 100%;
        .list{
          width: 100%;
          padding: 10px 19px 13px;
          background:rgba(26,26,26,1);
          border-radius:4px;
          text-align: left;
          margin-bottom: 8px;
          box-sizing: border-box;
          .list_res{
            height:29px;
            font-size:18px;
            font-weight:500;
            color:rgba(0,209,255,1);
            line-height:32px;
            margin-bottom: 5px;
            font{
              color:#fff;
              font-size: 12px;
            }
          }
          .list_time{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:#fff;
            line-height:14px;
            .fail{
              color:rgba(0,209,255,1);
            }
            font{
              margin-left: 10px;
            }
          }
        }
      }
      .no_data{
        width: 100%;
        margin-top: 40px;
        .data_tbm{
          width: 40px;
          margin: 0 auto 15px;
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
          color:rgba(0,209,255,1);
          line-height:22px;
          margin-top: 5px;
        }
      }
    }
  }
  .nextpage{
    margin-top: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color:rgba(0,209,255,1)
  }
  .nomore{
    margin-top: 15px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    color:rgba(255,255,255,0.7)
  }
}
</style>
