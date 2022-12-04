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

        <el-menu-item index="/company">
              <i class="el-icon-user"></i>
              <span slot="title">企业信息</span>
          </el-menu-item>
          <el-menu-item index="/companyP" style="color:#39c5bb">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">企业岗位管理</span>
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
            <el-breadcrumb-item :to="{ path: '/company' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/companyP' }">企业岗位管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
  
      <el-tabs v-model="activeName">
        <el-tab-pane label="申请中的学生" name="tab"> 
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入学生姓名" suffix-icon="el-icon-search" class="ml-5" v-model="student_name"></el-input>
            <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>
  
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="stu_id" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  width="50">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="specialty" label="专业">
            </el-table-column>
            <el-table-column prop="classname" label="班级">
            </el-table-column>
            <el-table-column prop="academy" label="学院">
            </el-table-column>
            <el-table-column prop="vitae" label="简历" width="110">
              <template slot-scope="scope">
                <a :href="('http://localhost:8081/file/download?url='+scope.row.vitae)" v-if="scope.row.vitae!=null" >
                <el-button type="primary">查看文件</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-button type="danger" @click="to2(scope.row)">拒绝 <i class="el-icon-circle-close"></i></el-button>
                <el-button type="success" @click="to1(scope.row)">同意 <i class="el-icon-circle-check"></i></el-button>
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
          
        <el-tab-pane label="在职的学生" name="tab1"> 
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入学生姓名" suffix-icon="el-icon-search" class="ml-5" v-model="student_name1"></el-input>
            <el-button class="ml-5" type="primary" @click="search1">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset1">重置</el-button>
          </div>
  
          <el-table :data="tableData1" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="stu_id" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  width="50">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="specialty" label="专业">
            </el-table-column>
            <el-table-column prop="classname" label="班级">
            </el-table-column>
            <el-table-column prop="academy" label="学院">
            </el-table-column>
            <el-table-column prop="vitae" label="简历" width="110">
              <template slot-scope="scope">
                <a :href="('http://localhost:8081/file/download?url='+scope.row.vitae)" v-if="scope.row.vitae!=null" >
                <el-button type="primary">查看文件</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-button type="warning" @click="evaluate(scope.row)">评价 <i class="el-icon-s-order"></i></el-button>
                <el-button type="danger" @click="quit(scope.row)">离职 <i class="el-icon-circle-close"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="pageNum1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已拒绝的学生" name="tab2"> 
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入学生姓名" suffix-icon="el-icon-search" class="ml-5" v-model="student_name2"></el-input>
            <el-button class="ml-5" type="primary" @click="search2">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset2">重置</el-button>
          </div>
  
          <el-table :data="tableData2" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="stu_id" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  width="50">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="specialty" label="专业">
            </el-table-column>
            <el-table-column prop="classname" label="班级">
            </el-table-column>
            <el-table-column prop="academy" label="学院">
            </el-table-column>
            <el-table-column prop="vitae" label="简历" width="110">
              <template slot-scope="scope">
                <a :href="('http://localhost:8081/file/download?url='+scope.row.vitae)" v-if="scope.row.vitae!=null" >
                <el-button type="primary">查看文件</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-button type="success" @click="to0(scope.row)">重新审核 <i class="el-icon-circle-check"></i></el-button>
              </template>
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
        
        <el-tab-pane label="已离职的学生" name="tab3"> 
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入学生姓名" suffix-icon="el-icon-search" class="ml-5" v-model="student_name3"></el-input>
            <el-button class="ml-5" type="primary" @click="search3">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset3">重置</el-button>
          </div>
  
          <el-table :data="tableData3" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="stu_id" label="学号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  width="50">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="specialty" label="专业">
            </el-table-column>
            <el-table-column prop="classname" label="班级">
            </el-table-column>
            <el-table-column prop="academy" label="学院">
            </el-table-column>
            <el-table-column prop="vitae" label="简历" width="110">
              <template slot-scope="scope">
                <a :href="('http://localhost:8081/file/download?url='+scope.row.vitae)" v-if="scope.row.vitae!=null" >
                <el-button type="primary">查看文件</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-button type="warning" @click="evaluate(scope.row)">评价 <i class="el-icon-s-order"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page="pageNum3"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total3">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
  
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
          tableData3: [],
          total: 0,
          total1: 0,
          total2: 0,
          total3: 0,
          pageNum:1,
          pageSize:5,
          pageNum1:1,
          pageSize1:5,
          pageNum2:1,
          pageSize2:5,
          pageNum3:1,
          pageSize3:5,
          student_name: "",
          student_name1: "",
          student_name2: "",
          student_name3: "",
          activeName: 'tab',
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
        }
      },
      created() {
        if (localStorage.getItem("company")===null) this.$router.push('/');
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
          this.request.get("/company/selectApply",{
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              pro_id: this.id,
              username: this.student_name,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })

          this.request.get("/company/selectApply1",{
            params: {
              pageNum: this.pageNum1,
              pageSize: this.pageSize1,
              pro_id: this.id,
              username: this.student_name1,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData1 = res.data.data
                    this.total1 = res.data.total
                  })

          this.request.get("/company/selectApply2",{
            params: {
              pageNum: this.pageNum2,
              pageSize: this.pageSize2,
              pro_id: this.id,
              username: this.student_name2,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData2 = res.data.data
                    this.total2 = res.data.total
                  })

          this.request.get("/company/selectApply3",{
            params: {
              pageNum: this.pageNum3,
              pageSize: this.pageSize3,
              pro_id: this.id,
              username: this.student_name3,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData3 = res.data.data
                    this.total3 = res.data.total
                  })
        },
        search(){
          this.request.get("/company/selectApply",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              pro_id: this.id,
              username: this.student_name,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.pageNum = 1
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        search1(){
          this.request.get("/company/selectApply1",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize1,
              pro_id: this.id,
              username: this.student_name1,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.pageNum1 = 1
                    this.tableData1 = res.data.data
                    this.total1 = res.data.total
                  })
        },
        search2(){
          this.request.get("/company/selectApply2",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize2,
              pro_id: this.id,
              username: this.student_name2,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.pageNum2 = 1
                    this.tableData2 = res.data.data
                    this.total2 = res.data.total
                  })
        },
        search3(){
          this.request.get("/company/selectApply3",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize3,
              pro_id: this.id,
              username: this.student_name3,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.pageNum3 = 1
                    this.tableData3 = res.data.data
                    this.total3 = res.data.total
                  })
        },
        reset(){
          this.student_name=""
          this.pageNum=1
          this.load()
        },
        reset1(){
          this.student_name1=""
          this.pageNum1=1
          this.load()
        },
        reset2(){
          this.student_name2=""
          this.pageNum2=1
          this.load()
        },
        reset3(){
          this.student_name3=""
          this.pageNum3=1
          this.load()
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
        handleSizeChange3(pageSize){
          this.pageSize3=pageSize
          this.load()
        },
        handleCurrentChange(pageNum){
          this.request.get("/company/selectApply",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize,
              pro_id: this.id,
              username: this.student_name,
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
        handleCurrentChange1(pageNum){
          this.request.get("/company/selectApply1",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize1,
              pro_id: this.id,
              username: this.student_name1,
            }
          }).then(res =>{
                    console.log(res.data)
                    let realPage = Math.ceil(res.data.total/this.pageSize1);
                    if(realPage == 0)this.pageNum1 = 1;
                    else
                    if(res.data.data.length==0)this.pageNum1=realPage;
                    else this.pageNum1 = pageNum;
                    this.load();
                  })
        },
        handleCurrentChange2(pageNum){
          this.request.get("/company/selectApply2",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize2,
              pro_id: this.id,
              username: this.student_name2,
            }
          }).then(res =>{
                    console.log(res.data)
                    let realPage = Math.ceil(res.data.total/this.pageSize2);
                    if(realPage == 0)this.pageNum2 = 1;
                    else
                    if(res.data.data.length==0)this.pageNum2=realPage;
                    else this.pageNum2 = pageNum;
                    this.load();
                  })
        },
        handleCurrentChange3(pageNum){
          this.request.get("/company/selectApply3",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize3,
              pro_id: this.id,
              username: this.student_name3,
            }
          }).then(res =>{
                    console.log(res.data)
                    let realPage = Math.ceil(res.data.total/this.pageSize3);
                    if(realPage == 0)this.pageNum3 = 1;
                    else
                    if(res.data.data.length==0)this.pageNum3=realPage;
                    else this.pageNum3 = pageNum;
                    this.load();
                  })
        },
        to0(res){
          this.request.get("/company/applyOfStudent",{
            params: {
              stu_id: res.stu_id,
              pro_id: this.id
            }
          }).then(res =>{
                  if(res.code == 200){
                    this.$message.success("修改成功")
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                  })
        },
        to1(res){
          this.request.get("/company/applyOfStudentYes",{
            params: {
              stu_id: res.stu_id,
              pro_id: this.id
            }
          }).then(res =>{
                  if(res.code == 200){
                    this.$message.success("修改成功")
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                  })
        },
        to2(res){
          this.request.get("/company/applyOfStudentNo",{
            params: {
              stu_id: res.stu_id,
              pro_id: this.id
            }
          }).then(res =>{
                  if(res.code == 200){
                    this.$message.success("修改成功")
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                  })
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("company")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  