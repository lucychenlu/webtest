<template>
  <div>


    <!-- <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title">
          <i class=""></i>流程人员管理</template>


      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class=""></i>流程设备管理</template>


      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class=""></i>批次管理</template>


      </el-submenu>
    </el-menu> -->
    <el-menu router :default-active="activeIndex" @select="handleSelect">
      <el-menu-item :index="active_list[0]">流程人员管理</el-menu-item>
      <el-menu-item :index="active_list[1]">流程设备管理</el-menu-item>
      <el-menu-item :index="active_list[2]">批次管理</el-menu-item>
      <el-menu-item :index="active_list[3]">炮制填写页</el-menu-item>
    </el-menu>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '/home/people',
        active_list: [
          "/home/people",
          "/home/equipment",
          "/home/batch",
          "/home/write",
        ],
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (this.active_list.indexOf(key) >= 0) {
          this.activeIndex = key;
        }
        console.log('activeindex', this.activeIndex)
      },
    },
  }

</script>
