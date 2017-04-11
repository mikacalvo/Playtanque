<template>
  <div class="match">
    <div v-for="(team, index) in filteredTeams">
      <h5>Équipe {{ match.teams[index] + 1 }}</h5>
      <div class="small"><span v-for="(p, pindex) in team">{{ p.name }}<span v-if="pindex < team.length - 1"> / </span></span></div>
      <select class="score">
        <option v-for="value in points" :value="value" v-html="value"></option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: ['match'],
  data () {
    return {
      points: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
  },
  computed: {
    ...mapGetters({
      teams: 'consolanteTeams'
    }),
    filteredTeams () {
      return this.match.teams.map((team) => {
        return this.teams[team]
      })
    }
  },
  methods: {
    ...mapMutations([
      'toggleAll'
    ]),
    teamIndex (index) {
    },
    test () {
    }
  },
  created () {
    // console.log(this.match)
  }
}
</script>

<style scoped>
  .match {
    margin: 10px 0;
    padding: 3px;
    border: solid red 1px;
  }
  h5 {
    margin-bottom: 0;
  }
</style>
