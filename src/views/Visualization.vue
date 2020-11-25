<template>
  <div id="visualization">
    
    <StreamSearch :query="query" />
    
  </div>

</template>

<script>


    export default {
        name: 'Visualization',
        components: {
          StreamSearch: () => import("./StreamSearch/StreamSearch")
        },
        data() {
          return {
            query: ""
          };
        },
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        methods: { }
        
    }
</script>

<style scoped lang="scss">

h1 {
  color: rgb(229, 204, 245);
}

</style>
