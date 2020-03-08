<template>
  <div class="row">
    <div class="offset-md-3 col-md-6 mb-3">
      <router-link to="/transfer" class="btn btn-dark mr-2">Transfer</router-link>
      <router-link to="/contacts" class="btn btn-dark mr-2">Contacts</router-link>
      <router-link to="/transactions" class="btn btn-dark mr-2">Transactions</router-link>
      <router-link to="/shutdownAccount" class="btn btn-dark">Shutdown Account</router-link>
    </div>
    <div class="offset-md-3 col-md-6">
      <AccountsList/>
    </div>
  </div>
</template>

<script>
import AccountsList from '../components/AccountsList.vue'

export default {
  name: 'Dashboard',
  components: {
    AccountsList
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>