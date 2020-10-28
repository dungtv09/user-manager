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
      async function getPageNumber() {
        let res = await fetch('https://reqres.in/api/users');
        let data = await res.json();
        let pages = data.total_pages;
        return pages;
      }

      async function getUsers(pages) {
        let users = [];
        for (let i = 1; i <= pages; i++) {
          let res = await fetch('https://reqres.in/api/users?page=' + i);
          let data = await res.json();
          let usersTemp = data.data;
          users = users.concat(usersTemp);
        }
        return users;
      }

      getPageNumber()
        .then(pages => getUsers(pages))
        .then(users => {
          state.users = users;
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
        async function submit() {
          let res = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          let data = await res.json();
          alert(
            'New user "' +
              payload.firstName +
              ' ' +
              payload.lastName +
              '" with id ' +
              data.id +
              ' created'
          );
        }
        submit();
      }
    }, // Xóa user
    async removeUser({ commit }, payload) {
      let res = await fetch('https://reqres.in/api/users/' + payload[0].index, {
        method: 'DELETE'
      });
      alert(
        'Removed user: ' +
          payload[0].user.first_name +
          ' ' +
          payload[0].user.last_name
      );
      //refresh lại user list
      payload[1].push('/user').catch(err => {});
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
    async signIn({ commit }, payload) {
      let res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload[0])
      });
      let status = await res.status;
      let data = await res.json();
      let err = await data.error;

      if (status !== 200) {
        alert('Error: ' + err);
      } else {
        localStorage.setItem('isSignIn', true);
        payload[1].push('/user');
      }
    },

    //sign in
    async signUp({ commit }, payload) {
      let res = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload[0])
      });
      let status = await res.status;
      let data = await res.json();
      let err = await data.error;

      if (status !== 200) {
        alert('Error: ' + err);
      } else {
        alert('Sign up success. Please sign in');
        payload[1].push('/signin');
      }
    },

    //sign out
    signOut({ commit }, router) {
      localStorage.removeItem('isSignIn');
      router.push('/signin');
    }
  }
});
