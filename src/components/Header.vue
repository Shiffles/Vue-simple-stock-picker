<template>
    <nav class="navbar is-success is-spaced" role="navigation">
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Stock Trader</router-link>
              <router-link to="/portfolio" activeClass="active" class="navbar-item"><p>Portfolio</p></router-link>
              <router-link to="/stocks" activeClass="active" class="navbar-item"><p >Stocks</p></router-link>

            </div>
            <div class="navbar-end">
              <strong class="navbar-item">Funds: {{ funds | currency }}</strong>
              <a href="#" @click="endDay" class="navbar-item">End Day</a>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-item">
                  Save & Load
                </a>
                <div class="navbar-dropdown">
                  <a class="navbar-item" href="#" @click="saveData">Save Data</a>
                  <a class="navbar-item" href="#" @click="loadData">Load Data</a>
                </div>
              </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data() {
          return {
              isDropdownOpen: false
          }
        },
        computed: {
            funds() {
                return this.$store.getters.funds;
            }
        },
        methods: {
            ...mapActions({
                randomizeStocks: 'randomizeStocks',
                fetchData: 'loadData'
            }),
            endDay() {
                this.randomizeStocks();
            },
            saveData() {
                const data = {
                    funds: this.$store.getters.funds,
                    stockPortfolio: this.$store.getters.stockPortfolio,
                    stocks: this.$store.getters.stocks
                };
                this.$http.put('data.json', data);
            },
            loadData() {
                this.fetchData();
            }
        }
    }
</script>
