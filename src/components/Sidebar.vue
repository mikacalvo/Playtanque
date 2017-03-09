<template>
  <div class="side-menu">
    <nav class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <div class="brand-wrapper">
          <button type="button" class="navbar-toggle">
            <span class="sr-only">Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <div class="brand-name-wrapper">
            <a class="navbar-brand" href="#">
              Liste de joueurs / d'équipes
            </a>
          </div>

          <!-- Search -->
          <a data-toggle="collapse" href="#search" class="btn btn-default" id="search-trigger">
            <span class="glyphicon glyphicon-search"></span>
          </a>

          <!-- Search body -->
          <div id="search" class="panel-collapse collapse">
            <div class="panel-body">
              <form class="navbar-form" role="search">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Recherche">
                </div>
                <button type="submit" class="btn btn-default "><span class="glyphicon glyphicon-ok"></span></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="side-menu-container">
        <ul class="nav navbar-nav joueur-list">
          <li>
            <form class="navbar-form" v-on:submit.prevent>
              <div class="form-group">
                <input type="text" class="form-control new-todo" placeholder="(Nom joueur / équipe)" v-model="newJoueur">
              </div>
              <button class="btn btn-default" v-on:click="add"><span class="glyphicon glyphicon-plus"></span></button>
            </form>
          </li>
          <joueur v-for="(joueur, index) in joueurs" :key="index" :joueur="joueur"></joueur>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Joueur from './Joueur.vue'

  const filters = {
    all: joueurs => joueurs,
    active: joueurs => joueurs.filter(todo => !todo.done),
    completed: joueurs => joueurs.filter(todo => todo.done)
  }

  export default {
    components: { Joueur },
    data () {
      return {
        visibility: 'all',
        filters: filters
      }
    },
    computed: {
      joueurs () {
        return this.$store.state.joueurs
      },
      allChecked () {
        return this.joueurs.every(todo => todo.done)
      },
      filteredJoueurs () {
        return filters[this.visibility](this.joueurs)
      },
      remaining () {
        return this.joueurs.filter(todo => !todo.done).length
      }
    },
    methods: {
      addJoueur (e) {
        var text = e.target.value
        if (text.trim()) {
          this.$store.commit('addJoueur', { text })
        }
        e.target.value = ''
      },
      ...mapMutations([
        'toggleAll',
        'clearCompleted'
      ])
    },
    filters: {
      pluralize: (n, w) => n === 1 ? w : (w + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
</script>

<style>
  .side-menu {
    position: fixed;
    width: 300px;
    height: 100%;
    background-color: #f8f8f8;
    border-right: 1px solid #e7e7e7;
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
  .side-menu #search-trigger {
    background-color: #f3f3f3;
    border: 0;
    border-radius: 0;
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px 18px;
  }
  .side-menu .brand-name-wrapper {
    min-height: 50px;
  }
  .side-menu .brand-name-wrapper .navbar-brand {
    display: block;
  }
  .side-menu #search {
    position: relative;
    z-index: 1000;
  }
  .side-menu {
    padding: 0;
  }
  .side-menu .navbar-form {
    padding: 0;
    padding-right: 50px;
    width: 100%;
    margin: 0;
    position: relative;
    border-top: 1px solid #e7e7e7;
  }
  .side-menu .navbar-form.full {
    padding-right: 0px;
  }
  .side-menu .navbar-form .form-group {
    width: 100%;
    position: relative;
  }
  .side-menu .navbar-form input {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    height: 50px;
  }
  .side-menu .navbar-form .btn {
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
    .navbar-form {
      border-bottom: 0;
    }
    .navbar-form .form-group {
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
</style>
