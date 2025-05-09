<template>
    <div class="task-list">
      <h2>📋 Your Tasks</h2>
      <div class="task-grid">
        <TaskItem
          v-for="task in tasks"
          :key="task._id"
          :task="task"
          @edit-task="$emit('edit-task', $event)" 
          @delete-task="$emit('delete-task', $event)"  
        />
      </div>
    </div>
  </template>
  
  <script>
  import TaskItem from './TaskItem.vue'
  
  export default {
    name: 'TaskList',
    components: {
      TaskItem
    },
    props: {
      tasks: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .task-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
  </style>
  