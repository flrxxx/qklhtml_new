<template>
  <div id="full">

   <div @click="showpassword">显示交易密码</div>
    <business ref="business"></business>
  </div>
</template>

<script>
  import business from "../parts/business";
  export default {
    name: "empty",
    data(){
      return {

      }
    },
    components:{business},
    methods: {
      showpassword(){
        this.$refs.business.businessshow();
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
