<template>
  <div>
    <div class="card">
      <h5 class="card-header">
        Transfer Funds
      </h5>
      <div class="card-body">
        <form ref="transfer_form" @submit.prevent="processForm()">
          <div class="form-group">
            <label for="paymentAccountNumber">Payment Account Number</label>
            <select class="form-control" id="paymentAccountNumber" name="user_account_number">
              <option v-for="account in accounts" :key="account.id">{{account.account_number}}</option>
            </select>
          </div>
          <div v-show="!this.recipient_account" class="form-group">
            <label for="recipient">Recipient Account Number</label>
            <input type="text" class="form-control" id="recipient" name="recipient_account_number" v-model="recipient_account_number" 
                  placeholder="Example: 0909090909" v-on:focusout="findRecipient(recipient_account_number)">
          </div>
          <div v-show="!this.recipient_account" class="form-group">
            <select class="form-control" id="contact" v-model="recipient_account_number"
                    v-on:change="findRecipient(recipient_account_number)">
              <option selected disabled>Choose Contact</option>
              <option v-for="contact in contacts" :key="contact.id" :value="contact.recipient_account_number">
                {{contact.recipient_account_number}} ({{contact.recipient_name}})</option>
            </select>
          </div>
          <div v-show="this.recipient_account" class="card form-group">
            <h5 class="card-header">Recipient Info</h5>
            <table class="table table-bordered card-body m-0">
              <tbody>
                <tr>
                  <th scope="row" class="recipient-info">Name</th>
                  <td>{{ recipient_account.name}}</td>
                </tr>
                <tr>
                  <th scope="row">Account number</th>
                  <td>{{ recipient_account.account_number}}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{{ recipient_account.active ? "Activated" : "Unactivated" }}</td>
                </tr>
              </tbody>
              <button type="button" class="btn btn-info" @click="chooseOtherBtn()">Choose other</button>
            </table>
          </div>
          <div class="form-group">
            <label for="amount">Amount</label>
            <div class="input-group">
             <input type="number" class="form-control" id="amount" name="amount" placeholder="Example: 499$">
              <div class="input-group-append">
                <div class="input-group-text">$</div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="comment">Comment</label>
            <textarea class="form-control" id="comment" name="comment" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="feeType">Fee Type</label>
            <select class="form-control" id="feeType" name="fee_type">
              <option value='sender_pay'>Sender pay the fee</option>
              <option value='recipient_pay'>Recipient pay the fee</option>
            </select>
          </div>
          <button type="submit" class="btn btn-dark">Transfer</button>
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
      accounts: [],
      contacts: [],
      recipient_account: '',
      recipient_account_number: ''
    }
  },
  mounted() {
    this.fetchAccounts();
    this.fetchContacts();
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
    fetchContacts: function() {
      var requestUrl = API_URL + '/contacts';
      this.axios
        .get(requestUrl)
        .then(res => {
          this.contacts = res.data.contacts;
        }).catch(err => {
          console.log(err);
        });
    },
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
    chooseOtherBtn: function() {
      this.recipient_account = '';
      this.recipient_account_number = '';
    },
    processForm: function() {
      var formData = new FormData(this.$refs['transfer_form']);
      var data = {}; // convert to data
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val })
      }
      this.axios
        .post(API_URL + '/transaction', data)
        .then(res => {
          //this.$router.push('/confirmation?transaction_id=' + res.data.transaction_id);
          alert(res.data.msg);
          this.$router.push('/dashboard');
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>