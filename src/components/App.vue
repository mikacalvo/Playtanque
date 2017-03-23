<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-default">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <menuconcours></menuconcours>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Hello from './Hello'
  import Menuconcours from './Menuconcours'

  export default {
    components: {
      Hello,
      Menuconcours
    }
  }
</script>

<style lang="scss">
  @import 'src/assets/scss/design.scss';
</style>

<style>
  .navbar {
    margin-bottom: 0;
  }
  .row {
    margin-right: 0;
    margin-left: 0;
  }
  .side-body {
    margin-left: 290px;
  }
  @media (max-width: 768px) {
    /* Slide side body*/
    .side-body {
      margin-left: 5px;
      margin-top: 70px;
      position: relative;
      -moz-animation: bodyslideout 300ms forwards;
      -o-animation: bodyslideout 300ms forwards;
      -webkit-animation: bodyslideout 300ms forwards;
      animation: bodyslideout 300ms forwards;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }
  }
</style>
