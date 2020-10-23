import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    isActiveAddUserForm: false
  },
  mutations: {
    // Hiện danh sách user
    fetchData(state) {
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
            state.users = state.users.concat(temp);
          });
        }
      });
    },

    // Bật/tắt form add user
    toggleIsActiveAddUserForm(state) {
      state.isActiveAddUserForm = !state.isActiveAddUserForm;
    },
    // Submit user mới
    submitUser(state, payload) {
      if (
        payload.firstName === '' ||
        payload.lastName === '' ||
        payload.email === ''
      ) {
        alert('Input field must be filled out');
      } else {
        fetch('https://reqres.in/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert(
              'New user "' +
                payload.firstName +
                ' ' +
                payload.lastName +
                '" with id "' +
                data.id +
                '" created'
            );
          });
      }
    },

    // Xóa user
    removeUser(state, payload) {
      fetch('https://reqres.in/api/users/' + payload.index, {
        method: 'DELETE'
      }).then(response =>
        alert(
          'Removed user: ' +
            payload.user.first_name +
            ' ' +
            payload.user.last_name
        )
      );
    },

    editUser(state, payload) {
      payload.router.push('/');
    }
  }
});
