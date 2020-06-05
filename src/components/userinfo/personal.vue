<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">个人信息</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="list" @click="chargePassword()">
        <div class="text">修改密码</div>
        <div class="tbm">
          <img src="../../assets/address_right.png"/>
        </div>
      </div>
      <div class="list" @click="chargePayPassword()">
        <div class="text">修改支付密码</div>
        <div class="tbm">
          <img src="../../assets/address_right.png"/>
        </div>
      </div>
      <div class="list" @click="gorealinfo()">
        <div class="text">实名认证</div>
        <div class="tbm">
          <img src="../../assets/address_right.png"/>
        </div>
      </div>
    </div>
    <diolog :diologinfo="diolog"></diolog>
  </div>
</template>

<script>
  import diolog from '../parts/diolog.vue';
export default {
  name: 'earnings',
  components:{diolog},
  data () {
    return {
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
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    chargePassword () {
      this.$router.push({
        path: `/chargePassword`
      })
    },
    chargePayPassword () {
      this.$router.push({
        path: `/chargePayPassword`
      })
    },
    gorealinfo(){
      this.$post("/user/get/phone")
        .then(res =>{
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
            this.$router.push({
              path: `/`
            })
          }

          try{
            if(res.data.user[0].user.is_verified == '0'){
              this.$router.push({
                path: `/realinfo`
              })
            }else if(res.data.user[0].user.is_verified == '1'){
              this.diolog.title = '提示'
              this.diolog.text = '实名认证已通过';
              this.diolog.show = true;
              this.diolog.btn = [{
                text:"确定",
                callback:() =>{
                  this.diolog.show = false;
                }
              }]
            }else if(res.data.user[0].user.is_verified == '2'){
              this.diolog.title ='实名认证审核未通过'
              this.diolog.text = '失败原因:'+ res.data.user[0].fail_reason;
              this.diolog.btn = [{
                text:"取消",
                callback:() =>{
                  this.diolog.show = false;
                }
              },{
                text:"去认证",
                callback:() =>{
                  this.$router.push({
                    path: `/realinfo`
                  })
                }
              }]
              this.diolog.show = true;
            }else if(res.data.user[0].user.is_verified == '3'){
              this.diolog.title = '提示'
              this.diolog.text = '实名认证等待审核中';
              this.diolog.btn = [{
                text:"确定",
                callback:() =>{
                  this.diolog.show = false;
                }
              }]
              this.diolog.show = true;
            }
          }catch(err){

          }



        })

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
    box-sizing: border-box;
    margin-top: 10px;
    .list{
      width: 100%;
      height: 44px;
      padding: 0 18px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background:rgba(26,26,26,1);
      .text{
        font-size:14px;
        font-weight:400;
        color:rgba(0,209,255,1);
      }
      .tbm{
        width: 7px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
