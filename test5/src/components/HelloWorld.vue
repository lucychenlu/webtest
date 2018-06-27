<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-row>
          <div class="cfa-logo"></div>
          <div style="height:80px;">
            <div style="float:left">
              <div class=""></div>
              <span class="cfa-name">XX药业生产信息溯源系统--炮制</span>
            </div>
            <div style="float:right">
              <!-- <img class="" :src="info.user_face" /> -->
              <span class="">欢迎，黄总</span>
              <a href="/" class="">退出</a>
            </div>
          </div>

        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '3']">
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
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="height:40px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>流程人员管理</el-breadcrumb-item>
          </el-breadcrumb>
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
              <el-button type="text" @click="dialogFormVisible = true" style="float:right">新增人员</el-button>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" style="text-align:left">
                </el-table-column>
                <el-table-column prop="memberno" label="工号">
                </el-table-column>
                <el-table-column prop="avatar" label="头像">
                </el-table-column>
                <el-table-column prop="work" label="参与工序">
                </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button @click="onDelete(scope.row.id)" type="text" size="small">
                      移除
                    </el-button>
                    <!-- <el-button @click="onEdit(scope.row)" type="text" size="small"> -->
                    <el-button @click="dialogFormVisible = true" type="text" size="small">

                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
    <!-- Form -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">新增人员</el-button> -->

    <el-dialog title="新增人员" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="新建批指令"></el-checkbox>
        <el-checkbox label="粗碎"></el-checkbox>
        <el-checkbox label="洗润"></el-checkbox>
        <el-checkbox label="切制"></el-checkbox>
        <el-checkbox label="选中且禁用"></el-checkbox>
        <el-checkbox label="包装"></el-checkbox>
      </el-checkbox-group>
      <!-- <el-button type="primary" @click=addMember()>点击继续新增人员</el-button> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    methods: {
      // open3() {
      //   this.$prompt('请输入邮箱', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      //     inputErrorMessage: '邮箱格式不正确'
      //   }).then(({
      //     value
      //   }) => {
      //     this.$message({
      //       type: 'success',
      //       message: '你的邮箱是: ' + value
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消输入'
      //     });
      //   });
      // }
      //编辑
      onEdit(item) {
        this.fromData = item;
        this.editable = true;
      },
      onDelete(id) {
        let self = this;
        this.$confirm('确定删除这个人员信息?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delData(self, id);
        }).catch(() => {

        });


      }
    },
    mounted() {
      loadData(this);
    },
    name: 'HelloWorld',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          no: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          name: '张三',
          memberno: '123141',
          avatar: "",
          work: '洗润，切制'
        }, {
          name: '李四',
          memberno: '54252',
          avatar: "",
          work: '洗润，切制'
        }, {
          name: '王二',
          memberno: '25235',
          avatar: "",
          work: '洗润，切制，干燥，包装，粗碎，把俱乐部建设领导看见了施工监理'
        }, {
          name: '麻子',
          memberno: '284359275',
          avatar: "",
          work: '洗润，切制'
        }]
      }
    }
  }

  function loadData(self) {
    self.loading = true;
    self.$api.post("CLUB_LOAD_PLAYER", {
      club_id: self.club_id,
      batch_id: self.batch_id
    }, self.$router, function (code, message, info) {

      if (code != 200) {
        return;
      }

      self.list = info;
      loadTeamData(self);
    });
  }

  function loadTeamData(self) {
    self.$api.post("TEAM_LIST", {}, self.$router, function (code, message, info) {
      self.loading = false;

      if (code != 200) {
        return;
      }

      self.player_list = [];
      for (let i = 0; i < info.list.length; i++) {
        let obj = info.list[i];
        for (let j = 0; j < obj.players.length; j++) {
          let uid = obj.players[j].uid;
          obj.players[j].selected = false;
          let is = false;
          for (let ii = 0; ii < self.player_list.length; ii++) {
            let _uid = self.player_list[ii].uid;
            if (_uid == uid) {
              is = true;
              break;
            }
          }
          if (is == false) self.player_list.push(obj.players[j]);
        }
      }
    });
  }

  function delData(self, id) {
    self.loading = true;
    self.$api.post("CLUB_DEL_PLAYER", {
      club_id: self.club_id,
      batch_id: self.batch_id,
      id: id
    }, self.$router, function (code, message, info) {
      self.loading = false;

      if (code != 200) {
        return;
      }
      loadData(self)
      self.$emit('loadMenusData')
    });
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

  .cfa-logo {
    float: left;
    background: url(../assets/logo.png) no-repeat;
    background-size: 60px 60px;
    width: 60px;
    height: 60px;
  }

  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    text-align: left;
  }

</style>
