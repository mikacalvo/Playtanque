<template>
  <div class="row">
    <div class="container-fluid" id="consolante">
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a :class="{active: currentView == 'SupermeleeSettings'}" v-on:click="currentView = 'SupermeleeSettings'" href="#">Paramétrage</a></li>
              <li><a :class="{disabled: !ready, active: currentView == 'SupermeleePlay'}" v-on:click="go('SupermeleePlay')" href="#">Concours</a></li>
              <li><a :class="{disabled: !ready, active: currentView == 'SupermeleeResult'}" v-on:click="go('SupermeleeResult')" href="#">Résultats</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <keep-alive>
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SupermeleeSettings from './SupermeleeSettings'
import SupermeleePlay from './SupermeleePlay'
import SupermeleeResult from './SupermeleeResult'

export default {
  data () {
    return {
      currentView: 'SupermeleeSettings'
    }
  },
  computed: mapGetters({
    ready: 'supermeleeReady'
  }),
  components: {
    SupermeleeSettings,
    SupermeleePlay,
    SupermeleeResult
  },
  methods: {
    go: function (component) {
      this.currentView = this.ready ? component : this.currentView
    }
  }
}
</script>

<style scoped>
  #consolante {
    padding: 10px
  }

  .navbar {
    margin-bottom: 0px;
  }
  .navbar-nav>li>a {
    font-size: 15px;
    font-weight: 400;
  }
  .navbar-nav>li>a.active {
    color: #f00;
    box-shadow: 0px 20px 0px -18px #FF0000;
  }
  .navbar-nav>li>a.disabled, .navbar-default .navbar-nav>li>a.disabled:hover, .navbar-default .navbar-nav>li>a.disabled:focus {
    color: #ccc;
    box-shadow: none;
  }
  .navbar-default .navbar-nav>li>a:hover{
    color: #f00;
    box-shadow: 0px 20px 0px -18px #FF0000;
  }
  .navbar-brand {
    padding:0px 15px;
    line-height: 3.428571;
  }
  .add {
    color: #f00;
    box-shadow: 0px 20px 0px -18px #FF0000;
  }

  .navbar-collapse.collapse {
    display: block!important;
  }

  .navbar-nav>li, .navbar-nav {
    float: left !important;
  }

  .navbar-nav.navbar-right:last-child {
    margin-right: -15px !important;
  }

  .navbar-right {
    float: right!important;
  }
</style>
