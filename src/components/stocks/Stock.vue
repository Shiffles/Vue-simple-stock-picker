<template>
  <div class="column is-one-quarter">
        <div class="card">
            <header class="card-header">
                <h3 class="card-header-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }})</small>
                </h3>
            </header>
            <div class="card-content level">
                <div class="content level-left">
                    <input
                            type="number"
                            class="input"
                            placeholder="Quantity"
                            v-model="quantity"
                            :class="{danger: insufficientFunds}"
                    >
                    <button
                            class="button is-success "
                            @click="buyStock"
                            :disabled="insufficientFunds || +quantity <= 0 || !Number.isInteger(+quantity)"
                    >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
                    </button>
                </div>
            </div>
        </div>
  </div>
</template>

<style scoped>
    .danger {
        border: 1px solid red;
    }
</style>

<script>
    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0
            }
        },
        computed: {
            funds() {
                return this.$store.getters.funds;
            },
            insufficientFunds() {
                return this.quantity * this.stock.price > this.funds;
            }
        },
        methods: {
            buyStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: +this.quantity
                };
                this.$store.dispatch('buyStock', order);
                this.quantity = 0;
            }
        }
    }
</script>
