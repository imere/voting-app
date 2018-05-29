<template>

</template>

<script>
export default {
  async asyncData ({ error }) {
    error({ statusCode: 404, message: 'Page Not Found' })
  }
}
</script>
