<template>
  <div class="d-flex flex-column h-100">
    <page-header />
    <page-main>
      <nuxt />
    </page-main>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'
import PageHeader from '~/components/Header'
import PageMain from '~/components/Main'

export default {
  name: 'Layout',
  components: { PageHeader, PageMain },

  mounted() {},
  methods: {},
}
</script>
