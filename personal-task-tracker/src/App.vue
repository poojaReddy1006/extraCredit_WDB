<template>
  <div class="app-container">
    <header class="header">
      <div class="title">📝 Personal Task Tracker</div>
      <button class="dark-toggle" @click="toggleDarkMode">
        {{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </header>
    <main class="main">
      <!-- Router-view will handle rendering of Home component -->
      <router-view />
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'App',
  components: {
    RouterLink, 
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
  },

};

</script>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
}

.app-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  min-height: 100vh;
  grid-template-areas:
    "header"
    "main"
    "footer";
  min-height: 100vh;
  width: 100%;
}

.header {
  grid-area: header;
  background-color: brown;
  color: white;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  text-align: left;
}


.add-task-btn {
  background-color: #ff8c00;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.add-task-btn:hover {
  background-color: #e07b00;
}

.main {
  grid-area: main;
  background-color: beige;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: black;
}


@media (min-width: 768px) {
  .app-container {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header header"
      "main main"
      "footer footer";
  }

  .header {
    text-align: left;
    padding: 1.5rem;
  }

}

@media (min-width: 1024px) {
  .app-container {
    grid-template-columns: 1fr 4fr;
  }
}

body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

body.dark-mode .header {
  background-color: #1e1e1e;
  color: #ffffff;
}

body.dark-mode .main {
  background-color: #2c2c2c;
  color: #ffffff;
}

body.dark-mode .footer {
  background-color: #1e1e1e;
}

body.dark-mode .add-task-btn,
body.dark-mode .dark-toggle {
  background-color: #444;
  color: #fff;
}

body.dark-mode .add-task-btn:hover,
body.dark-mode .dark-toggle:hover {
  background-color: #333;
}
</style>
