<template>
    <div class="diolog" v-if="diologinfo.show">
      <div class="diologcontent">
        <div v-if="diologinfo.title" class="diolog_title">{{diologinfo.title}}</div>
        <div v-if="diologinfo.text" class="diolog_text">{{diologinfo.text}}</div>
        <div v-if="diologinfo.btn.length === 1" class="diolog_btn_line">
          <a href="javascript:void(0)" class="fullbtn" @click="diologinfo.btn[0].callback">{{diologinfo.btn[0].text}}</a>
        </div>
        <div v-else class="diolog_btn_line">
          <a href="javascript:void(0)" class="halfbtn cancel" @click="diologinfo.btn[0].callback">{{diologinfo.btn[0].text}}</a>
          <a href="javascript:void(0)" class="halfbtn config" @click="diologinfo.btn[1].callback">{{diologinfo.btn[1].text}}</a>
        </div>
      </div>
      <div class="diolog_bg"></div>
    </div>
</template>

<script>
    export default {
      name: "diolog",
      props:['diologinfo']
    }
</script>

<style scoped>
  .diolog{
    position: fixed;
    top:0px;
    left: 0px;
    right: 0px;
    bottom:0px;
    z-index: 101;
  }
  .diolog .diolog_bg{
    background-color: rgba(0,0,0,0.8);
    position: absolute;
    top:0px;
    left: 0px;
    right: 0px;
    bottom:0px;
    z-index: 1;
  }
  .diolog .diologcontent{
    background-color: #1A1A1A;
    position: absolute;
    z-index: 3;
    border-radius: 0.4rem;
    width: 80%;
    left: 50%;
    margin-left: -40%;
    top:30%;
  }
  .diolog .diolog_text{
    font-size: 0.7rem;
    padding:0.75rem 0.75rem 1rem;
    color: #fff;
    text-align: center;
  }
  .diolog .diolog_btn_line{
    height: 2rem;
    text-align: center;
    border-top:1px solid rgba(174,174,174,0.2);
  }
  .diolog .diolog_title{
    padding: 1.2rem 0.5rem 0;
    font-size: 0.8rem;
    text-align: center;
    color: #00D1FF;
  }
  .diolog .fullbtn{
    height: 2rem;
    display: block;
    line-height: 2rem;
    color:#00D1FF;
    font-size: 0.7rem;
    text-decoration: none;
  }
  .diolog .halfbtn{
    height: 2.2rem;
    display: block;
    line-height: 2.2rem;
    width: 50%;
    float: left;
    color:#00D1FF;
    font-size: 0.7rem;
    position: relative;
    text-decoration: none;
  }
  .diolog .halfbtn + .halfbtn{

  }
  .diolog .halfbtn + .halfbtn:before{
    content:"";
    position: absolute;
    top:0.4rem;
    left: -1px;
    bottom:0.4rem;
    width: 1px;
    background-color: rgba(174,174,174,0.2);
  }



</style>
