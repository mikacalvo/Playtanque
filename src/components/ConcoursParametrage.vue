<template>
  <div class="concours-param container-fluid">
    <ul class="row teams-list">
      <team class="col-xs-3 col-lg-2" v-for="(team, index) in teams" :key="index" :team="team"></team>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Team from './Team.vue'

  export default {
    components: { Team },
    props: ['type'],
    data () {
      return {
        visibility: 'all',
        teamNumber: 3
      }
    },
    computed: mapGetters({
      teams: 'allTeams'
    }),
    methods: {
      setTeamNumber (nb) {
        this.teamNumber = nb
      }
    },
    created () {
      // this.$store.dispatch('getAllTeams')
      console.log(this.teams)
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
</style>
