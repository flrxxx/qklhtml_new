<template>
  <div class="myAssets">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">我的资产</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="gon">
        <div class="gon_left">
          <div class="left_tbm">
            <img src="../../assets/wallet_usdt.png"/>
          </div>
          <div class="left_text">USDT</div>
        </div>
        <div class="gon_num" v-if="asset">{{ asset.USDT ? asset.USDT : '0' | hideMiddle }}</div>
        <div class="gon_num" v-if="!asset">0.00</div>
      </div>
      <div class="list">
        <div class="list_item" @click="tankua('USDT')">
          <div class="list_img">
            <img src="../../assets/wallet_charge.png"/>
          </div>
          <div class="list_text">充值</div>
        </div>
        <div class="list_item" @click="withdrawal('USDT')">
          <div class="list_img">
            <img src="../../assets/wallet_extract.png"/>
          </div>
          <div class="list_text">提现</div>
        </div>
        <div class="list_item" @click="transfer('USDT')">
          <div class="list_img">
            <img src="../../assets/wallet_transfer.png"/>
          </div>
          <div class="list_text">转账</div>
        </div>
      </div>
      <div class="gon">
        <div class="gon_left">
          <div class="left_tbm">
            <img src="../../assets/wallet_fil.png"/>
          </div>
          <div class="left_text">FIL</div>
        </div>
        <div class="gon_num" v-if="asset">{{ asset.FIL ? asset.FIL : '0' | hideMiddle }}</div>
        <div class="gon_num" v-if="!asset">0.00</div>
      </div>
      <div class="list" style="justify-content: flex-start;">
        <div class="list_item" @click="withdrawal('FIL')" style="margin-right: 5%">
          <div class="list_img">
            <img src="../../assets/wallet_extract.png"/>
          </div>
          <div class="list_text">提现</div>
        </div>
        <div class="list_item" @click="transfer('FIL')">
          <div class="list_img">
            <img src="../../assets/wallet_transfer.png"/>
          </div>
          <div class="list_text">转账</div>
        </div>
      </div>
    </div>
    <div class="tab_list" v-if="chargePay" @click.self="close()">
      <div class="onjk">
        <div class="onjk_top">
          <div class="diologheader">充值方式<font>选择您的充值方式</font></div>
          <div class="onjk_top1 fot" v-for="(item, index) in changeList" :key="index" @click="charge(item.id,'USDT')">
            {{ item.title }}充值
          </div>
        </div>
        <div class="clos" @click.stop="close()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myAssets',
  data () {
    return {
      asset: [],
      chargePay: false,
      changeList: []
    }
  },
  mounted () {
    this.init()
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
    back () {
      this.$router.back(-1)
    },
    init () {
      this.$post('/user/getasset')
        .then(res => {
          this.asset = res.data.asset
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
    tankua (e) {
      this.$post('/coin/recharge/mode', { unit: e })
        .then(res => {
          if (res.data.length === 1) {
            this.charge(res.data[0].id, e)
          } else {
            this.changeList = res.data
            this.chargePay = true
          }
        })
    },
    charge (e, y) {
      if (e === 3) {
        this.$router.push({
          path: `/charge/${y}`
        })
      } else if (e === 6) {
        this.$router.push({
          path: `/chargeAlipy/${y}`
        })
      }
    },
    close () {
      this.chargePay = false
    },
    withdrawal (e) {
      this.$router.push({
        path: `/withdrawal/${e}`
      })
      // this.$message({
      //   message: '暂未开放',
      //   type: 'success'
      // })
    },
    transfer (e) {
      this.$router.push({
        path: `/transfer/${e}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.myAssets{
  width: 100%;
  position: absolute;
  top:0px;
  left: 0px;
  right: 0px;
  bottom:0px;
  overflow-y: auto;
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
    .gon{
      width: 100%;
      background:rgba(26,26,26,1);
      padding: 15px 17px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 10px;
      .gon_left{
        display: flex;
        .left_tbm{
          width: 25px;
          img{
            width: 100%;
            display: block;
          }
        }
        .left_text{
          font-size:24px;
          font-weight:500;
          color:rgba(255,255,255, 1);
          margin-left: 8px;
        }
      }
      .gon_num{
        font-size:21px;
        font-weight:400;
        color:rgba(255,255,255, 1);
      }
    }
    .list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      margin-bottom: 10px;
      .list_item{
        width: 30%;
        background:rgba(26,26,26,1);
        border-radius: 8px 30px 8px 8px;
        padding: 29px 0;
        margin-bottom: 15px;
        .list_img{
          width: 35px;
          margin: auto;
          img{
            width: 100%;
            display: block;
          }
        }
        .list_text{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255, 1);
          line-height:17px;
          margin-top: 8px;
        }
      }
    }
  }
  .tab_list{
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    // padding-bottom: 50px;
    // box-sizing: border-box;
    .onjk{
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;
      .onjk_top{
        width:100%;
        background:rgba(26,26,26,1);
        border-radius:10px;
        padding: 10px 15px 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        .onjk_top1{
          width: 100%;
          height: 44px;
          line-height: 44px;
          font-size:14px;
          font-weight:500;
          color:rgba(255,255,255, 1);
          text-align: center;
          & + .onjk_top1{
            border-top:rgba(255,255,255,0.2) 1px solid;
          }
        }
        .diologheader{
          text-align: left;
          width: 100%;
          padding: 5px 0 10px;
          font-size:16px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
          border-bottom:1px solid rgba(255,255,255,0.1);
          font{
            margin-left: 5px;
            font-size:12px;
            font-weight:400;
            color:rgba(255,255,255, 1);
          }
        }
        .fot{
          font-size: 14px;
        }
      }
      .clos{
        width:100%;
        height:44px;
        line-height: 44px;
        background:rgba(26,26,26,1);
        border-radius:10px;
        font-size:16px;
        font-weight:400;
        color:rgba(0, 209, 255, 1);
        margin-bottom: 20px;
        // margin: 5px 0;
      }
    }
  }
}
</style>
