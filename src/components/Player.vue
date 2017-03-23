<template>
  <li class="player" :class="{ completed: player.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="player.done"
        @change="togglePlayer({ player: player })">
      <label v-text="player.name" @dblclick="editing = true"></label>
      <button class="destroy" @click="deletePlayer({ player: player })"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="player.name"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    props: ['player'],
    data () {
      return {
        editing: false
      }
    },
    directives: {
      focus (el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus()
          })
        }
      }
    },
    methods: {
      ...mapMutations([
        'editPlayer',
        'togglePlayer',
        'deletePlayer'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim()
        const { player } = this
        if (!value) {
          this.deletePlayer({
            player
          })
        } else if (this.editing) {
          this.editPlayer({
            player,
            value
          })
          this.editing = false
        }
      },
      cancelEdit (e) {
        e.target.value = this.player.name
        this.editing = false
      }
    }
  }
</script>

<style>
</style>
