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
const CHAT_ID = "177482674";

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
  formData.append(
    "caption",
    `
📩 Haydovchi malumotlari

📍 Ismi: Utkirbek

📍 Mashina raqami: 40 N 451 PA

🚕 Mashina turi: Matiz
  `
  );
  formData.append(
    "reply_markup",
    JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Smenani boshlash",
            callback_data: JSON.stringify({
              com: "start",
              id: "resId",
            }),
          },
        ],
      ],
    })
  );

  try {
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto?chat_id=${CHAT_ID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error("Error sending picture:", error);
  }
};
</script>
