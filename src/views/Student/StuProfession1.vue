<template>
    <el-container style="min-height: 100vh">
  
      <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
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
            <el-submenu index="/1">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>岗位申请</span>
              </template>
              <el-menu-item index="/studentP">可申请岗位</el-menu-item>
              <el-menu-item index="/studentP1" style="color:#39c5bb">申请中岗位</el-menu-item>
              <el-menu-item index="/studentP2">申请失败岗位</el-menu-item>
            </el-submenu>
            <el-submenu index="/2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的实习</span>
              </template>
              <el-menu-item index="/studentR1">实习请假申请</el-menu-item>
              <el-menu-item index="/studentR2">实习周报</el-menu-item>
              <el-menu-item index="/studentR3">实习计划</el-menu-item>
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
              <el-breadcrumb-item>申请中岗位</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
  
          <div style="margin: 10px 0">
            <el-input style="width: 200px; margin-right: 15px;" size="small" placeholder="请输入岗位名称" suffix-icon="el-icon-position" class="ml-5" v-model="name"></el-input>
            <el-button class="ml-5" size="small" type="primary" @click="search">搜索<i class="el-icon-search"></i></el-button>
            <el-button class="ml-5" size="small" type="warning" @click="reset">重置<i class="el-icon-refresh-right"></i></el-button>
          </div>
  
      <el-tabs v-model="activeName">
        <el-tab-pane label="申请中岗位" name="tab1">  
  
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <!-- <el-table-column type="selection" width="55">
            </el-table-column> -->
            <!-- <el-table-column prop="id" label="岗位编号" width="100" >
            </el-table-column> -->
            <el-table-column prop="name" label="岗位名称" width="150">
            </el-table-column>
            <el-table-column prop="salary" label="岗位薪水" width="100">
            </el-table-column>
            <el-table-column prop="introduce" label="岗位介绍">
            </el-table-column>
            <el-table-column prop="apply_num" label="岗位预计招收人数" width="120"> 
            </el-table-column>
            <el-table-column prop="status" label="岗位状态" width="100">
              <template slot-scope="scope">
                <div v-if="(scope.row.status==0)" style="color:orange">未审核</div>
                <div v-if="(scope.row.status==3)" style="color:red">未通过审核</div>
                <div v-if="(scope.row.status==1)" style="color:greenyellow">开启</div>
                <div v-if="(scope.row.status==2)" style="color:blue">关闭</div>
              </template>
            </el-table-column>
            
            <el-table-column label="操作"  width="300" align="center">
              <template slot-scope="scope">
                <el-button v-if="(scope.row.status==1||scope.row.status==2)" type="primary" @click="detail(scope.row.id)">查看公司 <i class="el-icon-search"></i></el-button>   
                <!-- <el-button v-if="(scope.row.status==1)" type="success" @click="apply(scope.row.id)">申请岗位 <i class="el-icon-tickets"></i></el-button> -->
              </template>
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

      <el-dialog title="企业信息" :visible.sync="dialogFormVisible" width="35%">
            <el-form size="small" :model="form">
              <el-form-item label="企业名称:" prop="company_name">
                <el-input v-model="form.company_name" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="企业介绍:" prop="company_legal">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="form.company_legal" autocomplete="off" readonly></el-input>
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
          userinfo:localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) :"",
          tableData: [],
          total: 0,
          pageNum:1,
          pageSize:5,
          name: "",
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          activeName: 'tab1',
          dialogFormVisible: false,
          form:{},
        }
      },
      created() {
        if (localStorage.getItem("student")===null) this.$router.push('/')
        this.load()
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
          this.request.get("/profession/selectPsOf0",{
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              name: this.name,
              stu_id: this.userinfo.stu_id
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        search(){
          this.request.get("/profession/selectPsOf0",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              name: this.name,
              stu_id: this.userinfo.stu_id
            }
          }).then(res =>{
                    console.log(res.data)
                    this.pageNum = 1
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        detail(res) {
          this.dialogFormVisible = true
          this.request.get("/company/selectOfCompany",{
            params: {
              id: res
            }
          }).then(res =>{
                    console.log(res)
                    this.form = res.data.company
                  })
        },
        apply(res) {
          this.request.get("/student/applyPro",{
            params: {
              id: res,
              stu_id: this.userinfo.stu_id
            }
          }).then(res =>{
                    if(res.code == 200){
                    this.$message.success("申请成功")
                    this.load()
                    }else {
                    this.$message.error("申请失败")
                    }
                })
        },
        reset(){
          this.name=""
          this.pageNum=1
          this.load()
        },
        handleSizeChange(pageSize){
          this.pageSize=pageSize
          this.load()
        },
        handleCurrentChange(pageNum){
          this.request.get("/profession/selectPsOf0",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize,
              name: this.name,
              stu_id: this.userinfo.stu_id
            }
          }).then(res =>{
                    console.log(res.data)
                    let realPage = Math.ceil(res.data.total/this.pageSize);
                    if(realPage == 0)this.pageNum = 1;
                    else
                    if(res.data.data.length==0)this.pageNum=realPage;
                    else this.pageNum = pageNum;
                    this.load();
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
  