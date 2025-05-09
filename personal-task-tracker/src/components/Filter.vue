<template>
  <div class="filter-buttons">
    <button :class="{ active: selected === 'all' }" @click="changeFilter('all')">All</button>

    <button :class="{ active: selected === 'completed' }" @click="changeFilter('completed')">Completed</button>

    <button :class="{ active: selected === 'pending' }" @click="changeFilter('pending')">Pending</button>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  data() {
    return {
      selected: 'all'
    }
  },
  methods: {
    changeFilter(option) {
      this.selected = option;
      this.$emit('change-filter', option);
    }
  }
}
</script>

<style scoped>
.filter-buttons {
  margin: 1rem 0;
}

button {
  margin-right: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>