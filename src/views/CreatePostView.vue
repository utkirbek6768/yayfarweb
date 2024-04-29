<template>
  <div>
    <div class="imageLabelContainer">
      <img class="image" v-if="fileURL !== ''" :src="fileURL" alt="" />
      <label v-else class="imageLabel" for="image"
        ><img
          class="image"
          src="https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg"
          alt=""
      /></label>
    </div>
    <input
      style="display: none"
      type="file"
      id="image"
      @change="handleFileUpload"
    />
    <button @click="sendPicture">Send Picture</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const file = ref("");
const fileURL = ref("");
const BOT_TOKEN = "6302856184:AAFr7Wan3KQJlg0d3DLiCZZ6keAuT6zZU98";
const CHAT_ID = "177482674";

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

const sendPicture = async () => {
  if (file.value === "") {
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

<style>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.imageLabel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
}
.imageLabelContainer {
  display: block;
  object-fit: cover;
  width: 100px;
  height: 100px;
}
</style>
