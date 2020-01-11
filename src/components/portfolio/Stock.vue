<template>
    <div class="column is-one-third">
        <div class="card">
            <div class="card-header">
                <h3 class="card-header-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
                </h3>
            </div>
            <div class="card-content level">
                <div class="level-left content">
                    <input
                            type="number"
                            class="input"
                            placeholder="Quantity"
                            v-model="quantity"
                            :class="{danger: insufficientQuantity}"
                    >
                    <button
                            class="button is-success"
                            @click="sellStock"
                            :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)"
                    >{{ insufficientQuantity ? 'Not enough' : 'Sell' }}
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
    import {mapActions} from 'vuex';

    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0
            }
        },
        computed: {
          insufficientQuantity() {
              return this.quantity > this.stock.quantity;
          }
        },
        methods: {
            ...mapActions({
                placeSellOrder: 'sellStock'
            }),
            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                this.placeSellOrder(order);
                this.quantity = 0;
            }
        }
    }
</script>
