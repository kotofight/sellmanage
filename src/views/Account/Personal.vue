<template>
  <div>
    <Panel>
      <template #header> 管理员信息 </template>
      <template #content>
        <ul>
          <li>
            <strong>管理员ID</strong><span>{{ user.id }}</span>
          </li>
          <li>
            <strong>账号</strong><span>{{ user.account }}</span>
          </li>
          <li>
            <strong>用户组</strong><span>{{ user.userGroup }}</span>
          </li>
          <li>
            <strong>创建时间</strong><span>{{ user.ctime }}</span>
          </li>
          <li>
            <strong>管理员头像</strong
            ><el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
          <li>
            <el-button type="primary" size="mini" @click="save">保存</el-button>
          </li>
        </ul>
      </template>
    </Panel>
  </div>
</template>

<script>
import { local } from '../../utils/local.js'
import moment from 'moment'
import { saveAvatar } from '../../Api/users.js'
export default {
  created() {
    this.getInfo()
    // setInterval(() => {
    //   console.log(JSON.parse(local.get('user')).imgUrl)
    // }, 1)
    // setInterval(() => {
    //   console.log(this.user.imgUrl)
    // }, 1)
  },
  data() {
    return {
      user: {},
      imageUrl: '',
      imgUrl: ''
    }
  },
  methods: {
    getInfo() {
      this.user = JSON.parse(local.get('user'))
      this.imageUrl = this.user.imgUrl
      this.user.ctime = moment().format('YYYY年MM月DD日 HH:mm:ss')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imgUrl = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async save() {
      const data = await saveAvatar({
        imgUrl: this.imgUrl
      })
      if (data.code === 0) {
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
strong {
  font-weight: 700;
  margin-right: 10px;
}
li {
  margin-bottom: 15px;
  /deep/ img {
    width: 200px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
