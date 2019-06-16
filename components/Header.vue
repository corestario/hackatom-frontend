<template>
  <header class="header">
    <b-container fluid>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand :to="{name:'index'}" exact>Cosmos NFT Market</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse id="nav_collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name:'index'}" exact>Market</b-nav-item>
<!--            <b-nav-item :to="{name:'sign'}" exact>Sign</b-nav-item>-->
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <!--<b-nav-form>-->
            <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
            <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
            <!--</b-nav-form>-->

            <b-nav-item-dropdown right>
              <template slot="button-content">{{ userName }}</template>
              <template v-if="accounts.length">
                <b-dropdown-item v-for="(a, i) in accounts" :key="i" :to="{ name: 'user-id', params: { id: i } }">
                  <b>{{ a.name }}</b>
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
              </template>
              <b-dropdown-item :to="{ name: 'user-id' }" exact variant="success">add user</b-dropdown-item>
              <template v-if="currentId !== null">
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="delUser" variant="danger">del user</b-dropdown-item>
              </template>

            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      accounts: state => state.user.accounts,
      currentId: state => state.user.currentId,
    }),
    ...mapGetters('user', ['currentUser']),
    userName() {
      return this.currentUser ? this.currentUser.name : '<login>'
    },
    // ...mapGetters('user', ['isUserLogged', 'userName']),
  },
  mounted() {
  },
  methods: {
    ...mapActions('user', ['delCurrentUser']),
    delUser() {
      this.delCurrentUser().then(() => {
        this.$router.push({ name: 'user-id', params: { id: this.accounts.length ? 0 : null } })
      })
    },
  },
}
</script>
