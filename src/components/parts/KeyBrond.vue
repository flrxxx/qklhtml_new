<template>
     <div class="numKeyBroud" :class="showclass" id="numtype">
        <div class="numKeyBrond_titlebox">
          <div class="numKeyBrond_titlebox_text"></div>
          <button class="numKeyBrond_titlebox_rightbtn" @click="keybrondhide()">完成</button>
        </div>
        <div class="numKeyBrond_listbox">
          <div class="numKeyBrond_list">
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="1" @click="itemcheck(1)">1</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="2" @click="itemcheck(2)">2</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="3" @click="itemcheck(3)">3</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="4" @click="itemcheck(4)">4</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="5" @click="itemcheck(5)">5</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="6" @click="itemcheck(6)">6</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="7" @click="itemcheck(7)">7</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="8" @click="itemcheck(8)">8</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="9" @click="itemcheck(9)">9</button>
            </div>
            <div class="numKeyBrond_list_item" v-if="KeyBrondinfo.type == 'idcard'">
              <button class="numKeyBrond_list_item_btn numKeyBrond_empty_btn" style="font-size: 1rem;" @click="emptyval()">清空</button>
            </div>
            <div class="numKeyBrond_list_item" v-else>
              <button class="numKeyBrond_list_item_btn numKeyBrond_empty_btn" data-val="." @click="itemcheck('.')">.</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn valbtn" data-val="0" @click="itemcheck(0)">0</button>
            </div>
            <div class="numKeyBrond_list_item">
              <button class="numKeyBrond_list_item_btn numKeyBrond_del_btn" data-val="del" @click="delval" @touchstart="delstart" @touchend="delend">
                <svg viewBox="0 0 32 22" xmlns="http://www.w3.org/2000/svg" class="numKeyBrond_delete-icon"><path d="M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z" fill="currentColor"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
      name: "KeyBrond",
      data(){
        return {
          showclass: '',
          btnstarttime:0,
          btnendtime:0,
          Longdel:function(){},
        }
      },
      props:['KeyBrondinfo'],
      methods: {
        keybrondshow: function () {
          this.showclass = 'show'
        },
        keybrondhide: function(){
          this.$emit('close')
          this.showclass = ''
        },
        itemcheck:function(num){
          this.$emit('checkchange', num)
        },
        delval : function(){
          this.$emit('delval')
        },
        delstart:function(){
          this.btntime = new Date().getTime();
          this.Longdel = setTimeout(()=>{
            this.$emit('Longdel');
          },600)
        },
        emptyval:function(){
          this.$emit('emptyval')
        },
        delend:function(){
          this.btnendtime = new Date().getTime();
          if(this.btnendtime - this.btntime < 600){
            clearTimeout(this.Longdel);
          }
          this.$emit('stopLongdel')
        }
      }
    }
</script>

<style scoped>


  .numKeyBroud{
    position: fixed;
    bottom:0px;
    left: 0px;
    right: 0px;
    background-color: rgba(16,16,16,1);
    z-index: 100;
    width: 100%;
    transform: translateY(100%);
    transition: all 0.3s;
  }
  .numKeyBroud.show{
    transform: translateY(0%);
  }
  .numKeyBroud.show{
    transform: translateY(0);
  }
  .numKeyBrond_titlebox{
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: content-box;
    height: 30px;
    padding-top: 6px;
    color: #646566;
    font-size: 14px;
    position: relative;
  }
  .numKeyBrond_titlebox_text{
    display: inline-block;
    font-weight: normal;
  }
  .numKeyBrond_titlebox_rightbtn{
    position: absolute;
    right: 0;
    height: 100%;
    padding: 0 16px;
    color: #00D1FF;
    font-size: 14px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    align-items: flex-start;
    text-align: center;
    -webkit-writing-mode: horizontal-tb;
    outline: none;
  }
  .numKeyBrond_listbox{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 6px 0 0 6px;
  }
  .numKeyBrond_list{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 3;
    -webkit-flex: 3;
    flex: 3;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .numKeyBrond_sidebar{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .numKeyBrond_list_item{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-flex-basis: 33%;
    flex-basis: 33%;
    box-sizing: border-box;
    padding: 0 6px 6px 0;
  }
  .numKeyBrond_list_item.numKeyBrond_list_wider{
    -webkit-flex-basis: 66%;
    flex-basis: 66%;
  }
  .numKeyBrond_list_item_btn{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    padding: 0;
    font-size: 28px;
    line-height: 1.5;
    background-color: rgba(25,25,25,1);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    color:#fff;
  }

  .numKeyBrond_list_item_btn:active{
    background-color: rgba(3,3,3,1);
  }
  .numKeyBrond_list_blue:active{
    background-color: #0570db;
  }
  ::selection {
    color: #fff;
    background:pink;
  }
  .numKeyBrond_collapse-icon {
    width: 30px;
    height: 24px;
  }
  .numKeyBrond_delete-icon {
    width: 32px;
    height: 22px;
  }
  .numKeyBrond_large{
    height: 100%;
  }
  .numKeyBrond_list_blue{
    color: #fff;
    background-color: #1989fa;
  }
  .numKeyBrond_list_blue{
    font-size: 16px;
  }
  .numKeyBroud_input{
    border:1px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
    height: 34px;
    line-height: 34px;
    font-size: 0px;
    padding: 0 5px;
  }
  .numKeyBroud_input font{
    font-size: 14px;
  }
  .numKeyBroud_cursor{
    width: 1px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    background-color: #00D1FF;
    -webkit-animation: 1s van-cursor-flicker infinite;
    animation: 1s van-cursor-flicker infinite;
  }
  @-webkit-keyframes van-cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes van-cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .numKeyBroud_input .numKeyBroud_cursor{
    display: none;
  }
  .numKeyBroud_input.oninput .numKeyBroud_cursor{
    display:inline-block;
  }
</style>
