<template>
  <div>
    <Panel>
      <template #header>商品添加 </template>
      <template #content>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择商品分类">
              <el-option
                :label="item.cateName"
                :value="item.cateName"
                v-for="item in cate"
                :key="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="0"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addCate"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getProCate, addPro } from '../../Api/pro.js'
export default {
  created() {
    this.getCate()
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      cate: {},
      num: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      imgUrl: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleChange(value) {
      console.log(value)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imgUrl = res.imgUrl
    },
    async getCate() {
      const { categories } = await getProCate()
      this.cate = categories
    },
    async addCate() {
      const data = await addPro({
        name: this.form.name,
        category: this.form.region,
        price: this.num,
        imgUrl: this.imgUrl,
        goodsDesc: this.form.desc
      })
      if (data.code === 0) {
        this.$router.push('/pro/list')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item {
  .el-input {
    width: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    input {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    background-color: rgba(255, 255, 255, 0.2) !important;
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
