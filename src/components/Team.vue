<template>
  <li style="border: solid 1px red; margin: 10px; display: inline-block;">
    <h4>{{ team.name }}</h4>
    <ul>
      <li v-for="p in team.players">
        {{ p.name }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['team'],
  computed: {
    teamPlayers () {
      console.log('Team teamPlayers', this.team.players)
    },
    total () {
      return this.players.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    test () {
      console.log('Team test', this.team)
    },
    checkout (players) {
      this.$store.dispatch('checkout', players)
    }
  },
  created () {
    this.test()
  }
}
</script>
