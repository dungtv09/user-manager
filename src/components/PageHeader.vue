<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">User Manager</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/user"
            ><i class="fas fa-user-edit"></i> Manager</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signin"
            ><i class="fas fa-sign-in-alt"></i> Sign In</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup"
            ><i class="fas f fa-sign-in-alt"></i> Sign Up</router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link sign-out"
            ><i class="fas fa-sign-out-alt"></i> Sign Out</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.sign-out {
  cursor: pointer;
}
</style>
