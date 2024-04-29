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
    <form @submit.prevent>
      <label for="id1">First name</label>
      <input type="text" id="id1" />
      <label for="id2">Last name</label>
      <input type="text" id="id2" />
      <label for="id3">Phone number</label>
      <input type="text" id="id3" />
      <label for="id4">Address</label>
      <input type="text" id="id4" />
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const file = ref("");
const fileURL = ref("");
const BOT_TOKEN = "6302856184:AAFr7Wan3KQJlg0d3DLiCZZ6keAuT6zZU98";
const CHAT_ID = "7181292313";

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
    alert("Error");
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
	
🚕 Mashina turi: Matiz`
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
  } finally {
    tg.close();
  }
};
const showButton = () => {
  if (file.value) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};
watchEffect(() => {
  showButton();
  tg.MainButton.setParams({
    text: "Tayyor",
  });
  tg.expand();
  tg.ready();
  tg.onEvent("mainButtonClicked", sendPicture);
});
</script>

<style>
.avtar_controller {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 20px;
}
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
  border-radius: 5px;
  overflow: hidden;
}
.avatar {
  display: block;
  object-fit: cover;
  width: 100px;
  height: 100px;
}
</style>
