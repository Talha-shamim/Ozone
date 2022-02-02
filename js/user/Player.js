function changePlayerDetails(obj) {
    this.state = {...this.state, ...obj}
}

let player = {
    state: {
        username: "Player"
    },
    changePlayerDetails: changePlayerDetails
}