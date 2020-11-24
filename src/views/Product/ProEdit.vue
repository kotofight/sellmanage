<template>
  <div>
    <Panel>
      <template #header>商品编辑</template>
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
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="editProduct"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import { getGoods, getProCate, editPro } from '../../Api/pro.js'
export default {
  data() {
    return {
      id: this.$route.params.id,
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
      imgUrl: '',
      imageUrl: '',
      baseUrl: 'http://127.0.0.1:5000/upload/imgs/goods_img/'
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.getPro()
    this.getCate()
  },
  methods: {
    async getPro() {
      const { data } = await getGoods({
        id: this.id
      })
      console.log(data[0])
      this.form.name = data[0].name
      this.num = data[0].price
      this.form.desc = data[0].goodsDesc
      this.form.region = data[0].category
      this.imgUrl = data[0].imgUrl
      this.imageUrl = this.baseUrl + data[0].imgUrl
    },
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
    async editProduct() {
      const data = await editPro({
        name: this.form.name,
        category: this.form.region,
        price: this.num,
        imgUrl: this.imgUrl,
        goodsDesc: this.form.desc,
        id: this.id
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
