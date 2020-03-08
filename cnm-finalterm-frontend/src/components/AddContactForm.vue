<template>
  <div>
    <div class="card">
      <h5 class="card-header">
        Add new contact
      </h5>
      <div class="card-body">
        <form ref="transfer_form" @submit.prevent="processForm()">
          <div class="form-group">
            <label for="recipient_account_number">Account Number</label>
            <input type="text" class="form-control" id="recipient_account_number" name="recipient_account_number" v-model="recipient_account_number"
                v-on:focusout="findRecipient(recipient_account_number)">
          </div>
          <div class="form-group">
            <label for="recipient_name">Name</label>
            <input type="text" class="form-control" id="recipient_name" name="recipient_name" v-model="recipient_name">
          </div>
          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../config/app'

export default {
  name: 'TransferForm',
  data () {
    return {
        recipient_account: '',
        recipient_account_number: '',
        recipient_name: ''
    }
  },
  methods: {
      findRecipient: function(recipient_accnum) {
      if (recipient_accnum == '') {
        return;
      }

      var requestUrl = API_URL + '/account/' + recipient_accnum;
      this.axios
        .get(requestUrl)
        .then(res => {
          this.recipient_account = res.data.account;
          console.log(res);
        }).catch(err => {
          this.recipient_account_number = '';
          alert(err.response.data.msg);
          console.log(err);
        });
    },
    processForm: function() {
      var formData = new FormData(this.$refs['transfer_form']);
      var data = {}; // convert to data
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val })
      }
      
      if (data.recipient_account_number == '') {
        alert("Account Number field is not filled yet")
        return;
      }
      if (data.recipient_name == '') {
        data.recipient_name = this.recipient_account.name;
      }
      this.axios
        .post(API_URL + '/addContact', data)
        .then(() => {
          alert("Add successfully");
        }).catch(err => {
          alert(err.response.data.msg);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>