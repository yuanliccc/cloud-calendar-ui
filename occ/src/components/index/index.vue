<template>
    <div>
      <el-carousel :interval="8000" arrow="always"  class="image">
        <el-carousel-item  class="image">
          <img src="../../assets/image/enterpriseAboutUs/banner1.jpg">
        </el-carousel-item>
        <el-carousel-item  class="image">
          <img src="../../assets/image/enterpriseAboutUs/banner2.jpg">
        </el-carousel-item>
        <el-carousel-item  class="image">
          <img src="../../assets/image/enterpriseAboutUs/banner3.jpg">
        </el-carousel-item>
      </el-carousel>

      <!-- 主营业务 -->
      <div class="c-product">
        <div class="title">
          <p>主营业务</p>
          <p>Main Business</p>
          <div class="line"></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product1.png" />
                <h6>适应组织机构</h6>
                <p>基本适应所有的组织机构</p>
                <p>手动生成机构树</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product2.png" />
                <h6>提供权限控制</h6>
                <p>每个模块多个权限</p>
                <p>权限分配给角色</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product3.png" />
                <h6>日程发布</h6>
                <p>日程发布多样化</p>
                <p>支持事件修改日程</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product4.png" />
                <h6>工作安排</h6>
                <p>重复工作一次安排</p>
                <p>每年都在特定时间提示</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product5.png" />
                <h6>消息通知</h6>
                <p>支持个人通知</p>
                <p>支持机构通知</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="content">
                <img src="../../assets/image/enterpriseAboutUs/product6.png" />
                <h6>用户管理</h6>
                <p>邀请用户或者移除用户</p>
                <p>控制用户权限</p>
                <el-button type="primary">more</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="c-introduce">
        <div class="title">
          <p>云日历系统机构日历</p>
          <p>Cloud calendar</p>
          <div class="line"></div>
        </div>
        <div class="content">
          <img class="companyImg" src="../../assets/image/enterpriseAboutUs/companyProcess.png"/>
          <div class="bigGarden">
            <div class="smGarden">
              <div class="company">云日历</div>
              <div class="process">
                <p class="english">Cloud calendar</p>
                <p class="chinaese">机构日历</p>
              </div>
            </div>
            <div class="process smpx">
              <p class="english">Cloud calendar</p>
              <p class="chinaese">机构日历</p>
            </div>
          </div>
          <div class="introduce">
            <p><img src="../../assets/image/enterpriseAboutUs/introduce1.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce2.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce3.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce1.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce2.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce3.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce1.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
            <p><img src="../../assets/image/enterpriseAboutUs/introduce2.png"/>2003.8  公司正式成立2003.8  公司正式成立</p>
          </div>
        </div>

      </div>
      <!-- 版权信息 -->
      <div class="c-bottom">
        <div class="container">
          <div class="friendLink"><span class="title">友情链接:&nbsp;&nbsp;&nbsp;</span>/<span>百度</span>/<span>搜狗</span>/<span>网易</span>/</div>
          <div class="copyright">
            <div class="copyrightApp" style="display: none;">
              <p>Copyright © 千图网 沪ICP备10011451号-6</p>
              <p>ICP证书: 沪B2-20180057</p>
            </div>
            <p class="copyrightWind">Copyright © 2019-现在 </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data() {
        return {}
    }
  }
</script>

<style scoped>
  @import "../../assets/lib/public/enterpriseAboutUs.css";
</style>
