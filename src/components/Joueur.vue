<template>
  <li class="joueur" :class="{ completed: joueur.done, editing: editing }">
    <div class="view">
      <input class="toggle"
      type="checkbox"
      :checked="joueur.done"
      @change="toggleJoueur({ joueur: joueur })">
      <label v-text="joueur.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="deleteJoueur({ joueur: joueur })"></button>
    </div>
    <input class="edit"
    v-show="editing"
    v-focus="editing"
    :value="joueur.text"
    @keyup.enter="doneEdit"
    @keyup.esc="cancelEdit"
    @blur="doneEdit">
  </li>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Joueur',
    props: ['joueur'],
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
        'editJoueur',
        'toggleJoueur',
        'deleteJoueur'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim()
        const { joueur } = this
        if (!value) {
          this.deleteJoueur({
            joueur
          })
        } else if (this.editing) {
          this.editJoueur({
            joueur,
            value
          })
          this.editing = false
        }
      },
      cancelEdit (e) {
        e.target.value = this.joueur.text
        this.editing = false
      }
    }
  }
</script>
