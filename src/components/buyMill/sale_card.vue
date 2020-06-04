<template>
    <div class="sale_card">
      <div class="header">
        <div class="icon_left" @click="back()">
          <img src="../../assets/public_back.png" alt="icon"/>
        </div>
        <div class="text_con">选择现金券</div>
        <div class="icon_right"></div>
      </div>
      <div class="card_list">
        <div v-if="cardlist.length">
          <div class="card_item" v-for="item in cardlist" :key="item.id">
            <div class="card_body">
              <div class="card_leftinfo">
                <div class="card_num">{{item.num}}</div>
                <div class="card_dw">{{item.unit}}</div>
              </div>
              <div class="card_name">
                <div class="card_info">
                  <div class="card_name_text">{{item.title}}</div>
                  <div class="card_name_time">{{item.created_at}}</div>
                </div>
                <div class="checkthis" v-bind:data-id="item.cash_coupon_id" @click="selectitem(item.cash_coupon_id)">选择</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="emptydate">
            <div class="emptydate_icon"><img src="../../assets/public_nodata.png"></div>
            <div class="emptydate_text">暂无可用现金券</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'salecard',
  data () {
    return {
      cardlist: [],
      number:1
    }
  },
  mounted () {
    this.number = this.$route.params.number ? this.$route.params.number :1;
    if(window.localStorage.salecard && window.localStorage.salecard != 'null'){
      this.cardlist = JSON.parse(window.localStorage.salecard);
    }else{
      this.$post('/coupon/get').then(res => {
        this.cardlist = res.data
      })
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    selectitem(id){
      this.$router.push({
        name:'buyMill',
        params: {id: id, number:this.number}
      })
    }
  }
}
</script>
<style>
  body,html{
    height: 100%;
    overflow: hidden;
    position: relative;
    font-size: 20px;
  }

  @media screen and (min-width: 320px) {
    html {font-size: 20px;}
  }

  @media screen and (min-width: 360px) {
    html {font-size: 20px;}
  }

  @media screen and (min-width: 400px) {
    html {font-size: 22px;}
  }

  @media screen and (min-width: 440px) {
    html {font-size: 24px;}
  }

  @media screen and (min-width: 480px) {
    html {font-size: 26px;}
  }

  @media screen and (min-width: 640px) {
    html {font-size: 28px;}
  }

  @media screen and (min-width: 750px) {
    html {font-size: 40px;}
  }
  #app{
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
<style scoped lang="scss">

  .header{
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(26,26,26, 1);
    padding: 0 0.8rem;
    box-sizing: border-box;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .icon_left{
        width: 0.55rem;
        height: 1.1rem;
        img{
          width: 100%;
          display: block;
        }
    }
    .text_con{
      font-size:0.8rem;
      font-weight:400;
      color:rgba(255, 255, 255, 1);
    }
    .icon_right{
      width:1.1rem;
      height: 1.1rem;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .card_list{
    position: absolute;
    top:2.2rem;
    bottom:0px;
    left: 0px;
    right: 0px;
    overflow-y: auto;
    background-color: rgba(16, 16, 16, 1);
    box-sizing: border-box;
    padding: 0.75rem 0.5rem 0;
    .card_item{
      display: block;
      margin-bottom: 0.75rem;
      background-image: url('../../assets/coupon_rect.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
      padding-top: 22.53%;
      height: 0;
      position: relative;
      overflow: hidden;
      .card_body{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        .card_leftinfo{
          position: absolute;
          left: 0;
          top:0;
          bottom:0;
          width: 28%;
          text-align: center;
          .card_num{
            font-size: 1.5rem;
            color: rgba(0, 209, 255, 1);
            position: absolute;
            top: 20%;
            left: 0;
            right: 0;
          }
          .card_dw{
            position: absolute;
            top: 60%;
            left: 0;
            right: 0;
            color: rgba(0, 209, 255, 1);
            font-size: 0.7rem;
          }
        }
        .card_name{
          position: absolute;
          top: 20%;
          left: 28%;
          right: 0;
          bottom: 20%;
          .card_info{
            padding-left: 1rem;
            text-align: left;
            color: #fff;
            .card_name_text{
              font-size: 0.9rem;
              margin-bottom: 0.2rem;
            }
            .card_name_time{
              font-size: 0.6rem;
            }
          }
        }
      }
    }
  }
  .checkthis{
      position: absolute;
      z-index: 1;
      height: 1.2rem;
      padding:0 1rem;
      border-radius: 0.6rem;
      border:1px solid rgba(0, 209, 255, 1);
      right: 0px;
      top:50%;
      transform: translateY(-0.6rem);
      font-size: 14px;
      color:#fff;
      line-height: 1.2rem;
  }
  .emptydate{
    padding-top: 3rem;
    .emptydate_icon{
      width: 3rem;
      margin: 0 auto 1rem;
      img{
        width: 100%;
      }
    }
    .emptydate_text{
      font-size: 0.8rem;
      color:#00D1FF;
      text-align: center;
    }
  }
</style>
