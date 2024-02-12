<template>
  <div class="home_wrapper">
    <div class="title">
      Mashina buyurtma buyurtma qilish uchun formani toldiring
    </div>
    <form :model="form">
      <label for="where">Qayerdan</label>
      <select v-model="form.where" name="where" id="where" class="select">
        <option value="fergana">Farg'ona</option>
        <option value="toshkent">Toshkent</option>
      </select>
      <label for="whereto">Qayerga</label>
      <select v-model="form.whereto" name="whereto" id="whereto" class="select">
        <option value="toshkent">Toshkent</option>
        <option value="fergana">Farg'ona</option>
      </select>
      <label for="passengerscount">Yo'lovchilar soni</label>
      <select
        v-model="form.passengerscount"
        name="passengerscount"
        id="passengerscount"
        class="select"
      >
        <option value="1">1 kishi</option>
        <option value="2">2 kishi</option>
        <option value="3">3 kishi</option>
        <option value="4">4 kishi</option>
        <option value="5">5 kishi</option>
      </select>
      <label for="delivery">Pochta</label>
      <select
        v-model="form.delivery"
        name="delivery"
        id="delivery"
        class="select"
      >
        <option value="deliveryYes">Pochta yo'q</option>
        <option value="deliveryNo">Pochta bor</option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  where: "",
  whereto: "",
  passengerscount: "",
  delivery: "",
});

const showButton = () => {
  if (
    form.where !== "" ||
    form.whereto !== "" ||
    form.passengerscount !== "" ||
    form.delivery !== ""
  ) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
};

watchEffect(() => {
  tg.onEvent("mainButtonClicked", onSendData);
});
</script>
