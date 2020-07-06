<template>
    <div>
        <h1>Pay</h1>

        <form @submit.prevent="pay">
            <div v-for="(option, index) in options" :key="option.id">
                <label>
                    <input type="radio" :value="index" v-model="selectedOption"></input>
                        {{ option.cost }}
                </label>
            </div>

            <p v-if="selectedOption >= 0">儲值金額 : {{ options[selectedOption].cost }}</p>

            <br><br><input type="submit" value="確定儲值" v-if="selectedOption >= 0"></input>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {   
                        cost: 10,
                        id: 0,
                    },
                    {   
                        cost: 100,
                        id: 1,
                    },
                    {   
                        cost: 500,
                        id: 2,
                    },
                    {   
                        cost: 1000, 
                        id: 3,
                    },
                    {   
                        cost: 2000,
                        id: 4,
                    },
                    {   
                        cost: 5000,
                        id: 5,
                    },
                    {   
                        cost: 10000,
                        id: 6,
                    },
                ],

                selectedOption: -1,
            }
        },
        
        methods: {
            pay() {
                this.$store.dispatch("addMoney", this.options[this.selectedOption].cost)
            }
        }
    }
</script>