<template>
  <div class="text-center">
    <form class="form-signin mt-5">
      <img
        class="mb-4"
        src="../assets/logo.jpg"
        alt=""
        width="80"
        height="80"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
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
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click="signIn"
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
    signIn() {
      this.$store.commit('signIn', [
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

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
