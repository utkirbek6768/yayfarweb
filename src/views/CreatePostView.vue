<template>
  <div class="home_wrapper">
    <h1>Send Image to Telegram</h1>
    <form action="/send-image" method="post">
      <label for="chatId">Chat ID:</label>
      <input type="text" id="chatId" name="chatId" required /><br />
      <label for="imageUrl">Image URL:</label>
      <input type="text" id="imageUrl" name="imageUrl" required /><br />
      <button type="submit">Send Image</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const showButton = () => {
  tg.MainButton.show();
};

const onSendData = () => {
  try {
    // tg.sendData(JSON.stringify());
  } catch (error) {
    console.log(error);
  }
};

watchEffect(() => {
  showButton();
  tg.MainButton.setParams({
    text: "Tayyor",
  });
  tg.expand();
  tg.ready();
  tg.onEvent("mainButtonClicked", onSendData);
});
</script>

<style></style>
