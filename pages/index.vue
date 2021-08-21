<template>
  <div>
    <h1>Welcome</h1>
    <p>This is a basic query builder</p>
    <sql-editor v-model="sqlQuery" @play-clicked="queryHandler" @clear-clicked="clearHandler" />
    <v-card-title>
      {{ resultTitle }}
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :disabled="items.length==0"
      />
    </v-card-title>
    <data-table :items="items" :headers="headers" :loading="loadingData" :search="search" />
    <v-dialog
      v-model="errorDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Error
        </v-card-title>
        <v-card-text>
          There was an error during fetching the data
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="errorDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import sqlEditor from '~/components/sql-editor.vue'
import executeQuery from '~/assets/database/supabase-client'
import DataTable from '~/components/data-table.vue'

export default {
  name: 'Index',
  components: { sqlEditor, DataTable },
  data: () => ({
    sqlQuery: '',
    loadingData: false,
    items: [],
    headers: [],
    resultTitle: 'Results',
    search: '',
    errorDialog: false
  }),
  methods: {
    queryHandler ({ tableName }) {
      this.loadingData = true
      executeQuery(tableName).then(({ data, headers }) => {
        this.items = data
        this.headers = headers
        this.loadingData = false
        this.resultTitle = `Results for table ${tableName}`
      }).catch(() => {
        this.loadingData = false
        this.errorDialog = true
      })
    },
    clearHandler () {
      this.headers = []
      this.items = []
      this.resultTitle = 'Results'
    }
  }
}
</script>

<style>

</style>
