<template>
  <div class="a">
    <div class="zo_list">
      <div class="list" @click="qm()">
        <div class="list_res">100 USDT</div>
        <div class="list_time">2020-04-15 19:23:17  充币成功</div>
      </div>
      <div class="list">
        <div class="list_res">100 USDT</div>
        <div class="list_time">2020-04-15 19:23:17  充币成功</div>
      </div>
    </div>
    <div class="signature" v-show="detu">
      <div class="boardBox" ref="boardBox">
        <canvas ref="board"
            @touchstart="mStart"
            @touchmove="mMove"
            @touchend="mEnd">
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
let canvas = document.createElement('canvas')
export default {
  name: 'a',
  data () {
    return {
      img_id: Number,
      hpl: {},
      tjr: false,
      usdt_num: '',
      invite: {},
      phone: '',
      name: '',
      buy_id: '',
      number: 5,
      password: '',
      linewidth: 10, // 线条粗细，选填
      color: '#FF0000', // 线条颜色，选填
      background: '#000', // 线条背景，选填
      imgsrc: '',
      ctx: null,
      point: {
        x: 0,
        y: 0
      },
      detu: false,
      img_bo: null,
      moving: false // 是否正在绘制中且移动
    }
  },
  mounted () {
    // this.detu = true
    this.img_bo = this.$refs.board
    let board = this.$refs.board // 获取DOM
    board.width = this.$refs.boardBox.offsetWidth // 设置画布宽
    board.height = this.$refs.boardBox.offsetHeight // 设置画布高
    this.ctx = board.getContext('2d') // 二维绘图
    this.ctx.strokeStyle = 'rgba(0, 210, 214, 1)' // 颜色
    this.ctx.lineWidth = 3 // 线条宽度
  },
  methods: {
    // back () {
    //   this.$router.go(-1)
    // }
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
    // 触摸(开始)
    mStart (e) {
      let x = e.touches[0].clientX - e.target.offsetLeft
      let y = e.touches[0].clientY - e.target.offsetTop // 获取触摸点在画板（canvas）的坐标
      this.point.x = x
      this.point.y = y
      this.ctx.beginPath()
      this.moving = true
      console.log('1')
    },
    // 滑动中...
    mMove (e) {
      if (this.moving) {
        let x = e.touches[0].clientX - e.target.offsetLeft
        let y = e.touches[0].clientY - e.target.offsetTop // 获取触摸点在画板（canvas）的坐标
        this.ctx.moveTo(this.point.x, this.point.y) // 把路径移动到画布中的指定点，不创建线条(起始点)
        this.ctx.lineTo(x, y) // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
        this.ctx.stroke() // 绘制
        this.point.x = x * 2
        this.point.y = y * 2 // 重置点坐标为上一个坐标
        console.log('2')
        console.log('x:' + x, 'y:' + y)
      }
    },
    // 滑动结束
    mEnd () {
      if (this.moving) {
        this.ctx.closePath() // 停止绘制
        this.moving = false // 关闭绘制开关
        console.log('3')
      }
    },
    handelClearEl () {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
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
          this.img_id = res
          if (res > 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.a{
  width: 100%;
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
  .boardBox{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    canvas{
      width: 80%!important;
      margin: 0 auto;
      height:95px!important;
      background:rgba(1,16,29,1)!important;
      border-radius:4px!important;
      z-index: 999;
    }
}
}
</style>
