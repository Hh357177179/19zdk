<template>
  <div id="app">
    <router-view/>
    <TableBar></TableBar>
  </div>
</template>

<script>
import TableBar from '@/components/TableBar'
export default {
  data () {
    return{}
  },
  components: { TableBar }
}
</script>
