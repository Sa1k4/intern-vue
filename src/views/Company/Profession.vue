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
            <el-menu-item index="/">
                <i class="el-icon-s-order"></i>
                <span slot="title">评价</span>
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
              <el-breadcrumb-item>企业岗位管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
  
          <div style="margin: 10px 0">
            
            <el-select v-model="status" size="small" style="width: 200px;margin-right: 15px;" placeholder="请选择岗位状态" @change="search"> 
                            <el-option label="开启的岗位" value="1"></el-option>
                            <el-option label="关闭的岗位" value="2"></el-option>              
                            <el-option label="未审核的岗位" value="0"></el-option>
                            <el-option label="未通过审核的岗位" value="3"></el-option>         
            </el-select>
            <el-input style="width: 200px; margin-right: 15px;" size="small" placeholder="请输入岗位名称" suffix-icon="el-icon-position" class="ml-5" v-model="name"></el-input>
            <el-button class="ml-5" size="small" type="primary" @click="search">搜索<i class="el-icon-search"></i></el-button>
            <el-button class="ml-5" size="small" type="warning" @click="reset">重置<i class="el-icon-refresh-right"></i></el-button>
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
            <el-button v-if="(status==0||status==3)" type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>
          </div>
  
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
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
                <el-button v-if="(scope.row.status==1||scope.row.status==2)" type="primary" @click="detail(scope.row.id)">查看 <i class="el-icon-search"></i></el-button>
                <el-button v-if="(scope.row.status==0||scope.row.status==3)" type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
                <el-button v-if="(scope.row.status==3)" type="primary" @click="changeStatus(scope.row)">重新申请 <i class="el-icon-tickets"></i></el-button>
                <el-button v-if="(scope.row.status==1)" type="warning" @click="changeStatus(scope.row)">关闭 <i class="el-icon-circle-close"></i></el-button>
                <el-button v-if="(scope.row.status==2)" type="success" @click="changeStatus(scope.row)">开启 <i class="el-icon-circle-check"></i></el-button>
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="del(scope.row.id)"
                >
                <el-button v-if="(scope.row.status==0||scope.row.status==3)" type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
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
  
          <el-dialog title="新增岗位" :visible.sync="dialogFormVisible" width="35%">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="岗位名称:" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位薪水:" prop="salary">
                <el-input v-model="form.salary" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
              <el-form-item label="岗位介绍:" prop="introduce">
                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 15}" v-model="form.introduce" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位预计招收人数:" prop="apply_num">
                <el-input v-model="form.apply_num" autocomplete="off"></el-input>
              </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>
  
          <el-dialog title="修改岗位信息" :visible.sync="EdialogFormVisible" width="35%">
            <el-form size="small" :rules="Rules" ref="Form" :model="form">
              <el-form-item label="岗位名称:" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位薪水:" prop="salary">
                <el-input v-model="form.salary" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
              <el-form-item label="岗位介绍:" prop="introduce">
                <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 20}" v-model="form.introduce" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="岗位预计招收人数:" prop="apply_num">
                <el-input v-model="form.apply_num" autocomplete="off"></el-input>
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
          userinfo:localStorage.getItem("company")? JSON.parse(localStorage.getItem("company")) :"",
          tableData: [],
          total: 0,
          pageNum:1,
          pageSize:5,
          name:"",
          status: '1',
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
                    name: [
                        {required: true, message: '请输入岗位名称', trigger: 'blur'},
                    ],
                    salary: [
                        {required: true, message: '请输入岗位薪水', trigger: 'blur'}
                    ],
                    introduce: [
                        {required: true, message: '请输入岗位介绍', trigger: 'blur'}
                    ],
                    apply_num: [
                        {required: true, message: '请输入岗位预计招收人数', trigger: 'blur'}
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
          this.request.get("/profession/conditionQuery",{
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              com_id: this.userinfo.cpmy_id,
              name: this.name,
              status: this.status
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        search(){
          this.request.get("/profession/conditionQuery",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              com_id: this.userinfo.cpmy_id,
              name: this.name,
              status: this.status
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
                this.request.post("/profession/addProfession",this.form).then(res =>{
                if(res.code == 200){
                this.$message.success("新增成功")
                this.dialogFormVisible = false
                this.name=""
                this.status=""
                this.pageNum=1
                this.load()
                }else {
                this.$message.error("新增失败")
                }
                })
            }
          })
        },
        changeStatus(res) {
          if(res.status==1)res.status=2
          else
          if(res.status==2)res.status=1
          else
          if(res.status==3)res.status=0;
            this.request.post("/profession/updateProfession",res).then(res =>{
                    if(res.code == 200){
                    this.$message.success("提交成功")
                    this.load()
                    }else {
                    this.$message.error("提交失败")
                    }
                })
        },
        edit(){
            this.$refs['Form'].validate((valid) => {
            if(valid){
                this.request.post("/profession/updateProfession",this.form).then(res =>{
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
          this.request.delete("/profession/delProfession"+id).then(res =>{
            if(res.code == 200){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        delMultiple(){
          let ids = this.multipleSelection.map(v => v.id)
          this.request.post("/profession/deleteMultiple", ids).then(res =>{
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
          this.EdialogFormVisible = true
          
        },
        reset(){
          this.name=""
          this.status="0"
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
          this.request.get("/profession/conditionQuery",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize,
              name: this.name,
              status: this.status
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
          localStorage.removeItem("company")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  