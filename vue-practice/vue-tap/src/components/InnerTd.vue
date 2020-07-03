<template>
    <td @click="occupy" :class="{ preShow: status.preShow == index }" @mouseover="preDraw" @mouseout="leftDraw">{{ data }}</td>
</template>

<script>
    export default {
        name: "InnerTd",

        props: {
            status: {
                type: Object,
                required: true,
            },

            index: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                data: ""
            }
        },

        methods: {
            occupy() {
                
                if(this.status.preShow != this.index && (this.status.isReplaying || this.data != "" || this.status.isWin))
                    return

                this.data = this.status.now

                this.$emit("occupy", this.index)
            },

            newGame() {
                this.data = ""
            },

            preDraw() {

                if(this.status.isReplaying || this.data != "" || this.status.isWin)
                    return
                    
                this.status.preShow = this.index

                this.data = this.status.now

                this.$emit("preDraw", this.index)
            },

            leftDraw() {
                if(this.status.preShow == -1)
                {
                    return
                }

                this.data = ""
                
                this.status.preShow = -1

                this.$emit("leftDraw", this.index)
            },
        },
    }
</script>

<style>
    td {
        border: 1px solid black;
        border-collapse: collapse;
        font-family: Calibri;
        font-size: 48px;
        width: 100px;
        text-align: center;
    }

    .preShow {
        color: gray;
    }
    
</style>