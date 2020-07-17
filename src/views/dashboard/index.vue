<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard"
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
   created() {
    // if ( !this.roles.includes('admin') ) {
    //    this.currentRole = 'editorDashboard'
    // }
   }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
