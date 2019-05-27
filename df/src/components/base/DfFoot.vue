<template>
  <div>
    <div class="foot-block flex-row flex-center">
      <div class="foot-container flex-row">
        <div class="foot-link-block">
          <a href="#" class="foot-link">Copyright © 2013-2019 Cloud-calendar</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">沪ICP备110XXXX号-X</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">隐私条款</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">服务条款</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'df-foot'
}
</script>
<style>
  .foot-block {
    border-top:1px solid #3333;
    bottom: 0px;
    height: 4vh;
    width: 100%;
  }

  .foot-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .foot-link-block {
    margin-right: 15px;
    margin-bottom: 3px;
    font-size: 0.8em;
  }

  .foot-link {
    color: #a6a6a6;
  }
</style>
