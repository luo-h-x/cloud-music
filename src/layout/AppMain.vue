<template>
  <div class="appMain">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive" :key="$route.fullPath" ></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive" :key="$route.fullPath" ></router-view>
    <!-- <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
export default {}
</script>

<style></style>
