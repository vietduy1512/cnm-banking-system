<template>
<b-navbar toggleable="md" type="dark" variant="dark" class="mb-3">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">DBank</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav v-if="!isAuthenticated" class="ml-auto">
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item to="/login">Login</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item v-if="!isAdmin" to="/dashboard">Dashboard</b-nav-item>
      <b-nav-item v-if="isAdmin" to="/admin/dashboard">Dashboard</b-nav-item>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item to="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      isAuthenticated: window.$cookies.get("isAuthenticated") === 'true',
      isAdmin: window.$cookies.get("isAuthenticated") === 'true',
    }
  },
  mounted() {
    this.$bus.$on('login', () => {
      this.isAuthenticated = window.$cookies.get("isAuthenticated") === 'true'
      window.$cookies.remove("isAdmin");
      this.isAdmin = false
    })
    this.$bus.$on('adminLogin', () => {
      this.isAdmin = window.$cookies.get("isAdmin") === 'true'
      this.isAuthenticated = window.$cookies.get("isAuthenticated") === 'true'
    })
    this.$bus.$on('logout', () => {
      this.isAuthenticated = window.$cookies.get("isAuthenticated") === 'true'
      this.isAdmin = window.$cookies.get("isAdmin") === 'true'
    })
  },
  methods: {
    logout: function () {
      window.$cookies.remove("d-access-token");
      window.$cookies.remove("d-refresh-token");
      window.$cookies.remove("d-user-id");
      window.$cookies.remove("isAuthenticated");
      window.$cookies.remove("isAdmin");
      this.$bus.$emit('logout', 'User logout');
      this.$router.push('/');
    }
  }
}
</script>

<style lang="css" scoped>
</style>