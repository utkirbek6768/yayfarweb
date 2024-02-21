<template>
  <div class="home_wrapper">
    <div class="title">
      Mashina buyurtma buyurtma qilish uchun formani toldiring
    </div>
    <form :model="form" enctype="multipart/form-data">
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
        <option value="fergana">Farg'ona</option>
        <option value="toshkent">Toshkent</option>
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

      <label for="description"
        >Izox / <span class="hint">ixtiyoriv</span></label
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
        <input class="input" v-model="form.delivery" type="checkbox" />
        <span class="switch"></span>
      </label>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const tg = window.Telegram.WebApp;

const form = ref({
  where: "",
  whereto: "",
  passengersCount: 0,
  delivery: false,
  description: "",
  orderStatus: "newOrder",
});

const showButton = () => {
  const { where, whereto } = form.value;
  if (where && whereto) {
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
