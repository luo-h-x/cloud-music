<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  max-width: 1200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

a {
  text-decoration: none;
  color: #000;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.el-slider__button {
  width: 10px !important;
  height: 10px !important;
}
.el-table__body-wrapper td {
  border: none !important;
}

h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
}
</style>
