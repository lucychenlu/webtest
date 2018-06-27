<template>
  <div>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="height:40px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>流程人员管理</el-breadcrumb-item>
          </el-breadcrumb>
    <el-row :gutter="20">
      <!-- e v-for="item,index in menus"> -->
      <el-col :span="6" v-for="item,index in info">
        <el-button type="primary" style="margin:20px" @click="toManager(item.id)">{{item.name}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: [{
            id:1,
            name: '当归',
          }, {
            id:2,
            name: '薄荷',
          }, {
            id:3,
            name: '洋甘菊',
          }, {
            id:4,
            name: '桃仁',
          },
          {
            id:5,
            name: '蒲公英',
          }, {
            id:6,
            name: '黄芪',
          }, {
            id:7,
            name: '金银花',
          }, {
            id:8,
            name: '毒药',
          },{
            id:9,
            name: '益母草',
          },{
            id:10,
            name: '红花',
          },{
            id:11,
            name: '甘草',
          },{
            id:12,
            name: '川穹',
          },{
            id:13,
            name: '武当山',
          },{
            id:14,
            name: '金银花',
          },
        ]
      }
    },
    methods:{
            toManager(id) {
        // this.fromData = id;
        // this.editable = true;
        	this.$router.push({ path: '/home/people_manager', query: {id:id} });
      },
    }
  }

</script>
<style>
 

</style>
