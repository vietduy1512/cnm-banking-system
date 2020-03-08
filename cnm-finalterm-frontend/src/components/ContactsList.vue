<template>
  <div>
    <div class="card">
      <h5 class="card-header">
        Contacts List
      </h5>
      <ul class="list-group list-group-flush">
        <!-- add :to="/url" -->
        <router-link
          v-for="contact in contacts"
          :key="contact.id"
          to="#"
          class="list-group-item list-group-item-action"
          v-on:click.native="categoryClicked(contact.id)">
          <div><strong>Number:</strong> {{contact.recipient_account_number}}</div>
          <div><strong>Name:</strong> {{contact.recipient_name}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'ContactList',
  components: {
    
  },
  data () {
    return {
      contacts: []
    }
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    fetchContacts: function() {
      var requestUrl = API_URL + '/contacts';
      this.axios
        .get(requestUrl)
        .then(res => {
          this.contacts = res.data.contacts;
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>