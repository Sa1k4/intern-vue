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
              <el-menu-item index="/studentR3">实习计划</el-menu-item>
              <el-menu-item index="/studentR4">实习报告</el-menu-item>
            </el-submenu>
            <el-menu-item index="/studentE" style="color:#39c5bb">
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
              <el-breadcrumb-item>我的评价</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
  

  
      <el-tabs v-model="activeName">
        <el-tab-pane label="老师对我的评价" name="tab1">  
  
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">

            <el-table-column prop="t_name" label="评价老师" width="150">
            </el-table-column>
            <el-table-column prop="eva_content" label="评价内容">
            </el-table-column>
            <el-table-column prop="eva_date" label="评价时间" width="150">
            </el-table-column>
            
          </el-table>
          
        </el-tab-pane>

        <el-tab-pane label="企业对我的评价" name="tab2">  
  
          <el-table :data="tableData1" border stripe :header-cell-class-name="headerBg">

            <el-table-column prop="com_name" label="评价企业" width="150">
            </el-table-column>
            <el-table-column prop="eva_content" label="评价内容">
            </el-table-column>
            <el-table-column prop="eva_date" label="评价时间" width="150">
            </el-table-column>
            
          </el-table>
          
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
          userinfo:localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) :"",
          tableData: [],
          tableData1: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          activeName: 'tab1',
          form:{},
          formPro:{},
        }
      },
      created() {
        if (localStorage.getItem("student")===null) this.$router.push('/')
        this.request.get("/profession/selectPsOfYes",{
            params: {
              stu_id: this.userinfo.stu_id,
            }
          }).then(res =>{
                    this.formPro = res.data.data;
                  })
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
          this.form.stu_id = this.userinfo.stu_id
          this.request.post("/evaluate/studentSelectEvaT",this.form).then(res =>{
                    console.log(res.data.data)
                    this.tableData = res.data.data
                  })
          this.request.post("/evaluate/studentSelectEvaC",this.form).then(res =>{
            console.log(res.data.data)
            this.tableData1 = res.data.data
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
  