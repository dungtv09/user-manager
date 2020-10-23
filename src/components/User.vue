<template>
  <div class="text-center mt-5">
    <h1>Users List</h1>
    <button type="button" class="btn btn-primary mt-5" @click="addUser">
      Add new user
    </button>
    <form v-if="isActiveAddUserForm" class="container">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control mt-5"
            placeholder="First name"
            v-model="newFirstName"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control mt-5"
            placeholder="Last name"
            v-model="newLastName"
          />
        </div>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control mt-3"
          placeholder="Email"
          v-model="newEmail"
        />
      </div>
      <button type="submit" class="btn btn-success" @click="submitUser">
        Submit
      </button>
    </form>
    <div class="users-table mt-3">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">id</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="align-middle">
              <img :src="user.avatar" alt="" width="60px" height="60px" />
            </td>
            <td class="align-middle">{{ user.id }}</td>
            <td class="align-middle">{{ user.first_name }}</td>
            <td class="align-middle">{{ user.last_name }}</td>
            <td class="align-middle">{{ user.email }}</td>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-primary"
                @click="editUser(user, index)"
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-secondary"
                @click="removeUser(user, index)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div></template
>

<script>
export default {
  data() {
    return {
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      showModal: false
    };
  },
  computed: {
    isActiveAddUserForm() {
      return this.$store.state.isActiveAddUserForm;
    },

    users() {
      return this.$store.state.users;
    }
  },

  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData'
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('refreshUserList');
    next();
  },

  methods: {
    fetchData() {
      this.$store.commit('fetchData');
    },

    addUser() {
      this.$store.commit('toggleIsActiveAddUserForm');
    },

    submitUser() {
      this.$store.commit('submitUser', {
        firstName: this.newFirstName,
        lastName: this.newLastName,
        email: this.newEmail
      });
      this.newFirstName = '';
      this.newLastName = '';
      this.newEmail = '';
    },

    removeUser(user, index) {
      this.$store.commit('removeUser', { user, index });
    },

    editUser(user, index) {
      this.$store.commit('editUser', { user, index, router: this.$router });
    }
  }
};
</script>

<style></style>
