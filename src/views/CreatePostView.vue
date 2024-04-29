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
const BOT_TOKEN = "6302856184:AAFr7Wan3KQJlg0d3DLiCZZ6keAuT6zZU98";

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
      `https://api.telegram.org/bot6302856184:AAFr7Wan3KQJlg0d3DLiCZZ6keAuT6zZU98/sendPhoto`,
      {
        chat_id: 177482674,
        photo: formData,
      }
    );
    alert("Image sent successfully!");
  } catch (error) {
    alert(JSON.stringify(error));
    console.error("Error sending picture:", error);
  }
};
// const sendImage = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("chatId", chatId.value);
//     formData.append("imageFile", imageFile.value.files[0]);

//     const response = await fetch("/send-image", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       alert("Image sent successfully!");
//     } else {
//       alert("Failed to send image. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error sending image:", error);
//     alert("An error occurred. Please try again later.");
//   }
// };
</script>
