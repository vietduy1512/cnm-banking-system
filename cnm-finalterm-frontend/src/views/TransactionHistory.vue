<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
        <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
        <TransactionsList/>
    </div>
</div>
</template>

<script>
import TransactionsList from '../components/TransactionsList.vue'

export default {
  name: 'TransactionHistory',
  components: {
    TransactionsList
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>