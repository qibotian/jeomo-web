<template>
  <div class="app-container">
    <FormCreate :rule="rule" v-model="model" :option="options"/>
  </div>
</template>

<script>
  import FormCreate from '@form-create/element-ui'
  export default {
    data(){
      return {
        model:{},
        options:{
          submitBtn: {
            innerText: "查询"
          },
          onSubmit:(formData)=>{
            console.log(JSON.stringify(formData));
          },
          resetBtn:true
        },
        rule:[
          {
            type:'input',
            field:'memberName',
            title:'名称',
            validate:[
              { required: true, message: "会员名称不能为空"},
            ]
          },
          {
            type:'input',
            field:'mobileNumber',
            title:'手机号',
            validate:[
              { required: true, message: "会员手机号不能为空"},
            ]
          },
          {
            type:'DatePicker',
            field:'birth',
            title:'出生日期',
            props:{
              type:"date"
            }
          },
          {
            type:'radio',
            field:'sex',
            title:'性别',
            options:[
              {value:"0",label:"男"},
              {value:"1",label:"女"},
            ],
          },
          {
            type:'input',
            field:'idNo',
            title:'身份证号'
          },

          {
            type:'input',
            field:'email',
            title:'邮箱',
            validate:[
              { type: "email", message:"邮箱格式不正确"}
            ]
          },
          {
            type:'input',
            field:'address',
            title:'现居地址'
          },
          {
            type:'input',
            field:'carNo',
            title:'车牌号'
          }
        ]
      }
    }
  }
</script>
