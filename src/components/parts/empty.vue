<template>
  <div @touchstart="touchstart($event)" id="full">

    <div class="num_input" v-for="item in list" :class="item.cursorline" :data-id="item.id" style="margin: 1rem 1rem;" @click="showKeyBroud(item.id)">
      <font class="numKeyBroud_input_text" style="vertical-align: middle">{{item.value}}</font>
      <div class="numKeyBroud_cursor"></div>
    </div>
    <KeyBrond :KeyBrondinfo="KeyBrond" ref="KeyBrond" @checkchange="checkchange" @delval="delval" @Longdel="Longdel" @stopLongdel="stopLongdel" @emptyval="emptyval"></KeyBrond>
  </div>
</template>

<script>
  import KeyBrond from "../parts/KeyBrond";
    export default {
      name: "empty",
      data(){
        return {
          KeyBrond:{
            show:false,
            type:'idcard'
          },
          onfocus:'',
          delstill:function(){},
          list:{
            '1':{
              id: 1,
              cursorline: '',
              value:''
            },
            '2':{
              id: 2,
              cursorline: '',
              value:''
            }
          }
        }
      },
      components:{KeyBrond},
      methods: {
        touchstart(e){
          var dom = e.target;
          var father = document.getElementById('numtype');
          var inputdom = document.getElementsByClassName('oninput')[0];
          if(inputdom){
            if(dom.isSameNode(father)||father.contains(dom)|| dom.isSameNode(inputdom) || inputdom.contains(dom)){

            }else{
              if(this.onfocus){
                this.list[this.onfocus].cursorline = '';
              }
              this.$refs.KeyBrond.keybrondhide();
            }
          }
        },

        showKeyBroud(id){
          this.list[id].cursorline = 'oninput'
          this.onfocus = id;
          setTimeout(()=>{
            this.$refs.KeyBrond.keybrondshow();
          },100)
        },
        checkchange(val){
          this.list[this.onfocus].value = this.list[this.onfocus].value + val
        },
        delval(){
          this.list[this.onfocus].value = this.list[this.onfocus].value.substr(0,this.list[this.onfocus].value.length -1);
        },
        Longdel(){
          if(this.list[this.onfocus].value.length>0){
            this.list[this.onfocus].value = this.list[this.onfocus].value.substr(0,this.list[this.onfocus].value.length -1);
            this.delstill = setTimeout(()=>{
              this.Longdel()
            },50)
          }
        },
        emptyval(){
          this.list[this.onfocus].value='';
        },
        stopLongdel(){
          clearTimeout(this.delstill)
        }
      }
    }
</script>

<style scoped>
  #full{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
  }
  .num_input{
    border:1px solid #ddd;
    height: 2rem;
    line-height: 2rem;
    padding-left: 1rem;
  }

  .num_input{
    font-size: 0px;
    text-align: left;
  }
  .num_input .numKeyBroud_cursor{
    display: none;
  }
  .num_input.oninput .numKeyBroud_cursor{
    display: inline-block;
  }
  .num_input .numKeyBroud_input_text{
    font-size: 0.7rem;
  }

  .numKeyBroud_cursor{
    width: 1px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    background-color: #323233;
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
