function changePlayerDetails(obj) {
    this.state = {...this.state, ...obj}
}

let user_player = {
    state: {
        username: "Player"
    },
    changePlayerDetails: changePlayerDetails
}
