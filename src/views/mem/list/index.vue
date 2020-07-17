<template>

  <div class = "app-container">
    <form-create v-model="queryForm.fApi" :rule="queryForm.rule" :option="queryForm.option"></form-create>
    <jeomo-table :config="config" :tableData="tableData" @handleEdit="handleEdit" :createForm="createForm" @handlePagination="handlePagination" :loading="loading"></jeomo-table>
  </div>
</template>

<script>
  import JeomoTable from '../../../components/jeomoTable/index'
  import { fetchList} from '@/api/mem/'
  export default {
    components: { JeomoTable },
    data() {
      let self = this;
      return {
        loading:false,
        queryForm:{
          form:{
            pageNumber: this.$store.state.table.DEFAULT_PAGE_NUM, // current pageno 当前页码
            pageSize: this.$store.state.table.DEFAULT_PAGE_SIZE, // pageSize 页面大小
            searchParams: {
              search_like_phone: null,
              search_like_name: null
            },
            sorts: {
              openTime: 'desc' // default sort by createTime 默认根据创建时间排序
            }
          },
          fApi:{},
          rule:[
            {type:'input', field:'search_eq_member_id', title:'会员ID:', col:{ span:4 }},
            {type:'input', field:'search_eq_card_no', title:'会员卡号:', col:{ span:4 }},
            {type:'input', field:'search_eq_phone', title:'会员手机号:', col:{ span:4 }},
            {type:'el-button', props:{type:'primary'}, on:{click: self.refreshList }, children:['查询']}
          ],
          option:{
            form:{inline:true,labelWidth:undefined},
            submitBtn: {show:false},
            resetBtn: {show:false}
          }
        },
        config:{
          columns:[
            {name:"memberId",title:"会员ID"},
            {name:"cardNo",title:"会员卡号"},
            {name:"level",title:"会员级别"},
            {name:"name",title:"会员名称"},
            {name:"phone",title:"会员手机号"},
            {name:"sex",title:"性别", formatter: this.sexFormat},
            {name:"birthday",title:"生日"},
            {name:"openTime",title:"注册时间", sortable: true},
            {name:"status",title:"当前状态", formatter: this.statusFormat}
          ]
        },
        tableData:{
          totalNum:0,
          data: [],
        },
        createForm: {
          model:{},
          options:{
            submitBtn: {innerText: "保存"}, onSubmit:(formData)=>{
              console.log(JSON.stringify(formData));
            }
          },
          rule:[
            {type:'input',field:'name',title:'名称',validate:[{ required: true, message: "会员名称不能为空"}]},
            {type:'input',field:'mobile', title:'手机号', validate:[{ required: true, message: "会员手机号不能为空"}] },
            {type:'DatePicker',field:'birth',title:'出生日期',props:{type:"date"}},
            {type:'radio',field:'sex',title:'性别',options:[{value:"0",label:"男"},{value:"1",label:"女"},],},
            {type:'input',field:'idNo',title:'身份证号'},
            {type:'input',field:'email',title:'邮箱', validate:[{ type: "email", message:"邮箱格式不正确"}]},
            {type:'input',field:'address',title:'现居地址'},
            {type:'input',field:'carNo',title:'车牌号'},
            {type:'hidden',field:'id',title:'会员Id', props:{readonly:true},props:{type:"hidden"}},
          ]
        }
      }
    },
    methods: {
      sexFormat(row, column, cellValue, index) {
          if(cellValue == '0') {
            return '男'
          } else if (cellValue == '1') {
            return '女'
          } else {
            return '未知'
          }
      },
      statusFormat(row, column, cellValue, index) {
        if(cellValue == '0') {
          return '正常'
        } else if (cellValue == '1') {
          return '冻结'
        } else {
          return '注销'
        }
      },
      handleEdit(index, row) {
        alert("编辑");
      },
      handleDelete(index, row) {
        alert("删除");
      },
      refreshList() {
        let _this = this
        _this.loading = true
        _this.queryForm.form.searchParams = _this.queryForm.fApi.form;
        fetchList(_this.queryForm.form).then(response => {
          _this.tableData.data = response.items
          _this.tableData.totalNum = response.total
          _this.loading = false
        })
      },
      handlePagination(val) {
        let _this = this
        _this.queryForm.form.pageNumber=val.page;
        _this.queryForm.form.pageSize=val.limit;
        _this.refreshList()
      }
    },
    created(){
      this.refreshList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    margin: 30px;
  }
</style>

