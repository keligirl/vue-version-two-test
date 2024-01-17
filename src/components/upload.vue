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
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>

          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <video id="video" controls></video>
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
export default {
  data() {
    return {
      fileList: [
        {
          type: "video",
          name: "food.jpg",
          url: "../assets/20231208_225737.mp4",
        },
        { type: "image", name: "nature.jpg", url: "../assets/logo.png" },
      ],
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
        console.log(1705469766865 - 1705469778235);

        const ffmpeg = createFFmpeg({
          corePath: "ffmpeg-core.js",
          log: true,
        });

        await ffmpeg.load();
        console.log("开始压缩");
        ffmpeg.FS("writeFile", item.file.name, await fetchFile(item.file));
        await ffmpeg.run(
          "-i",
          item.file.name,
          "-r",
          "10",
          "-b",
          "100000",
          "put.mp4"
        );
        console.log("压缩完成");
        const data = ffmpeg.FS("readFile", "put.mp4");
        //把压缩后的视频进行回显
        let files = new File([data.buffer], item.file.name, {
          type: "video/mp4",
        });
        console.log(1111, files);
        console.log(Date.now());

        const video = document.getElementById("video");
        video.src = URL.createObjectURL(
          new Blob([data.buffer], {
            type: "video/mp4",
          })
        );

        return;
        const result = await this.$AliyunOssUploadService.upload(item.file);
        if (result) {
          item.file.id = result.data.id;
          item.onSuccess(result, item.file);
        }
      } catch (error) {
        // item.onError(err, item.file);
        console.log(11111);
      }
    },
  },
};
</script>

<style></style>
