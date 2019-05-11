<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.df_header {
  height: 2.5em;  /* 设置高度为2.5em,其中em是相对于父元素的大小 */
  display: flex;  /* 设置布局方式为flex布局 */
  /**
  设置或检索弹性盒子在主轴(横轴)上的对其方式
  space-between:弹性盒子元素会平均的分布在行里
  */
  justify-content: space-between;
  flex-wrap: nowrap;  /* 指定弹性盒子的子元素换行方式,nowrap是默认值,弹性容器为单行 */
  box-shadow: 0px 2px 10px rgba(70,160,252, 0.6);  /* 设置外阴影 */
  padding: 0px 10px;  /* 上下内边距设置为0,左右内边距设置为10px */
  background-color: #1278f6;  /* 设置背景颜色 */

  .df_left_title {
    /**
    设置元素垂直对齐方式,middle指把此元素放置在父元素中部
    该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐
    */
    vertical-align: middle;
    color: #fff;  /* 设置颜色为白色 */
    font-size: 32px; /* 设置字体大小为32px */
    font-weight: 600;  /* 设置文本粗细 */
    opacity: 0.8;  /* 设置不透明级别,从0.0(完全透明)到1.0(完全不透明) */
    margin-left: 15px;  /* 设置左外边距 */
    overflow: hidden; /* overflow属性规定当内容溢出元素框时发生的事情,hidden表示内容将会被裁剪,其余内容不可见 */
    width: 20%;
    text-align: left;  /* 规定元素中的文本的水平对齐方式 */
  }

  .df_main_title {
    font-size: 32px;
    color: #fff;
    text-align: center;
    overflow: hidden;
  }

  .df_right_title {
    vertical-align: middle;
    font-size: 15px;
    font-weight: 600;  /* 设置文本粗细 */
    opacity: 0.8;  /* 设置不透明级别,从0.0(完全透明)到1.0(完全不透明) */
    margin-right: 15px;
    text-align: right;
    overflow: hidden;
    width: 20%;
    line-height:3em;
  }

  .df_right_title a {
    color: #fff;
  }
}

a {
  text-decoration: none;  /* 消除a标签的下划线 */
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
