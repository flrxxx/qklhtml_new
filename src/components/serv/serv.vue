<template>
  <div class="serv">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">客服中心</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="help">
      <div class="help_email" style="border-right: 1px solid rgba(0, 210, 214, 0.2); height: 46px;"  @click="kfyx()">
        <div class="help_img">
          <img src="../../assets/team_email.png"/>
        </div>
        <div class="help_text">客服邮箱</div>
      </div>
      <div class="help_email" @click="derop()">
        <div class="help_img">
          <img src="../../assets/team_consult.png"/>
        </div>
        <div class="help_text">新增咨询</div>
      </div>
    </div>
    <div class="zixun">我的咨询</div>
    <div class="content">
      <div v-if="list.length > 0">
        <div class="list" v-for="(item, index) in list" :key="index" @click="details(item.id)">
          <div class="list_tit">{{ item.ask }}</div>
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
    <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">提示</div>
        <div class="name">客服邮箱为 <span id="inviteCode">{{ youx }}</span></div>
        <div class="name">点击确定进行复制</div>
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click="copyLink()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serv',
  data () {
    return {
      tjr: false,
      list: [],
      youx: ''
    }
  },
  mounted () {
    // this.ID = JSON.parse(sessionStorage.ID)
    this.init()
  },
  methods: {
    init () {
      this.$post('/question/select?pageSize=20')
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
      this.$post('/user/service')
        .then(res => {
          this.youx = res.data.email
        })
    },
    back () {
      this.$router.go(-1)
    },
    kfyx () {
      this.tjr = true
    },
    close () {
      this.tjr = false
    },
    copyLink () {
      var Url2 = document.getElementById('inviteCode').innerText
      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
      this.tjr = false
    },
    help () {
      this.$router.push({
        path: `/help`
      })
    },
    details (e) {
      this.$router.push({
        path: `/helpDetails/${e}`
      })
    },
    derop () {
      this.$router.push({
        path: `/newhelp`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.serv{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(1, 16, 29, 1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3,26,46,1);
    padding: 0 16px;
    box-sizing: border-box;
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
  .help{
    width: 95%;
    height: 80px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3, 26, 46, 1);
    border-radius: 8px;
    .help_email{
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .help_img{
        width: 30px;
        img{
          width: 100%;
          display: block;
        }
      }
      .help_text{
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0, 210, 214, 1);
        line-height:22px;
        margin-left: 6px;
      }
    }
  }
  .zixun{
    width: 100%;
    height: 30px;
    text-align: center;
    font-size:16px;
    font-weight:400;
    color:rgba(0, 210, 214, 1);
  }
  .zixun:after{
      content: '';
      display:block;
      width:40px;
      height:2px;
      background:rgba(0,210,214,0.8);
      border-radius:1px;
      margin: 0 auto;
      margin-top: 3px;
    }
  .content{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 5px;
    .list{
      width:100%;
      height:69px;
      background:rgba(3, 26, 46, 1);
      border-radius:5px;
      padding: 8px 20px;
      box-sizing: border-box;
      margin-bottom: 5px;
      .list_tit{
        width:100%;
        height:34px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0, 210, 214, 1);
        line-height:17px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
      }
      .list_time{
        width:100%;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0, 210, 214, 1);
        line-height:17px;
        text-align: right;
        margin-top: 3px;
      }
    }
  }
  .nower{
    width: 60px;
    margin-top:20px;
    margin: 20px auto;
    img{
      width: 100%;
      display: block;
    }
  }
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: rgba(3, 26, 46, 1);
      border-radius:10px;
      margin: auto;
      .tis{
        width: 100%;
        height: 22px;
        text-align: center;
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
