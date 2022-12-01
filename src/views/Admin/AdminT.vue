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
  
          <el-menu-item index="/admin">
                <i class="el-icon-user"></i>
                <span slot="title">学生信息管理</span>
            </el-menu-item>
            <el-menu-item index="/adminT" style="color:#39c5bb">
                <i class="el-icon-s-custom"></i>
                <span slot="title">教师信息管理</span>
            </el-menu-item>
            <el-menu-item index="/adminC">
                <i class="el-icon-school"></i>
                <span slot="title">企业信息管理</span>
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
              <el-breadcrumb-item :to="{ path: '/admin' }">后台管理</el-breadcrumb-item>
              <el-breadcrumb-item>教师管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
  
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入教师姓名" suffix-icon="el-icon-search" class="ml-5" v-model="username"></el-input>
            <el-input style="width: 200px" placeholder="请输入教师所属学院" suffix-icon="el-icon-message" class="ml-5" v-model="academy"></el-input>
            <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>
  
          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='好的'
                    cancel-button-text='不用了'
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定批量删除吗？"
                    @confirm="delMultiple"
            >
            <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
          </div>
  
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="t_id" label="教师工号" width="140">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="academy" label="学院">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="del(scope.row.t_id)"
                >
                <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
                </el-popconfirm>
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
  
          <el-dialog title="新增教师" :visible.sync="dialogFormVisible" width="35%">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="教师工号:" prop="t_id">
                <el-input v-model="form.t_id" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
              <el-form-item label="教师姓名:" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师性别:" prop="sex">
                <el-select v-model="form.sex" size="medium" style="width: 100%">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教师电话:" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师学院:" prop="academy">
                <el-input v-model="form.academy" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师密码:" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>
  
          <el-dialog title="修改教师信息" :visible.sync="EdialogFormVisible" width="35%">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="教师工号:" prop="t_id" hidden>
                <el-input v-model="form.t_id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师姓名:" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师性别:" prop="sex">
                <el-select v-model="form.sex" size="medium" style="width: 100%">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教师电话:" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师学院:" prop="academy">
                <el-input v-model="form.academy" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="教师密码:" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="EdialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="edit">确 定</el-button>
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
          userinfo:localStorage.getItem("admin")? JSON.parse(localStorage.getItem("admin")) :"",
          tableData: [],
          total: 0,
          pageNum:1,
          pageSize:5,
          username: "",
          academy: "",
          form:{},
          dialogFormVisible: false,
          EdialogFormVisible: false,
          multipleSelection: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
          Rules: {
                    t_id: [
                        {required: true, message: '请输入工号', trigger: 'blur'},
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
      watch: {
        EdialogFormVisible(newVal,oldVal){
          if (oldVal===true&&newVal===false)
            this.load()
        }
      },
      created() {
        if (localStorage.getItem("admin")===null) this.$router.push('/')
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
          this.request.get("/teacher/select",{
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              username: this.username,
              academy: this.academy
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        search(){
          this.request.get("/teacher/select",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              username: this.username,
              academy: this.academy
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        save(){
          this.$refs['Form'].validate((valid) => {
            if(valid){
                this.request.post("/teacher/register",this.form).then(res =>{
                if(res.code == 200){
                this.$message.success("新增成功")
                this.dialogFormVisible = false
                this.username=""
                this.academy=""
                this.pageNum=1
                this.load()
                }else {
                this.$message.error("新增失败")
                }
                })
            }
          })
        },
        edit(){
            this.$refs['Form'].validate((valid) => {
            if(valid){
                this.form.t_id = parseInt(this.form.t_id);
                this.request.post("/teacher/update",this.form).then(res =>{
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
        del(id){
          this.request.delete("/teacher/delete"+id).then(res =>{
            if(res.code == 200){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        delMultiple(){
          let ids = this.multipleSelection.map(v => v.t_id)
          this.request.post("/teacher/deleteMultiple", ids).then(res =>{
            if(res.code == 200){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        handleAdd(){
          this.dialogFormVisible = true
          this.form = {}
        },
        handleEdit(row){
          this.form = row;
          this.form.t_id = this.form.t_id.toString();
          this.EdialogFormVisible = true
          
        },
        reset(){
          this.username=""
          this.academy=""
          this.pageNum=1
          this.load()
        },
        handleSelectionChange(val){
          console.log(val)
          this.multipleSelection = val
        },
        handleSizeChange(pageSize){
          this.pageSize=pageSize
          this.load()
        },
        handleCurrentChange(pageNum){
          this.request.get("/teacher/select",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize,
              username: this.username,
              academy: this.academy
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
          localStorage.removeItem("admin")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  