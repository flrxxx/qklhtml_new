<template>
  <div class="buyMill" >
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">购买矿机</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="domscroll">
      <div class="content">
      <div class="buy_user">
        <div class="buy_user1">购买人信息</div>
        <div class="buy_list">
          <div class="list">
            <div class="list_tbm">
              <img src="../../assets/ming_user.png"/>
            </div>
            <div class="list_text">{{ name | hideHokl }}</div>
          </div>
          <div class="list">
            <div class="list_tbm">
              <img src="../../assets/team_buy_uid.png"/>
            </div>
            <div class="list_text">UID {{ phone }}</div>
          </div>
          <div class="list">
            <div class="list_tbm">
              <img src="../../assets/team_buy_balance.png"/>
            </div>
            <div class="list_text" v-if="asset">余额 {{ asset.USDT ? asset.USDT : '0' | hideMiddle }}</div>
            <!-- <div class="list_text" v-if="invite.grade">{{ invite.grade.title }}</div> -->
          </div>
        </div>
      </div>
      <div class="buy_user">
        <div class="buy_user1">购买T数</div>
        <div class="buy_list" style="width: 70%; margin: 0 auto 8px; justify-content: space-between;">
          <div class="list" style="width: auto;">
            <div class="list_tbm">
              <img src="../../assets/team_buy_tcount.png"/>
            </div>
            <div class="list_text">{{ usdt_num }} USDT/T</div>
          </div>
          <div class="list" style="width: auto;">
            <div class="list_text" style="font-size: 16px;">X</div>
          </div>
          <div class="list" style="width: auto; display: flex; align-items: center; justify-content: space-between;">
            <input type="number" class="number2" v-model="number" @focus="funcb()">
            <!-- v-positive-int -->
            <div class="add_sub">
              <div class="add" @click="add()">
                <img src="../../assets/team_buy_up.png"/>
              </div>
              <div class="sub" @click="sub()">
                <img src="../../assets/team_buy_down.png"/>
              </div>
            </div>
          </div>
        </div>

        <div class="buy_yhquan" @click="salepage(saleflag)">
          <div class="buy_yhquan_label">
            <i class="buy_yhquan_label_icon"><img src="../../assets/team_buy_coupon.png" ></i>
            <font class="buy_yhquan_label_text">现金券</font>
          </div>
          <div class="buy_yhquan_info">
            <font class="buy_yhquan_label_text" :class="hasdate">{{salecard}}</font>
            <i class="buy_yhquan_label_right_icon" v-show="!saleflag"><img src="../../assets/team_buy_right.png" ></i>
          </div>
        </div>

        <div class="total">需支付  USDT<font>{{ number * usdt_num - salenum < 0 ? 0 : number * usdt_num - salenum}}</font></div>
      </div>
      <div class="buy_user">
        <div class="buy_user1">合同签署</div>
        <div class="boardBox"  @click="showboard">
          <div v-if="!imgsrc">
            <div class="boardicon"><img src="../../assets/team_buy_sign.png"> </div>
            <div class="boardicontext">点击此处签署您的姓名</div>
          </div>
          <div v-else class="fullimg">
            <img :src="imgsrc">
          </div>
          <!--<canvas ref="board"-->
              <!--@touchstart="mStart"-->
              <!--@touchmove="mMove"-->
              <!--@touchend="mEnd">-->
          <!--</canvas>-->
        </div>
        <div class="btn_img">
          <div @click="handelClearEl()">清除</div>
        </div>

        <div class="soim">请点击下方按钮阅读买家协议，并在上方空白处签名</div>
        <div style="margin-top: 8px;text-align: center; font-size: 12px;">
          <el-checkbox v-model="checked1" style="color:#fff;" text-color="#ffffff">阅读买家协议</el-checkbox>
        </div>
      </div>


      <div class="back_cv">
        <div class="leuoj">身份认证</div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <input type="number" placeholder="请输入验证码" class="ipt" v-model="phone_code" >
          </div>
          <div class="sub_code" @click="getcodenow()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
        </div>
      </div>

      <div class="submit" @click="submit()">生成订单</div>
    </div>
    </div>
    <!-- <div class="signature" v-show="detu">
      <div class="boardBox" ref="boardBox">
        <canvas ref="board"
            @touchstart="mStart"
            @touchmove="mMove"
            @touchend="mEnd">
        </canvas>
      </div>
    </div> -->
    <div class="positionboard" v-if="showboardbox">
      <div class="positionboardbox" id="positionboardbox" ref="boardBox">
        <canvas ref="board"
          @touchstart="mStart"
          @touchmove="mMove"
          @touchend="mEnd">
        </canvas>
        <div class="btn" @click="handelSaveEl">确认签名</div>
      </div>
      <div class="positionboard_bg" @click="hideboard"></div>
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
    <div class="tangj" v-if="balance" @click.self="close1()">
      <div class="desout">
        <div class="tis" style="text-align: center;">提示</div>
        <div class="name" style="margin-bottom: 15px;">余额不足</div>
        <div class="two">
          <div class="two_left" @click.stop="close1()">取消</div>
          <div class="two_right" @click.stop="go_myAssets()">去充值</div>
        </div>
      </div>
    </div>
    <business ref="business" @submitpassword="submitpassword"></business>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
let canvas = document.createElement('canvas')
import business from "../parts/business.vue";
import loading from '../parts/loading.vue';
// let cxt = canvas.getContext('2d')
export default {
  name: 'buyMill',
  components:{business,loading},
  data () {
    return {
      getCode1: '60',
      getCode: '获取验证码',
      yhsi: true,
      codesend: true,
      checked1: false,
      balance: false,
      kkl: false,
      asset: {},
      img_id: Number,
      hpl: {},
      tjr: false,
      usdt_num: '',
      invite: {},
      phone: '',
      phonenum:'',
      name: '',
      buy_id: '',
      number: 1,
      password: '',
      linewidth: 10, // 线条粗细，选填
      color: '#FF0000', // 线条颜色，选填
      background: '#000', // 线条背景，选填
      saleflag: true,
      salecard: '正在获取优惠券',
      salenum: 0,
      hasdate: 'nothing',
      imgsrc: '',
      ctx: null,
      showboardbox:false,
      phone_code:'',
      point: {
        x: 0,
        y: 0
      },
      order_card_url:'',
      order_card_id:'',
      detu: false,
      img_bo: null,
      moving: false, // 是否正在绘制中且移动
      cash_coupon_id:''
    }
  },
  mounted () {

    this.number = this.$route.params.number ? this.$route.params.number : this.number;
    this.init();
    // this.img_bo = this.$refs.board
    // let board = this.$refs.board // 获取DOM
    // board.width = this.$refs.boardBox.offsetWidth // 设置画布宽
    // board.height = this.$refs.boardBox.offsetHeight // 设置画布高
    // this.ctx = board.getContext('2d') // 二维绘图
    // this.ctx.strokeStyle = '#00d2d6' // 颜色
    // this.ctx.lineWidth = 3 // 线条宽度
  },
  filters: {
    hideMiddle (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    },
    // *号省略
    hideHokl (val) {
      if (val.length > 0 && val.length <= 1) {
        return val
      } else if (val.length > 1 && val.length <= 2) {
        return `${val.substring(0, 1)}*`
      } else if (val.length > 2) {
        return `${val.substring(0, 1)}*${val.substring(val.length - 1)}`
      }
      // if (val) {
      //   return `${val.substring(0, 1)}*${val.substring(val.length - 3)}`
      // }
    }
  },
  methods: {
    init () {
      this.$post('/good/getInfo', {id: 1})
        .then(res => {
          this.buy_id = res.data.id
          this.usdt_num = res.data.usdt_num
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
      this.$post('/coupon/get').then(res => {
        if(this.$route.params.id){
          if(res.data.length === 0){
            this.saleflag = true;
            this.salecard = '暂无可用现金券';
            this.hasdate = 'nothing';
          }else{
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i].id == this.$route.params.id){
                this.cash_coupon_id = this.$route.params.id;
                this.saleflag = false
                this.salecard = '-' + res.data[i].num + ' ' + res.data[i].unit
                this.hasdate = '';
                this.salenum = parseInt(res.data[i].num);
              }
            }

          }
        }else{
          this.saleflag = res.data.length === 0
          this.salecard = this.saleflag ? '暂无可用现金券' : res.data.length + '张可用'
          this.hasdate = this.saleflag ? 'nothing' : ''
          if(!this.saleflag){
            window.localStorage.setItem("salecard",JSON.stringify(res.data));
          }else{
            window.localStorage.setItem("salecard",'null');
          }
        }
      })
      this.$post('/user/get/phone')
        .then(res => {
          this.invite = res.data.user[0]
          // this.phone = res.data.user[0].user.phone
          this.phone = res.data.user[0].UID
          this.phonenum = res.data.user[0].user.phone
          this.name = res.data.user[0].user.name
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
      this.$post('/user/getasset')
        .then(res => {
          this.asset = res.data.asset
        })
    },
    getcodenow () {
      if(this.codesend){
        this.codesend = false;
        this.$post('/user/sendCode', {phone: this.phonenum})
          .then(res => {
            this.codesend = true;
            if (res.status === 10001) {
              this.$message({
                message: res.msg,
                type: 'error'
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
              this.yhsi = false
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
                    this.codesend = true;
                    clearInterval(TIME_COUNT)
                  }
                }, 1000)
              }
            }else{
              this.diolog.text = res.msg;
              this.diolog.show = true;
              this.diolog.btn[0].callback = () => this.diolog.show = false
              this.yhsi = true
              this.codesend = true;
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.yhsi = true
          })
      }
    },
    contract () {
      this.$router.push({
        path: `/contract`
      })
    },
    qm () {
      this.detu = true
      this.img_bo = this.$refs.board
      let board = this.$refs.board // 获取DOM
      board.width = this.$refs.boardBox.offsetWidth // 设置画布宽
      board.height = this.$refs.boardBox.offsetHeight // 设置画布高
      this.ctx = board.getContext('2d') // 二维绘图
      this.ctx.strokeStyle = 'rgba(0, 210, 214, 1)' // 颜色
      this.ctx.lineWidth = 3 // 线条宽度
    },
    funcb () {
      this.number = null
    },
    back () {
      this.$router.go(-1)
    },
    salepage(type){

      if(!type)
        this.$router.push({
          name: `salecard`,
          params:{number:this.number}
        })

    },
    add () {
      this.number++
    },
    sub () {


      if (this.number > 1) {
        this.number--
      }else{

        this.$message({
          message: '最少购买1T',
          type: 'error'
        })
      }
    },
    submit () {
      if(this.phone_code){
        if (this.number > 0) {
          if (this.kkl) {
            if (this.checked1) {
              if (this.asset.USDT >= (this.number * this.usdt_num) - this.salenum) {
                this.$refs.business.businessshow();
              } else {
                this.balance = true
              }
            } else {
              this.$message({
                message: '请同意买家协议',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '请签名',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '最少购买1T',
            type: 'error'
          })
        }
      }else{
        this.$message({
          message: '请输入验证码',
          type: 'error'
        })
      }

      // if (this.number < 1) {
      //   this.number = 0
      //   this.$message({
      //     message: '最少购买1T',
      //     type: 'success'
      //   })
      // } else {
      //   this.tjr = true
      // }
    },
    submitpassword(value){
      this.$refs.loading.loadingshow();
      this.$post('/order/create',{id: this.buy_id, num: this.number, trade_pwd: value, order_card_id: this.img_id,cash_coupon_id:this.cash_coupon_id,phone_code:this.phone_code})
        .then(res =>{
          this.$refs.loading.loadinghide();
          if (res.status == 10001) {
            this.$message({
              message: res.msg,
              type: 'error'
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
            this.$router.push({
              path: `/myOrder/2`
            })
          }else{
            this.$refs.business.value = '';
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },

    close () {
      this.tjr = false
    },
    go_myAssets () {
      this.$router.push({
        path: `/myAssets`
      })
    },
    close1 () {
      this.balance = false
    },
    showboard(){
      this.showboardbox = true
      setTimeout(()=>{
        this.img_bo = this.$refs.board
        var height = document.getElementById('positionboardbox').clientHeight
        var width = document.getElementById('positionboardbox').clientWidth
        this.offsetleft = document.getElementById('positionboardbox').offsetLeft;
        this.offsettop = document.getElementById('positionboardbox').offsetTop;
        let board = this.$refs.board // 获取DOM
        board.width = width // 设置画布宽
        board.height = height // 设置画布高
        this.ctx = board.getContext('2d') // 二维绘图
        this.ctx.strokeStyle = 'rgba(0, 210, 214, 1)' // 颜色
        this.ctx.lineWidth = 3 // 线条宽度
      },50)
    },
    hideboard(){
      this.showboardbox = false
    },
    // confirm () {
    //   if (this.password) {
    //     let imgBase64 = this.img_bo.toDataURL()
    //     this.imgsrc = imgBase64
    //     let formData = new FormData()
    //     let ccp = this.base64ToFile(this.imgsrc, 'file')
    //     this.hpl = ccp
    //     formData.append('file', this.hpl)
    //     this.$post('/image/upload', formData)
    //       .then(res => {
    //         this.img_id = res
    //         if (this.img_id > 0) {
    //           this.$post('/order/create', {id: this.buy_id, num: this.number, trade_pwd: this.password, order_card_id: this.img_id})
    //             .then(res => {
    //               if (res.status === 0) {
    //                 this.$message({
    //                   message: res.msg,
    //                   type: 'success'
    //                 })
    //                 this.$router.push({
    //                   path: `/myOrder/2`
    //                 })
    //               } else {
    //                 this.$message({
    //                   message: res.msg,
    //                   type: 'error'
    //                 })
    //                 this.password = ''
    //               }
    //             })
    //         } else {
    //           this.$message({
    //             message: res.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     this.tjr = false
    //   } else {
    //     this.$message({
    //       message: '请输入密码',
    //       type: 'error'
    //     })
    //   }
    // },


    // 触摸(开始)
    mStart (e) {

      // let x = e.touches[0].clientX - e.target.offsetLeft
      // let y = e.touches[0].clientY - e.target.offsetTop // 获取触摸点在画板（canvas）的坐标
      let x = e.changedTouches[0].clientX - this.offsetleft
      let y = e.changedTouches[0].clientY - this.offsettop
      this.point.x = x
      this.point.y = y
      this.ctx.beginPath()
      this.moving = true
    },
    // 滑动中...
    mMove (e) {
      if (this.moving) {
        let x = e.changedTouches[0].clientX - this.offsetleft
        let y = e.changedTouches[0].clientY - this.offsettop
        this.ctx.moveTo(this.point.x, this.point.y) // 把路径移动到画布中的指定点，不创建线条(起始点)
        this.ctx.lineTo(x, y) // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
        this.ctx.stroke() // 绘制
        this.point.x = x
        this.point.y = y // 重置点坐标为上一个坐标
        this.kkl = true
      }
    },
    // 滑动结束
    mEnd () {
      if (this.moving) {
        this.ctx.closePath() // 停止绘制
        this.moving = false // 关闭绘制开关
      }
    },
    handelClearEl () {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.kkl = false
      this.imgsrc =''
      this.img_id=''
    },
    handelSaveEl () {
      let imgBase64 = this.img_bo.toDataURL()
      this.imgsrc = imgBase64
      let formData = new FormData()
      let ccp = this.base64ToFile(this.imgsrc, 'file')
      this.hpl = ccp
      formData.append('file', this.hpl)
      this.$post('/image/upload', formData)
        .then(res => {
          if (res.status == 10001) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
            this.$router.push({
              path: `/`
            })
          }

          if (res > 0) {
            this.img_id = res
            this.showboardbox = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    base64ToFile (urlData, fileName) {
      let arr = urlData.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      let ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
    }
  }
  // directives: {
  //   positiveInt: {
  //     bind: function(el) {
  //       el.handler = function() {
  //         el.value = Number(el.value.replace(/\D+/, ''))
  //       }
  //       el.addEventListener('input', el.handler)
  //     },
  //     unbind: function(el) {
  //       el.removeEventListener('input', el.handler)
  //     }
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buyMill{
  width: 100%;
  background-color: rgba(16,16,16,1);
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom:0;
  overflow: hidden;
  .domscroll{
    position: absolute;
    top:44px;
    left: 0;
    right: 0;
    bottom:0;
    padding-bottom: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(26,26,26, 1);
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
    padding: 0 12px;
    box-sizing: border-box;
    margin-top: 5px;
    .btn_img{
      width: 80%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      div{
        width:40%;
        height:27px;
        background:rgba(0,243,255,1);
        background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
        background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        border-radius:23px;
        font-size:12px;
        font-weight:400;
        color:#fff;
        line-height: 27px;
      }
    }
    .back_cv{
      width:100%;
      background:rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .cflp{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
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
        height:40px;
        font-size:16px;
        font-weight:500;
        color:rgba(0, 209, 255, 1);
        line-height:40px;
        text-align: center;
        box-sizing: border-box;
        margin-bottom: 20px;
        position: relative;
        &:after{
          content:"";
          border-bottom:2px solid rgba(0,209,255,1);
          width:40px;
          left: 50%;
          margin-left: -20px;
          bottom:0;
          position: absolute;
        }
      }
      .pasfm{
        width: 100%;
        height:40px;
        border-radius:4px;
        border:1px solid rgba(0, 209, 255, 1);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        .rightarrow{
          position: absolute;
          right:0.5rem;
          width: 0.7rem;
          height: .45rem;
          top:50%;
          margin-top: -0.225rem;
          img{
            display: block;
            width: 100%;
          }
        }
        .pasfm1{
          height:40px;
          line-height: 40px;
          background:rgba(0, 209, 255, 1);
          padding: 0 20px;
          border-radius: 4px 0px 0px 4px;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          white-space: nowrap;
        }
        .ipt{
          flex: 1;
          border: none;
          background-color: rgba(0, 210, 214, 0);
          outline: none;
          line-height: 40px;
          color: rgba(255,255,255,1);
          font-size:14px;
          font-weight:400;
          max-width: 100%;
          width: 100%;
          text-indent: 1em;
        }
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
    .buy_user{
      width: 100%;
      padding: 8px 0;
      box-sizing: border-box;
      background:rgba(26,26,26,1);
      border-radius:4px;
      margin-bottom: 8px;
      .buy_yhquan{
        width: 70%;
        margin:0 auto;
        padding:14px 0;
        border:1px solid rgba(174, 174, 174, 0.2);
        border-left: none;
        border-right: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .buy_yhquan_label{
          justify-content: space-between;
          align-items:center;
          display: flex;
          .buy_yhquan_label_text{
            font-size: 12px;
            color:#fff;

          }
          .buy_yhquan_label_icon{
            width: 14px;
            margin-right: 5px;
            img{
              width: 100%;
            }
          }

        }
        .buy_yhquan_label_right_icon{
          height: 11px;
          width: 6px;
          display: flex;
          justify-content: space-between;
          align-items:center;
          img{
            width: 100%;
          }
        }
        .buy_yhquan_info{
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .buy_yhquan_label_text{
          font-size:12px;
          text-decoration: none;
          color:rgba(0,209,255,1);
          margin-right: 10px;
          &.nothing{
            color:rgba(255,255,255,0.7);
            margin-right: 0px;
          }
        }
      }
      .buy_user1{
        width:100%;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:#00D1FF;
        line-height:22px;
        margin-bottom: 20px;
      }

      .buy_user1:after{
        content: '';
        display:block;
        width:40px;
        height:2px;
        background:rgba(0,209,255,1);
        border-radius:1px;
        margin: 0 auto;
        margin-top: 3px;
      }
      .buy_list{
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .list{
          width: calc(100% / 3);
          .list_tbm{
            width: 40px;
            margin: 0 auto;
            img{
              width: 100%;
              display: block;
            }
          }
          .list_text{
            width:100%;
            height:17px;
            font-size:12px;
            font-weight:400;
            color:#fff;
            line-height:17px;
            margin-top: 8px;
          }
          .number2{
            // flex: 1;
            // min-width: 46px;
            max-width: 70px;
            width: auto;
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: inline-block;
            // padding: 8px 12px;
            // box-sizing: border-box;
            background:rgba(16,16,16,1);
            border-radius:1px;
            border:1px solid rgba(0,209,255,1);
            font-size:24px;
            font-weight:400;
            color:#fff;
            outline: none;
          }
          .add_sub{
            margin-left: 9px;
            .add{
              width: 22px;
              img{
                width: 100%;
                display: block;
              }
            }
            .sub{
              width: 22px;
              margin-top: 16px;
              img{
                width: 100%;
                display: block;
              }
            }
          }
        }
      }
      .total{
        width:70%;
        height:22px;
        font-size:12px;
        font-weight:500;
        color:#fff;
        text-align: right;
        line-height:22px;
        /*margin-top: 8px;*/
        margin: 14px auto 6px;
        font{
          font-size: 24px;
          margin-left: 5px;
        }
      }
      .soim{
        width:100%;
        height:14px;
        font-size:10px;
        font-weight:400;
        color:#00d1ff;
        line-height:14px;
      }
      .boardBox{
        width: 80%;
        height:95px;
        margin: 0 auto;
        background:rgba(16,16,16,1);
        padding-top: 25px;
        position: relative;
        .fullimg{
          position:absolute;
          top:0px;
          left:0;
          right: 0;
          bottom:0;
          z-index: 1;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .boardicon{
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 auto;
          margin-bottom: 10px;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .boardicontext{
          font-size: 14px;
          color:rgba(255,255,255,0.5);
        }
      }
      .test{
        width: 100%;
        height:200px;
        font-size:14px;
        font-weight:600;
        text-align:center;
      }
    }
    .submit{
      width: 90%;
      margin: 0 auto;
      margin-top: 15px;
      height:40px;
      line-height: 40px;
      background: rgba(0,243,255,1);
      background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
      background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
      background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      border-radius:23px;
      font-size:18px;
      font-weight:400;
      color:#fff;
    }
  }
  .signature{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    .boardBox{
      width: 80%;
      height:95px;
      margin: 0 auto;
      position: relative;
      .fullimg{
        position:absolute;
        top:0px;
        left:0;
        right: 0;
        bottom:0;
        z-index: 1;
        img{
          width: 100%;
          height: 100%;
        }
      }
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
      background-color: rgba(26,26,26, 1);
      border-radius:10px;
      margin: auto;
      .ipt{
        outline: none;
        width: 90%;
        text-indent: 1em;
        height:40px;
        line-height: 40px;
        border-radius:4px;
        border:1px solid #00D1FF;
        background-color: rgba(0, 210, 214, 0);
        font-size:14px;
        font-weight:400;
        color:#00D1FF;
      }
      .tis{
        width: 90%;
        height: 22px;
        margin: auto;
        text-align: left;
        font-size:16px;
        font-weight:500;
        color:#00D1FF;
        line-height:22px;
        margin-bottom: 7px;
      }
      .name{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255, 1);
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
          font-size:14px;
          font-weight:400;
          color:#00D1FF;
        }
        .two_right{
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size:14px;
          font-weight:400;
          color:#00D1FF;
        }
      }
    }
  }
  .positionboard{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    .positionboard_bg{
      position: absolute;
      top:0;
      right: 0;
      left: 0;
      bottom:0;
      z-index: 1;
      background-color:rgba(0,0,0,0.8)
    }
    .positionboardbox{
      position: absolute;
      top:10%;
      width: 80%;
      left: 10%;
      height: 60%;
      z-index: 10;
      background-color:rgba(26,26,26,1);
      .btn{
        width: 80%;
        margin: 0 auto;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: rgba(0,243,255,1);
        background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
        background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        position: absolute;
        color:#fff;
        border-radius: 10px;
        left: 10%;
        bottom:-84px;
      }
    }
  }
}
</style>
