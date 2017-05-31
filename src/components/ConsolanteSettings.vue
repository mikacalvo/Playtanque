<template>
  <div class="tournament-param">
    <div class="side-menu sidebar">
      <form class="form-horizontal" action="">
        <fieldset>
          <div style="padding:10px">
            <div class="btn-group" data-toggle="buttons">
              <label class="btn" :class="{active: consolante.nbPlayers == 1}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers1" autocomplete="off" value="1" >Simple
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: consolante.nbPlayers == 2}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers2" autocomplete="off" value="2" >Doublette
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: consolante.nbPlayers == 3}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers3" autocomplete="off" value="3" >Triplette
                <span class="glyphicon glyphicon-ok"></span>
              </label>
            </div>
          </div>
          <div style="padding:10px">
            <float-label style="display: inline-block;">
              <input type="number" placeholder="Nombre d'équipes" @change="doneEdit" :value="consolante.nbTeams" />
            </float-label>
          </div>
        </fieldset>
      </form>

      <h3 v-show="unfitPlayers.length > 0">Joueurs à équiper</h3>
      <ul class="players-list">
        <li class="player" v-for="(player, index) in unfitPlayers">
          <div class="view">
            <label v-text="player.name"></label>
          </div>
        </li>
      </ul>
    </div>

    <div class="side-body">
      <morphsearch :players="players" :tournament="consolante"></morphsearch>
      <br>
      <p>
        <small>Rappel : pour éviter un concours avec des tirages blancs, le nombre d'équipes doit être un multiple de 8 : 16, 32, 64, 128.</small>
      </p>
      <p v-show="consolante.ready">
        <strong style="color:red;">Tournament complet : </strong> Avant de le commencer, faites un tirage aléatoire en cliquant sur le bouton <button @click="shuffleConsolante"><span class="glyphicon glyphicon-random"></span></button>
      </p>
      <ul class="row teams-list">
        <consolante-team class="col-xs-6 col-lg-2" v-for="(team, index) in teams" :team="team" :index="index" :key="index"></consolante-team>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import ConsolanteTeam from './ConsolanteTeam.vue'
import Morphsearch from './Morphsearch.vue'

export default {
  components: { ConsolanteTeam, Morphsearch },
  computed: mapGetters({
    consolante: 'consolante',
    players: 'allPlayers',
    unfitPlayers: 'consolanteUnfitPlayers',
    teams: 'consolanteTeams'
  }),
  watch: {
    teams: function () {
      var ready = true
      for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].length !== this.consolante.nbPlayers) {
          ready = false
          break
        }
      }
      if (this.consolante.ready !== ready) {
        this.$store.commit('setConsolante', ['ready', ready])
      }
      if (ready) {
        this.$store.dispatch('initTournament')
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleAll'
    ]),
    ...mapActions([
      'shuffleConsolante'
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
      console.log([key, value])
      this.$store.dispatch('editConsolante', [key, value])
    },
    isPlaying (player) {
      return !this.teams.every(team => team.every(teamPlayer => teamPlayer.id !== player.id)) || !this.unfitPlayers.every(p => p.id !== player.id)
    },
    toggleFromTournament (player) {
      if (this.isPlaying(player)) {
        this.$store.dispatch('removeConsolantePlayer', player.id)
      } else {
        this.$store.dispatch('addToConsolante', player)
      }
    },
    move (evt) {
      if (evt.to !== evt.from && evt.to.children.length >= this.consolante.nbPlayers) {
        return false
      }
    },
    reorder ({oldIndex, newIndex}) {
      console.log('reorder')
    },
    transfer (evt) {
      console.log('transfer')
    }
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
  .side-menu .btn-group label {
    display: block;
    width: 100%;
    text-align: left;
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
