<template>
  <section class="home">
    <p>{{ meta }}</p>
    <b-input v-model="domain"></b-input>
    <b-btn @click="buy">buy</b-btn>
    <b-input v-model="toAddress"></b-input>
    <b-btn @click="send">send</b-btn>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { createSignedTx, generateWalletFromSeed, sign } from 'js-cosmos-wallet'
import cosmosjs from '@cosmostation/cosmosjs'

// const restEndpoint = 'https://node.talkshop.name'
const restEndpoint = 'http://localhost:3000/apiZone'
const chainId = 'namechain'

export default {
  name: 'Sign',
  data: () => ({
    chainId: 'namechain',
    domain: null,
    toAddress: null,
    meta: null,
    // wallet: null,
    sendTx: {
      msg: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            from_address: null,
            to_address: null,
            amount: [
              {
                denom: 'nametoken',
                amount: '1',
              },
            ],
          },
        },
      ],
      fee: {
        amount: [
          {
            denom: 'nametoken',
            amount: '1',
          },
        ],
        gas: '200000',
      },
      signatures: null,
      memo: '',
    },
    buyTx: {
      msg: [
        {
          type: 'nameservice/MsgBuyName',
          value: {
            name: null,
            amount: [
              {
                denom: 'nametoken',
                amount: '1',
              },
            ],
            buyer: null,
          },
        },
      ],
      fee: {
        amount: [
          {
            denom: 'nametoken',
            amount: [],
          },
        ],
        gas: '200000',
      },
      signatures: null,
      memo: '',
    },
  }),
  computed: {
    ...mapState({
      id: state => state.user.currentId,
    }),
    ...mapGetters('user', ['currentUser']),
    address() {
      return this.currentUser.address
    },
    wallet() {
      return generateWalletFromSeed(this.currentUser.mnemonic)
    },
  },
  // watch: {
  //   currentUser(u) {
  //     this.loadMetadata(u)
  //     this.wallet = generateWalletFromSeed(u.mnemonic)
  //   },
  // },
  mounted() {
    // this.loadMetadata(this.myAddress)
    // this.wallet = generateWalletFromSeed(this.currentUser.mnemonic)
  },
  methods: {
    buy() {
      let data = {
        name: 'test.test',
        amount: '1nametoken',
        buyer: this.address,
      }
      // this.getUnsignedTx(this.address, '/nameservice/names', data).then(tx => {
      //   console.log('tx', tx)
      // })

      const cosmos = cosmosjs.network(restEndpoint, this.chainId)
      const address = cosmos.getAddress(this.currentUser.mnemonic);
      const ecpairPriv = cosmos.getECPairPriv(this.currentUser.mnemonic);
      console.log(this.address, address, ecpairPriv)

      cosmos.getAccounts(address).then(data => {
        console.log(data)
        let stdSignMsg = cosmos.NewStdMsg({
          type: "cosmos-sdk/MsgSend",
          from_address: address,
          to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
          amountDenom: "uatom",
          amount: 100000,
          feeDenom: "uatom",
          fee: 5000,
          gas: 200000,
          memo: "",
          account_number: data.value.account_number,
          sequence: data.value.sequence
        });
        console.log('t',stdSignMsg)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
        console.log('s1',signedTx)
        let s = sign(stdSignMsg, this.wallet, data.value)
        console.log(s)
        // this.buyTx = createSignedTx(this.buyTx, s)


      // ...
      })

      // this.meta.chain_id = chainId
      // this.buyTx.msg[0].value.buyer = this.currentUser.address
      // // this.buyTx.msg[0].value.bid[0].amount = 5
      // this.buyTx.msg[0].value.name = this.domain
      // console.log(this.currentUser.address, this.wallet)
      // let s = sign(this.buyTx, this.wallet, this.meta)
      // console.log(s)
      // this.buyTx = createSignedTx(this.buyTx, s)
      // console.log(this.buyTx)
      // const body = {
      //   tx: this.buyTx,
      //   return: 'block',
      // }
      // // send sendTx
      // this.$axios
      //   .$post(restEndpoint + '/nameservice/names', body)
      //   .then(r => {
      //     console.log(r)
      //     this.loadMetadata(this.currentUser)
      //   })
      //   .catch(console.log)
    },
    send() {
      // prepare sendTx
      this.meta.chain_id = chainId
      this.sendTx.msg[0].value.from_address = this.currentUser.address
      this.sendTx.msg[0].value.to_address = this.address
      this.sendTx = createSignedTx(this.sendTx, sign(this.sendTx, this.wallet, this.meta))
      console.log(this.sendTx)
      const body = {
        tx: this.sendTx,
        return: 'block',
      }
      // send sendTx
      this.$axios
        .$post(restEndpoint + '/txs', body)
        .then(r => {
          console.log(r)
          this.loadMetadata(this.currentUser.address).then(r => {
            this.meta = r
          })
        })
        .catch(console.log)
    },
    loadMetadata(address) {
      return this.$axios.$get(restEndpoint + '/auth/accounts/' + address).then(r => {
        console.log('r', r)
        // this.meta = r.value
        return Promise.resolve(r.value)
      })
    },
    prepTx(sender, data) {
      return this.loadMetadata(sender).then(m => {
        console.log('m', m)
        return Promise.resolve({
          ...data,
          base_req: {
            from: sender,
            chain_id: this.chainId,
            account_number: m.account_number,
            sequence: m.sequence,
          },
        })
      })
    },

    getUnsignedTx(sender, appEndpoint, data) {
      return this.prepTx(sender, data).then(tx =>
        this.$axios.$post(restEndpoint + appEndpoint, tx).then(r => Promise.resolve(r))
      )
    },
  },
}
</script>
