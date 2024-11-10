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
      <label for="phoneNumber">Telefon raqam</label>
      <input
        type="tel"
        v-model="form.phoneNumber"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Telefon raqamingizni kiriting"
        v-maska
        data-maska="+998 ## ### ## ##"
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
      <!-- <label for="where">Hudud</label>
      <select
        v-model="form.where"
        name="where"
        id="where"
        class="select"
        placeholder="Hududingizni tanlang"
      >
        <option value="far">Farg'ona</option>
        <option value="yay">Yaypan</option>
      </select> -->
      <!-- <div class="carNumberController">
        <input
          type="text"
          name="licenseplate"
          class="licenseplate"
          maxlength="12"
          placeholder="01 A 777 AA"
          v-model="licenseplate"
          @input="validateLicensePlate"
        />
      </div> -->
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { vMaska } from "maska";

const tg = window.Telegram.WebApp;

const form = ref({
  userName: "",
  phoneNumber: "+998 ",
  carNumber: "",
  carType: "",
  active: false,
  where: "yay",
  tariff: "standart",
  chatId: "",
  shift: false,
  queue: false,
  queueIndex: null,
});

const showButton = () => {
  const { userName, phoneNumber, carNumber, carType } = form.value;
  if (userName && carNumber && carType && phoneNumber) {
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

<style scoped>
body {
  background-color: #34495e;
}

.carNumberController {
  width: 100%;
}

.licenseplate {
  color: #333;
  background-color: #fff;
  background-image: url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrGe9kcyJPWUX55-uvh5cB4zo8zXF-CkNrxN2FkfKIlw-B0i0pDhkvrZ72WQB6mOEsBLHN_6TPVMaG8kXgtphbu7mGM1BxtSx5Jl4uPJXCIhLTdjg4MUpx_NiK7aZqu3qNclIalQsEcG2P/s320/uzbekistan-flag.jpg);
  background-repeat: no-repeat;
  background-size: 60px 50px;

  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;

  padding-left: 60px;
  padding-bottom: 10px;

  width: 100%;
  border: 3px solid red;
  border-radius: 10px;
  outline: none;

  &::placeholder {
    color: #eee;
  }
}
</style>
