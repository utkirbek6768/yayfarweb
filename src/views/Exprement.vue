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
    <form @submit.prevent="submitForm">
      <label for="fullName">Full name</label>
      <input type="text" id="fullName" v-model="fullName" />
      <!-- Add other form fields here -->
      <button type="submit" @click="submitForm()">Send</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

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

const submitForm = async () => {
  try {
    tg.sendData(JSON.stringify(form));
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
/* Your styles here */
</style>
