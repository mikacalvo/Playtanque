<template>
  <li style="border: solid 1px red; margin: 10px; display: inline-block;">
    <h4>Équipe {{ index + 1 }}</h4>
    <ul>
      <li v-for="p in teamPlayers">
        {{ p.name }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['team', 'index'],
  computed: {
    teamPlayers () {
      return this.$store.getters.teamPlayers(this.team)
    }
  }
}
</script>
