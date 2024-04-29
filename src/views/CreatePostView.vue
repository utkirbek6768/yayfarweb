<template>
  <div class="home_wrapper">
    <h1>Send Image to Telegram</h1>
    <form @submit.prevent="sendImage">
      <label for="chatId">Chat ID:</label>
      <input type="text" v-model="chatId" required /><br />
      <label for="imageFile">Select Image File:</label>
      <input type="file" id="imageFile" ref="imageFile" required /><br />
      <button type="submit">Send Image</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chatId = ref("");
const imageFile = ref(null);

const sendImage = async () => {
  try {
    const formData = new FormData();
    formData.append("chatId", chatId.value);
    formData.append("imageFile", imageFile.value.files[0]);

    const response = await fetch("/send-image", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Image sent successfully!");
    } else {
      alert("Failed to send image. Please try again.");
    }
  } catch (error) {
    console.error("Error sending image:", error);
    alert("An error occurred. Please try again later.");
  }
};
</script>

<style></style>
