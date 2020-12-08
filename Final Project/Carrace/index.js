$(function () {
    let vm = new Vue({
        el: '#app',
        data: {
            racing: false,
            winner: null,
            baby2: 0,
            baby1: 0,
            tick: 0,
            isNinja: false,
            interval: null
        },
        computed: {
            winning() {
                if (this.baby2 === this.baby1) return null

                return this.baby2 > this.baby1 ? 'baby2' : 'baby1'
            },
            baby1Style() {
                return {
                    left: `${this.baby1}vw`
                }
            },
            baby1Class() {
                if (!this.winner) return
                return this.winner === 'baby1' ? 'animated tada infinite winner' : 'animated hinge'
            },
            baby2Style() {
                return {
                    left: `${this.baby2}vw`
                }
            },
            baby2Class() {
                if (!this.winner) return
                return this.winner === 'baby2' ? 'animated tada infinite winner' : 'animated hinge'
            },
        },
        methods: {
            startRace() {
                if (this.winner) {
                    this.restart()
                    return
                }
                this.racing = true

                this.interval = setInterval(() => {
                    this.progressPlayers()
                }, 50)
            },
            progressPlayers() {
                this.tick++
                this.baby2 += (Math.random() >= Math.random()) ? 1 : 0
                this.baby1 += (Math.random() >= Math.random()) ? 1 : 0
                this.checkVictory()
            },
            checkVictory() {
                if (this.baby2 === this.baby1) return

                if (this.baby2 >= 90) {
                    this.declareVictory('baby2')
                }

                if (this.baby1 >= 90) {
                    this.declareVictory('baby1')
                }
            },
            declareVictory(player) {
                clearInterval(this.interval)
                this.interval = null
                this.racing = false
                this.winner = player
                this.isNinja = true;
                
            },
            restart() {
                this.racing = false
                this.winner = null
                this.baby2 = 0
                this.baby1 = 0
                this.tick = 0
                this.isNinja = false;

            }
        }
    })
});