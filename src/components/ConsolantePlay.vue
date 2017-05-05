<template>
  <div class="tournament-play">
    <div class="round col-xs-2" v-for="round in rounds">
      <consolante-game v-for="(game, index) in consolante.tournaments[tournamentIndex][round]" :tournamentIndex="tournamentIndex" :game="game" :round="round" :index="index" :key="index"></consolante-game>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConsolanteGame from './ConsolanteGame.vue'

export default {
  components: { ConsolanteGame },
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
