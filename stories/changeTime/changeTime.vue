<template>
  <el-dialog :title="title"
             :visible.sync="show"
             width="400px"
             class="change-time-dialog"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <el-form :model="form"
             ref="form"
             style="margin-bottom:30px">
      <el-form-item style="margin-bottom:0px !important">
        <el-date-picker type="date"
                        size="medium"
                        value-format="yyyy-MM-dd"
                        :placeholder="`请选择${title}`"
                        v-model="form.time"
                        style="width:94%"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button size="small"
                 @click="handleClose">取消</el-button>
      <el-button size="small"
                 type="primary"
                 @click="handleConfirm('form')"
                 :disabled="disable">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      form: {
        time: ''
      },
      disable: false
    };
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      default: ''
    },
    typeTime: {
      type: String,
      default: 'start'
    },
    title: {
      type: String,
      default: ''
    },
    referTime: { // 参考时间
      type: [Date, String],
      default: ''
    }
  },

  mounted () {
    this.show = this.visible;
    this.form.time = this.time;
  },

  methods: {
    handleClose () {
      this.$refs.form.resetFields();
      this.show = false;
      this.$emit('update:visible', false);
      this.$emit('update:time', '');
    },

    handleConfirm () {
      if (this.typeTime === 'start') {
        if (new Date(this.form.time).getTime() > new Date(this.referTime).getTime()) {
          this.$message.warning('起租时间必须小于等于退租时间');
          return;
        }
      }
      if (this.typeTime === 'end') {
        if (new Date(this.form.time).getTime() < new Date(this.referTime).getTime()) {
          this.$message.warning('退租时间必须大于等于起租时间');
          return;
        }
      }
      this.$emit('changeTime', this.typeTime, this.form.time, this.clearData);
    },

    clearData () {
      this.show = false;
      this.disable = false;
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
div.el-form-item__error {
  top: 80% !important;
}
.change-time-dialog ::v-deep .el-dialog__body {
  padding-bottom: 0px !important;
}
</style>
