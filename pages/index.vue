<template>
  <section class="home">
    <!--    <b-jumbotron header="Cosmos NFT Market" class="text-center" />-->
    <b-row>
      <b-col>
        <b-card no-body header="My tokens">
          <template slot="header">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">My tokens</h5>
              <b-btn v-b-modal.nft-create variant="success">Create</b-btn>
            </div>
          </template>
          <b-card-body v-if="!tokens.length">
            There are no NFTs yet
          </b-card-body>
          <b-list-group v-else flush>
            <b-list-group-item v-for="t in tokens" :key="t.id">
              <b-row>
                <b-col cols="2">
                  <b-img fluid rounded v-bind="mainProps" blank-color="cyan" alt="Left image"></b-img>
                </b-col>
              <b-col cols="7">

                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ t.name }}</h5>
                  <small><b-link :href="t.token_uri">external link</b-link></small>
                </div>

                <p class="mb-1">
                    {{ t.description }}
                </p>

<!--                <small class="text-muted">{{ t.image }}</small>-->
                <b-btn size="sm" variant="link" @click="doShow(t)">more</b-btn>
              </b-col>
              <b-col cols="3" class="d-flex flex-column">
<!--                <b-btn variant="info" @click="prepSell(t)" class="my-1">Sell</b-btn>-->
                <b-btn variant="info" @click="doTransfer(t)" class="my-1">Send to Hub</b-btn>
              </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col>
        <b-card>


        </b-card>
      </b-col>
    </b-row>
    <b-modal id="nft-create" centered title="NFT Create" @ok="doCreate">
      <b-form-group id="fieldset-name" label="Name" label-for="input-name">
        <b-form-input id="input-name" v-model="form.name" trim></b-form-input>
      </b-form-group>
      <b-form-group id="fieldset-description" label="Description" label-for="input-description">
        <b-form-input id="input-description" v-model="form.description" trim></b-form-input>
      </b-form-group>
      <b-form-group id="fieldset-url" label="Token URL" label-for="input-url">
        <b-form-input id="input-url" v-model="form.url" trim></b-form-input>
      </b-form-group>
      <b-form-group id="fieldset-image" label="Image URL" label-for="input-image">
        <b-form-input id="input-image" v-model="form.image" trim></b-form-input>
      </b-form-group>
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    mainProps: { blank: true, width: 75, height: 75, class: 'm1' },
    form: {},
    // addressTransfer: null,
    // selectedToken: null,
  }),
  computed: {
    ...mapState({
      id: state => state.user.currentId,
      tokens: state => state.token.tokens,
    }),
    // rndColor() {
    //   return "#000000".replace(/0/g,() =>(~~(Math.random()*16)).toString(16))
    // }
  },
  mounted() {
    if (this.id !== null) {
      this.loadUserTokens()
    }
  },
  methods: {
    ...mapActions('token', ['loadUserTokens', 'transferTokenToHub', 'createToken']),
    ...mapActions('user', ['loadUserInfo']),
    genColor() {
      return '#'+Math.floor(Math.random()*16777215).toString(16)
    },
    doShow(t) {
      this.$bvModal.msgBoxOk(JSON.stringify(t, null, 2))
        // .then(value => {
        //   this.boxOne = value
        // })
        // .catch(err => {
        //   // An error occurred
        // })

    },
    // prepSell(t) {
    //   console.log(t)
    // },
    // prepTransfer(t) {
    //   console.log(t)
    //   this.selectedToken = t
    //   this.$bvModal.show('nft-transfer')
    // },
    doCreate() {
      // this.$bvModal.msgBoxConfirm(`Confirm creation?`)
      //   .then(value => {
      //     if (value) {
            this.loadUserInfo().then(() => {
              this.createToken(this.form).then(r => {
                console.log(r)
                this.$bvToast.toast(`tx ${r.txhash}`, {
                  title: 'Token created',
                  // autoHideDelay: 5000,
                  variant: 'primary'
                })

                // this.form = {}
                this.loadUserTokens()
              }).catch(console.log)
            }).catch(console.log)
          // }
        // })
        // .catch(err => {
        //   // An error occurred
        // })


    },
    doTransfer(t) {
      this.$bvModal.msgBoxConfirm(`Confirm transfer of ${t.id}?`)
        .then(value => {
          if (value) {
            this.loadUserInfo().then(() => {
              this.transferTokenToHub(t.id).then(r => {
                this.$bvToast.toast(`id ${t.id}, tx ${r.txhash}`, {
                  title: 'Token transferred',
                  autoHideDelay: 5000,
                  variant: 'primary'
                })
                console.log(r)
                this.loadUserTokens()
              }).catch(console.log)
            }).catch(console.log)
          }
        })
        .catch(err => {
          // An error occurred
        })

    }
  }
}
</script>
