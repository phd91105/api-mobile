class Note {
    constructor(id, username, body, author, created_at,
        updated_at, expires_at, status) {
        this.id = id;
        this.username = username;
        this.body = body;
        this.author = author;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.expires_at = expires_at;
        this.status = status;
    }
}

module.exports = Note;