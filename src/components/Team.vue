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
        onMove: this.$parent.move,
        onAdd: this.$parent.transfer,
        onUpdate: this.$parent.reorder
      }
    }
  }
}
</script>

<style scoped>
  ul {
    min-height: 70px;
  }
</style>
