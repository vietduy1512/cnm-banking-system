<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <router-link to="/admin/createUser" class="btn btn-dark mr-2">Create User</router-link>
      <router-link to="/admin/createAccount" class="btn btn-dark mr-2">Create Account</router-link>
      <router-link to="/admin/addBalance" class="btn btn-dark">Add Balance</router-link>
    </div>
    <div class="col-md-6">
      <div class="card">
        <h5 class="card-header">
          Users List
        </h5>
        <ul class="list-group list-group-flush">
          <!-- add :to="/url" -->
          <router-link
            v-for="user in users"
            :key="user.id"
            to="#"
            class="list-group-item list-group-item-action"
            :class="{active: selected === user.id}"
            v-on:click.native="accountClicked(user.id)">
            <div><strong>Username:</strong> {{user.username}}</div>
            <div><strong>Name:</strong> {{user.name}}</div>
            <div><strong>Phone Number:</strong> {{user.phone_number}}</div>
            <div><strong>Email:</strong> {{user.email}}</div>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <h5 class="card-header">
          Accounts List
        </h5>
        <ul class="list-group list-group-flush">
          <!-- add :to="/url" -->
          <router-link
            v-for="account in accounts"
            :key="account.id"
            to="#"
            class="list-group-item list-group-item-action">
            <div><strong>Number:</strong> {{account.account_number}}</div>
            <div><strong>Balance:</strong> {{account.balance}}</div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'AdminDashboard',
  components: {
  },
  data () {
    return {
      users: [],
      accounts: [],
      selected: -1
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers: function() {
      var requestUrl = API_URL + '/users';
      this.axios
        .get(requestUrl)
        .then(res => {
          this.users = res.data.users;
        }).catch(err => {
          console.log(err);
        });
    },
    accountClicked: function(id) {
      this.selected = id;
      var requestUrl = API_URL + '/accounts/' + id;
      this.axios
        .get(requestUrl)
        .then(res => {
          this.accounts = res.data.accounts;
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>