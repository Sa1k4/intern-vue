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
            <el-menu-item index="/adminT">
                <i class="el-icon-s-custom"></i>
                <span slot="title">教师信息管理</span>
            </el-menu-item>
            <el-menu-item index="/adminC" style="color:#39c5bb">
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
              <el-breadcrumb-item>企业管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
  
          <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入公司名称" suffix-icon="el-icon-position" class="ml-5" v-model="company_name"></el-input>
            <el-button class="ml-5" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
          </div>
  
          <div style="margin: 10px 0">
            
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
            <el-table-column prop="company_name" label="公司名称" width="250">
            </el-table-column>
            <el-table-column prop="company_legal" label="公司法人" width="150">
            </el-table-column>
            <el-table-column prop="company_licence" label="公司凭证" width="150">
              <template slot-scope="scope">
                <el-button class="ml-5" type="primary" @click="download(scope.row.company_licence)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="公司账号">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
              <template slot-scope="scope">
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="del(scope.row.cpmy_id)"
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
          company_name:"",
          form:{},
          multipleSelection: [],
          collapseBtnClass: 'el-icon-s-fold',
          isCollapse: false,
          sideWidth: 200,
          logoTextShow: true,
          headerBg: 'headerBg',
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
          this.request.get("/company/select",{
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              company_name: this.company_name
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        search(){
          this.request.get("/company/select",{
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              company_name: this.company_name
            }
          }).then(res =>{
                    console.log(res.data)
                    this.tableData = res.data.data
                    this.total = res.data.total
                  })
        },
        del(id){
          this.request.delete("/company/delete"+id).then(res =>{
            if(res.code == 200){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        delMultiple(){
          let ids = this.multipleSelection.map(v => v.cpmy_id)
          this.request.post("/company/deleteMultiple", ids).then(res =>{
            if(res.code == 200){
              this.$message.success("删除成功")
              this.load()
            }else {
              this.$message.error("删除失败")
            }
          })
        },
        reset(){
          this.company_name=""
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
          this.request.get("/company/select",{
            params: {
              pageNum: pageNum,
              pageSize: this.pageSize,
              company_name: this.company_name
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
        download(company_licence){
          window.open("http://localhost:8081/file/download?url="+company_licence)
          // console.log(company_licence)
          // this.request.get("/file/download",{
          //   responseType: "blob",
          //   params: {
          //     url:company_licence
          //   }
          // }).then(res =>{
          //   console.log(res)
          //   let url = URL.createObjectURL(res);
          //   var a = document.createElement("a");
          //   a.href = url; // 给a标签赋上下载地址
          //   a.download = `${name}`;
          //   a.style.display = "none"; // 让a标签不显示
          //   a.click(); // a标签自点击
          //   URL.revokeObjectURL(a.href);
          // })
          // .catch((_) => {});
        },
        logout(){
          this.$router.push('/')
          localStorage.removeItem("admin")
          this.$message.success("退出成功")
        }
      }
    }
  </script>
  