<template>
    <div class="wrapper">
        <div style="margin: 0 auto; background-color: #fff; width: 35%; height: 100%; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="学生注册" name="student">
                    <el-form :model="student" :rules="studentRules" ref="studentForm">
                        <el-form-item prop="stu_id">
                            <el-input placeholder="请输入学号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-postcard" v-model="student.stu_id" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input placeholder="请输入姓名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="student.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex">
                            <el-select v-model="student.sex" placeholder="请选择性别" size="medium" style="margin: 10px 0;width: 100%">
                            <el-option label="男" value="男" ></el-option>
                            <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="academy">
                            <el-input placeholder="请输入学院" size="medium" style="margin: 10px 0" prefix-icon="el-icon-school" v-model="student.academy"></el-input>
                        </el-form-item>
                        <el-form-item prop="specialty">
                            <el-input placeholder="请输入专业" size="medium" style="margin: 10px 0" prefix-icon="el-icon-coordinate" v-model="student.specialty"></el-input>
                        </el-form-item>
                        <el-form-item prop="classname">
                            <el-input placeholder="请输入班级" size="medium" style="margin: 10px 0" prefix-icon="el-icon-data-board" v-model="student.classname"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input placeholder="请输入手机号码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-phone" v-model="student.phone" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="student.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder="请确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="student.passwordConfirm"></el-input>
                        </el-form-item>
                        <el-form-item style="margin: 10px 0; text-align: right">
                            <p><el-link style="padding-bottom: 10px" :underline="false" @click="$router.push('/')">已有账号？点击登录</el-link></p>
                            <el-button type="primary" size="small" autocomplete="off" @click="stuRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="教师注册" name="teacher">
                    <el-form :model="teacher" :rules="teacherRules" ref="teacherForm">
                        <el-form-item prop="t_id">
                            <el-input placeholder="请输入教师编号" size="medium" style="margin: 10px 0" prefix-icon="el-icon-postcard" v-model="teacher.t_id" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input placeholder="请输入姓名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="teacher.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="sex">
                            <el-select v-model="teacher.sex" placeholder="请选择性别" size="medium" style="margin: 10px 0;width: 100%">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="academy">
                            <el-input placeholder="请输入学院" size="medium" style="margin: 10px 0" prefix-icon="el-icon-school" v-model="teacher.academy"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input placeholder="请输入手机号码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-phone" v-model="teacher.phone" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="teacher.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder="请确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="teacher.passwordConfirm"></el-input>
                        </el-form-item>
                        <el-form-item style="margin: 10px 0; text-align: right">
                            <p><el-link style="padding-bottom: 10px" :underline="false" @click="$router.push('/')">已有账号？点击登录</el-link></p>
                            <el-button type="primary" size="small" autocomplete="off" @click="teaRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="企业注册" name="company">
                    <el-form :model="company" :rules="companyRules" ref="companyForm">
                        <el-form-item prop="company_name">
                            <el-input placeholder="请输入企业名称" size="medium" style="margin: 10px 0" prefix-icon="el-icon-school" v-model="company.company_name"></el-input>
                        </el-form-item>
                        <el-form-item prop="company_legal">
                            <el-input placeholder="请输入企业法人" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="company.company_legal"></el-input>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input placeholder="请输入用户名" size="medium" style="margin: 10px 0" prefix-icon="el-icon-postcard" v-model="company.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="company.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordConfirm">
                            <el-input placeholder="请确认密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                                      v-model="company.passwordConfirm"></el-input>
                        </el-form-item>
                        <div style="margin: 10px 0">企业凭证上传：</div>
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
                        <el-form-item style="margin: 10px 0; text-align: right">
                            <p><el-link style="padding-bottom: 10px" :underline="false" @click="$router.push('/')">已有账号？点击登录</el-link></p>
                            <el-button type="primary" size="small" autocomplete="off" @click="comRegister">注册</el-button>
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
                fileList: [],
                student: {},
                teacher: {},
                company: {},
                activeName: 'student',
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
                teacherRules: {
                    t_id: [
                        {required: true, message: '请输入教师编号', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
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
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    passwordConfirm: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                },
                companyRules: {
                    company_name: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
                    ],
                    company_legal: [
                        {required: true, message: '请输入企业法人', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    passwordConfirm: [
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
                        this.request.post("/student/register", this.student).then(res =>{
                            if (res.code == 200){
                                this.$message.success("注册成功")
                                this.$router.push('/')
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
                        if (this.teacher.password !== this.teacher.passwordConfirm){
                            this.$message.error("两次输入的密码不一致！")
                            return false
                        }
                        this.request.post("/teacher/register", this.teacher).then(res =>{
                            if (res.code == 200){
                                this.$message.success("注册成功")
                                this.$router.push('/')
                            }else{
                                this.$message.error("注册失败")
                            }
                        })
                    }
                });
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
                    this.company.company_licence = res;
                    this.request.post("/company/register", this.company).then(res =>{
                            if (res.code == 200){
                                this.$message.success("注册成功")
                                this.$router.push('/')
                            }else{
                                this.$message.error("注册失败")
                            }
                        })
                }
            },
            handleChange(file, fileList) {
                console.log("change",file,fileList);
                this.fileList = fileList;
            },

            comRegister() {
                this.$refs['companyForm'].validate((valid) => {
                    if (valid) {
                        if (this.company.password !== this.company.passwordConfirm){
                            this.$message.error("两次输入的密码不一致！")
                            return false
                        }
                        if (this.fileList.length == 0){
                            this.$message.error("请上传企业凭证！")
                            return false
                        }
                        //执行上传
                        this.$refs.upload.submit();
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
