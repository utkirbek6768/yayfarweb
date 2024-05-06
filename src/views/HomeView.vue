<template>
  <div class="home_wrapper">
    <div class="title hometitle">
      Mashina buyurtma qilish uchun formani toldiring
    </div>
    <form :model="form" enctype="multipart/form-data">
      <label for="where">Qayerdan</label>
      <select
        v-model="form.where"
        name="where"
        id="where"
        class="select"
        placeholder="Qayerdan"
        @change="handlerCheckInputFer"
      >
        <option value="fer">Farg'ona</option>
        <option value="tosh">Toshkent</option>
      </select>
      <label for="whereto">Qayerga</label>
      <select
        v-model="form.whereto"
        name="whereto"
        id="whereto"
        class="select"
        placeholder="Qayerga boramiz"
        @change="handlerCheckInputTosh"
      >
        <option value="fer">Farg'ona</option>
        <option value="tosh">Toshkent</option>
      </select>
      <label for="passengerscount">Yo'lovchilar soni</label>
      <select
        v-model="form.passengersCount"
        name="passengerscount"
        id="passengerscount"
        class="select"
        placeholder="Yo'lovchilar sonini kiriting"
      >
        <option value="Ko'rsatilmagan"></option>
        <option value="1">1 kishi</option>
        <option value="2">2 kishi</option>
        <option value="3">3 kishi</option>
        <option value="4">4 kishi</option>
        <option value="5">5 kishi</option>
      </select>
      <label for="phoneNumber">Telefon raqaamingizni kiriting </label
      ><span>{{ form.phoneNumber.length }}</span
      ><span>{{ typeof form.phoneNumber }}</span>
      <input
        type="tel"
        v-model="form.phoneNumber"
        name="phoneNumber"
        id="phoneNumber"
        class="input"
        v-maska
        data-maska="+998 ## ### ## ##"
      />

      <label for="description"
        >Izox <span class="hint">( ixtiyoriv )</span></label
      >
      <textarea
        v-model="form.description"
        name="description"
        id="description"
        class="textarea"
      ></textarea>
      <label class="switch-holder">
        <span v-if="form.delivery">Siz pochta biriktirdingiz</span>
        <span v-else>Pochta biriktirish</span>
        <input
          class="switch-holder_input"
          v-model="form.delivery"
          type="checkbox"
        />
        <span class="switch"></span>
      </label>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { vMaska } from "maska";
// import { RouterView } from "vue-router";
// import router from "../router/index.js";
const tg = window.Telegram.WebApp;

const form = ref({
  where: "",
  whereto: "",
  passengersCount: "Kiritilmagan",
  delivery: false,
  phoneNumber: "+998",
  description: "",
  orderStatus: "newOrder",
});

const handlerCheckInputFer = () => {
  if (form.value.where == "fer") {
    form.value.whereto = "tosh";
  } else if (form.value.where == "tosh") {
    form.value.whereto = "fer";
  } else {
    form.value.whereto = "";
    form.value.where = "";
  }
};

const handlerCheckInputTosh = () => {
  if (form.value.whereto == "fer") {
    form.value.where = "tosh";
  } else if (form.value.whereto == "tosh") {
    form.value.where = "fer";
  } else {
    form.value.whereto = "";
    form.value.where = "";
  }
};

const showButton = () => {
  const { where, whereto, phoneNumber } = form.value;
  if (where && whereto && phoneNumber.length >= 17) {
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

<style scoped></style>
