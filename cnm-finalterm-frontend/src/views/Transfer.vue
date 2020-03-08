<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
      <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
      <TransferForm/>
    </div>
</div>
</template>

<script>
import TransferForm from '../components/TransferForm.vue'
export default {
  name: 'Transfer',
  components: {
    TransferForm
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>