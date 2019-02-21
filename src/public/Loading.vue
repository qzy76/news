<template>
    <div class="loading">
      loading...
    </div>
</template>

<script>
    export default {
        name: 'Loading'
    }
</script>

<style scoped>
  .loading {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
  }
</style>
