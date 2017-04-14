<template>
  <div class="row">
    <div class="container-fluid" id="consolante">
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a :class="{active: currentView == 'ConsolanteParametrage'}" v-on:click="currentView = 'ConsolanteParametrage'" href="#">Paramétrage</a></li>
              <li><a :class="{disabled: !ready, active: currentView == 'ConsolantePlay' && tournamentIndex == 0}" v-on:click="go(0)" href="#">Concours A</a></li>
              <li><a :class="{disabled: !ready, active: currentView == 'ConsolantePlay' && tournamentIndex == 1}" v-on:click="go(1)" href="#">Concours B</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <keep-alive>
          <component v-bind:is="currentView" :tournamentIndex="tournamentIndex"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConsolanteParametrage from './ConsolanteParametrage'
import ConsolantePlay from './ConsolantePlay'

export default {
  data () {
    return {
      currentView: 'ConsolanteParametrage',
      tournamentIndex: 0
    }
  },
  computed: mapGetters(['ready']),
  components: {
    ConsolanteParametrage,
    ConsolantePlay
  },
  methods: {
    go: function (index) {
      this.tournamentIndex = index
      this.currentView = this.ready ? 'ConsolantePlay' : this.currentView
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
