<template>
  <el-dialog
    :visible.sync="info"
    width="90%"
    center
    v-if="info.name"
    :title="info.name"
  >
    <el-form
      label-position="left"
      label-width="200px"
      :model="info"
      size="small"
    >
      <el-form-item label="名称">
        <el-input
          v-model="info.receive_accouche"
          :disabled="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="info.receive_check" :disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="中孕期三维排畸彩超（大排畸）">
        <el-input
          v-model="info.receive_clour_ultrasound"
          :disabled="readonly"
          :maxlength="5"
          width="20"
        ></el-input>
      </el-form-item>
    </el-form>
    <div>
      <div v-if="readonly">
        <el-button @click="goToList">返回</el-button>
        <el-button @click="goEdit">编辑</el-button>
      </div>
      <div v-else>
        <el-button @click="goCancel">取消</el-button>
        <el-button @click="goSave">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["current"],
  data() {
    //   console.log('ddd',this)
    return {
      info: "",
      readonly: true
    };
  },
  methods: {
    goToList() {
      this.$emit("back");
    },
    goEdit() {
      this.readonly = false;
    },
    goCancel() {
      Object.assign(this.info, this.current);
      this.readonly = true;
    },
    goSave() {
      
    }
  },
  watch: {
    current(v) {
      this.info = Object.assign({}, v);
    }
  }
};
</script>
<style lang="scss"></style>
