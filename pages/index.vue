<template>
  <section class="home">
    <b-tabs content-class="mt-3">
      <b-tab title="User home zone" active>
        <b-card>
          <template slot="header">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">My tokens</h5>
              <b-btn v-b-modal.nft-create variant="success">Create</b-btn>
            </div>
          </template>
          <b-card-body v-if="!tokens.length">
            There are no NFTs yet
          </b-card-body>
          <b-card-group v-else deck>
            <b-card v-for="t in tokens" :key="t.id" :img-src="getImgUrl(t.id)" img-alt="Image" img-top no-body
            footer-class="d-flex">
              <h5 class="my-1">{{ t.name }}</h5>
              <p class="mb-1">
                {{ t.description }}
                <br><small class="text-muted">id: {{ t.id }}</small>
              </p>
              <div class="d-flex w-100 justify-content-between">
                <b-btn size="sm" variant="link" @click="doShow(t)">more</b-btn>
                <small>
                  <b-btn size="sm" variant="link" :href="t.token_uri">external link</b-btn>
                </small>
              </div>

              <div class="d-flex mb-5">
<!--                    <b-btn variant="info" @click="doTransfer(t)"  class="mx-1 flex-fill">Send to Hub</b-btn>-->
                    <b-btn variant="info" @click="prepSell(t)"  class="mx-1 ">Sell</b-btn>
              </div>
            </b-card>
          </b-card-group>
<!--          <b-list-group v-else flush>-->
<!--            <b-list-group-item v-for="t in tokens" :key="t.id">-->
<!--              <b-row>-->
<!--                <b-col cols="1" offset="2">-->
<!--                  <b-img fluid rounded :src="getImgUrl(t.id)" alt="Left image"></b-img>-->
<!--                </b-col>-->
<!--                <b-col cols="5">-->

<!--                  <div class="d-flex w-100 justify-content-between">-->
<!--                    <h5 class="mb-1">{{ t.name }}</h5>-->
<!--                    <small>-->
<!--                      <b-link :href="t.token_uri">external link</b-link>-->
<!--                    </small>-->
<!--                  </div>-->

<!--                  <p class="mb-1">-->
<!--                    {{ t.description }}-->
<!--                  </p>-->

<!--                  &lt;!&ndash;                <small class="text-muted">{{ t.image }}</small>&ndash;&gt;-->
<!--                  <b-btn size="sm" variant="link" @click="doShow(t)">more</b-btn>-->
<!--                </b-col>-->
<!--                <b-col cols="2" class="d-flex flex-column">-->
<!--                  <b-btn variant="info" @click="doTransfer(t)" class="my-1">Send to Hub</b-btn>-->
<!--                  <b-btn variant="warning" @click="prepSell(t)" class="my-1">Send & Sell</b-btn>-->
<!--                </b-col>-->
<!--              </b-row>-->
<!--            </b-list-group-item>-->
<!--          </b-list-group>-->
        </b-card>
      </b-tab>
      <b-tab title="NFT Market HUB zone">
        <b-row>
          <b-col md="5">
            <b-card no-body>
              <template slot="header">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">My NFTs on market hub</h5>
                </div>
              </template>

              <b-card-body v-if="!myTokensOnMarket.length">
                There are no NFTs yet
              </b-card-body>
              <b-list-group v-else flush>
                <b-list-group-item v-for="t in myTokensOnMarket" :key="t.id">
                  <b-row>
                    <b-col cols="2">
                      <b-img fluid rounded :src="getImgUrl(t.id)" alt="Left image"></b-img>
                    </b-col>
                    <b-col cols="7">

                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ t.name }}</h5>
                        <small>
                          <b-link :href="t.token_uri">external link</b-link>
                        </small>
                      </div>

                      <p class="mb-1">
                        {{ t.description }}
                      </p>


                      <h6><small>price:</small> <b-badge variant="info">{{ t.price }} token</b-badge></h6>
                    </b-col>
                    <b-col cols="3" class="d-flex flex-column">
                      <b-btn v-if="isSaleStatus(t)" variant="warning" @click="prepDirectSell(t)">Sell</b-btn>
                      <b-btn v-else variant="danger" @click="doCancelSell(t)">Cancel</b-btn>

                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <template slot="header">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">NFTs on market hub for sale</h5>
                </div>
              </template>
              <b-card-body v-if="!myTokensOnMarket.length">
                There are no NFTs yet
              </b-card-body>
              <b-card-group v-else deck>
                <b-card v-for="t in myTokensOnMarket" :key="t.id" :img-src="getImgUrl(t.id)" img-alt="Image" img-top no-body>
                  <h5 class="my-1">{{ t.name }}</h5>
                  <p class="mb-1">
                    {{ t.description }}
                  </p>
                  <div class="text-right">
                    <small>
                      <b-link :href="t.token_uri">external link</b-link>
                    </small>
                  </div>
                  <h5><small>price:</small> <b-badge variant="info">{{ t.price }} token</b-badge></h5>
                  <div class="mb-5">
                    <b-btn v-if="isMyToken(t)" variant="danger" @click="doCancelSell(t)" block>Cancel</b-btn>
                    <b-btn v-else variant="success" @click="doBuy(t)" block>Buy</b-btn>
                  </div>
                </b-card>
              </b-card-group>
            </b-card>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
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
    <b-modal id="nft-sell" centered title="NFT Send&Sell" @ok="doTransferAndSell">
      <b-form-group id="fieldset-price" label="Price" label-for="input-price">
        <b-form-input id="input-price" v-model="formSell.price" trim type="number"></b-form-input>
      </b-form-group>
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'


const fallback = false
export default {
  name: 'Home',
  data: () => ({
    mainProps: { blank: true, width: 75, height: 75, class: 'm1' },
    form: {},
    formSell: {},
    // addressTransfer: null,
    selectedToken: null,
  }),
  computed: {
    ...mapState({
      id: state => state.user.currentId,
      tokens: state => state.token.tokens,
      hubTokens: state => state.token.hubTokens,
      // myTokensOnMarket: state => state.token.tokensOnMarket,
      // allTokensOnSale: state => state.token.tokensOnSale,
    }),
    ...mapGetters('user', ['currentUser']),
    // ...mapGetters('token', ['hubTokens']),
    myTokensOnMarket() {
      // console.log(this.hubTokens)
      return this.hubTokens.filter(x => x.owner === this.currentUser.address)

      // return this.hubTokens(this.currentUser.address, null)
    },
    allTokensOnMarket() {
      return this.hubTokens.filter(x => x.status === 'onSale')
    },
    // rndColor() {
    //   return "#000000".replace(/0/g,() =>(~~(Math.random()*16)).toString(16))
    // }
  },
  mounted() {
    console.log('id',this.id)
    if (this.id !== null) {
      this.loadUserTokens()
      this.loadHubTokens()
    }
  },
  methods: {
    ...mapActions('token', [
      'loadUserTokens',
      'transferTokenToHub',
      'createToken',
      'receiveTokenOnHub',
      'loadHubTokens',
    ]),
    ...mapActions('user', ['loadUserInfo']),
    isSaleStatus(t) {
      // todo change to real
      return t.status && t.status === 'onSale'
    },
    isMyToken(t) {
      // todo change to real
      return Math.random() > 0.5
      // return t.owner && t.owner === this.currentUser.address
    },
    genColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    stringSum(s) {
      return s.replace(/[^0-9]/gi, '').split('').map(x => parseInt(x,10)).reduce((a,b) => a+b);
    },
    getImgUrl(id) {
      return `https://picsum.photos/id/${this.stringSum(id)}/100/50/`
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
    prepSell(t) {
      console.log(t)
      this.selectedToken = t
      this.$bvModal.show('nft-sell')
    },
    prepDirectSell(t) {
      console.log(t)
    },
    doBuy(t) {
      this.$bvModal.msgBoxConfirm(`Confirm buy of ${ t.id }?`)
        .then(value => {
          if (value) {
            console.log(t)
            this.loadUserInfo().then(() => {
            //   this.removeTokenFromSale(t.id).then(r => {
            //     this.$bvToast.toast(`id ${ t.id }, tx ${ r.txhash }`, {
            //       title: 'Token removed from sale',
            //       autoHideDelay: 5000,
            //       variant: 'primary',
            //     })
            //     console.log(r)
            //     this.loadUserTokens()
            //   }).catch(console.log)
            }).catch(console.log)
          }
        })
        .catch(err => {
          // An error occurred
        })

    },
    doCancelSell(t) {

      this.$bvModal.msgBoxConfirm(`Confirm cancel sale of ${ t.id }?`)
        .then(value => {
          if (value) {
            console.log(t)
            // this.loadUserInfo().then(() => {
            //   this.removeTokenFromSale(t.id).then(r => {
            //     this.$bvToast.toast(`id ${ t.id }, tx ${ r.txhash }`, {
            //       title: 'Token removed from sale',
            //       autoHideDelay: 5000,
            //       variant: 'primary',
            //     })
            //     console.log(r)
            //     this.loadUserTokens()
            //   }).catch(console.log)
            // }).catch(console.log)
          }
        })
        .catch(err => {
          // An error occurred
        })

    },

    doTransferAndSell() {
      console.log(this.selectedToken)
      this.loadUserInfo().then(() => {
          this.transferTokenToHub({ tokenId: this.selectedToken.id, price: parseInt(this.formSell.price) })
            .then(r => {
              console.log(r)
              this.loadUserTokens()

              if (fallback) {
                this.$bvToast.toast(`id ${ this.selectedToken.id }, tx ${ r.txhash }`, {
                  title: 'Token transferred to market',
                  autoHideDelay: 5000,
                  variant: 'primary',
                })
                this.receiveTokenOnHub({ id: this.selectedToken.id, ...this.formSell })
                  .then(r => {
                    console.log(r)
                    this.loadHubTokens()
                    this.$bvToast.toast(`sendTx ${r.txhash}`, {
                      title: 'Token placed on sale',
                      // autoHideDelay: 5000,
                      variant: 'warning',
                    })
                    // this.formSell = {}
                  })
                  .catch(console.log)
              } else {
                this.$bvToast.toast(`id ${this.selectedToken.id }, tx ${ r.txhash }`, {
                  title: 'Token transferred and placed to sale',
                  autoHideDelay: 5000,
                  variant: 'primary',
                })
                this.loadHubTokens()
              }
            })
            .catch(console.log)
        })
        .catch(console.log)
    },
    doCreate() {
      // this.$bvModal.msgBoxConfirm(`Confirm creation?`)
      //   .then(value => {
      //     if (value) {
      this.loadUserInfo().then(() => {
        this.createToken(this.form).then(r => {
          console.log(r)
          this.$bvToast.toast(`tx ${ r.txhash }`, {
            title: 'Token created',
            // autoHideDelay: 5000,
            variant: 'success',
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
      this.$bvModal.msgBoxConfirm(`Confirm transfer of ${ t.id }?`)
        .then(value => {
          if (value) {
            this.loadUserInfo().then(() => {
              this.transferTokenToHub(t.id).then(r => {
                this.$bvToast.toast(`id ${ t.id }, tx ${ r.txhash }`, {
                  title: 'Token transferred',
                  autoHideDelay: 5000,
                  variant: 'primary',
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

    },
  },
}
</script>
