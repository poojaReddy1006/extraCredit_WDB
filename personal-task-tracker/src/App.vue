<template>
 <div class="app-container">
    <header class="header">
      <div class="title">📝 Personal Task Tracker</div>
    </header>
    <main class="main">
      <!-- Router-view will handle rendering of Home component -->
      <router-view />
    </main>
    <footer class="footer">Made with ❤️ by Pooja</footer>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'App',
  components: {
    RouterLink, // Import the RouterLink component
  },

};

</script>

<style scoped>
/* Ensure the body and html take up the full height */
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
  /* height: 100%; */
}

/* Full viewport height container */
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
  background-color: #4a90e2;
  color: white;
  display: grid;
  grid-template-columns: 1fr auto; /* Title on left and button on the right */
  align-items: center; /* Vertically center the content */
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
  background-color: azure;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: black;
}

.footer {
  grid-area: footer;
  background-color: #eee;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (min-width: 768px) {
  .app-container {
    grid-template-columns: 1fr 3fr; /* Two columns for medium screens */
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
</style>
