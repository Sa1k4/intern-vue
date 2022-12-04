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
  
            <el-menu-item index="/company" style="color:#39c5bb">
                <i class="el-icon-user"></i>
                <span slot="title">企业信息</span>
            </el-menu-item>
            <el-menu-item index="/companyP">
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
            <span><span style="font-size: 18px">{{userinfo.company_name}}</span><i class="el-icon-arrow-down" style=""></i></span>
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
              <el-breadcrumb-item>企业信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div style="margin: 10px 0; margin-top: 30px;">
            <div style="margin: 10px 0">企业凭证更改：</div>
                        <el-upload
                            style="margin: 10px 0"
                            class="upload"
                            ref="upload"
                            action="http://localhost:8081/file/upload"
                            :on-success="handleSuccessEdit"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-change="handleChange"
                            :file-list="fileList"
                            :limit=1
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip">请上传企业凭证，且不超过50MB</div>
                        </el-upload>
            <div style="margin: 10px 0; margin-top: 30px;">企业凭证查看：</div>
            <a :href="'http://localhost:8081/file/download?url='+this.form.company_licence">
                <el-button size="small" type="success">查看文件</el-button>
            </a>
          </div>

          <div title="企业信息" style="margin-top:30px">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="企业编号:" prop="cpmy_id" hidden>
                <el-input v-model="form.cpmy_id" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="企业名称:" prop="company_name">
                <el-input v-model="form.company_name" autocomplete="off"></el-input>
              </el-form-item>
          
              <el-form-item label="企业介绍:" prop="company_legal">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="form.company_legal" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
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
          userinfo:localStorage.getItem("company")? JSON.parse(localStorage.getItem("company")) :"",
          form:{},
          fileList: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          Rules: {
            company_name: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
                    ],
                    company_legal: [
                        {required: true, message: '请输入企业介绍', trigger: 'blur'},
                        
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
        if (localStorage.getItem("company")===null) this.$router.push('/')
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
          this.request.get("/company/login",{
            params: {
              username: this.userinfo.username,
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
                this.$refs.upload.submit();
            }
            })
        },
        
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.fileList = fileList;
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSuccessEdit(res) {
            if (res !== null) {
              this.form.company_licence = res;
              this.request.post("/company/update",this.form).then(res =>{
                    if(res.code == 200){
                    this.$message.success("修改成功")
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                })
            }
        },
        handleChange(file, fileList) {
            console.log("change",file,fileList);
            this.fileList = fileList;
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("company")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  