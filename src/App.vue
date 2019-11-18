<template>
  <div id="app">
    <Navbar />
    <GMap />
    <router-view/>
  </div>
</template>

<script>
import GMap from '@/components/home/GMap'
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {GMap, Navbar}
}
</script>

<style>
</style>
