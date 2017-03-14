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
  html,
  body {
    margin: 0;
    padding: 0;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus {
    outline: 0!important;
  }

  .hidden {
    display: none;
  }

  .sidebar input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .sidebar input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .sidebar input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  .sidebar h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }

  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }

  label[for='toggle-all'] {
    display: none;
  }

  .toggle-all {
    position: absolute;
    top: -55px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none; /* Mobile Safari */
  }

  .toggle-all:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  .toggle-all:checked:before {
    color: #737373;
  }

  .players-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .players-list li {
    position: relative;
    font-size: 18px;
    border-bottom: 1px solid #ededed;
  }

  .players-list li:last-child {
    border-bottom: none;
  }

  .players-list li.editing {
    border-bottom: none;
    padding: 0;
  }

  .players-list li.editing .edit {
    display: block;
    width: auto;
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }

  .players-list li.editing .view {
    display: none;
  }

  .players-list li .toggle {
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

  .players-list li .toggle:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }

  .players-list li .toggle:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }

  .players-list li label {
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin: 0 0 0 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  .players-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  .players-list li .destroy {
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

  .players-list li .destroy:hover {
    color: #af5b5e;
  }

  .players-list li .destroy:after {
    content: '×';
  }

  .players-list li:hover .destroy {
    display: block;
  }

  .players-list li .edit {
    display: none;
  }

  .players-list li.editing:last-child {
    margin-bottom: -1px;
  }

  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }

  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  .player-count {
    float: left;
    text-align: left;
  }

  .player-count strong {
    font-weight: 300;
  }

  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }

  .filters li {
    display: inline;
  }

  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }

  .clear-completed,
  html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .clear-completed:hover {
    text-decoration: underline;
  }

  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .info p {
    line-height: 1;
  }

  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .info a:hover {
    text-decoration: underline;
  }

  /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all,
    .players-list li .toggle {
      background: none;
    }

    .players-list li .toggle {
      height: 40px;
    }

    .toggle-all {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-appearance: none;
      appearance: none;
    }
  }

  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }

    .filters {
      bottom: 10px;
    }
  }

</style>
