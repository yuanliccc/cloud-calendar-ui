<template>
  <div class="full loading-b flex-row flex-center">
    <div class="loading-block">
      <!--<div class="flex-row flex-center">
        <div class="spinner"></div>
      </div>-->
      <div class="loader-block flex-row flex-center">
        <div class="loader">
          <div class="dot">L</div>
          <div class="dot">o</div>
          <div class="dot">a</div>
          <div class="dot">d</div>
          <div class="dot">i</div>
          <div class="dot">n</div>
          <div class="dot">g</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped>
  body {
    background: #ededed;
    -webkit-user-select: none;
    font-size: 14px;
  }

  .full {
    width: 100%;
    height: 100%;
  }
  .flex-center {
    justify-content: center;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .loader-block {
    position: relative;
    margin-top: 20%;
  }

  .loader {
    position: absolute;
  }
  .dot {
    width: 24px;
    height: 24px;
    font-weight: 600;
    text-align: center;
    background: #3ac;
    color: white;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
  }
  .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: var(--commonBg);
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: var(--commonBg);
  }
  .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: var(--commonBg);
  }
  .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: var(--commonBg);
  }
  .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: var(--commonBg);
  }
  .dot:nth-child(6) {
    animation-delay: 0.6s;
    background: var(--commonBg);
  }
  .dot:nth-child(7) {
    animation-delay: 0.7s;
    background: var(--commonBg);
  }
  @-moz-keyframes slide {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
  @-webkit-keyframes slide {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
  @-o-keyframes slide {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes slide {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }

  .loading-block {
    width: 100%;
  }

  .loading-b {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.41);
    -webkit-user-select: none;
  }

  .spinner {
    width: 60px;
    height: 60px;
    background-color: #009688;
    -webkit-animation: rotateplane 1.2s infinite ease-in-out;
    animation: rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }

  @keyframes rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
    } 50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
      } 100% {
          transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
          -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
  }
  :root{
    --commonBg: #333333;
    --commonBgHeaderHover: #acacac;
    --commonBgHeaderColor: #a7a7a7;
    --commonBgHeaderActive: #d6d6d6;
    --commonBodyBg:#f2f2f2;
    --commonOtherBg:rgba(51, 51, 51, 0.55);
    --commonColor: #6d6d6d;
    --commonColorHover: #555555;
    --commonColorUnActive: #bfbfbf;
    /*
    --commonBg: rgb(33, 150, 243);
    --commonBgHeaderHover: #1e88e5;
    --commonBgHeaderColor: white;
    --commonOtherBg:#2196f3;
    */
  }
</style>
