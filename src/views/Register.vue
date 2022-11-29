<template>
    <div class="wrapper">
        <div style="margin: 0 auto; background-color: #fff; width: 35%; height: 100%; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="学生注册" name="student">
                    <el-form :model="student" :rules="studentRules" ref="studentForm">
                        <el-form-item prop="student_id">
                            <el-input placeholder="请输入学号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-postcard" v-model="student.student_id"></el-input>
                        </el-form-item>
                        <el-form-item prop="student_name">
                            <el-input placeholder="请输入姓名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="student.student_name"></el-input>
                        </el-form-item>
                        <el-form-item prop="student_class">
                            <el-input placeholder="请输入班级" size="medium" style="margin: 10px 0" prefix-icon="el-icon-school" v-model="student.student_class"></el-input>
                        </el-form-item>
                        <el-form-item prop="student_account">
                            <el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-coordinate" v-model="student.student_account"></el-input>
                        </el-form-item>
                        <el-form-item prop="student_password">
                            <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="student.student_password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder="请确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="student.passwordConfirm"></el-input>
                        </el-form-item>
                        <el-form-item style="margin: 10px 0; text-align: right">
                            <p><el-link style="padding-bottom: 10px" :underline="false" @click="$router.push('/login')">已有账号？点击登录</el-link></p>
                            <el-button type="primary" size="small" autocomplete="off" @click="stuRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="教师注册" name="teacher">
                    <el-form :model="teacher" :rules="teacherRules" ref="teacherForm">
                        <el-form-item prop="teacher_id">
                            <el-input placeholder="请输入教师编号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-postcard" v-model="teacher.teacher_id"></el-input>
                        </el-form-item>
                        <el-form-item prop="teacher_name">
                            <el-input placeholder="请输入姓名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="teacher.teacher_name"></el-input>
                        </el-form-item>
                        <el-form-item prop="teacher_account">
                            <el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-coordinate" v-model="teacher.teacher_account"></el-input>
                        </el-form-item>
                        <el-form-item prop="teacher_password">
                            <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="teacher.teacher_password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder="请确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="teacher.passwordConfirm"></el-input>
                        </el-form-item>
                        <el-form-item style="margin: 10px 0; text-align: right">
                            <p><el-link style="padding-bottom: 10px" :underline="false" @click="$router.push('/login')">已有账号？点击登录</el-link></p>
                            <el-button type="primary" size="small" autocomplete="off" @click="teaRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

            </el-tabs>

        </div>
    </div>
</template>

<script>


    export default {
        name: "Register",
        data() {
            return {
                student: {},
                teacher: {},
                activeName: 'student',
                studentRules: {
                    student_id: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    student_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    student_class: [
                        {required: true, message: '请输入班级', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    student_account: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    student_password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    passwordConfirm: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                },
                teacherRules: {
                    teacher_id: [
                        {required: true, message: '请输入教师编号', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    teacher_name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    teacher_account: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    teacher_password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    teacher_passwordConfirm: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        // mounted() {
        //     if (location.href.indexOf("#reloaded") == -1) {
        //         location.href = location.href + "#reloaded";
        //         location.reload();
        //     }
        // },
        methods: {
            stuRegister() {
                this.$refs['studentForm'].validate((valid) => {
                    if (valid) {
                        if (this.student.student_password !== this.student.passwordConfirm){
                            this.$message.error("两次输入的密码不一致！")
                            return false
                        }
                        this.request.post("/student/insert", this.student).then(res =>{
                            if (res){
                                this.$message.success("注册成功")
                                this.$router.push('/login')
                            }else{
                                this.$message.error("注册失败")
                            }
                        })
                    }
                });
            },

            teaRegister() {
                this.$refs['teacherForm'].validate((valid) => {
                    if (valid) {
                        if (this.teacher.teacher_password !== this.teacher.passwordConfirm){
                            this.$message.error("两次输入的密码不一致！")
                            return false
                        }
                        this.request.post("/teacher/insert", this.teacher).then(res =>{
                            if (res){
                                this.$message.success("注册成功")
                                this.$router.push('/login')
                            }else{
                                this.$message.error("注册失败")
                            }
                        })
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
        padding: 20px;
    }
</style>
