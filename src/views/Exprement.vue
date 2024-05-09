<template>
  <div v-if="username">User's Telegram username: {{ username }}</div>
  <div v-else>User does not have a Telegram username.</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Telegraf } from "telegraf";

// Create a new Telegraf bot instance
const bot = new Telegraf("YOUR_BOT_TOKEN");

// User ID to fetch username
const userId = 123456789; // Replace with the user's ID

// Reactive reference to store the username
const username = ref("");

// Function to fetch and set the username
const fetchUsername = async () => {
  try {
    const profilePhotos = await bot.telegram.getUserProfilePhotos(
      userId,
      0,
      0,
      1
    );
    if (profilePhotos.total_count > 0) {
      const photo = profilePhotos.photos[0];
      if (photo.username) {
        username.value = photo.username;
      }
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }
};

// Fetch the username when the component is mounted
onMounted(fetchUsername);
</script>
