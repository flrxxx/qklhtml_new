<template>
  <div class="withdrawalAddress">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">提现地址</div>
      <div class="icon_right" @click="addWithdrawal()">
        <img src="../../assets/navi_add.png" alt="icon"/>
      </div>
    </div>
    <div class="content">
      <div v-if="addresslist.length">
        <div class="dizi" v-for="item in addresslist"  :key="item.id" @click="setaddress(item.id,item.remark,item.address)">
          <div class="dizi_detail">
            <div>{{item.remark}}</div>
            <div>{{item.address}}</div>
          </div>
          <div class="more" @click.stop="deladdress(item.id)">
            <img src="../../assets/address_delete.png"/>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="emptydate">
          <div class="emptydate_icon"><img src="../../assets/public_nodata.png"></div>
          <div class="emptydate_text">暂无地址，点击<font @click="addWithdrawal()">添加地址</font></div>
        </div>
      </div>

    </div>
    <diolog :diologinfo="diolog"></diolog>
  </div>
</template>

<script>
// import axios from 'axios'
import diolog from '../parts/diolog.vue';
export default {
  name: 'withdrawalAddress',
  components:{diolog},
  data () {
    return {
      unit: '',
      addresslist:[],
      diolog: {
        show: false,
        title: "提示",
        text: "",
        btn: [{
          text: "确定",
          callback: function () {}
        }],
      },
    }
  },
  mounted () {
    this.unit = this.$route.params.unit
    this.init()

  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addWithdrawal () {
      this.$router.push({
        path: `/addWithdrawal/${this.unit}`
      })
    },
    setaddress (id,remark,address) {
      var temp = {"id":id,"remark":remark,"address":address};
      window.localStorage.setItem("addressinfo",JSON.stringify(temp));
      this.$router.push({
        path: `/withdrawal/${this.unit}`
      })
    },
    deladdress (id) {
      // 删除
      this.diolog.text = '确定要删除该地址吗？'
      this.diolog.show = true
      this.diolog.btn = [{
        text: "取消",
        callback: () => {
          this.diolog.show = false
        }
      },{
        text:"确定",
        callback:() => {
          this.diolog.show = false
          this.$post('/coin/tibiAddress/del',{unit:this.unit,id:id})
            .then(res =>{
              if (res.status === 10001) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.$router.push({
                  path: `/`
                })
              }
              if(res.status == 0){
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.init();
              }else{
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
        }
      }];
    },
    init () {
      this.$post('/coin/tibiAddress/sel',{unit:this.unit})
        .then( res =>{
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
          this.addresslist = res.data;
        })
    },
    code () {
      this.yhsi = false
      this.$post('/user/sendCode', {phone: this.phone})
        .then(res => {
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
          this.$message({
            message: res.msg,
            type: 'success'
          })
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
          if (res.status === 0) {
            let that = this
            that.telCode = 60
            var TIME_COUNT = setInterval(() => {
              if (that.telCode > 0) {
                that.yhsi = false
                that.telCode--
                that.getCode = that.telCode
                that.getCode1 = that.telCode
              } else {
                that.yhsi = true
                clearInterval(TIME_COUNT)
              }
            }, 1000)
          }
        })
        .catch(err => {
          console.log(err)
          this.yhsi = true
        })
    },
    submit () {
      this.$message({
        message: '请输入完整',
        type: 'error'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.withdrawalAddress{
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
    margin-top: 15px;
    .dizi{
      width: 100%;
      min-height:60px;
      background:rgba(26, 26, 26, 1);
      border-radius:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom:15px;
      .dizi_detail{
        flex: 1;
        text-align: left;
        div:nth-child(1){
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
          line-height:22px;
          margin-bottom: 3px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255, 1);
          line-height:17px;
        }
      }
      .more{
        width: 20px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
  .emptydate{
    padding-top: 3rem;
    .emptydate_icon{
      width: 3rem;
      margin: 0 auto 1rem;
      img{
        width: 100%;
      }
    }
    .emptydate_text{
      font-size: 0.8rem;
      color:#fff;
      text-align: center;
      font{
        color:#00D1FF;
      }
    }
  }
}
</style>
