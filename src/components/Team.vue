<template>
  <li style="border: solid 1px red;">
    <h4>Équipe {{ index + 1 }}</h4>
    <ul v-sortable="sortableOptions" :data-index="index">
      <li class="player" v-for="p in team" :key="p.id">
        {{ p.name }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['team', 'index'],
  data () {
    return {
      sortableOptions: {
        group: 'player',
        draggable: '.player',
        onMove: this.move,
        onAdd: this.transfer,
        onUpdate: this.reorder
      }
    }
  },
  methods: {
    move (evt) {
      if (evt.to !== evt.from && evt.to.children.length >= this.$store.state.consolante.nbPlayers) {
        return false
      }
    },
    reorder ({oldIndex, newIndex}) {
      this.$store.commit('movePlayer', {
        team: this.index,
        oldIndex: oldIndex,
        newIndex: newIndex
      })
    },
    transfer (evt) {
      this.$store.dispatch('changePlayerTeam', {
        oldTeamIndex: parseInt(evt.from.dataset.index),
        oldPlayerIndex: evt.oldIndex,
        newTeamIndex: parseInt(evt.to.dataset.index),
        newPlayerIndex: evt.newIndex
      })
    }
  }
}
</script>

<style scoped>
  ul {
    min-height: 70px;
  }
</style>
