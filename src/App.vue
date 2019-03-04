<template>
    <div class="view">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{
    font-size: 0.3rem ;
    margin: 0;
  }
  p{
    margin: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0px;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    color: red;
  }
  .mint-popup {
    width: 100%;
  }
  .picker-toolbar{
    display: flex;
    justify-content: space-around;
    padding: 5% 0 0 0;
  }
   .mint-button::after{
    background: transparent !important;
  }
</style>
