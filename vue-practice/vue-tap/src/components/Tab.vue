<template>
    <table class="tab">
        <caption>Tic-Tac-Toe</caption>

        <tbody v-show="!status.isReplaying">
            <tr>
                <InnerTd :status="status" :index="0" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="1" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="2" @occupy="occupy"></InnerTd>
            </tr>
            <tr>
                <InnerTd :status="status" :index="3" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="4" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="5" @occupy="occupy"></InnerTd>
            </tr>
            <tr>
                <InnerTd :status="status" :index="6" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="7" @occupy="occupy"></InnerTd>
                <InnerTd :status="status" :index="8" @occupy="occupy"></InnerTd>
                <!-- <td @click="occupy(8)" :class="{ preShow: status.preShow == 8 }" @mouseover="preDraw(8)" @mouseout="leftDraw(8)">{{ data[8] }}</td> -->
            </tr>
        </tbody>

        <tbody v-show="status.isReplaying">
            <tr>
                <td>{{ data[0] }}</td>
                <td>{{ data[1] }}</td>
                <td>{{ data[2] }}</td>
            </tr>
            <tr>
                <td>{{ data[3] }}</td>
                <td>{{ data[4] }}</td>
                <td>{{ data[5] }}</td>
            </tr>
            <tr>
                <td>{{ data[6] }}</td>
                <td>{{ data[7] }}</td>
                <td>{{ data[8] }}</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td colspan="3">
                    <input id="replay" type="button" value="Replay" :disabled="!canReplay" @click="replay">
                    &nbsp;
                    <input id="new" type="button" value="New Game" @click="newGame">
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    import InnerTd from './InnerTd.vue'
    
    export default {
        name: "Tab",

        components: {
            InnerTd
        },

        data() {
            return {
                data: [
                    "", "", "", 
                    "", "", "", 
                    "", "", "",
                ],

                replayIndex: [],

                status: {
                    now: "X",

                    isReplaying: false,

                    preShow: -1,

                    isWin: 0,
                }

            }
        },

        methods: {
            occupy(index) {

                if(this.status.preShow != index && (this.status.isReplaying || this.data[index] != "" || this.win))
                    return

                this.data.splice(index, 1, this.status.now)

                this.status.preShow = -1

                this.replayIndex.push(index)

                this.status.now = (this.status.now == "X")? "O": "X";

                if(this.win)
                {
                    setTimeout(() => {

                        if(this.win === "O" || this.win === "X")
                            alert(this.win + " Wins")
                        else if(this.win === "F")
                            alert("Draw")
                            
                    }, 200)
                }
            },

            newGame() {
                this.data = [
                    "", "", "", 
                    "", "", "", 
                    "", "", "",
                ]

                this.replayIndex.length = 0

                this.status = {
                    now: "X",

                    isReplaying: false,

                    preShow: -1,

                    isWin: 0,
                }

                this.$children.forEach(ele => {
                    if ( ele.$options.name == "InnerTd" ) {
                        ele.newGame();
                    }
                })
            },

            replay() {
                this.status.isReplaying = true
                
                let winData = this.data.slice();

                this.data = [
                    "", "", "", 
                    "", "", "", 
                    "", "", "",
                ]

                let i = 0;

                let draw = setInterval(() => {

                    if(i >= this.replayIndex.length)
                    {
                        clearInterval(draw)

                        this.status.isReplaying = false

                        return
                    }

                    this.data.splice(this.replayIndex[i], 1, winData[this.replayIndex[i]])

                    i++;

                }, 300)
            },

            preDraw(index) {
                if(this.status.isReplaying || this.data[index] != "" || this.win)
                    return

                this.status.preShow = index

                this.data.splice(index, 1, this.status.now)
            },

            leftDraw(index) {
                if(this.status.preShow == -1)
                {
                    return
                }

                this.data.splice(index, 1, "")
                
                this.status.preShow = -1
            },
        },

        computed: {
            win() {
                if(this.data[0] == this.data[1] && this.data[1] == this.data[2])
                {
                    this.status.isWin = this.data[0]
                    
                    return this.data[0]
                }
                else if(this.data[3] == this.data[4] && this.data[4] == this.data[5])
                {
                    this.status.isWin = this.data[3]
                    
                    return this.data[3]
                }
                else if(this.data[6] == this.data[7] && this.data[7] == this.data[8])
                {
                    this.status.isWin = this.data[6]
                    
                    return this.data[6]
                }
                else if(this.data[0] == this.data[3] && this.data[3] == this.data[6])
                {
                    this.status.isWin = this.data[0]
                    
                    return this.data[0]
                }
                else if(this.data[1] == this.data[4] && this.data[4] == this.data[7])
                {
                    this.status.isWin = this.data[1]
                    
                    return this.data[1]
                }
                else if(this.data[2] == this.data[5] && this.data[5] == this.data[8])
                {
                    this.status.isWin = this.data[2]
                    
                    return this.data[2]
                }
                else if(this.data[0] == this.data[4] && this.data[4] == this.data[8])
                {
                    this.status.isWin = this.data[0]
                    
                    return this.data[0]
                }
                else if(this.data[2] == this.data[4] && this.data[4] == this.data[6])
                {
                    this.status.isWin = this.data[2]
                    
                    return this.data[2]
                }

                let full = true

                for(let i = 0; i < this.data.length; i++)
                {
                    if(this.data[i] == "")
                    {
                        full = false

                        break;
                    }
                }

                if(full)
                {
                    this.status.isWin = "F"

                    return "F"
                }

                this.status.isWin = 0

                return 0
            },

            canReplay() {
                return this.win && (this.status.preShow == -1)
            },

        }
    }
</script>

<style>
    table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            font-family: Calibri;
            font-size: 48px;
    }
    caption {
        color: navy;
    }
    tbody tr {
        height: 100px;
    }
    td {
        width: 100px;
        text-align: center;
    }

    .preShow {
        color: gray;
    }
</style>