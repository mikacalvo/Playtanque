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
    },
    reorder ({oldIndex, newIndex}) {
      this.$store.commit('moveSupermeleePlayer', [this.index, oldIndex, newIndex])
    },
    transfer (evt) {
      this.$store.dispatch('changeSupermeleePlayerGroup', [parseInt(evt.from.dataset.index), evt.oldIndex, parseInt(evt.to.dataset.index), evt.newIndex])
    }
  }
}
</script>
