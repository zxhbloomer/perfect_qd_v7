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
    // 覆盖el-clumns中的方法
    realMinWidth () {
      if (this.autoFit) {
        return parseMinWidth(max([this.minWidth, this.autoWidth]))
      }
      return TableColumn.computed.realMinWidth.call(this)
    }
    // // table数据
    // values () {
    //   const data = this.$parent.data
    //   return data
    // }
  },
  // watch: {
  //   values: {
  //     handler (newVal, oldVal) {
  //       this.updateAutoWidth()
  //     }
  //   }
  // },
  methods: {
    updateAutoWidth () {
      if (!this.autoFit) {
        return
      }
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
        // 如果自适应行间距变小，则忽略
        if (this.autoWidth >= autoMinWidth) {
          return
        } else {
          this.autoWidth = autoMinWidth
        }
      }
    }
  },
  mounted () {
    // this.$nextTick(this.updateAutoWidth)
  }
}
