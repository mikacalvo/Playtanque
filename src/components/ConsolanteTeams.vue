<template>
  <div>
    <sidebar :concours="'consolante'"></sidebar>
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
  import { mapGetters } from 'vuex'
  import ConsolanteTeam from './ConsolanteTeam.vue'
  import Sidebar from './Sidebar'

  export default {
    components: { ConsolanteTeam, Sidebar },
    props: ['type'],
    data () {
      return {
        visibility: 'all',
        teamNumber: 3
      }
    },
    computed: mapGetters({
      teams: 'consolanteTeams'
    }),
    methods: {
      setTeamNumber (nb) {
        this.teamNumber = nb
      }
    },
    created () {
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
</style>
