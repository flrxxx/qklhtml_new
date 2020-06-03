<template>
    <div class="loadingbox" :class="show ? 'show':''">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
             <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
         </svg>
      </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        data() {
          return {
            show: false
          }
        },
        methods:{
          loadingshow(){
            this.show = true
          },
          loadinghide(){
            this.show = false
          }
        }
    }
</script>

<style scoped>
  .loadingbox{
    position: fixed;
    z-index: 1111;
    top:0px;
    right: 0px;
    left: 0px;
    bottom:0px;
    background-color: rgba(0,0,0,0.7);
    display: none;
  }
  .loadingbox.show{
    display: block;
  }
  .loader {
    position: absolute;
    width:2rem;
    height: 2rem;
    left: 50%;
    margin-left: -1rem;
    top:50%;
    margin-top: -1rem;
  }
  .loader::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes color {
    100%,
    0% {
      stroke: rgba(0,243,255,1);
    }
    40% {
      stroke: rgba(0,160,255,1)
    }
    66% {
      stroke: rgba(0,243,255,1);
    }
    80%,
    90% {
      stroke: rgba(0,160,255,1)
    }
  }
</style>
