<template>
  <div class="text-center">
    <form class="form-sign mt-5">
      <img
        class="mb-4"
        src="../assets/logo.jpg"
        alt=""
        width="80"
        height="80"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
      <input
        type="text"
        id="inputUsername"
        class="form-control"
        placeholder="Email address"
        required
        v-model="email"
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="password"
      />
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click="signUp"
      >
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', [
        {
          email: this.email,
          password: this.password
        },
        this.$router
      ]);
    }
  }
};
</script>

<style></style>
