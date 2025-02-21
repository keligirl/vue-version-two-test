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
          this.compressImage(item);
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
      ffmpeg.FS("writeFile", item.file.name, await fetchFile(item.file));
      await ffmpeg.run("-i", item.file.name, "-r", "10", "-b", "100000", "put.mp4");
      console.log("压缩完成");
      const data = ffmpeg.FS("readFile", "put.mp4");
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

      return files;
    },
    // 图片文件压缩
    async compressImage(item) {
      new Compressor(item.file, {
        quality: 0.6,

        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {
          const formData = new FormData();
          console.log("压缩执行结果：", result);

          // The third parameter is required for server
          formData.append("file", result, result.name);
          console.log("压缩后的图片：", formData);

          const img = document.getElementById("img");
          img.src = URL.createObjectURL(result);

          // Send the compressed image file to server with XMLHttpRequest.
          // axios.post("/path/to/upload", formData).then(() => {
          //   console.log("Upload success");
          // });
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
  },
};
</script>

<style></style>
