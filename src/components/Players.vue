<template>
  <section class="playerapp container">
    <!-- header -->
    <header class="header search-wrapper">
      <input class="new-player"
        autofocus
        autocomplete="off"
        placeholder="Entrez le nom d'un joueur"
        v-model="player"
        @keyup.esc="player = ''"
        @keyup.enter="addPlayer" />
      <span class="glyphicon glyphicon-plus btn btn2" v-show="player !== ''" @click="addPlayer"></span>
      <span class="glyphicon glyphicon-remove btn" v-show="player !== ''" @click="player = ''"></span>
    </header>
    <!-- main section -->
    <div class="row player-list" v-show="players.length">
      <player v-for="(player, index) in filteredPlayers" :key="index" :player="player"></player>
    </div>
    <!-- footer -->
    <footer class="footer" v-show="players.length">
      <span class="player-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('disponible') }}
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="players.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Player from './Player.vue'
import Fuse from 'fuse.js'

const filters = {
  tous: players => players,
  actifs: players => players.filter(player => !player.done),
  barrés: players => players.filter(player => player.done)
}

export default {
  components: { Player },
  data () {
    return {
      player: '',
      visibility: 'tous',
      filters: filters,
      options: {
        shouldSort: true,
        threshold: 0.4,
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
      players: 'allPlayers'
    }),
    allChecked () {
      return this.players.every(player => player.done)
    },
    filteredPlayers () {
      if (this.player !== '') {
        return filters[this.visibility](this.fuse.search(this.player))
      } else {
        return filters[this.visibility](this.players)
      }
    },
    remaining () {
      return this.players.filter(player => !player.done).length
    }
  },
  methods: {
    addPlayer () {
      if (this.player.trim()) {
        this.$store.commit('addPlayer', this.player)
      }
      this.player = ''
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  created () {
    this.fuse = new Fuse(this.players, this.options)
  }
}
</script>

<style>
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .playerapp {
    background: #fff;
    margin: 10px auto;
    position: relative;
    min-width: 230px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  .search-wrapper {
    padding: 0;
    width: 100%;
    margin: 0;
    position: relative;
  }
  .search-wrapper .form-group {
    width: 100%;
    position: relative;
  }
  .search-wrapper input {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    height: 50px;
  }
  .search-wrapper .btn {
    /*background-color: #ffffff;*/
    position: absolute;
    right: 0;
    top: 0;
    border-style: solid;
    border-color: #f3f3f3;
    border-radius: 0;
    padding: 15px 18px;
  }
  .search-wrapper .btn2 {
    right: 50px;
  }

  .playerapp input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .playerapp input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .playerapp input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .playerapp h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  .new-player,
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
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
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }

  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }

  label[for='toggle-all'] {
    display: none;
  }

  .toggle-all {
    position: absolute;
    top: -55px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none; /* Mobile Safari */
  }

  .toggle-all:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  .toggle-all:checked:before {
    color: #737373;
  }

  .player-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    box-sizing: content-box;
  }

  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  .player-count {
    float: left;
    text-align: left;
  }

  .player-count strong {
    font-weight: 300;
  }

  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }

  .filters li {
    display: inline;
  }

  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }

  .clear-completed,
  html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .clear-completed:hover {
    text-decoration: underline;
  }

  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .info p {
    line-height: 1;
  }

  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .info a:hover {
    text-decoration: underline;
  }

  /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all,
    .player-list li .toggle {
      background: none;
    }

    .player-list li .toggle {
      height: 40px;
    }

    .toggle-all {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-appearance: none;
      appearance: none;
    }
  }

  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }

    .filters {
      bottom: 10px;
    }
  }
</style>
