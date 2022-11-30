<template>
  <div class="wrapper">
    <div style="margin: 100px auto; background-color: #fff; width: 350px; height: 420px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>大学生实习管理系统</b></div>
      <div style="margin: 20px 0; text-align: center; font-size: 22px"><b>登 录</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="role">
          <el-select v-model="user.role" placeholder="请选择登录身份" size="medium" style="margin: 10px 0;width: 100%">
            <el-option label="学生" value="student" ></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="企业" value="company"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="user.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right;">
          <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册</el-button>
          <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        role: [
          {required: true, message:'请选择登录身份', trigger: 'change'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if (this.user.role === 'admin') {
            this.request.post("/admin/login", this.user).then(res => {
              if (res.code ===200) {
                localStorage.setItem("admin",JSON.stringify(res.data.userinfo))
                this.$message.success("登录成功")
                this.$router.push("/admin")
              } else {
                this.$message.error("用户名或密码错误！")
              }
            })
          }
          if (this.user.role === 'teacher') {
            this.request.post("/teacher/login", this.user).then(res => {
              if (res.code ===200) {
                localStorage.setItem("teacher",JSON.stringify(res.data.userinfo))
                this.$message.success("登录成功")
                this.$router.push("/teacher")
              } else {
                this.$message.error("用户名或密码错误！")
              }
            })
          }
          if (this.user.role === 'student') {
            this.request.post("/student/login", this.user).then(res => {
              if (res.code === 200) {
                localStorage.setItem("student",JSON.stringify(res.data.userinfo))
                this.$message.success("登录成功")
                this.$router.push("/student")
              } else {
                this.$message.error("用户名或密码错误！")
              }
            })
          }
          if (this.user.role === 'company') {
            this.request.post("/company/login", this.user).then(res => {
              if (res.code ===200) {
                localStorage.setItem("company",JSON.stringify(res.data.userinfo))
                this.$message.success("登录成功")
                this.$router.push("/company")
              } else {
                this.$message.error("用户名或密码错误！")
              }
            })
          }
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100%;
  background-image: linear-gradient(to bottom right, #FC16F4, #39C5BB);
  overflow: hidden;
  padding: 20px;
}
</style>
