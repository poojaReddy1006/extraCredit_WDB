<template>
  <div class="task-card">
    <div v-if="!isEditing">
      <div>{{ task.title }}</div>
      <div class="status-row">
        <span class="status-label">Status:</span>
        <span class="status-value" :class="{ completed: task.completed, notCompleted: !task.completed }">
          {{ task.completed ? '✔️ Completed' : '❌ Not Completed' }}
        </span>
      </div>
      <div class="button-group">
        <button class="edit-btn" @click="editTask(task._id)">✏️ Edit</button>
        <button class="delete-btn" @click="deleteTask(task._id)">🗑️ Delete</button>
      </div>
    </div>

    <div v-if="isEditing">
      <form @submit.prevent="saveEdit">
        <input v-model="task.title" placeholder="Edit task title" required />
        <label>
          <input type="checkbox" v-model="task.completed" />
          Completed
        </label>
        <button type="submit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: 'TaskItem',
  props: {
    task: Object
  },
  data() {
    return {
      isEditing: false
    };
  },
  methods: {

    editTask() {
      this.isEditing = true;
      this.$emit('edit-task', this.task);
    },

    saveEdit() {
      this.isEditing = false;
      this.$emit('edit-task', this.task);
    },


    cancelEdit() {
      this.isEditing = false;
    },


    deleteTask() {
      this.$emit('delete-task', this.task._id);
    }
  }
}
</script>

<style scoped>
.task-card {
  background-color: khaki;
  padding: 4rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease-in-out;
}

.task-card:hover {
  transform: translateY(-2px);
}

form input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 6px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.status-label {
  color: #333;
}

.status-value {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
}

.status-value.completed {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-value.notCompleted {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.button-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.edit-btn {
  background-color: #e0f7fa;
  color: #00796b;
}

.edit-btn:hover {
  background-color: #b2ebf2;
  transform: scale(1.05);
}

.delete-btn {
  background-color: #ffebee;
  color: #c62828;
}

.delete-btn:hover {
  background-color: #ffcdd2;
  transform: scale(1.05);
}




  
</style>
  
