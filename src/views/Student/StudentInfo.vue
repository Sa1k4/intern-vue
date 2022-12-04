<template>
    <el-container style="min-height: 100vh">
  
      <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden;"
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
  
          <el-menu-item index="/student"  style="color:#39c5bb">
                <i class="el-icon-user"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
            <el-submenu index="/1" v-if="(formPro==null)">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>岗位申请</span>
              </template>
              <el-menu-item index="/studentP">可申请岗位</el-menu-item>
              <el-menu-item index="/studentP1">申请中岗位</el-menu-item>
              <el-menu-item index="/studentP2">申请失败岗位</el-menu-item>
            </el-submenu>
            <el-submenu index="/2">
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
              <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <el-tabs v-model="activeName">
          <el-tab-pane label="我的信息" name="tab1">  
          
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
            <a :href="('http://localhost:8081/file/download?url='+this.form.vitae)" v-if="form.vitae!=null" >
                <el-button size="small" type="success">查看文件</el-button>
            </a>
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
  
        </el-tab-pane>

          <el-tab-pane label="我的岗位" name="tab2">
            <div v-if="(formPro==null)">您还没有岗位</div>
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

          <el-tab-pane label="历史岗位" name="tab3"> 
            <div style="margin: 10px 0">
            <el-input style="width: 200px; margin-right: 15px;" size="small" placeholder="请输入岗位名称" suffix-icon="el-icon-position" class="ml-5" v-model="name"></el-input>
            <el-button class="ml-5" size="small" type="primary" @click="search">搜索<i class="el-icon-search"></i></el-button>
            <el-button class="ml-5" size="small" type="warning" @click="reset">重置<i class="el-icon-refresh-right"></i></el-button>
          </div>

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
          userinfo:localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) :"",
          form:{},
          fileList: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          tableData: [],
          total: 0,
          pageNum:1,
          pageSize:5,
          name: "",
          activeName: 'tab1',
          dialogFormVisible: false,
          formCom:{},
          formPro:{},
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
        if (localStorage.getItem("student")===null) this.$router.push('/');
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

          this.request.get("/profession/selectPsOfYes",{
            params: {
              stu_id: this.userinfo.stu_id,
            }
          }).then(res =>{
                    this.formPro = res.data.data;
                  })

          this.request.get("/profession/selectPsOfPast",{
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
          this.request.get("/profession/selectPsOfPast",{
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
          this.request.get("/profession/selectPsOfPast",{
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
          localStorage.removeItem("student")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  