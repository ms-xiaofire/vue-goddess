<template>
    <div class="body">
        <div class="black">
            <a class="back" href="#/"><i class="fa fa-chevron-left "/>返回</a>
            <img class="logo" src="@/assets/abuilding.png" >
        </div>
        <img class="background" src="@/assets/dorm.png" >
    </div>
</template>

<script>
export default {
  name: 'dorm-abuilding'
}
</script>

<style scoped>
  .body{
    position: relative;
    height: 100vh;
    overflow-y: hidden;
  }
  .black{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.7);
  }
  .logo{
    height: 30vh;
  }
  .background{
    width: 100vw;
    height: 100vh;
  }
  .back{
    position: absolute;
    top: 5vw;
    left: 5vw;
    color: white;
  }
</style>
