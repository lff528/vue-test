<template>
    <div class="check-data">
      <bread-crumb :breadList="breadList"></bread-crumb>
      <div class="btn-wrap">
        <button class="btn btn-primary" @click="importClick" v-if="button['button-esfb-manage-data-upload']">导入小区系统资料</button>
        <button class="btn btn-primary" @click="exportClick" v-if="button['button-esfb-manage-data-download']">导出小区系统资料</button>
        <!-- :href="href" -->
      </div>
      <div class="check-table">
        <div class="table-title">
          小区：{{village_name}}（{{district}}
          <span v-if="trade_area !== ''">- {{trade_area}}</span>
          ）
        </div>
        <div class="table-body">
          <el-table :data="checkTable" style="width: 100%">
            <el-table-column label="序号" align="center" width="60" :resizable="false">
              <template  slot-scope="scope">
                <span v-if="scope.$index === 0">#</span>
                <span v-else>{{scope.row.inde}}</span>
              </template>
            </el-table-column>
            <el-table-column label="分期分区" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.stage"></el-input>
                </div>
                <div v-else>
                  <span>{{scope.row.stage}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="楼栋" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.build_num"></el-input>
                </div>
                <div v-else>
                  <span>{{scope.row.build_num}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="单元" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.unit"></el-input>
                </div>
                <div v-else>
                  <span>{{scope.row.unit}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="室号" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.room_number"></el-input>
                </div>
                <div v-else>
                  <span>{{scope.row.room_number}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="面积" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.acreage"></el-input>
                </div>
                <div v-else>
                  <span v-if="tableStatus[scope.$index].is_edit">
                    <el-input placeholder="请输入内容" v-model.trim="tableStatus[scope.$index].acreage" class="inp-65"></el-input>
                  </span>
                  <span v-else>{{scope.row.acreage}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业主姓名" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inp-65" @change="searchData" v-model.trim="search_data.owner"></el-input>
                </div>
                <div v-else>
                  <span v-if="tableStatus[scope.$index].is_edit">
                    <el-input placeholder="请输入内容" v-model.trim="tableStatus[scope.$index].owner" class="inp-65"></el-input>
                  </span>
                  <span v-else>{{scope.row.owner}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业主手机号" align="center" width="120" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-input class="inpPad" @change="searchData" v-model.trim="search_data.phone"></el-input>
                </div>
                <div v-else>
                  <span v-if="tableStatus[scope.$index].is_edit">
                    <el-input v-model.trim="tableStatus[scope.$index].phone" class="inpPad"></el-input>
                  </span>
                  <span v-else>{{scope.row.phone}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0">
                  <el-select v-model="search_data.state" clearable placeholder="请选择" class="inp-65" @change="searchData">
                      <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div v-else>
                  <span v-if="tableStatus[scope.$index].is_edit && scope.row.state === '1'">
                    <el-select v-model="tableStatus[scope.$index].state" placeholder="请选择" class="inp-65">
                      <el-option
                        v-for="item in tableStatus[scope.$index].statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </span>
                  <span v-else>{{scope.row.state === '1' ? '未拨打' : '已拨打'}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="业主详情备注" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0"></div>
                <div v-else>
                  <span v-if="tableStatus[scope.$index].is_edit">
                    <el-input placeholder="请输入内容" v-model.trim="tableStatus[scope.$index].remark"></el-input>
                  </span>
                  <span v-else>{{scope.row.remark}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作人" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0"></div>
                <div v-else>
                  <span>{{scope.row.u_name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" align="center" :resizable="false" width="170">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0"></div>
                <div v-else>
                  <span>{{scope.row.update_datetime}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" :resizable="false">
              <template  slot-scope="scope">
                <div v-if="scope.$index === 0"></div>
                <div v-else>
                  <!-- <span class="color-blue" @click="editData(scope)" v-if="!tableStatus[scope.$index].is_edit">编辑</span> -->
                  <el-link type="primary" v-if="!tableStatus[scope.$index].is_edit" @click="editData(scope)">编辑</el-link>
                  <div v-else>
                    <!-- <span @click="cancel(scope)" class="color-blue">取消</span>
                    <span @click="save(scope)" class="color-blue">保存</span> -->
                    <el-link type="primary" @click="cancel(scope)">取消</el-link>
                    <el-link type="primary" @click="save(scope)">保存</el-link>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="checkTable.length <= 1" class="noData">
            暂无数据~
          </div>
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync="search_data.page"
              :total="tableInfo.total"
              :page-size="tableInfo.pageSize"
              v-if="checkTable.length > 1"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title :visible.sync="dialogFile">
        <el-upload
        ref="upload"
        :action="importFile.url"
        :headers="importFile.importHeaders"
        :file-list="fileList"
        :on-success="successFile"
        :on-change="changeFile"
        :on-error="error"
        :on-remove="removeFile"
        :data="postData"
        :auto-upload="false">
          <button class="btn btn-primary" slot="trigger">选择文件</button>
        </el-upload>
        <div class="dialog-main">
          <p>注意：只能导入.xlsx和.xls格式文件，并且表头为分期分区、楼栋、单元、室号、面积、业主姓名、业主电话，顺序也需要保持一致。</p>
        </div>
        <div class="dia-footer">
          <div class="btn-wrap">
            <button class="btn btn-gray" @click="closeDialog">取消</button>
            <button class="btn btn-primary" @click="submitUpload">确定</button>
          </div>
        </div>
    </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'check-data',
  data () {
    return {
      breadList: [
        { bread_name: '系统管理' },
        { bread_name: '小区物业资料管理列表', bread_url: '/system/disManageList' },
        { bread_name: '查看物业资料' }
      ],
      checkTable: [], // 物业数据
      tableStatus: [], // 备份物业数据
      dialogFile: false, // 上传文件弹窗
      fileList: [], // 文件列表
      importFile: {
        url: '/v1/property/import/', // 上传的地址
        importHeaders: {
          enctype: 'multipart/form-data'
        }
      },
      postData: {
        village_id: '' // 上传文件携带参数
      },
      flag: true, // 重复上传
      search_data: { // 请求数据
        page: 1, // 当前页
        village_id: '', // 小区id
        stage: '', // 分期分区
        build_num: '', // 楼号
        unit: '', // 单元
        room_number: '', // 房号
        acreage: '', // 面积
        owner: '', // 业主名
        phone: '', // 业主电话
        state: '' // 状态
      },
      stateOptions: [
        {
          value: '1',
          label: '未拨打'
        },
        {
          value: '2',
          label: '已拨打'
        }
      ],
      tableInfo: {
        total: 0, // 总条数
        pageSize: 20 // 每页多少条
      },
      village_name: '', // 小区名字
      district: '', // 区域
      trade_area: '' // 商圈
    }
  },
  created () {
    // console.log(this.$route.query.name)
  },
  methods: {
    editData (sc) {
      this.tableStatus[sc.$index].is_edit = true
    },
    cancel (sc) {
      this.tableStatus[sc.$index].is_edit = false
    },
    save (sc) {
      if (this.tableStatus[sc.$index].state === '2' && this.tableStatus[sc.$index].remark === '') {
        alert('请填写业主详情备注')
      } else {
        let postData = {
          id: this.checkTable[sc.$index].id,
          acreage: this.tableStatus[sc.$index].acreage,
          owner: this.tableStatus[sc.$index].owner,
          phone: this.tableStatus[sc.$index].phone,
          state: this.tableStatus[sc.$index].state,
          remark: this.tableStatus[sc.$index].remark
        }
        this.axios.post('/v1/property/upd', postData).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.searchData()
            this.tableStatus[sc.$index].is_edit = false
          }
        })
      }
    },
    // 触发弹窗
    importClick () {
      this.fileList = []
      this.dialogFile = true
    },
    // 导出a连接后台给的固定地址
    exportClick () {
      let a = ''
      let url = '/v1/property/export?'
      for (let k in this.search_data) {
        if (this.search_data[k] !== '' && k !== 'page') {
          a += '&' + k + '=' + this.search_data[k]
        }
      }
      url = url + a.substr(1)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    closeDialog () {
      this.fileList = []
      this.dialogFile = false
    },
    // 文件提交到后台
    submitUpload () {
      if (this.fileList.length <= 0) {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
      } else {
        if (this.flag) {
          this.flag = false
          this.$refs.upload.submit()
        }
      }
    },
    /**
     * @param {type} file 文件对象 fileList文件列表
     * @description: 文件上传改变触发
     */
    changeFile (file, fileList) {
      let isLt5M = file.size / 1024 / 1024 <= 5
      let excelfileExtend = '.xls,.xlsx' // 设置文件格式
      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message.error('只能上传xlsx、xls格式文件！')
        this.fileList.splice(fileList.length - 1, 1)
        return false
      }
      if (!isLt5M) {
        this.$message.error('文件大小最多5M！')
        this.fileList.splice(fileList.length - 1, 1)
        return false
      }
      let a = fileList[fileList.length - 1]
      this.fileList.splice(0, 1, a)
    },
    removeFile (file, fileList) {
      this.fileList = []
    },
    /**
     * @param {type}  response 相应参数 file文件对象  fileList文件列表
     * @description: 文件上传成功回调
     */
    successFile (response, file, fileList) {
      this.flag = true
      this.fileList = []
      this.dialogFile = false
      if (response.code === 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.searchData()
      } else {
        this.$message.error(response.data.msg)
      }
    },
    /**
     * @description: 文件上传失败的回调
     */
    error (response, file, fileList) {
      this.flag = true
      this.fileList = []
    },
    searchData () {
      this.search_data.page = 1
      this.info()
    },
    handlePageChange (val) {
      this.search_data.page = val
      this.info()
    },
    info () {
      let postData = this.search_data
      this.axios.post('/v1/property/list', postData).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.district = res.data.data.district
          this.village_name = res.data.data.village_name
          this.trade_area = res.data.data.trade_area
          this.checkTable = res.data.data.list
          this.tableInfo.total = res.data.data.count * 1
          this.checkTable.unshift({})
          this.tableStatus = []
          for (let i = 0; i < this.checkTable.length; i++) {
            this.checkTable[i].inde = i + (this.search_data.page - 1) * 20
            let obj = {}
            obj.acreage = this.checkTable[i].acreage
            obj.owner = this.checkTable[i].owner
            obj.phone = this.checkTable[i].phone
            obj.state = this.checkTable[i].state
            obj.remark = this.checkTable[i].remark
            obj.statusOptions = [
              {
                value: '1',
                label: '未拨打'
              },
              {
                value: '2',
                label: '已拨打'
              }
            ]
            obj.is_edit = false
            this.tableStatus.push(obj)
          }
          this.tableStatus.splice(0, 1, {})
        }
      })
    }
  },
  mounted () {
    this.quartersName = this.$route.query.name
    this.postData.village_id = this.$route.query.id
    this.search_data.village_id = this.$route.query.id
    this.searchData()
  },
  computed: {
    ...mapState({ button: state => state.buttons })
  }
}
</script>

<style lang="less" scoped>
.check-data {
  background-color: #fff;
  min-height: 100%;
  overflow: hidden;
  .btn-wrap {
    text-align: left;
    margin-bottom: 10px;
    button {
      margin-left: 20px;
    }
  }
  .check-table {
    margin-left: 20px;
    margin-bottom: 20px;
    .table-title {
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      color: #333;
    }
  }
  .noData {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
  }
}
.color-blue {
  color: blue;
  cursor: pointer;
}
.dialog-main {
  p {
    margin-top: 15px;
  }
  .btn {
    margin-bottom: 15px;
    display: block;
  }
}
.dia-footer {
  .btn-wrap {
    text-align: center;
    margin-bottom: 0;
    margin-top: 15px;
  }
}
</style>
<style scoped>
.check-data .inp-65 >>> .el-input__inner {
  width: 65px;
  padding-left: 0;
  padding-right: 0;
}
.check-data .inpPad >>> .el-input__inner {
  padding-left: 0;
  padding-right: 0;
}
.check-data .inp-65 >>> .el-input {
  width: 65px;
}
.check-data >>> .inp-65.el-select {
  display: inline-block;
}
.check-data .inp-65 >>> .el-input__icon {
  width: auto;
}
.check-data
  >>> .el-breadcrumb
  .el-breadcrumb__item:nth-child(2)
  .is-link:hover {
  cursor: inherit;
  color: #606266;
  font-weight: normal;
}
.check-data >>> .el-breadcrumb .el-breadcrumb__item:nth-child(2) .is-link {
  color: #606266;
  font-weight: normal;
}
.check-data >>> .el-upload-list {
  height: 20px;
  margin: 10px 0;
}
.check-data >>> .el-upload-list .el-upload-list__item:first-child {
  margin-top: 0;
}
.check-data >>> .el-upload-list .el-upload-list__item{
  transform: none;
  transition: all 0s;
}
</style>
