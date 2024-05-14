<template>
  <div class="wrapper">
    <div class="avtar_controller">
      <h1>Form title</h1>
      <div class="avatar">
        <img class="image" v-if="fileURL !== ''" :src="fileURL" alt="" />
        <label v-else class="imageLabel" for="image"
          ><img
            class="image"
            src="https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg"
            alt="Default avatar image"
        /></label>
      </div>
      <input
        style="display: none"
        type="file"
        id="image"
        @change="handleFileUpload"
      />
    </div>

    <button type="submit" @click="onSendData()">Send</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const file = ref("");
const fileURL = ref("");
const fullName = ref("");
// Add other form field refs here

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    file.value = selectedFile;
    fileURL.value = e.target.result;
  };
  reader.readAsDataURL(selectedFile);
};

const onSendData = async () => {
  try {
    if (file.value === "") {
      alert("Error");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    tg.sendData(JSON.stringify(file));
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => {
  if (file.value) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
  tg.MainButton.setParams({
    text: "Tayyor",
  });
  tg.expand();
  tg.ready();
  tg.onEvent("mainButtonClicked", onSendData);
});
</script>

<style>
/* Your styles here */
</style>
