<template>
  <div class="tournament-play">
    <div class="round col-xs-2" v-for="round in rounds">
      <h4>Tour {{ round + 1 }}</h4>
      <supermelee-game v-for="(game, index) in supermelee.tournament.games[round]" :game="game" :round="round" :index="index" :key="index"></supermelee-game>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SupermeleeGame from './SupermeleeGame.vue'

export default {
  components: { SupermeleeGame },
  computed: {
    ...mapGetters(['supermelee']),
    rounds () {
      let nb = this.supermelee.nbRounds
      let ret = []
      for (var i = 0; i < nb; i++) {
        ret.push(i)
      }
      return ret
    }
  }
}
</script>

<style scoped>
</style>
