<template>
  <div class="row">
    <sidebar></sidebar>
    <div class="container-fluid">
      <div class="side-body">
        <div class="consolante" id="consolante">
          <nav class="navbar navbar-default">
            <div class="container">
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                  <li><a v-on:click="currentView = 'ConcoursParametrage'" href="#">Paramétrage</a></li>
                  <li><a v-on:click="currentView = 'ConcoursPlay'" href="#">Concours</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <keep-alive>
                <component v-bind:is="currentView" :type="'consolante'"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ConcoursParametrage from './ConcoursParametrage'
  import Sidebar from './Sidebar'

  export default {
    name: 'consolante',
    data () {
      return {
        currentView: 'ConcoursParametrage'
      }
    },
    components: {
      ConcoursParametrage,
      Sidebar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .consolante {
    padding: 10px
  }

  .navbar{
    margin-bottom: 0px;
  }
  .navbar-nav>li>a {
    font-size: 15px;
    font-weight: 400;
  }
  .navbar-default .navbar-nav>li>a:hover{
    color: #f00;
    box-shadow: 0px 20px 0px -18px #FF0000;
  }
  .navbar-brand {
    padding:0px 15px;
    line-height: 3.428571;
  }
  .add{
    color: #f00;
    box-shadow: 0px 20px 0px -18px #FF0000;
  }
</style>
