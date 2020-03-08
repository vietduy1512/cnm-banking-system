<template>
  <div>
    <div class="card">
      <h5 class="card-header">
        Transactions History
      </h5>
      <ul class="list-group list-group-flush">
        <!-- add :to="/url" -->
        <router-link
          v-for="transaction in transactions"
          :key="transaction.id"
          to="#"
          class="list-group-item list-group-item-action"
          v-on:click.native="categoryClicked(transaction.id)">
          <div><small>User Account:</small> {{transaction.user_account_number}}</div>
          <div><small>Recipient Account:</small> {{transaction.recipient_account_number}}</div>
          <div><small>Recipient Name:</small> {{transaction.name}}</div>
          <div><small>Comment:</small> {{transaction.comment == '' ? 'N/A' : transaction.comment}}</div>
          <div><small>Amount:</small><strong> {{transaction.amount}}</strong></div>
          <div><small>Transfered:</small><strong> {{transaction.transfered ? 'Yes' : 'No'}}</strong></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'TransactionsList',
  components: {
    
  },
  data () {
    return {
      transactions: []
    }
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions: function() {
      var requestUrl = API_URL + '/transactions';
      this.axios
        .get(requestUrl)
        .then(res => {
          this.transactions = res.data.transactions;
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>