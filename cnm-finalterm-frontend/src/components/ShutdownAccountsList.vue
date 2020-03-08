<template>
  <div>
    <div class="card">
      <h5 class="card-header">
        Shutdown Accounts
      </h5>
      <ul class="list-group list-group-flush">
        <!-- add :to="/url" -->
        <router-link
          v-for="account in accounts"
          :key="account.id"
          to="#"
          class="list-group-item list-group-item-action"
          :class="{active: selected === account.id}"
          v-on:click.native="accountClicked(account.account_number)">
          <div><strong>Number:</strong> {{account.account_number}}</div>
          <div><strong>Balance:</strong> {{account.balance}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'AccountsList',
  components: {
    
  },
  data () {
    return {
      accounts: [],
      selected: -1
    }
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts: function() {
      var requestUrl = API_URL + '/accounts';
      this.axios
        .get(requestUrl)
        .then(res => {
          this.accounts = res.data.accounts;
        }).catch(err => {
          console.log(err);
        });
    },
    accountClicked(accountNumber) {
      var requestUrl = API_URL + '/shutdown/' + accountNumber;
      this.axios
        .get(requestUrl)
        .then(res => {
          alert(res.data.msg);
          this.$router.go();
          console.log(res);
        }).catch(err => {
          alert(err.response.data.msg);
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>