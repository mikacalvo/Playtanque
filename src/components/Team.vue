<template>
  <li style="border: solid 1px red; margin: 10px; display: inline-block;">
    <h4>Équipe {{ index + 1 }}</h4>
    <ul v-sortable="sortableOptions" :data-index="index">
      <li class="player" v-for="p in team">
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
        onAdd: function (evt) { // Element is dropped into the list from another list
          console.log(evt)
          // var itemEl = evt.item;  // dragged HTMLElement
          // evt.from;  // previous list
        },
        onUpdate: this.reorder
      }
    }
  },
  methods: {
    reorder ({oldIndex, newIndex}) {
      this.$store.commit('movePlayer', {
        team: this.team,
        oldIndex: oldIndex,
        newIndex: newIndex
      })
    }
  }
}
</script>
