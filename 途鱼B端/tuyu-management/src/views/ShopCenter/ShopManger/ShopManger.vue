<template>
  <div class="shop_manger">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt10 shop_manger_main">
      <el-button type="primary" icon="el-icon-plus" @click="addClassify">新 增</el-button>
      <el-table
        class="mt10"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column align="center" label="分类名称" prop="title"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="warning">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增分组" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="分类名称" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑分组" :visible.sync="editVisible" width="30%" :before-close="editHandleClose">
      <div>
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
          <el-form-item label="分类名称" prop="titles">
            <el-input v-model="editForm.titles" placeholder="请输入分类名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHandleClose">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { shopList, deleteList, addClass, editCLass } from "@/api/shop/shop.js";
export default {
  data() {
    return {
      editVisible: false,
      loading: false,
      tableData: [],
      dialogVisible: false,
      titleText: "",
      ruleForm: {
        title: ""
      },
      editForm: {
        titles: ""
      },
      rows: {},
      rules: {
        title: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        titles: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    submitAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            title: this.ruleForm.title,
            token: sessionStorage.getItem('token')
          };
          addClass(params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$refs.ruleForm.resetFields();
              this.getList();
              this.$nextTick(() => {
                this.dialogVisible = false;
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false;
      });
    },
    getList() {
      this.loading = true;
      let params = {
        token: sessionStorage.getItem('token')
      }
      shopList(params).then(res => {
        console.log(res);
        this.tableData = [...res];
        this.loading = false;
      });
    },
    addClassify(row) {
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    },
    editHandleClose() {
      this.$refs.editForm.resetFields();
      this.$nextTick(() => {
        this.editVisible = false;
      });
    },
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let params = {
            title: this.editForm.titles,
            id: this.rows.id,
            token: sessionStorage.getItem('token')
          };
          editCLass(params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$refs.editForm.resetFields();
              this.getList();
              this.$nextTick(() => {
                this.editVisible = false;
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(row) {
      console.log("编辑", row);
      this.rows = row;
      this.editForm.titles = row.title;
      this.$nextTick(() => {
        this.editVisible = true;
      });
    },
    handleDelete(row) {
      this.$confirm(
        "删除分类前请确认该分类下没有商品，是否删除该分类?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      )
        .then(() => {
          let params = {
            id: row.id,
            token: sessionStorage.getItem('token')
          };
          deleteList(params).then(res => {
            console.log(res);
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
            }
          });
        })
        .catch(() => {});
    }
  },
  components: { Breadcrumb }
};
</script>

<style lang="less">
.shop_manger {
  width: 100%;
  height: 100%;
  .shop_manger_main {
    border-top: 5px solid #f68b0e;
  }
}
</style>