<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 player" :class="{ completed: player.done }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="player.done"
        @change="togglePlayer({ player: player })">
      <label v-text="player.name" v-show="!editing" @dblclick="editing = true"></label>
      <input class="edit" v-show="editing" v-focus="editing" :value="player.name" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit">
      <button class="destroy" v-show="!editing" @click="deletePlayer({ player: player })"></button>
    </div>
  </div>
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

<style scoped>
  .player {
    font-size: 1em;
    border-bottom: 1px solid #ededed;
  }

  .player:last-child {
    border-bottom: none;
  }

  .edit {
    padding: 15px 60px 15px 15px;
    margin-left: 50px;
    width: inherit;
  }

  .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none; /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
  }

  .toggle:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }

  .toggle:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }

  label {
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }

  .destroy:hover {
    color: #af5b5e;
  }

  .destroy:after {
    content: '×';
  }

  .player:hover .destroy {
    display: block;
  }

  .player.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
</style>
