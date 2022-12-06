<template>
  <el-container style="min-height: 100vh">

    <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
               background-color="rgb(48, 65, 86)"
               text-color="#fff"
               active-text-color="#39c5bb"
               :collapse-transition="false"
               :collapse="isCollapse"
               router
      >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
          <b style="color: white" v-show="logoTextShow">大学生实习管理系统</b>
        </div>

          <el-menu-item index="/teacher">
              <i class="el-icon-user"></i>
              <span slot="title">个人信息</span>
          </el-menu-item>
          <el-submenu index="/1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>审批</span>
            </template>
            <el-menu-item index="/teacherA1">学生实习审批</el-menu-item>
            <el-menu-item index="/teacherA2">学生实习请假审批</el-menu-item>
          </el-submenu>
          <el-submenu index="/2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item index="/teacherSM" style="color:#39c5bb">学生信息查看</el-menu-item>
            <el-menu-item index="/teacherSA">学生添加</el-menu-item>
          </el-submenu>
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
            <el-breadcrumb-item :to="{ path: '/teacher' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/teacherSM' }">学生信息查看</el-breadcrumb-item>
            <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
  
      <el-tabs v-model="activeName">
          <el-tab-pane label="学生岗位" name="tab">
            <div v-if="(formPro==null)">学生还没有岗位</div>
            <el-form size="small" :model="formPro" v-if="(formPro!=null)">
              <el-form-item label="岗位名称:" prop="name">
                <el-input v-model="formPro.name" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="岗位薪水:" prop="salary">
                <el-input v-model="formPro.salary" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="岗位介绍:" prop="introduce">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="formPro.introduce" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="公司信息:">
              <el-button type="primary" @click="detail(formPro.id)">查看公司 <i class="el-icon-search"></i></el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          
        <el-tab-pane label="实习周报" name="tab1">  
          
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
          <el-table-column prop="content" label="周报内容">
          </el-table-column>
          <el-table-column prop="start_time" label="开始时间" width="120"> 
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间" width="120"> 
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

        <el-tab-pane label="实习计划" name="tab2">  
          
          <el-table :data="tableData1" border stripe :header-cell-class-name="headerBg">
          <el-table-column prop="content" label="计划内容">
          </el-table-column>
          <el-table-column prop="start_time" label="时间" width="120"> 
          </el-table-column>          
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page="pageNum"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageSize1"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total1">
          </el-pagination>
        </div>

        </el-tab-pane>
        
        <el-tab-pane label="实习报告" name="tab3">  
        
        <el-table :data="tableData2" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="content" label="报告内容">
        </el-table-column>
        <el-table-column prop="start_time" label="时间" width="120"> 
        </el-table-column>          
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="pageNum2"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2">
        </el-pagination>
      </div>

        </el-tab-pane>
      </el-tabs>
         
      <el-dialog title="企业信息" :visible.sync="dialogFormVisible" width="35%">
            <el-form size="small" :model="formCom">
              <el-form-item label="企业名称:" prop="company_name">
                <el-input v-model="formCom.company_name" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="企业介绍:" prop="company_legal">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="formCom.company_legal" autocomplete="off" readonly></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">关 闭</el-button>     
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
          userinfo:localStorage.getItem("company")? JSON.parse(localStorage.getItem("company")) :"",
          name:"",
          id:"",
          tableData: [],
          tableData1: [],
          tableData2: [],
          total: 0,
          total1: 0,
          total2: 0,
          pageNum:1,
          pageSize:5,
          pageNum1:1,
          pageSize1:5,
          pageNum2:1,
          pageSize2:5,
          activeName: 'tab',
          formCom:{},
          formPro:{},
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          dialogFormVisible: false,
        }
      },
      created() {
        if (localStorage.getItem("teacher")===null) this.$router.push('/');
        let query = JSON.parse(this.$UrlEncode.decode(this.$route.query.key));
        this.name = query.name;
        this.id = query.id;
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
          this.request.get("/profession/selectPsOfYes",{
            params: {
              stu_id: this.id,
            }
          }).then(res =>{
                    this.formPro = res.data.data;
                  })

          this.request.get("/student/stuWeekS",{
            params: {
              stu_id:this.id,
              pageNum:this.pageNum,
              pageSize:this.pageSize,
            }
          }).then(res =>{
            this.tableData = res.data.data
            this.total = res.data.total
          });

          this.request.get("/student/stuPlanS",{
            params: {
              stu_id:this.id,
              pageNum:this.pageNum1,
              pageSize:this.pageSize1,
            }
          }).then(res =>{
            this.tableData1 = res.data.data
            this.total1 = res.data.total
          });

          this.request.get("/student/stuRepoS",{
          params: {
            stu_id:this.id,
            pageNum:this.pageNum2,
            pageSize:this.pageSize2,
          }
        }).then(res =>{
          this.tableData2 = res.data.data
          this.total2 = res.data.total
        });

        },
        
        handleSizeChange(pageSize){
          this.pageSize=pageSize
          this.load()
        },
        handleSizeChange1(pageSize){
          this.pageSize1=pageSize
          this.load()
        },
        handleSizeChange2(pageSize){
          this.pageSize2=pageSize
          this.load()
        },

        handleCurrentChange(pageNum){
          this.pageNum = pageNum
          this.load()
        },
        handleCurrentChange1(pageNum){
          this.pageNum1 = pageNum
          this.load()
        },
        handleCurrentChange2(pageNum){
          this.pageNum2 = pageNum
          this.load()
        },

        detail(res) {
          this.dialogFormVisible = true
          this.request.get("/company/selectOfCompany",{
            params: {
              id: res
            }
          }).then(res =>{
                    console.log(res)
                    this.formCom = res.data.company
                  })
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("teacher")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  