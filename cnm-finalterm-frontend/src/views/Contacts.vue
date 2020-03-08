<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
      <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
      <ContactsList class="mb-4"/>
      <AddContactForm/>
    </div>
</div>
 
</template>

<script>
import ContactsList from '../components/ContactsList.vue'
import AddContactForm from '../components/AddContactForm.vue'

export default {
  name: 'Contacts',
  components: {
    ContactsList, AddContactForm
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>