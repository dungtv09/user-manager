<template>
  <div class="text-center mt-5">
    <h1>Users</h1>
    <div class="users-table mt-5">
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
              <button type="button" class="btn btn-primary">Edit</button>
              <button type="button" class="btn btn-secondary">Remove</button>
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
      users: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      let pageNumber = -1;
      let getPageNumber = new Promise(function(resolve, reject) {
        fetch('https://reqres.in/api/users?page=1')
          .then(response => response.json())
          .then(data => {
            let temp = data['total_pages'];
            resolve(temp);
          });
      });
      getPageNumber.then(temp => {
        pageNumber = temp;
        for (let i = 1; i <= pageNumber; i++) {
          let getUsers = new Promise(function(resolve, reject) {
            fetch('https://reqres.in/api/users?page=' + i)
              .then(response => response.json())
              .then(data => {
                let temp = data.data;
                resolve(temp);
              });
          });
          getUsers.then(temp => {
            this.users = this.users.concat(temp);
          });
        }
      });
    }
  }
};
</script>

<style></style>
