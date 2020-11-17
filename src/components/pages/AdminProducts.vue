<template>
  <div>
    <!-- 讀取畫面 -->
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-ur5grgaunp">
        <div class="ldio-dwsbgiuamos">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </loading>

    <!-- PC 版商品管理 -->
    <div class="pc mt-5">
      <div class="float-left">
        <h4 class="mt-3 font-weight-bold">
          <i class="fa fa-wrench" aria-hidden="true"></i>
          產品管理
        </h4>
      </div>
      <div class="float-right">
        <button class="btn btn-secondary font-weight-bold mt-2 mb-3" @click="openModal(true)">添加新產品</button>
      </div>
    </div>

    <table class="table pc table-striped table-bordered mt-4 text-dark">
      <thead>
        <tr>
          <th scope="col" width="50">#</th>
          <th scope="col">名稱</th>
          <th scope="col" width="120">分類</th>
          <th scope="col" width="120">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="100">狀態</th>
          <th scope="col" width="150">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td class="text-left">{{ item.title }}</td>
          <td class="text-left">{{ item.category }}</td>
          <td class="text-right">{{ item.origin_price | numFormat | dollarSign }}</td>
          <td class="text-right">{{ item.price | numFormat | dollarSign }}</td>
          <td class="font-weight-bold">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-success btn-sm font-weight-bold"
              @click="openModal(false, item)"
            >編輯</button>
            <button class="btn btn-danger btn-sm font-weight-bold" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 手機版商品管理 -->
    <div class="mobile">
      <div>
        <div class="float-left">
          <h5 class="font-weight-bold">
            <i class="fa fa-wrench" aria-hidden="true"></i>
            產品管理
          </h5>
        </div>
        <div class="float-right">
          <button class="btn btn-sm btn-secondary font-weight-bold" @click="openModal(true)">添加新產品</button>
        </div>
      </div>
      <table class="table table-bordered table-striped text-dark">
        <thead>
          <tr>
            <th scope="col" width="20">操作</th>
            <th scope="col">點擊修改產品</th>
            <th scope="col" width="100">價格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                @click="openDelModal(item)"
                class="btn btn-outline-danger btn-sm"
              >
                <i aria-hidden="true" class="fa fa-trash"></i>
              </button>
            </td>
            <td>
              <a
                href="#"
                :class="{'text-danger':!item.is_enabled}"
                @click.prevent="openModal(false, item)"
              >{{ item.title }}</a>
            </td>
            <td class="text-right">
              <div v-if="item.price>0">
                <div class="text-primary">原價 {{ item.origin_price | numFormat | dollarSign }}</div>
                <div class="text-danger">特價 {{ item.price | numFormat | dollarSign }}</div>
              </div>
              <div class="text-warning" v-else>售價 {{ item.origin_price | numFormat | dollarSign }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pages -->
    <Pagination :pages="pagination" @event="getProducts"></Pagination>
    <!-- addProduct Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或
                    <label class="btn btn-success btn-sm">
                      <input
                        style="display: none"
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="files"
                        @change="uploadImg"
                      />
                      <i class="fa fa-photo"></i> 上傳圖片
                    </label>
                  </label>
                </div>
                <i class="mt-2 fa fa-spinner fa-pulse fa-fw fa-3x" v-if="status.imgUploading"></i>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                  :src="tempProduct.imageUrl"
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delProduct Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      products: [], // all products
      pagination: {}, // page
      tempProduct: {}, // 建立產品或修改產品時 用來存放產品
      isNew: false, // 判斷是否為新建立來修改 tempProduct 的值
      isLoading: false, // 判斷是否讀取中
      status: {
        imgUploading: false, // 判斷 font-awesome 的 icon 是否讀取中
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      // 獲取所有產品
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/admin/products?page=${page}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.products = res.data.products;
          vm.pagination = res.data.pagination;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    openModal(isNew, item) {
      // 開啟 modal
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      // 建立或修改產品
      const vm = this;
      let httpMethod = "post";
      let api =
        process.env.APIPATH + "api/" + process.env.MYPATH + "/admin/product";
      if (!vm.isNew) {
        api = `${api}/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.$bus.$emit("message:push", res.data.message, "danger");
          vm.getProducts();
        }
      });
    },
    openDelModal(item) {
      // 開啟刪除的 modal
      this.tempProduct = { ...item };
      $("#delProductModal").modal("show");
    },
    deleteProduct() {
      // 刪除產品
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.$bus.$emit("message:push", res.data.message, "danger");
          vm.getProducts();
        }
      });
    },
    uploadImg() {
      // 上傳產品圖片
      const vm = this;
      vm.tempProduct.imageUrl = "";
      vm.status.imgUploading = true;
      const img = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", img);
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/admin/upload`;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          vm.status.imgUploading = false;
          if (res.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", res.data.imageUrl);
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
  },
  created() {
    this.getProducts();
  },

  components: {
    Pagination, // 使用分頁元件
  },
};
</script>

<style lang="">
.mobile {
  display: none;
}
@media screen and (max-width: 420px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>