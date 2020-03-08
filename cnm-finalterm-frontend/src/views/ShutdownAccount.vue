<template>
<div class="row">
    <div class="offset-md-3 col-md-6">
        <button @click="$router.go(-1)" class="btn btn-dark mr-2 mb-3">Back</button>
        <ShutdownAccountsList/>
    </div>
</div>
</template>

<script>
import ShutdownAccountsList from '../components/ShutdownAccountsList.vue'

export default {
  name: 'ShutdownAccount',
  components: {
    ShutdownAccountsList
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>