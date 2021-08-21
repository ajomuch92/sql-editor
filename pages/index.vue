<template>
  <div>
    <h1>Welcome</h1>
    <p>This is a basic query builder</p>
    <sql-editor v-model="sqlQuery" @play-clicked="queryHandler" />
  </div>
</template>

<script>
import sqlEditor from '~/components/sql-editor.vue'
import executeQuery from '~/assets/database/supabase-client'

export default {
  name: 'Index',
  components: { sqlEditor },
  data: () => ({
    sqlQuery: ''
  }),
  methods: {
    queryHandler ({ tableName }) {
      executeQuery(tableName).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
