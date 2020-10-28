import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    isActiveAddUserForm: false,
    isSignIn: localStorage.getItem('isSignIn') || 'false'
  },
  actions: {
    checkIsSignIn({ commit, state }) {
      state.isSignIn = localStorage.getItem('isSignIn') || 'false';
    },

    falseIsActiveAddUserForm({ commit, state }) {
      state.isActiveAddUserForm = false;
    },

    fetchData({ commit, state }) {
      let pageNumber = -1;
      let pages = -1;
      let usersTemp = [];
      let getPageNumber = new Promise(function(resolve, reject) {
        fetch('https://reqres.in/api/users')
          .then(response => response.json())
          .then(data => {
            pages = data.total_pages;
            resolve(pages);
          });
      });
      getPageNumber.then(pages => {
        pageNumber = pages;
        for (let i = 1; i <= pageNumber; i++) {
          let getUsers = new Promise(function(resolve, reject) {
            fetch('https://reqres.in/api/users?page=' + i)
              .then(response => response.json())
              .then(data => {
                usersTemp = data.data;
                resolve(usersTemp);
              });
          });
          getUsers.then(usersTemp => {
            state.users = state.users.concat(usersTemp);
            usersTemp = [];
          });
        }
      });
    },

    refreshUserList({ commit, state }) {
      state.users = [];
    },

    // Bật/tắt form add user
    toggleIsActiveAddUserForm({ commit, state }) {
      state.isActiveAddUserForm = !state.isActiveAddUserForm;
    },

    // Submit user mới
    submitUser({ commit }, payload) {
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
            alert(
              'New user "' +
                payload.firstName +
                ' ' +
                payload.lastName +
                '" with id ' +
                data.id +
                ' created'
            );
          });
      }
    }, // Xóa user
    removeUser({ commit }, payload) {
      fetch('https://reqres.in/api/users/' + payload[0].index, {
        method: 'DELETE'
      }).then(response => {
        alert(
          'Removed user: ' +
            payload[0].user.first_name +
            ' ' +
            payload[0].user.last_name
        );
        //refresh lại user list
        payload[1].push('/user').catch(err => {});
      });
    },

    editUser({ commit }, payload) {
      payload.router.push({
        name: 'editUser',
        params: { id: payload.user.id }
      });
    },

    updateUser({ commit }, payload) {
      if (
        payload[0].firstName === '' ||
        payload[0].lastName === '' ||
        payload[0].email === ''
      ) {
        alert('Input field must be filled out');
      } else {
        async function update() {
          let response = await fetch(
            'https://reqres.in/api/users/' + payload[1],
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload[0])
            }
          );
          alert('User with id ' + payload[1] + ' updated');
        }
        update();
      }
    },

    //sign in
    signIn({ commit }, payload) {
      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload[0])
      }).then(function(res) {
        if (res.status !== 200) {
          res.json().then(data => {
            alert('Error: ' + data.error);
          });
          return;
        }
        res.json().then(data => {
          localStorage.setItem('isSignIn', true);
          payload[1].push('/user');
        });
      });
    },

    //sign in
    signUp({ commit }, payload) {
      fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload[0])
      }).then(function(res) {
        if (res.status !== 200) {
          res.json().then(data => {
            alert('Error: ' + data.error);
          });
          return;
        }
        res.json().then(data => {
          alert('Sign up success. Please sign in');
          payload[1].push('/signin');
        });
      });
    },

    //sign out
    signOut({ commit }, router) {
      localStorage.removeItem('isSignIn');
      router.push('/signin');
    }
  }
});
