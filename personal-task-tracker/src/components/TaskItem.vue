<template>
  <div class="task-card">
    <div v-if="!isEditing">
      <div>{{ task.title }}</div>
      <div v-if="task.completed">✔️</div>
      <div v-else = "!task.completed">❌</div>
      <button @click="editTask">Edit</button>
      <button @click="deleteTask">Delete</button>
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
      isEditing: false // To track whether the task is being edited or not
    };
  },
  methods: {
    // Trigger the edit form
    editTask() {
      this.isEditing = true;
      this.$emit('edit-task', this.task);
    },

    // Save the edited task and emit the event to the parent
    saveEdit() {
      this.isEditing = false;
      this.$emit('edit-task', this.task); // Emit the updated task back to the parent
    },

    // Cancel editing and revert changes
    cancelEdit() {
      this.isEditing = false;
    },

    // Trigger the delete event
    deleteTask() {
      this.$emit('delete-task', this.task._id); // Emit the task ID for deletion
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


  </style>
  