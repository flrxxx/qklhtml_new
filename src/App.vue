<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html,body{
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
