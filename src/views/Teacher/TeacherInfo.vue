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
  
            <el-menu-item index="/teacher" style="color:#39c5bb">
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
              <el-menu-item index="/teacherSM">学生信息查看</el-menu-item>
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
              <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          

          <div title="我的信息" style="margin-top:30px">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="工号:" prop="t_id">
                <el-input v-model="form.t_id" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别:" prop="sex">
                <el-select v-model="form.sex" size="medium" style="width: 100%">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话:" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学院:" prop="academy">
                <el-input v-model="form.academy" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="warning" size="small" @click="edit">修改信息</el-button>
            </div>
          </div>
  
        </el-main>
  
      </el-container>
    </el-container>
  </template>
  
  <script>

  
    export default {
      name: 'Home',
      data() {
        return {
          userinfo:localStorage.getItem("teacher")? JSON.parse(localStorage.getItem("teacher")) :"",
          form:{},
          fileList: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          Rules: {
                    username: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    academy: [
                        {required: true, message: '请输入学院', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    passwordConfirm: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                },
        }
      },
      created() {
        if (localStorage.getItem("teacher")===null) this.$router.push('/')
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
          this.request.get("/teacher/login",{
            params: {
              username: this.userinfo.t_id,
              password: this.userinfo.password,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.form = res.data.userinfo
                  })
        },
        edit(){
            this.$refs['Form'].validate((valid) => {
            if(valid){
              this.request.post("/teacher/update",this.form).then(res =>{
                    if(res.code == 200){
                    this.$message.success("修改成功")
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                })
            }
            })
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("teaher")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  