<template>
  <el-container>
    <el-header>
      <rHeader></rHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <rMenu></rMenu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>

    <!-- <el-footer>
            <p>中国足球协会 版权所有 </p>
            <p>爱球迷（北京）网络科技有限公司 技术支持</p> 
            <p>京ICP备14055769号-1</p>
        </el-footer> -->
  </el-container>
</template>

<script>
  import "@/assets/css/index.css"
  import rHeader from "./header"
  import rMenu from "./menu"
  import $ from 'jquery'

  import * as Cookies from "js-cookie"

  export default {
    data() {
      return {

      };
    },
    created() {
      let query = this.$route.query;
      if (query) {
        let token = query.token;
        if (token) {
          Cookies.set('token', token);
        }
      }
    },
    components: {
      rHeader,
      rMenu,
    },
    methods: {

    }
  }

</script>
<style>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

</style>
