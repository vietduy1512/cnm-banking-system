<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
        <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
        <div class="card">
            <h5 class="card-header">
                Create User
            </h5>
            <div class="card-body">
                <form @submit.prevent="processForm">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input id="username" v-model="username" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input id="password" v-model="password" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input id="name" v-model="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" v-model="email" type="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="phone_number">Phone number</label>
                        <input id="phone_number" v-model="phone_number" type="text" class="form-control">
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
  name: 'CreateUser',
  components: {
    
  },
  data () {
    return {
      username: '',
      password: '',
      name: '',
      email: '',
      phone_number: ''
    };
  },
  methods: {
    processForm: function() {
      if (this.username == '' || this.password == '' || this.name == '' || this.email == '' || this.phone_number == '') {
        alert('Fill all field');
        return;
      }
      var registerModel = {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email,
        phone_number: this.phone_number
      };

      this.axios
        .post(API_URL + '/admin/createUser', registerModel)
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