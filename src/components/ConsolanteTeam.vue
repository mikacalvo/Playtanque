<template>
  <team :team="team" :index="index"></team>
</template>

<script>
import Team from './Team.vue'

export default {
  props: ['team', 'index'],
  components: { Team },
  methods: {
    test () {
    }
  },
  created () {
  }
}
</script>
