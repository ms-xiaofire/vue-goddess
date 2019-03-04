<template>
    <div class="back">
        <p @click="back"> <i class="fa fa-chevron-left "/>返回</p>
    </div>
</template>

<script>
export default {
  name: 'goBack',
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .back {
    padding: .2rem;
    background: #fcd32d ;
    text-align: left;
    color: white;
  }
</style>
