<template>
  <team :team="team" :index="index"></team>
</template>

<script>
import Team from './Team.vue'

export default {
  props: ['team', 'index'],
  components: { Team },
  methods: {
    reorder ({oldIndex, newIndex}) {
      console.log('reorder')
      console.log(oldIndex, newIndex)
      // this.$store.commit('moveConsolantePlayer', [this.index, oldIndex, newIndex])
    },
    transfer (evt) {
      console.log('transfer')
      console.log(evt)
      // this.$store.dispatch('changeConsolantePlayerTeam', [parseInt(evt.from.dataset.index), evt.oldIndex, parseInt(evt.to.dataset.index), evt.newIndex])
    }
  }
}
</script>
