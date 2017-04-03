<template>
  <team :team="team" :index="index"></team>
</template>

<script>
import { mapGetters } from 'vuex'

import Team from './Team.vue'

export default {
  props: ['index'],
  components: { Team },
  computed: {
    ...mapGetters({
      consolanteTeams: 'consolanteTeams'
    }),
    team () {
      return this.consolanteTeams[this.index]
    }
  },
  methods: {
    test () {
    }
  },
  created () {
  }
}
</script>
