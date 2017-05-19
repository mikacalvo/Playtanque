<template>
  <main class="container pt-5">
    <table class="table table-bordered table-striped table-definition mb-5">
        <thead class="table-warning">
            <tr class="row-name">
                <th>Joueur</th>
                <th>Pour</th>
                <th>Contre</th>
                <th>Différence</th>
                <th>Gagné</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr class="row-content" v-for="result in supermeleeResults">
                <td>{{ getPlayerName(result.player) }}</td>
                <td>{{ result.fors }}</td>
                <td>{{ result.against }}</td>
                <td>{{ result.diff }}</td>
                <td>{{ result.win }}</td>
                <td>{{ result.total }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th></th>
                <th colspan="5">
                    <button class="btn btn-primary float-right">Add User</button>
                    <button class="btn btn-default">Approve</button>
                    <button class="btn btn-default">Approve All</button>
                </th>
            </tr>
        </tfoot>
    </table>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['supermeleeResults', 'allPlayers'])
  },
  methods: {
    getPlayerName (player) {
      return this.allPlayers.find(x => x.id === player).name
    }
  }
}
</script>

<style scoped>
table {
  border-bottom: 8px solid #448aff;
}
tr.row-name {
  font-size: 18px;
  color:#448aff;
}
tr.row-content {
  color:#6c7173;
}
.table-striped>tbody>tr:nth-of-type(odd) {
    background:#F0F2F2 !important;
}
</style>
