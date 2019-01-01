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

  .loader-block {
    position: relative;
    margin-top: 150px;
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
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
  }
  .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: #32aacc;
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: #64aacc;
  }
  .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: #96aacc;
  }
  .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: #c8aacc;
  }
  .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: #faaacc;
  }
  .dot:nth-child(6) {
    animation-delay: 0.6s;
    background: #faaacc;
  }
  .dot:nth-child(7) {
    animation-delay: 0.7s;
    background: #faaacc;
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
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
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
</style>
