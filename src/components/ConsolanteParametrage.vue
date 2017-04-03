<template>
  <div class="row">
    <div class="well well-sm">
      <form class="form-horizontal" action="">
        <fieldset>
          <div class="form-group">
            <label for="nbTeams" class="control-label col-md-3">
              Nombre d'équipes
            </label>
            <div class="col-md-2">
              <input id="nbTeams" name="nbTeams" type="number" class="form-control" @change="doneEdit" :value="consolante.nbTeams" />
            </div>
          </div>
          <div class="form-group">
            <label for="nbPlayers" class="control-label col-md-3">
              Nombre de joueurs par équipe
            </label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn" :class="{active: consolante.nbPlayers == 1}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers1" autocomplete="off" value="1" >1
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: consolante.nbPlayers == 2}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers2" autocomplete="off" value="2" >2
                <span class="glyphicon glyphicon-ok"></span>
              </label>
              <label class="btn" :class="{active: consolante.nbPlayers == 3}" @click="doneEdit">
                <input type="radio" name="nbPlayers" id="nbPlayers3" autocomplete="off" value="3" >3
                <span class="glyphicon glyphicon-ok"></span>
              </label>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['consolante'],
    data () {
      return {
        visibility: 'all',
        teamNumber: 3
      }
    },
    computed: mapGetters({
      teams: 'consolanteTeams'
    }),
    methods: {
      doneEdit (e) {
        var input
        if (e.target.tagName === 'LABEL') {
          input = e.target.children[0]
        } else {
          input = e.target
        }
        const key = input.name
        const value = parseInt(input.value.trim())
        this.$store.dispatch('editConsolante', {
          key: key,
          value: value
        })
      }
    }
  }
</script>

<style>
  div.row {
    padding-top: 20px;
  }

  :focus {
    outline: 0!important;
  }

  .btn span.glyphicon {
    opacity: 0;
  }
  .btn.active span.glyphicon {
    opacity: 1;
  }

</style>
