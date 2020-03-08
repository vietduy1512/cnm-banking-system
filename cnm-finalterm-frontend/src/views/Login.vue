<template>
  <div class="row">
    <div class="offset-md-4 col-md-4">
      <h2 class="text-center mb-4 mt-4">Login</h2>
      <div class="card">
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
            <div class="form-group d-flex justify-content-center">
              <!-- TODO: Add My Key: 6LdReYEUAAAAAEC3gta8OoCVpxDZ5YTOjDq4caV4 -->
              <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
            </div>
            <div class="form-group d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  mounted () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?')
    document.head.appendChild(recaptchaScript)
  },
  methods: {
    processForm: function(event) {
      var loginModel = {
        username: this.username,
        password: this.password,
        recaptcha: event.target.elements['g-recaptcha-response'].value
      };

      this.axios
        .post(API_URL + '/login', loginModel)
        .then(res => {
          if (res.data.result === true) {
            window.$cookies.set("isAuthenticated", true);
            this.$bus.$emit('login', 'User login');
            this.$router.push('/dashboard');
          } else {
            alert(res.data.error);
          }
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>