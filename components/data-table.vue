<template>
  <div class="data-table-container">
    <v-data-table
      :headers="getHeaderTransformed"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
      show-group-by
      :loading="loading"
      :search="search"
    />
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ''
    }
  },
  computed: {
    getHeaderTransformed () {
      return this.headers.map(r => ({ text: this._.capitalize(r), value: r }))
    }
  }
}
</script>

<style>

</style>
