<template>
  <div>
    <sql-editor v-model="sqlQuery" />
  </div>
</template>

<script>
import sqlEditor from '~/components/sql-editor.vue'
export default {
  name: 'Index',
  components: { sqlEditor },
  data: () => ({
    sqlQuery: ''
  })
}
</script>

<style>

</style>
