<template>
  <div class="concours-play">
    <div class="tour col-xs-2" v-for="tour in nbTours">
      <match v-for="(match, index) in filteredMatchs[tour]" :match="match" :index="index" :key="index"></match>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Match from './Match.vue'

export default {
  components: { Match },
  props: ['consolante', 'concours'],
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      players: 'allPlayers',
      matchs: 'matchs'
    }),
    filteredMatchs () {
      console.log(this.matchs[this.concours])
      return this.matchs[this.concours]
    },
    nbTours () {
      let nb = parseInt(this.consolante.nbTeams / 2)
      let ret = []
      for (var i = 0; i < nb; i++) {
        ret.push(i)
      }
      return ret
    }
  },
  watch: {
    teams: function () {
    }
  },
  methods: {
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ]),
    doneEdit (e) {
      var input
      if (e.target.tagName === 'LABEL') {
        input = e.target.children[0]
      } else {
        input = e.target
      }
      const key = input.name
      const value = parseInt(input.value.trim())
      this.$store.dispatch('editConsolante', {
        key: key,
        value: value
      })
    }
  },
  created () {
    // console.log(this.matchs)
  }
}
</script>

<style scoped>
  .match {
    margin: 10px 0;
  }
</style>
