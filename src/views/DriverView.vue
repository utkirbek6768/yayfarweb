<template>
  <div class="home_wrapper">
    <div class="title drivertitle">Iltimos formani to'ldiring!</div>
    <form :model="form" enctype="multipart/form-data">
      <label for="userName">Ismingiz</label>
      <input
        type="text"
        v-model="form.userName"
        name="userName"
        id="userName"
        placeholder="Ismingizni kiriting"
      />
      <label for="carNumber">Mashina raqami</label>
      <input
        type="text"
        v-model="form.carNumber"
        name="carNumber"
        id="carNumber"
        placeholder="Mashina raqamini kiriting"
      />
      <label for="carType">Mashina modeli</label>
      <input
        type="text"
        v-model="form.carType"
        name="carType"
        id="carType"
        placeholder="Mashina turini kiriting"
      />
      <label for="where">Hudud</label>
      <select
        v-model="form.where"
        name="where"
        id="where"
        class="select"
        placeholder="Hududingizni tanlang"
      >
        <option value="fergana">Farg'ona</option>
        <option value="toshkent">Toshkent</option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  userName: "",
  carNumber: "",
  carType: "",
  active: false,
  where: "",
  tariff: "standart",
  chatId: "",
});

const showButton = () => {
  const { userName, carNumber, carType, where } = form.value;
  if (userName && carNumber && carType && where) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};

const onSendData = () => {
  try {
    tg.sendData(JSON.stringify(form.value));
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
