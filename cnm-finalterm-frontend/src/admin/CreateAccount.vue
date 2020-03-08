<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
        <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
        <div class="card">
            <h5 class="card-header">
                Create Account
            </h5>
            <div class="card-body">
                <form @submit.prevent="processForm">
                    <div class="form-group">
                        <label for="user">User</label>
                        <select class="form-control" id="user" v-model="user_id">
                        <option selected disabled>Choose User</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{user.id}}. {{user.username}} ({{user.name}})</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Account Number</label>
                        <div class="input-group">
                        <input type="text" class="form-control" v-model="account_number" placeholder="Example: 21D8R083RF74">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Balance</label>
                        <div class="input-group">
                            <input type="number" class="form-control" v-model="balance" placeholder="Example: 499$">
                            <div class="input-group-append">
                                <div class="input-group-text">$</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                    <span class="glyphicon glyphicon-user"></span>
                    Create
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'CreateAccount',
  components: {
    
  },
  data () {
    return {
        users: [],
        user_id: '',
        account_number: '',
        balance: ''
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
    processForm: function() {
      if (this.user_id == '' || this.account_number == '' || this.balance == '') {
        alert('Fill all field');
        return;
      }
      var accountModel = {
        user_id: this.user_id,
        account_number: this.account_number,
        balance: this.balance
      };

      this.axios
        .post(API_URL + '/admin/createAccount', accountModel)
        .then(res => {
            alert(res.data.msg);
            this.$router.push('/admin/dashboard');
        }).catch(err => {
            console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>