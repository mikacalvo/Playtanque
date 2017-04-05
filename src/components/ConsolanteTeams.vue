<template>
  <div>
    <div class="side-menu sidebar">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <div class="brand-wrapper">
            <button type="button" class="navbar-toggle">
              <span class="sr-only">Navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <div class="search-wrapper">
              <input type="text" class="form-control" placeholder="Recherche" v-model="search">
              <span class="glyphicon glyphicon-search" v-show="search === ''"></span>
              <span class="glyphicon glyphicon-remove btn" v-show="search !== ''" @click="search = ''"></span>
            </div>
          </div>
        </div>

        <div class="side-menu-container">
          <ul class="nav navbar-nav players-list">
            <li class="player" v-for="(player, index) in filteredPlayers" :class="{ completed: player.playing }">
              <div class="view">
                <input class="toggle"
                  type="checkbox"
                  :checked="isPlaying(player)"
                  @change="toggleFromConcours(player)">
                <label v-text="player.name"></label>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="concours-param container-fluid">
      <div class="side-body">
        <ul class="row teams-list">
          <consolante-team class="col-xs-3 col-lg-2" v-for="team, index in teams" :index="index" :key="index"></consolante-team>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import Player from './Player.vue'
  import ConsolanteTeam from './ConsolanteTeam.vue'
  import Fuse from '../../node_modules/fuse.js/src/fuse.min.js'

  export default {
    components: { Player, ConsolanteTeam },
    props: ['type'],
    data () {
      return {
        search: '',
        options: {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 30,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            'name'
          ]
        },
        fuse: null
      }
    },
    computed: {
      ...mapGetters({
        players: 'allPlayers',
        teams: 'consolanteTeams'
      }),
      filteredPlayers () {
        if (this.search !== '') {
          return this.fuse.search(this.search)
        } else {
          return this.players
        }
      }
    },
    methods: {
      ...mapMutations([
        'toggleAll',
        'clearCompleted'
      ]),
      isPlaying (player) {
        for (var i = 0; i < this.teams.length; i++) {
          if (this.teams[i].indexOf(player.id) !== -1) {
            return true
          }
        }
        return false
      },
      toggleFromConcours (player) {
        if (this.isPlaying(player)) {
          this.$store.dispatch('removeFromConcours', { player: player, concours: 'consolante' })
        } else {
          this.$store.dispatch('addToConcours', { player: player, concours: 'consolante' })
        }
      },
      addPlayer (e) {
        var name = this.newPlayer
        if (name.trim()) {
          this.$store.commit('addPlayer', { name })
        }
        this.newPlayer = ''
      }
    },
    created () {
      this.fuse = new Fuse(this.players, this.options)
    }
  }
</script>

<style>
  :focus {
    outline: 0!important;
  }

  .concours-param {
    margin-top: 10px;
  }

  .teams-list {
    padding: 0;
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


  .side-menu {
    position: fixed;
    width: 300px;
    height: 100%;
    background-color: #f8f8f8;
    border: 1px solid #e7e7e7;
  }
  .side-menu .navbar {
    border: none;
  }
  .side-menu .navbar-header {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu .navbar-nav .active a {
    background-color: transparent;
    margin-right: -1px;
    border-right: 5px solid #e7e7e7;
  }
  .side-menu .navbar-nav li {
    display: block;
    width: 100%;
    padding: 3px 0 0 5px;
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu .navbar-nav li a {
    padding: 15px;
  }
  .side-menu .navbar-nav li a .glyphicon {
    padding-right: 10px;
  }
  .side-menu #dropdown {
    border: 0;
    margin-bottom: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
  }
  .side-menu #dropdown .caret {
    float: right;
    margin: 9px 5px 0;
  }
  .side-menu #dropdown .indicator {
    float: right;
  }
  .side-menu #dropdown > a {
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu .panel-body {
    padding: 0;
    background-color: #f3f3f3;
  }
  .side-menu .panel-body .navbar-nav {
    width: 100%;
  }
  .side-menu .panel-body .navbar-nav li {
    padding-left: 15px;
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu .panel-body .navbar-nav li:last-child {
    border-bottom: none;
  }
  .side-menu .panel-body .panel > a {
    margin-left: -20px;
    padding-left: 35px;
  }
  .side-menu .panel-body .panel-body {
    margin-left: -15px;
  }
  .side-menu .panel-body .panel-body li {
    padding-left: 30px;
  }
  .side-menu .panel-body .panel-body li:last-child {
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu {
    padding: 0;
  }
  .side-menu .search-wrapper {
    padding: 0;
    padding-right: 50px;
    width: 100%;
    margin: 0;
    position: relative;
  }
  .side-menu .search-wrapper.full {
    padding-right: 0px;
  }
  .side-menu .search-wrapper .form-group {
    width: 100%;
    position: relative;
  }
  .side-menu .search-wrapper input {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    height: 50px;
  }
  .side-menu .search-wrapper span {
    background-color: #f3f3f3;
    border: 0;
    border-radius: 0;
    position: absolute;
    top: 0;
    right: 0;
    padding: 18px 18px;
  }
  .side-menu .search-wrapper .btn {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    border-radius: 0;
    background-color: #f3f3f3;
    padding: 15px 18px;
  }
  @media (max-width: 768px) {
    .side-menu {
      position: relative;
      width: 100%;
      height: 0;
      border-right: 0;
      border-bottom: 1px solid #e7e7e7;
    }
    .side-menu .brand-name-wrapper .navbar-brand {
      display: inline-block;
    }
    @-moz-keyframes slidein {
      0% {
        left: -300px;
      }
      100% {
        left: 10px;
      }
    }
    @-webkit-keyframes slidein {
      0% {
        left: -300px;
      }
      100% {
        left: 10px;
      }
    }
    @keyframes slidein {
      0% {
        left: -300px;
      }
      100% {
        left: 10px;
      }
    }
    @-moz-keyframes slideout {
      0% {
        left: 0;
      }
      100% {
        left: -300px;
      }
    }
    @-webkit-keyframes slideout {
      0% {
        left: 0;
      }
      100% {
        left: -300px;
      }
    }
    @keyframes slideout {
      0% {
        left: 0;
      }
      100% {
        left: -300px;
      }
    }
    .side-menu-container > .navbar-nav.slide-in {
      -moz-animation: slidein 300ms forwards;
      -o-animation: slidein 300ms forwards;
      -webkit-animation: slidein 300ms forwards;
      animation: slidein 300ms forwards;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }
    .side-menu-container > .navbar-nav {
      position: fixed;
      left: -300px;
      width: 300px;
      top: 43px;
      height: 100%;
      border-right: 1px solid #e7e7e7;
      background-color: #f8f8f8;
      -moz-animation: slideout 300ms forwards;
      -o-animation: slideout 300ms forwards;
      -webkit-animation: slideout 300ms forwards;
      animation: slideout 300ms forwards;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }
    @-moz-keyframes bodyslidein {
      0% {
        left: 0;
      }
      100% {
        left: 300px;
      }
    }
    @-webkit-keyframes bodyslidein {
      0% {
        left: 0;
      }
      100% {
        left: 300px;
      }
    }
    @keyframes bodyslidein {
      0% {
        left: 0;
      }
      100% {
        left: 300px;
      }
    }
    @-moz-keyframes bodyslideout {
      0% {
        left: 300px;
      }
      100% {
        left: 0;
      }
    }
    @-webkit-keyframes bodyslideout {
      0% {
        left: 300px;
      }
      100% {
        left: 0;
      }
    }
    @keyframes bodyslideout {
      0% {
        left: 300px;
      }
      100% {
        left: 0;
      }
    }
    .body-slide-in {
      -moz-animation: bodyslidein 300ms forwards;
      -o-animation: bodyslidein 300ms forwards;
      -webkit-animation: bodyslidein 300ms forwards;
      animation: bodyslidein 300ms forwards;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }
    /* Hamburger */
    .navbar-toggle {
      border: 0;
      float: left;
      padding: 18px;
      margin: 0;
      border-radius: 0;
      background-color: #f3f3f3;
    }
    /* Search */
    .search-wrapper {
      border-bottom: 0;
    }
    .search-wrapper .form-group {
      margin: 0;
    }
    .navbar-header {
      /* this is probably redundant */
      position: fixed;
      z-index: 3;
      background-color: #f8f8f8;
    }
    /* Dropdown tweek */
    .panel-body .navbar-nav {
      margin: 0;
    }
  }

  .new-player,
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 18px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .new-player {
    padding: 16px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }

</style>
