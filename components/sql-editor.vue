<template>
  <div class="sql-editor-container">
    <client-only placeholder="Loading...">
      <prism-editor v-model="code" class="my-editor" :highlight="highlighter" line-numbers />
    </client-only>
  </div>
</template>

<script>
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { PrismEditor } from 'vue-prism-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-sql'

export default {
  name: 'SqlEditor',
  components: {
    PrismEditor
  },
  data: () => ({
    code: ''
  }),
  methods: {
    highlighter (code) {
      return highlight(code, languages.sql)
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

  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
