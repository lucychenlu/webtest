<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height:40px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>流程人员管理</el-breadcrumb-item>
    </el-breadcrumb>


    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in labelinfo" :label="item.name">
        <el-button type="text" @click="dialogFormVisible = true" style="float:right">新增人员</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180" style="text-align:left">
          </el-table-column>
          <el-table-column prop="id" label="工号">
          </el-table-column>
          <el-table-column prop="logo" label="头像">
          </el-table-column>
          <el-table-column prop="address" label="参与工序">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <!-- <el-button @click="onDelete(scope.row.id)" type="text" size="small"> -->
              <!-- <el-button @click="onDelete(index)" type="text" size="small"> -->
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">

                移除
              </el-button>
              <!-- <el-button @click="onEdit(scope.row)" type="text" size="small"> -->
              <el-button @click="dialogFormVisible = true" type="text" size="small">

                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="item.flag==2">哈哈哈哈哈哈哈</div>
      </el-tab-pane>
      <!-- <el-pagination background layout="prev, pager, next" :total="27" :page-size=10 
        @current-change="handleCurrentChange">
      </el-pagination> -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10"
        layout="prev, pager, next, jumper" :total="27">
      </el-pagination>
    </el-tabs>
    <!-- <el-button @click="setNewsApi2">点燃测试</el-button> -->
        <h1 v-for="(item, key) in newsListShow">{{item.title}}</h1>

    <el-dialog title="新增人员" :visible.sync="dialogFormVisible" width="400px" height="426px">
      <el-form :label-position="left" ref="form" :model="form" label-width="80px" class="el-form-item__labelx">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号:" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与工序:">
          <el-checkbox-group v-model="form.type">
            <el-row>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="新建批指令" name="type"></el-checkbox>
              </el-col>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="粗碎" name="type"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="洗润" name="type"></el-checkbox>
              </el-col>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="切制" name="type"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="干燥" name="type"></el-checkbox>
              </el-col>
              <el-col :span="12" class="input_people_manager">
                <el-checkbox label="包装" name="type"></el-checkbox>
              </el-col>
            </el-row>
            <!-- <el-checkbox label="新建批指令" name="type"></el-checkbox>
            <el-checkbox label="粗碎" name="type"></el-checkbox>
            <el-checkbox label="洗润" name="type"></el-checkbox>
            <el-checkbox label="切制" name="type"></el-checkbox>
            <el-checkbox label="干燥" name="type"></el-checkbox>
            <el-checkbox label="包装" name="type"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <!-- <el-button type="primary" @click=addMember()>点击继续新增人员</el-button> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false" @click="onAdd">保 存</el-button> -->
        <el-button type="primary" @click="onAdd">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>

import api from '../../axios/api.js'
// import Http from "common/Http";
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
      //增加
      onAdd() {
        this.dialogFormVisible = false,
          this.tableData.push({
            name: 'ffff',
            memberno: 'fffffff@163.com',
            avatar: '',
            work: '河南省'
          });
      },
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
          // delData(self, id);
          console.log("id:" + id);
          this.tableData.splice(id, 1);
        }).catch(() => {

        });


      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
          setNewsApi2: function() {
      api.JH_news('/news/index', 'type=top&key=123456')
      .then(res => {
        console.log(res);
        this.newsListShow = res.articles;
      });
    },
  
    },
    created() {
      // this.setNewsApi();
    },
    // setNewsApi: function () {
    //   api.JH_news('/news/index', 'type=top&key=123456')
    //     .then(res => {
    //       console.log(res);
    //       this.newsListShow = res.articles;
    //     });
    // },
    mounted() {
      // loadData(this);
      setNewsApi();
    },
    name: 'HelloWorld',
    data() {
      return {
        currentPage3: 6,
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
            id: 1,
            name: '1张三',
            memberno: '123141',
            avatar: "",
            work: '洗润，切制'
          }, {
            id: 2,
            name: '2张三',
            memberno: '123141',
            avatar: "",
            work: '洗润，切制'
          },
          {
            id: 3,
            name: '3张三',
            memberno: '123141',
            avatar: "",
            work: '洗润，切制'
          }, {
            id: 4,
            name: '4麻子',
            memberno: '284359275',
            avatar: "",
            work: '洗润，切制'
          }, {
            id: 5,
            name: '5麻子',
            memberno: '284359275',
            avatar: "",
            work: '洗润，切制'
          },
          {
            id: 6,
            name: '6麻子',
            memberno: '284359275',
            avatar: "",
            work: '洗润，切制'
          }
        ],
        // tableData: [],
        labelinfo: [{
            flag: 1,
            name: '新建指令'
          },
          {
            flag: 1,
            name: '粗碎'
          },
          {
            flag: 1,
            name: '洗润'
          },
          {
            flag: 2,
            name: '切制'
          },
          {
            flag: 2,
            name: '干燥'
          },
          {
            flag: 2,
            name: '包装'
          }
        ],
        newsListShow: []
      }
    }
  }

  function    setNewsApi() {
      api.JH_news('/news/index', 'type=top&key=123456')
        .then(res => {
          console.log("111"+res);
          self.newsListShow = res.articles;
          console.log("newsListShow:"+newsListShow.length);
        });
    }
      function    setTableApi() {
      api.JH_news('/news/index2', 'type=top&key=123456')
        .then(res => {
          console.log("222"+res);
          self.tableData = res.tableDatas;
          console.log("tableData:"+tableData.length);
        });
    }

  function loadData(self) {
    self.loading = true;
    self.$api.get("CLUB_LOAD_PLAYER", {
      // club_id: self.club_id,
      // batch_id: self.batch_id
    }, self.$router, function (code, message, info) {

      if (code != 1) {
        return;
      }

      self.tableData = info;
      // loadTeamData(self);
      console.log("tableData ：" + self.tableData.length);
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
  /* .el-header,
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
    line-height: 160px;
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
  } */

  .cfa-logo {
    float: left;
    background: url(../../assets/logo.png) no-repeat;
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

  .el-main {
    margin-top: 0px;
    background-color: #f0f2f5;
    color: #333;
    padding-left: 80px;
    padding-right: 80px;
  }

  .el-form-item__labelx .el-form-item__label {
    text-align: left;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* .el-col-12 {
    width: 50%;
    text-align: left;
} */

  .input_people_manager {
    text-align: left;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0px 5px;
    /* margin-left:5px;  */
  }

  .input_people_manager:hover {
    border-color: #c0c4cc;
  }

</style>
