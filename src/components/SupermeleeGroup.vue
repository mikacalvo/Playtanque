<template>
  <team :team="team" :index="index"></team>
</template>

<script>
import Team from './Team.vue'

export default {
  props: ['team', 'index'],
  components: { Team },
  methods: {
    move (evt) {
      if (evt.to !== evt.from && evt.to.children.length >= this.$store.state.consolante.nbPlayers) {
        return false
      }
    },
    reorder ({oldIndex, newIndex}) {
      this.$store.commit('supermeleeMovePlayer', [this.index, oldIndex, newIndex])
    },
    transfer (evt) {
      this.$store.dispatch('changePlayerGroup', [parseInt(evt.from.dataset.index), evt.oldIndex, parseInt(evt.to.dataset.index), evt.newIndex])
    }
  }
}
</script>
