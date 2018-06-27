<template>
  <div >
 
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

</style>
