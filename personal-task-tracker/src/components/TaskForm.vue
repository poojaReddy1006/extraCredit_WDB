<template>
  <div class="task-form">
    <h3>{{ task ? 'Edit Task' : 'Add New Task' }}</h3>
    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="Task title" style="width: -webkit-fill-available;" required />
      <label class="checkbox-label">
        <input type="checkbox" v-model="completed" />
        Completed
      </label>
      <div>
        <button type="submit" style="margin: 30px;">{{ task ? 'Update' : 'Add' }}</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: this.task ? this.task.title : '',
      completed: this.task ? this.task.completed : false
    }
  },
  methods: {
  submitForm() {
    const taskData = {
      title: this.title,
      completed: this.completed
    }

    // Only include _id if editing an existing task
    if (this.task && this.task._id !== undefined) {
      taskData._id = this.task._id
    }

    this.$emit('submit-task', taskData)
  },
  cancel() {
      this.$emit('cancel-form')
    }
}
}
</script>

<style scoped>
.checkbox-label {
  display: inline-block;
  /* or 'block' */
  margin: 1rem 0;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.task-form {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>