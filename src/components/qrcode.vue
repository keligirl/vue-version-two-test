<template>
  <div>
    <div class="qrcode" ref="qrCodeUrl"></div>
    <el-button @click="setPrint">打印外部页面！</el-button>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {};
  },
  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "11111111", // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    setPrint() {
      window.print();
    },
  },
  mounted() {
    this.creatQrCode();
  },
};
</script>
