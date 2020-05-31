<template>
  <div class="myOrder">
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
        <div class="tab1" :class="active == 1 ? 'active' : ''" @click="tab(1)">当前订单</div>
        <div class="tab1" :class="active == 2 ? 'active' : ''" @click="tab(2)">历史订单</div>
      </div>
      <div class="current" v-if="active == 1">
        <div v-if="order_list.length > 0">
          <div class="order" v-for="(item, index) in order_list" :key="index">
            <div class="leuoj">
              <div>订单编号 {{ item.order_id }}</div>
              <div>待支付</div>
            </div>
            <div class="order_list">
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/ming_user.png"/>
                </div>
                <div class="wxacd_text">{{ item.name }}</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_tcount.png"/>
                </div>
                <div class="wxacd_text">{{ item.num }}T</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_usdt.png"/>
                </div>
                <div class="wxacd_text">{{ item.usdt_num }} USDT</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_time.png"/>
                </div>
                <div class="wxacd_text">{{ item.created_at }}</div>
              </div>
            </div>
            <div class="din">
              <div class="cancel" @click="move_oeder(item.id)">删除订单</div>
              <div class="cancel" @click="pay(item.id)">确认支付</div>
            </div>
          </div>
        </div>
        <div class="no_data" v-if="order_list.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png" alt="无数据"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
      </div>
      <div class="current" v-if="active == 2">
        <div v-if="order_list1.length > 0">
          <div class="order" v-for="(item, index) in order_list1" :key="index">
            <div class="leuoj">
              <div>订单编号 {{ item.order_id }}</div>
              <div>已完成</div>
            </div>
            <div class="order_list">
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/ming_user.png"/>
                </div>
                <div class="wxacd_text">{{ item.name }}</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_tcount.png"/>
                </div>
                <div class="wxacd_text">{{ item.num }}T</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_usdt.png"/>
                </div>
                <div class="wxacd_text">{{ item.usdt_num }} USDT</div>
              </div>
              <div class="lopm">
                <div class="wxacd">
                  <img src="../../assets/order_time.png"/>
                </div>
                <div class="wxacd_text">{{ item.updated_at }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no_data" v-if="order_list1.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png" alt="无数据"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">密码</div>
        <input type="password" class="ipt" v-model="password">
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click.stop="confirm()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myOrder',
  data () {
    return {
      active: '',
      password: '',
      tjr: false,
      order_list: [],
      order_list1: [],
      order_dpo: ''
    }
  },
  mounted () {
    this.active = this.$route.params.id
    this.init()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.active = this.$route.params.id
    }
  },
  methods: {
    init () {
      this.$post('/order/orderList', {pay_status: 0, pagesize: 100})
        .then(res => {
          this.order_list = res.data.data
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
      this.$post('/order/orderList', {pay_status: 1, pagesize: 100})
        .then(res => {
          this.order_list1 = res.data.data
        })
    },
    back () {
      // this.$router.push({
      //   path: `/team`
      // })
      this.$router.go(-1)
    },
    tab (e) {
      if (e !== this.active) {
        this.active = e
        this.$router.push({
          path: `/myOrder/${e}`
        })
      }
    },
    pay (e) {
      this.tjr = true
      this.order_dpo = e
    },
    close () {
      this.tjr = false
    },
    confirm () {
      if (this.password) {
        this.$post('/order/pay', {id: this.order_dpo, trade_pwd: this.password})
          .then(res => {
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
            this.tjr = false
          })
      } else {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
      }
    },
    // 删除订单
    move_oeder (e) {
      this.$post('/order/delOrder', {id: e})
        .then(res => {
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
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myOrder{
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
        width:50%;
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
      .order{
        width: 100%;
        padding: 8px 10px;
        box-sizing: border-box;
        background:rgba(3,26,46,1);
        border-radius:4px;
        margin-bottom: 8px;
        .leuoj{
          width: 100%;
          height:40px;
          font-size:14px;
          font-weight:500;
          color:rgba(0,210,214,1);
          line-height:40px;
          padding-left: 8px;
          border-left: 3px solid rgba(0,210,214,0.8);
          text-align: left;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(1, 16, 29, 1);
        }
        .order_list{
          width: 100%;
          display: flex;
          align-items: center;
          padding: 23px 0;
          .lopm{
            width: 25%;
            .wxacd{
              width: 30px;
              margin: 0 auto;
              img{
                width: 100%;
                display: block;
              }
            }
            .wxacd_text{
              width: 100%;
              text-align: center;
              height:14px;
              font-size:10px;
              font-weight:400;
              color:rgba(0,210,214,1);
              line-height:14px;
              margin-top: 5px;
            }
          }
        }
        .din{
          width: 85%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          .cancel{
            width:45%;
            height:27px;
            background:rgba(0,210,214,0.8);
            border-radius:23px;
            font-size:12px;
            font-weight:400;
            color:rgba(1,16,29,1);
            line-height:27px;
          }
        }
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
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: rgba(3, 26, 46, 1);
      border-radius:10px;
      margin: auto;
      .ipt{
        outline: none;
        width: 90%;
        text-indent: 1em;
        height:40px;
        line-height: 40px;
        border-radius:4px;
        border:1px solid rgba(0,210,214,0.8);
        background-color: rgba(0, 210, 214, 0);
        font-size:14px;
        font-weight:400;
        color:rgba(0, 210, 214, 1);
      }
      .tis{
        width: 90%;
        height: 22px;
        margin: auto;
        text-align: left;
        font-size:16px;
        font-weight:500;
        color:rgba(0, 210, 214, 1);
        line-height:22px;
        margin-bottom: 7px;
      }
      .name{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:14px;
        font-weight:400;
        color:rgba(0, 210, 214, 1);
        line-height:20px;
      }
      .two{
        margin-top: 11px;
        width: 100%;
        height:40px;
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(0, 210, 214, 0.1);
        .two_left{
          width: 50%;
          border-right: 1px solid rgba(0, 210, 214, 0.1);
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-weight:400;
          color:rgba(0, 210, 214, 1);
        }
        .two_right{
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-weight:400;
          color:rgba(0, 210, 214, 1);
        }
      }
    }
  }
}
</style>
