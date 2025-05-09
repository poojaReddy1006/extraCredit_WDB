<template>
  <div>

    <button @click="showForm = true; showTasks = false" style="border-radius: 5px;">➕ Add Task</button>
    <Filter @change-filter="setFilter" />


    <TaskForm v-if="showEditForm" :task="editingTask" @submit-task="handleSubmitTask" @cancel-form="cancelEditForm" />

    <TaskList v-if="showTasks" :tasks="filteredTasks" @edit-task="handleTaskEdit" @delete-task="deleteTask" />

    <TaskForm v-if="showForm" :task="null" @submit-task="handleSubmitTask" @cancel-form="cancelForm" />



  </div>

</template>

<script>
import TaskList from '../components/TaskList.vue'
import TaskForm from '../components/TaskForm.vue'
import Filter from '../components/Filter.vue';


export default {
  name: 'Home',
  components: {
    TaskList,
    TaskForm,
    Filter
  },
  data() {
    return {
      showEditForm: false,
      showForm: false,
      showTasks: true,
      editingTask: null,
      filter: 'all',
      tasks: []
    }
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
      if (this.filter === 'pending') return this.tasks.filter(t => !t.completed);
      return this.tasks;
    }
  },
  methods: {
    // Fetch tasks from API
    async fetchTasks() {
      try {
        const response = await fetch('https://webdb-extracredit-api.onrender.com/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async handleSubmitTask(taskData) {
      try {
        let response;

        if (taskData._id) {
          // If _id exists, it's an update
          response = await fetch(`https://webdb-extracredit-api.onrender.com/api/tasks/${taskData._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          });
        } else {
          // No _id means it's a new task
          response = await fetch('https://webdb-extracredit-api.onrender.com/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          });
        }

        if (!response.ok) {
          throw new Error(`Failed to ${taskData._id ? 'update' : 'create'} task`);
        }

        const savedTask = await response.json();

        if (taskData._id) {
          const index = this.tasks.findIndex(task => task._id === savedTask._id);
          if (index !== -1) this.tasks.splice(index, 1, savedTask);
        } else {
          this.tasks.push(savedTask);
        }

        this.showForm = false;
        this.showTasks = true;
        this.showEditForm = false;

      } catch (error) {
        console.error(`Error ${taskData._id ? 'updating' : 'creating'} task:`, error);
        alert(`Failed to ${taskData._id ? 'update' : 'create'} task.`);
      }
    },


    cancelForm() {
      this.showForm = false;
      this.showTasks = true;
      this.showEditForm = false;
    },
    handleTaskEdit(tasks) {
      this.editingTask = tasks;
      console.log(this.editingTask);
      this.showTasks = false;
      this.showEditForm = true;
    },

    // Delete task from the list
    async deleteTask(taskId) {
      try {
        const response = await fetch(`https://webdb-extracredit-api.onrender.com/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },


    cancelEditForm() {
      this.showForm = false;
      this.showTasks = true;
      this.showEditForm = false;
    },

    setFilter(newFilter) {
      this.filter = newFilter;
    }

  }
}
</script>

<style scoped>
header {
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>