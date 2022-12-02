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
  
            <el-menu-item index="/student" style="color:#39c5bb">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="/" v-if="form.apply==2">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">岗位申请</span>
            </el-menu-item>
            <el-submenu index="/" v-if="form.apply==2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的实习</span>
              </template>
              <el-menu-item index="/">实习请假申请</el-menu-item>
              <el-menu-item index="/">实习周报</el-menu-item>
              <el-menu-item index="/">实习计划</el-menu-item>
              <el-menu-item index="/">实习报告</el-menu-item>
            </el-submenu>
            <el-menu-item index="/">
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
              <el-breadcrumb-item>我的信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <div v-if="(form.apply==0)" style="margin: 10px 0; margin-top: 30px;color: red;">您还未进行实习申请！</div>
          <el-button v-if="(form.apply==0)" size="small" type="success" @click="apply()">申请</el-button>
          <div v-if="(form.apply==1)" style="margin: 10px 0; margin-top: 30px;color: orange;">您已进行实习申请，请等待老师审核</div>
          <div v-if="(form.apply==2)" style="margin: 10px 0; margin-top: 30px;color: green;">您已通过实习申请</div>
          <div style="margin: 10px 0; margin-top: 30px;">
            <div style="margin: 10px 0">简历上传：</div>
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
                            <el-button v-if="(fileList.length!=0)" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">请上传个人简历，且不超过50MB</div>
                        </el-upload>
            <div style="margin: 10px 0; margin-top: 30px;">简历查看：</div>
            <div v-if="form.vitae==null" style="margin: 10px 0; margin-top: 30px;color: red;">您还没有上传简历！</div>
            <el-button v-if="form.vitae!=null" size="small" type="primary" @click="download()">下载</el-button>
          </div>

          <div title="我的信息" style="margin-top:30px">
            <el-form size="small" :rules="studentRules" ref="studentForm" :model="form">
              <el-form-item label="学生学号:" prop="stu_id">
                <el-input v-model="form.stu_id" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="学生姓名:" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生性别:" prop="sex">
                <el-select v-model="form.sex" size="medium" style="width: 100%">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学生电话:" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生专业:" prop="specialty">
                <el-input v-model="form.specialty" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生班级:" prop="classname">
                <el-input v-model="form.classname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生学院:" prop="academy">
                <el-input v-model="form.academy" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="学生密码:" prop="password">
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
          userinfo:localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) :"",
          form:{},
          fileList: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          studentRules: {
                    stu_id: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ],
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
                    classname: [
                        {required: true, message: '请输入班级', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    specialty: [
                        {required: true, message: '请输入专业', trigger: 'blur'},
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
          this.request.get("/student/login",{
            params: {
              username: this.userinfo.stu_id,
              password: this.userinfo.password,
            }
          }).then(res =>{
                    console.log(res.data)
                    this.form = res.data.userinfo
                    this.form.stu_id = this.form.stu_id.toString();
                  })
        },
        edit(){
            this.$refs['studentForm'].validate((valid) => {
            if(valid){
                this.form.stu_id = parseInt(this.form.stu_id);
                this.request.post("/student/update",this.form).then(res =>{
                    if(res.code == 200){
                    this.$message.success("修改成功")
                    this.EdialogFormVisible = false
                    this.load()
                    }else {
                    this.$message.error("修改失败")
                    }
                })
            }
            })
        },
        submitUpload(){
            this.$refs.upload.submit();
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
              console.log(res);
              this.form.stu_id = parseInt(this.form.stu_id);
              this.form.vitae = res;
              this.request.post("/student/upload", this.form).then(res =>{
                  if (res.code == 200){
                      this.$message.success("上传成功")
                  }else{
                      this.$message.error("上传失败")
                  }
              })
            }
        },
        download() {
          window.open("http://localhost:8081/file/download?url="+this.form.vitae)
        },
        handleChange(file, fileList) {
            console.log("change",file,fileList);
            this.fileList = fileList;
        },
        apply() {
          this.request.get("/student/apply"+this.form.stu_id).then(res =>{
                  if (res.code == 200){
                      this.$message.success("申请提交成功")
                      this.load();
                  }else{
                      this.$message.error("申请提交失败")
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
  