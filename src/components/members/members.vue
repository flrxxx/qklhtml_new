<template>
  <div class="members">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">团队成员</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <!-- <div class="hedns" v-if="invite">
        <div class="leuoj">我的上级</div>
        <div class="buc">
          <div class="tum">
            <img src="../../assets/ming_user.png" alt="头像"/>
          </div>
          <div class="pom">
            <div class="pom1" v-if="invite.user">{{ invite.user.name }} ({{ invite.user.phone }})</div>
            <span class="pom2" v-if="invite.grade">{{ invite.grade_id == 0 ? '矿友' : invite.grade.title }}</span>
          </div>
        </div>
      </div> -->
      <!-- <div class="my_team">我的团队成员</div> -->
      <div class="list" v-if="list.length > 0" :style="{'justify-content' : (list.length < 3 ? 'end' : '')}">
        <div class="list_item" v-for="(item,index) in list" :key="item.user_id" :data-id="item.user_id" :style="{'margin-right' : (list.length < 3 ? 'calc(8% / 3)' : '')}" @click="checkitem(item.user_id)">
            <div class="list_img">
              <img src="../../assets/ming_user.png"/>
            </div>
            <div class="list_text">{{ item.user.name }}</div>
            <div class="list_text1" v-if="item.grade">{{ item.grade_id == 0 ? '矿友' : item.grade.title }}</div>
            <div class="list_text1" v-if="!item.grade">矿友</div>
        </div>
      </div>
      <div class="no_data" v-if="list.length == 0">
          <div class="data_tbm">
            <img src="../../assets/public_nodata.png" alt="tupian"/>
          </div>
          <div class="data_text">暂无数据</div>
        </div>
    </div>
    <div class="diologbox" v-show="diologshow">
      <div class="diolog_content">
        <div class="back_cv">
          <div class="leuoj">成员详细信息</div>
          <div class="itemline">
            <div class="itemlabel">姓名</div>
            <div class="itemvalue">{{user.name}}</div>
          </div>
          <div class="itemline">
            <div class="itemlabel">UID</div>
            <div class="itemvalue">{{user.UID}}</div>
          </div>
          <div class="itemline">
            <div class="itemlabel">电话</div>
            <div class="itemvalue">{{user.phone}}</div>
          </div>
          <div class="itemline">
            <div class="itemlabel">购买业绩</div>
            <div class="itemvalue">{{user.own_buy}}</div>
          </div>
          <div class="itemline">
            <div class="itemlabel">团队业绩</div>
            <div class="itemvalue">{{user.kid_buy}}</div>
          </div>
          <div class="itemline">
            <div class="itemlabel">总T数</div>
            <div class="itemvalue">{{user.userNum}}</div>
          </div>
        </div>
        <div class="closebtn" @click="closediolog">关闭</div>
      </div>
      <div class="diologbox_bg"></div>
    </div>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
  import loading from '../parts/loading.vue';
export default {
  name: 'members',
  components:{loading},
  data () {
    return {
      health: '60%',
      list: [],
      invite: {},
      user:{
        name:'',
        UID:'',
        phone:'',
        own_buy:'',
        kid_buy:'',
        userNum:''
      },
      diologshow:false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    init () {
      this.$post('/user/invite/team')
        .then(res => {
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          } else {
            this.list = res.data
          }
        })
      // this.$post('/user/invite/lear')
      //   .then(res => {
      //     if (res.status === 10001) {
      //       this.$message({
      //         message: res.msg,
      //         type: 'success'
      //       })
      //       this.$router.push({
      //         path: `/`
      //       })
      //     } else {
      //       this.invite = res.data[0]
      //     }
      //   })
    },
    checkitem(id){
      console.log(id)
      this.$refs.loading.loadingshow();
      if(id){
        this.$post('/user/invite/info',{id:id})
          .then(res =>{
            this.$refs.loading.loadinghide();
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
              try{
                this.user.name = res.data.user[0].user.name;
                this.user.phone = res.data.user[0].user.phone;
                this.user.UID = res.data.user[0].UID;
                this.user.own_buy = res.data.user[0].own_buy;
                this.user.kid_buy = res.data.user[0].kid_buy;
                this.user.userNum = res.data.user[0].userNum;
                this.diologshow = true
              }catch(err){
                this.$message({
                  message:'用户信息异常',
                  type: 'error'
                })
              }

            }else{
              this.$message({
                message:res.msg,
                type: 'error'
              })
            }
          })
      }else{
        this.$message({
          message: '未找到用户相关信息',
          type: 'error'
        })
      }
    },
    closediolog(){
      this.diologshow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.members{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(16,16,16,1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #ffffff;
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
    .hedns{
      width:100%;
      background:rgba(26,26,26,1);
      border-radius:4px;
      padding: 10px 20px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0, 209, 255, 1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0, 209, 255, 1);
        text-align: left;
        box-sizing: border-box;
      }
      .buc{
        width: 100%;
        margin-top: 10px;
        display: flex;
        align-items: center;
        .tum{
          width: 40px;
          margin-right: 10px;
          img{
            width: 100%;
            display: block;
          }
        }
        .pom{
          flex: 1;
          text-align: left;
          .pom1{
            width:100%;
            height:17px;
            font-size:12px;
            font-weight:500;
            color:rgba(0, 209, 255, 1);
            line-height:17px;
            text-align: left;
          }
          .pom2{
            padding: 0 10px;
            height:16px;
            border-radius:9px;
            border:1px solid rgba(255,255,255,1);
            line-height: 16px;
            font-size:10px;
            font-weight:400;
            color:rgba(255,255,255,1);
            box-sizing: border-box;
            display: inline-block;
            margin-left: 0px;
            margin-top: 5px;
          }
        }
      }
    }
    .my_team{
      width:100%;
      // border-bottom:2px solid rgba(0,210,214,0.8);
      border-radius:1px;
      margin: 20px auto;
      height:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(0, 209, 255, 1);
      line-height:22px;
      text-align: center;
    }
    .list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .list_item{
        width: 23%;
        background:rgba(26,26,26,1);
        border-radius: 8px 30px 8px 8px;
        padding: 12px 0;
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
          color:rgba(0, 209, 255, 1);
          line-height:17px;
          margin-top: 8px;
        }
        .list_text1{
          height:11px;
          font-size:8px;
          font-weight:400;
          color:rgba(255,255,255,0.8);
          line-height:11px;
          margin-top: 5px;
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
      color:rgba(0, 209, 255, 1);
      line-height:22px;
      margin-top: 5px;
    }
  }
  .diologbox{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    .diologbox_bg{
      position: absolute;
      top:0;
      right: 0;
      left: 0;
      bottom:0;
      z-index: 1;
      background-color:rgba(0,0,0,0.8)
    }
    .diolog_content{
      position: absolute;
      top:20%;
      width: 80%;
      left: 10%;
      z-index: 10;
      background-color:rgba(26,26,26,1);
      .back_cv{
        width:100%;
        background:rgba(26, 26, 26, 1);
        border-radius:4px;
        padding: 10px 15px;
        box-sizing: border-box;
        .cflp{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sub_code{
            height:22px;
            font-size:16px;
            font-weight:500;
            color:rgba(0, 209, 255, 1);
            line-height:22px;
            padding: 0 10px;
            box-sizing: border-box;
          }
        }
        .leuoj{
          width: 100%;
          height:20px;
          font-size:14px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
          line-height:20px;
          padding-left: 8px;
          border-left: 3px solid rgba(0, 209, 255, 1);
          text-align: left;
          box-sizing: border-box;
          margin-bottom: 10px;
        }
        .zjpicbox{
          display: block;
          border:1px solid rgba(0, 209, 255, 1);
          width: 8rem;
          margin: 0 auto;
          border-radius: 0.25rem;
          overflow: hidden;
          position: relative;
          margin-bottom: 1rem;
          .zjpictext{
            padding: 1rem 0;
            background-color:rgba(0, 209, 255, 1) ;
            color:#fff;
            text-align: center;
            width: 3.5rem;
          }
          .uploadpic_info{
            position: absolute;
            left: 3.5rem;
            right: 0;
            top:0;
            bottom:0;
            padding-top: 1rem;
            .uploadpic_icon{
              width: 1.5rem;
              margin: 0 auto;
              img{
                width: 100%;
              }
            }
            .uploadpic_text{
              font-size: 0.6rem;
              color:rgba(255,255,255,0.8);
            }
          }
          .uploadpic{
            opacity: 0;
            position: absolute;
            top:0;
            left: 0;
          }
        }
      }
      .closebtn{
        border-top:1px solid rgba(255,255,255,0.2);
        color: rgba(255,255,255,0.8);
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .itemline{
    padding: 10px 0px;
    width: 100%;
    .itemlabel{
      float:left;
      width: 70px;
      text-align: left;
      font-size: 14px;
      color:rgba(0, 209, 255, 1);
    }
    .itemvalue{
      color:#fff;
      font-size: 14px;
      padding-left: 70px;
      text-align: left;
    }
  }
}
</style>
