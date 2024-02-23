<template>
  <div class="home_wrapper">
    <div class="title hometitle">Iltimos formani to'ldiring!</div>
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
      <label for="cartype">Mashina modeli</label>
      <input
        type="text"
        v-model="form.cartype"
        name="cartype"
        id="cartype"
        placeholder="Mashina turini kiriting"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  userName: "",
  carNumber: "",
  cartype: "",
  active: false,
});

const showButton = () => {
  const { where, whereto } = form.value;
  if (userName && carNumber && cartype) {
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
.hometitle {
  font-size: 15px;
}
.switch-holder {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Visually hide the checkbox input from the DOM, we only need it semantically */
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
/* color background */
.switch {
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  border-radius: var(--switch-size);
  background-color: #999;
  transition: background-color 0.25s ease-in-out;
}
/* circle inside the switch */
.switch::before {
  content: "";
  position: absolute;
  left: 2px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  border-radius: 9999px;
  background-color: white;
  transition: transform 0.375s ease-in-out;
}
/* style for ON state */
.input:checked + .switch {
  background-color: #248dde;
}
.input:checked + .switch::before {
  border-color: #248dde;
  transform: translateX(
    calc(var(--switch-container-width) - var(--switch-size))
  );
}
/* text */
.label {
  margin-left: 10px;
  font-size: 24px;
  color: #222;
  display: block;
}
</style>
