<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <el-row :gutter="20">
      <el-col :span="3">
        <!-- 下拉选择图表类别 -->
        <el-select v-model="value" placeholder="报表类型">
          <el-option key = "day" label="日报" value = "day"/>
          <el-option key = "month" label="月报" value = "month"/>
          <el-option key = "year" label="年报" value = "year"/>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="18">
        <!-- 下拉选择图表类别 -->
        <el-select v-model="value" placeholder="显示类型">
          <el-option key = "line" label="图表" value = "grid"/>
          <el-option key = "line" label="折线" value = "line"/>
          <el-option key = "zhuzhuang" label="柱状图" value = "zhuzhuang"/>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <LineChart :chart-data="lineChartData"/>
    </el-row>
    <el-row>
      <BarChart :chart-data="lineChartData"/>
    </el-row>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="visitor" label="客流量" />
        <el-table-column prop="register" label="注册量" />
      </el-table>
    </el-row>


  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import BarChart from './components/BarChart'

  const DATA = [{
    date: '2020-04-02',
    visitor: '2310',
    register: '610',
  }, {
    date: '2020-04-03',
    visitor: '2310',
    register: '610',
  }, {
    date: '2020-04-04',
    visitor: '2310',
    register: '610',
  }, {
    date: '2020-04-05',
    visitor: '2310',
    register: '610',
  }, {
    date: '2020-04-06',
    visitor: '2310',
    register: '610',
  }];

  export default {
    name: '会员注册报表',
    data() {
     return {
       lineChartData : this.parseDataToXy(),
       tableData : DATA
     }
    } ,
    components: {
      BarChart,
      PanelGroup,
      LineChart
    },
    methods : {
      parseDataToXy() {
        let date = this.getData('date');
        let visitor = this.getData('visitor');
        let register = this.getData('register');
        let rtn = {
          date: date,
          visitor: visitor,
          register: register
        }
        return rtn;
      },

      getData(key){
        let x = [];
        DATA.forEach((item, index) => {
          x.push(item[key])
        })
        return x
      }
    }
  }



</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
