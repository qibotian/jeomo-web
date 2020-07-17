<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <!-- 右上角操作按钮 -->
    <div style="text-align: right">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="createFromVisible = true">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
    </div>

    <!-- 列表页面 -->
    <el-table :data="tableData.data"
              style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <template v-for='(col) in config.columns'>
        <el-table-column :prop="col.name"  :label="col.title" :sortable="col.sortable" :formatter = 'col.formatter' :autoFit='true'> </el-table-column>
      </template>
      <!-- 操作行 -->
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-view" type="primary" plain @click="handleView(scope.$index, scope.row)"/>
          <el-button size="mini" icon="el-icon-edit-outline"type="warning" plain @click="handleEdit(scope.$index, scope.row)"/>
          <el-button size="mini" icon="el-icon-delete" type="danger" plain @click="handleDelete(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页界面 -->
    <div style="text-align: center">
      <pagination :total="tableData.totalNum" @pagination="handlePagination" ></pagination>
    </div>

    <!-- 新增页面 -->
    <el-dialog title="会员信息" :visible.sync="createFromVisible" @opened="initForm">
      <div id = "form-create"></div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '../Pagination/index'
  export default {
    name: 'jeomoTable',
    components: { Pagination },
    data(){
      return {

        editModel:false, //进入编辑模式
        fromInit:false,
        formModel:{},
        editRow: {},
        editIndex:{},
        currentPage:1,
        PageSize:30,
        createFromVisible:false
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: ()=> {return {
          columns:[], //查询列total
          queryForm:{
            fApi:{}, //查找表单
            rule:[], //查找表单字段
            option:{} //朝朝表单选项
          }
        }}
      },
      //新增表单
      createForm: {
        type: Object,
        default: () => {return {
          rule:[], //查找表单字段
          options:{} //表单选项
        }}
      },
      tableData:{
        type: Object,
        default: ()=>{return {
          totalNum:0, //查找表单字段
          data:[] //表单选项
        }}
      }
    },
    methods: {
      indexMethod(index) {
        return index;
      },

      handlePagination(val) {
        this.$emit('handlePagination', val)
      },
      initForm() {
        let _this = this;
        const root = document.getElementById('form-create');
        if(!_this.fromInit) {
          _this.formModel = window.formCreate.create(_this.createForm.rule,{
            el:root,
            resetBtn:false,
            onSubmit:function (formData) {
              _this.handleSave();
            }
          });
        }
        if(_this.editIndex != -1) {
          _this.formModel.setValue(_this.editRow)
          _this.editRow = {};
          _this.editIndex = -1;
        }
        _this.fromInit = true;
      },

      handleEdit(index, row) {
        this.createFromVisible = true
        this.editRow = row;
        this.editIndex = index;
        this.editModel = true;
      },

      handleSave() {
        console.log(this.formModel);
      },

      handleView(index, row) {
        this.createFromVisible = true
        this.editRow = row;
        this.editIndex = index;
        this.editModel = false
      },

      handleDelete(index, row) {
        this.$confirm('将要删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('handleDelete', index, row)
        }).catch(() => {
        });
      }
    }
  }
</script>


