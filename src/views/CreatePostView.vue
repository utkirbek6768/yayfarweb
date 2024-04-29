<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="sendPicture">Send Picture</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const file = ref(null);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const sendPicture = async () => {
  if (!file.value) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file.value);

  try {
    await axios.post(
      `https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendPhoto`,
      {
        chat_id: YOUR_CHAT_ID,
        photo: formData,
      }
    );
    console.log("Picture sent successfully");
  } catch (error) {
    console.error("Error sending picture:", error);
  }
};
</script>
