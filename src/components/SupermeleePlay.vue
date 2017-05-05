<template>
  <div class="tournament-play">
    <div class="round col-xs-2" v-for="round in rounds">
      <supermelee-game v-for="(game, index) in consolante.tournaments[tournamentIndex][round]" :tournamentIndex="tournamentIndex" :game="game" :round="round" :index="index" :key="index"></supermelee-game>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SupermeleeGame from './SupermeleeGame.vue'

export default {
  components: { SupermeleeGame },
  props: ['tournamentIndex'],
  computed: {
    ...mapGetters(['consolante']),
    rounds () {
      let nb = this.consolante.tournaments[this.tournamentIndex].length
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
