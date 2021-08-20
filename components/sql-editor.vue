<template>
  <div class="sql-editor-container">
    <div class="d-flex justify-space-around mb-2">
      <div>
        <label>Tables: </label>
        <v-chip v-for="(table, key) in tables" :key="key" class="mr-2" @click="addTableToEditor(table)">
          {{ table }}
        </v-chip>
      </div>
      <v-btn
        color="primary"
        depressed
        @click="$emit('play-clicked', $event)"
      >
        <v-icon left>
          mdi-play
        </v-icon>
        Run
      </v-btn>
    </div>
    <client-only placeholder="Loading...">
      <prism-editor v-model="code" class="my-editor" :highlight="highlighter" line-numbers />
    </client-only>
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
    tables
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
