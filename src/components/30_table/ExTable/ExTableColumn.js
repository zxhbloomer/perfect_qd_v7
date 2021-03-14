import { TableColumn } from 'element-ui'
import { max, map, isEmpty } from './util'
import {
  parseMinWidth
} from 'element-ui/packages/table/src/util.js'

export default {
  name: 'ElTableColumn',
  extends: TableColumn,
  props: {
    fitByClass: {
      type: String,
      default: 'cell'
    },
    autoFit: {
      type: Boolean,
      default: false
    },
    fitGap: {
      type: Number,
      default: 0
    },
    fitHeader: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      autoWidth: 0
    }
  },
  computed: {
    realMinWidth () {
      if (this.autoFit) {
        return parseMinWidth(max([this.minWidth, this.autoWidth]))
      }
      return TableColumn.computed.realMinWidth.call(this)
    }
  },
  methods: {
    updateAutoWidth () {
      if (!this.autoFit) return
      debugger
      const cellWrapperClass = this.fitHeader ? `.${this.columnId}` : `td.${this.columnId}`

      let cells = window.document.querySelectorAll(`${cellWrapperClass} .${this.fitByClass}`)
      if (isEmpty(cells)) {
        cells = window.document.querySelectorAll(`${cellWrapperClass} .cell`)
      }
      if (isEmpty(cells)) {
        return
      }

      const autoMinWidth = max(map(cells, item => item.getBoundingClientRect().width)) + this.fitGap + 1

      if (this.autoWidth !== autoMinWidth) {
        this.autoWidth = autoMinWidth
      }
    }
  },
  updated () {
    debugger
    this.updateAutoWidth()
  },
  mounted () {
    this.$nextTick(this.updateAutoWidth)
  }
}
