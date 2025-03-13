<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      list-type="picture-card"
      :http-request="customReq"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <template v-if="file.type == 'video'">
          <video controls width="100%" height="100%">
            <source :src="file.url" type="video/mp4" />
          </video>
        </template>
        <template v-if="file.type == 'image'">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </template>

        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>

          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <video id="video" controls width="200px" height="200px"></video>
    <img id="img" width="200px" height="200px" />
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Compressor from "compressorjs";

export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      // 自定义预览图片的操作
      console.log("预览图片", file);
    },
    handleRemove(file, fileList) {
      // 自定义移除文件的操作
      console.log("移除文件", file, fileList);
    },
    //图片上传阿里云地址
    async customReq(item) {
      try {
        console.log(item.file);
        if (item.file.type.search("image") > -1) {
          // 图片文件压缩
          const files = await this.compressImage(item);
          console.log("压缩后的文件11111", files);
        }
        if (item.file.type.search("video") > -1) {
          // 视频文件压缩
          const files = await this.compressVideo(item);
          console.log("压缩后的文件", files);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 视频文件压缩
    async compressVideo(item) {
      console.log(Date.now());

      const ffmpeg = createFFmpeg({
        // corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
        // * 文件直接放到public目录下 start
        // corePath: "ffmpeg-core.js",
        // corePath: "/ffmpeg-core.js",
        // * 文件直接放到public目录下 end
        corePath: "/corePath/ffmpeg-core.js",
        // ! 如果是空，则路径是@ffmpeg/core/dist/ffmpeg-core.js'。但是依赖中就是没有该文件
        log: true,
      });

      await ffmpeg.load();
      console.log("开始压缩");
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(item.file));

      // 运行 FFmpeg 命令
      await ffmpeg.run(
        "-i",
        "input.mp4", // 输入文件

        "-vf",
        "scale=720:-2,fps=24", // 降低分辨率和帧率

        "-c:v",
        "libx264", // 使用 H.264 编码器

        "-preset",
        "ultrafast", // 最快编码速度

        "-tune",
        "fastdecode", // 优化解码速度

        "-crf",
        "20", // 质量较差但文件更小

        "-bf",
        "0", // 禁用 B 帧

        "-refs",
        "1", // 减少参考帧

        "-me_method",
        "dia", // 使用快速运动估计算法

        "-c:a",
        "copy", // 直接复制音频流

        "output.mp4" // 输出文件
      );

      console.log("压缩完成");
      const data = ffmpeg.FS("readFile", "output.mp4");
      //把压缩后的视频进行回显
      let files = new File([data.buffer], item.file.name, {
        type: "video/mp4",
      });
      console.log("压缩后的文件", files);

      const video = document.getElementById("video");
      video.src = URL.createObjectURL(
        new Blob([data.buffer], {
          type: "video/mp4",
        })
      );
      console.log(Date.now());
      return files;
    },
    // 图片文件压缩
    async compressImage(item) {
      return new Promise((resolve, reject) => {
        let response = new Compressor(item.file, {
          quality: 0.6,

          // The compression process is asynchronous,
          // which means you have to access the `result` in the `success` hook function.
          success(result) {
            console.log("压缩执行结果：", result);

            // The third parameter is required for server
            const files = new File([result], "output.jpg", {
              type: "image/jpg",
              lastModified: Date.now(),
            });

            const img = document.getElementById("img");
            img.src = URL.createObjectURL(result);

            resolve(files);
          },
          error(err) {
            console.log(err.message);
            reject(err);
          },
        });

        console.log("9999", response);
      });
    },
  },
};
</script>

<style></style>
