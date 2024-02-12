<template>
  <div class="home_wrapper">
    <div class="title">
      Mashina buyurtma buyurtma qilish uchun formani toldiring
    </div>
    <form :model="form">
      <label for="where">Qayerdan</label>
      <select
        v-model="form.where"
        name="where"
        id="where"
        class="select"
        placeholder="Qayerdan "
      >
        <option value="fergana">Farg'ona</option>
        <option value="toshkent">Toshkent</option>
      </select>
      <label for="whereto">Qayerga</label>
      <select
        v-model="form.whereto"
        name="whereto"
        id="whereto"
        class="select"
        placeholder="Qayerga boramiz"
      >
        <option value="toshkent">Toshkent</option>
        <option value="fergana">Farg'ona</option>
      </select>
      <label for="passengerscount">Yo'lovchilar soni</label>
      <select
        v-model="form.passengerscount"
        name="passengerscount"
        id="passengerscount"
        class="select"
        placeholder="Yo'lovchilar sonini kiriting"
      >
        <option value="0">Faqat pochta</option>
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
        placeholder="Pochta bormi"
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
    form.where.length > 0 &&
    form.whereto.length > 0 &&
    form.passengerscount.length > 0 &&
    form.delivery.length > 0
  ) {
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
  if (
    form.where.length > 0 &&
    form.whereto.length > 0 &&
    form.passengerscount.length > 0 &&
    form.delivery.length > 0
  ) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
  tg.onEvent("mainButtonClicked", onSendData);
});
</script>
