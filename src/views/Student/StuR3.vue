<template>
    <el-container style="min-height: 100vh">
  
      <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden;"
                 background-color="rgb(48, 65, 86)"
                 text-color="#fff"
                 active-text-color="#39c5bb"
                 :unique-opened="true"
                 :collapse-transition="false"
                 :collapse="isCollapse"
                 router
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img src="../../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
            <b style="color: white" v-show="logoTextShow">大学生实习管理系统</b>
          </div>
  
          <el-menu-item index="/student">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
            <el-submenu index="/1" v-if="(formPro==null&userinfo.apply==2)">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>岗位申请</span>
              </template>
              <el-menu-item index="/studentP">可申请岗位</el-menu-item>
              <el-menu-item index="/studentP1">申请中岗位</el-menu-item>
              <el-menu-item index="/studentP2">申请失败岗位</el-menu-item>
            </el-submenu>
            <el-submenu index="/2" v-if="(userinfo.apply==2)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的实习</span>
              </template>
              <el-menu-item index="/studentR1">实习请假申请</el-menu-item>
              <el-menu-item index="/studentR2">实习周报</el-menu-item>
              <el-menu-item index="/studentR3" style="color:#39c5bb">实习计划</el-menu-item>
              <el-menu-item index="/studentR4">实习报告</el-menu-item>
            </el-submenu>
            <el-menu-item index="/studentE">
                <i class="el-icon-s-order"></i>
                <span slot="title">我的评价</span>
            </el-menu-item>
  
        </el-menu>
      </el-aside>
  
      <el-container>
        <el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
          <div style="flex: 1; font-size: 20px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>
          <el-dropdown style="cursor: pointer" trigger="click">
            <span><span style="font-size: 18px">{{userinfo.username}}</span><i class="el-icon-arrow-down" style=""></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="font-size: 16px; margin: 10px 10px;padding: 0">
              <span style="text-decoration: none;color: black;width: 100%;height: 100%;display: inline-table;" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
  
        </el-header>
  
        <el-main>
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/student' }">主页</el-breadcrumb-item>
              <el-breadcrumb-item>实习计划</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="margin: 10px 0">
            <el-button type="primary" size="small" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button> 
          </div>
          <el-tabs v-model="activeName">
          <el-tab-pane label="实习计划" name="tab1">  
          
            <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="content" label="计划内容">
            </el-table-column>
            <el-table-column prop="start_time" label="时间" width="120"> 
            </el-table-column>          
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
          </div>

          </el-tab-pane>
      </el-tabs>

      <el-dialog title="实习计划" :visible.sync="dialogFormVisible" width="35%">
            <el-form size="small" :model="form">
              <el-form-item label="计划内容:" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="form.content" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>

        </el-main>
      </el-container>
    </el-container>
  </template>
  

  <script>
  
    export default {
      name: 'Home',
      data() {
        return {
          userinfo:localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) :"",
          form:{},
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          tableData: [],
          total: 0,
          pageNum:1,
          pageSize:5,
          activeName: 'tab1',
          dialogFormVisible: false,
          formPro:{},
        }
      },
      created() {
        if (localStorage.getItem("student")===null) this.$router.push('/');
        this.request.get("/profession/selectPsOfYes",{
            params: {
              stu_id: this.userinfo.stu_id,
            }
          }).then(res =>{
                    this.formPro = res.data.data;
                  });
        this.load();
      },
      methods: {
        collapse() {  // 点击收缩按钮触发
          this.isCollapse = !this.isCollapse
          if (this.isCollapse) {  // 收缩
            this.sideWidth = 64
            this.collapseBtnClass = 'el-icon-s-unfold'
            this.logoTextShow = false
          } else {   // 展开
            this.sideWidth = 200
            this.collapseBtnClass = 'el-icon-s-fold'
            this.logoTextShow = true
          }
        },
        load(){
          this.request.get("/student/stuPlanS",{
            params: {
              stu_id:this.userinfo.stu_id,
              pageNum:this.pageNum,
              pageSize:this.pageSize,
            }
          }).then(res =>{
            this.tableData = res.data.data
            this.total = res.data.total
          });

        },
        handleSizeChange(pageSize){
          this.pageSize=pageSize
          this.load()
        },
        handleCurrentChange(pageNum){
          this.pageNum = pageNum
          this.load()
        },
        handleAdd(){
          this.dialogFormVisible = true
          this.form = {}
          this.value=''
        },
        save(){
          this.form.stu_id = this.userinfo.stu_id;
          const nowDate = new Date();
          const date = {
              year: nowDate.getFullYear(),
              month: nowDate.getMonth() + 1,
              date: nowDate.getDate(),
          }
          const newmonth = date.month > 9 ? date.month : '0' + date.month
          const day = date.date > 9 ? date.date : '0' + date.date
          let datetime = date.year + '-' + newmonth + '-' + day
          this.form.start_time = datetime;
          this.request.post("/student/stuPlan",this.form).then(res =>{
                if(res.code == 200){
                this.$message.success("新增成功")
                this.dialogFormVisible = false
                this.pageNum=1
                this.load()
                }else {
                this.$message.error("新增失败")
                }
                })
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("student")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  