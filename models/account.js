class Account {
    constructor(id, username, password, fullName, email, status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.status = status;
    }
}

module.exports = Account;