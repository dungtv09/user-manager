<template>
  <div class="text-center mt-5">
    <h1>Edit user with id: {{ id }}</h1>
    <form class="container mt-3">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control mt-5"
            placeholder="First name"
            v-model="firstNameEdit"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control mt-5"
            placeholder="Last name"
            v-model="lastNameEdit"
          />
        </div>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control mt-3"
          placeholder="Email"
          v-model="mailEdit"
        />
      </div>
      <button type="submit" class="btn btn-success mt-3" @click="updateUser">
        Update
      </button>
      <router-link tag="button" class="btn btn-info mt-3" to="/user">
        Back
      </router-link>
    </form>
  </div></template
>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      firstNameEdit: '',
      lastNameEdit: '',
      mailEdit: ''
    };
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id;
    }
  },
  methods: {
    updateUser() {
      this.$store.dispatch('updateUser', [
        {
          firstName: this.firstNameEdit,
          lastName: this.lastNameEdit,
          email: this.mailEdit
        },
        this.id
      ]);
      this.firstNameEdit = '';
      this.lastNameEdit = '';
      this.mailEdit = '';
    }
  }
};
</script>

<style></style>
