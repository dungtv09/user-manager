<template>
  <div id="app">
    <PageHeader></PageHeader>

    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader';
export default {
  name: 'app',
  components: {
    PageHeader
  }
};
</script>

<style>
body {
  background-color: #f3f3f3;
}
</style>
