<template>
  <div class="sql-editor-container">
    <div class="d-flex justify-space-around mb-2">
      <div>
        <label>Tables: </label>
        <v-chip v-for="(table, key) in tables" :key="key" class="mr-2" @click="addTableToEditor(table)">
          {{ table }}
        </v-chip>
      </div>
      <div>
        <v-btn
          color="success"
          depressed
          @click="runClickHandler"
        >
          <v-icon left>
            mdi-play
          </v-icon>
          Run
        </v-btn>
        <v-btn
          color="error"
          depressed
          :disabled="disableClear"
          @click="cleanHandler"
        >
          <v-icon left>
            mdi-delete
          </v-icon>
          Clear
        </v-btn>
      </div>
    </div>
    <client-only placeholder="Loading...">
      <prism-editor v-model="code" class="my-editor" :highlight="highlighter" line-numbers />
    </client-only>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ dialogTitle }}
        </v-card-title>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <v-card-text v-html="dialogMessage" />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import 'prismjs'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-tomorrow.css'
import tables from '~/assets/utils/tables'

export default {
  name: 'SqlEditor',
  components: {
    PrismEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    tables,
    disableClear: true,
    dialog: false,
    dialogMessage: '',
    dialogTitle: ''
  }),
  computed: {
    code: {
      set (val) {
        this.$emit('input', val)
      },
      get () {
        return this.value
      }
    }
  },
  methods: {
    highlighter (code) {
      return highlight(code, languages.sql)
    },
    addTableToEditor (tableName) {
      this.code = this.code + tableName
    },
    runClickHandler (event) {
      const regex = /^(select|SELECT) \* (from|FROM) \w*$/i
      if (regex.test(this.code)) {
        const splitData = this.code.trim().toLowerCase().split('select * from ')
        if (splitData.length > 1) {
          const tableName = splitData[1]
          if (this.tables.includes(tableName)) {
            this.$emit('play-clicked', { event, tableName })
            this.disableClear = false
          } else {
            this.dialogMessage = 'The query does not include a valid table name, please select or write one'
            this.dialogTitle = 'Query Validator'
            this.dialog = true
          }
        } else {
          this.dialogMessage = 'You must write a table name'
          this.dialogTitle = 'Query Validator'
          this.dialog = true
        }
      } else {
        this.dialogMessage = 'The query must be of the form <span class="font-italic">SELECT * FROM tableName</span>'
        this.dialogTitle = 'Query Validator'
        this.dialog = true
      }
    },
    cleanHandler (event) {
      this.disableClear = true
      this.code = ''
      this.$emit('clear-clicked', event)
    }
  }
}
</script>

<style scoped>
  .my-editor {
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    height: 250px;
  }
</style>
