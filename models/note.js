class Note {
  constructor(
    id,
    uid,
    category,
    title,
    body,
    created_at,
    updated_at,
    expires_at,
    status
  ) {
    this.id = id;
    this.uid = uid;
    this.category = category;
    this.title = title;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.expires_at = expires_at;
    this.status = status;
  }
}

module.exports = Note;
