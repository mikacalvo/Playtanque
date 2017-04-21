<template>
  <div class="tournament-param">
    <div class="side-menu sidebar">
      <form class="form-horizontal" action="">
        <fieldset>
          <div class="">
            <label for="nbGroups" class="control-label">
              Taille des équipes
            </label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn" :class="{active: supermelee.nbGroups == 1}" @click="doneEdit">
                <input type="radio" name="nbGroups" id="nbGroups1" autocomplete="off" value="1" >Simple
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: supermelee.nbGroups == 2}" @click="doneEdit">
                <input type="radio" name="nbGroups" id="nbGroups2" autocomplete="off" value="2" >Doublette
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: supermelee.nbGroups == 3}" @click="doneEdit">
                <input type="radio" name="nbGroups" id="nbGroups3" autocomplete="off" value="3" >Triplette
                <span class="glyphicon glyphicon-ok"></span>
              </label>
            </div>
          </div>
          <div class="">
            <label for="nbRounds" class="control-label">
              Nombre de tours
            </label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn" :class="{active: supermelee.nbRounds == 1}" @click="doneEdit">
                <input type="radio" name="nbRounds" id="nbRounds1" autocomplete="off" value="1" >1
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: supermelee.nbRounds == 2}" @click="doneEdit">
                <input type="radio" name="nbRounds" id="nbRounds2" autocomplete="off" value="2" >2
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: supermelee.nbRounds == 3}" @click="doneEdit">
                <input type="radio" name="nbRounds" id="nbRounds3" autocomplete="off" value="3" >3
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: supermelee.nbRounds == 4}" @click="doneEdit">
                <input type="radio" name="nbRounds" id="nbRounds4" autocomplete="off" value="4" >4
                <span class="glyphicon glyphicon-ok"></span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>

      <div>
        <div class="search-wrapper">
          <input type="text" class="form-control" placeholder="Recherche" v-model="search" @keydown.esc="search=''">
          <span class="glyphicon glyphicon-search" v-show="search === ''"></span>
          <span class="glyphicon glyphicon-remove btn" v-show="search !== ''" @click="search = ''"></span>
        </div>
      </div>

      <ul class="players-list">
        <li class="player" v-for="(player, index) in filteredPlayers" :class="{ completed: player.playing }">
          <div class="view">
            <input class="toggle"
              type="checkbox"
              :checked="isPlaying(player)"
              @change="toggleFromTournament(player)">
            <label v-text="player.name"></label>
          </div>
        </li>
      </ul>
    </div>

    <div class="side-body">
      <p>
        <small>Rappel : pour éviter un concours avec des tirages blancs, le nombre d'équipes doit être un multiple de 8 : 16, 32, 64, 128.</small>
      </p>
      <p v-show="supermelee.ready">
        <strong style="color:red;">Tournament complet : </strong> Avant de le commencer, faites un tirage aléatoire en cliquant sur le bouton <button @click="shuffle"><span class="glyphicon glyphicon-random"></span></button>
      </p>
      <ul class="row teams-list">
        <supermelee-group class="col-xs-4" v-for="(team, index) in supermeleePlayers" :team="team" :index="index" :key="index"></supermelee-group>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SupermeleeGroup from './SupermeleeGroup.vue'
import Fuse from 'fuse.js'

export default {
  components: { SupermeleeGroup },
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
      supermelee: 'supermelee',
      players: 'allPlayers',
      supermeleePlayers: 'supermeleePlayers'
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
    ...mapActions([
      'shuffle'
    ]),
    doneEdit (e) {
      var input
      if (e.target.tagName === 'LABEL') {
        input = e.target.children[0]
      } else {
        input = e.target
      }
      const key = input.name
      const value = input.value ? parseInt(input.value.trim()) : ''
      this.$store.dispatch('editSupermelee', [key, value])
    },
    isPlaying (player) {
      return !this.supermeleePlayers.every(group => group.every(p => p.id !== player.id))
    },
    toggleFromTournament (player) {
      if (this.isPlaying(player)) {
        this.$store.commit('removePlayer', player.id)
      } else {
        this.$store.commit('addPlayer', player.id)
      }
    }
  },
  created () {
    this.fuse = new Fuse(this.players, this.options)
  }
}
</script>

<style scoped>
  div.row {
    padding-top: 20px;
  }

  :focus {
    outline: 0!important;
  }

  .btn span.glyphicon {
    opacity: 0;
  }
  .btn.active span.glyphicon {
    opacity: 1;
  }

  .tournament-param {
    margin-top: 10px;
  }

  .teams-list {
    padding: 0;
    list-style-type: none;
  }

  .side-body {
    margin-left: 240px;
  }

  .side-menu {
    float: left;
    padding: 0;
    width: 230px;
    background-color: #f8f8f8;
    border: 1px solid #e7e7e7;
  }
  .side-menu #nbTeams {
    margin: 5px 0 0 30px;
    width: 60px;
  }
  .side-menu .btn-group {
    padding: 5px 0 10px 30px;
  }
  .side-menu label {
    padding-left: 10px;
  }
  .side-menu .players-list {
    padding: 0;
    background-color: #f3f3f3;
  }
  .side-menu .players-list {
    width: 100%;
    list-style-type: none;
  }
  .side-menu .players-list li {
    padding-top: 5px;
    padding-left: 15px;
    border-bottom: 1px solid #e7e7e7;
  }
  .side-menu .players-list li:last-child {
    border-bottom: none;
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
  /*@media (max-width: 768px) {
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
    .navbar-toggle {
      border: 0;
      float: left;
      padding: 18px;
      margin: 0;
      border-radius: 0;
      background-color: #f3f3f3;
    }
    .search-wrapper {
      border-bottom: 0;
    }
    .search-wrapper .form-group {
      margin: 0;
    }
    .navbar-header {
      position: fixed;
      z-index: 3;
      background-color: #f8f8f8;
    }
    .panel-body .navbar-nav {
      margin: 0;
    }
  }*/
</style>
