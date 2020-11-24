<template>
  <div>
    <Panel>
      <template #header>店铺管理</template>
      <template #content>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="配送费">
            <el-input v-model="form.deliveryPrice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.sellCount"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox
                label="VC无限橙果汁全场8折"
                name="type"
              ></el-checkbox>
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
              <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input
              type="textarea"
              v-model="form.bulletin"
              :rows="8"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleShopSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getShopInfo, editShopInfo } from '../../Api/shop.js'
export default {
  created() {
    this.getShop()
  },
  data() {
    return {
      form: {
        supports: [],
        date: []
      },
      baseUrl: 'http://127.0.0.1:5000/upload/shop/',
      imageUrl: '',
      imageUrl2: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    async onSubmit() {
      this.form.supports = JSON.stringify(this.form.supports)
      this.form.pics = JSON.stringify(this.form.pics)
      this.form.date = JSON.stringify(this.form.date)
      const data = await editShopInfo(this.form)
      if (data.code === 0) {
        location.reload()
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.avatar = res.imgUrl
    },
    handleShopSuccess(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw)
      this.form.pics.push(res.imgUrl)
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
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      const i = this.form.pics.findIndex((item) => item === file.name)
      this.form.pics.splice(i, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async getShop() {
      const { data } = await getShopInfo()
      // console.log(data)
      this.form = data
      this.imageUrl = this.baseUrl + data.avatar
      data.pics.forEach((item) => {
        this.fileList.push({
          name: item,
          url: this.baseUrl + item
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-upload--picture-card {
  background-color: rgba(255, 255, 255, 0.2) !important;
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
.el-form {
  display: flex;
  flex-wrap: wrap;
}
/deep/.el-form-item {
  width: 50%;
  .el-input {
    width: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }

  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.2) !important;
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
  .el-textarea {
    textarea {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    width: 400px;
  }
}
</style>
