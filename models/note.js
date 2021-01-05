class Note {
  constructor(
    id,
    uid,
    category,
    title,
    body,
    created_at,
    update_at,
    expires_at,
    priority,
    status
  ) {
    this.id = id;
    this.uid = uid;
    this.category = category;
    this.title = title;
    this.body = body;
    this.created_at = created_at;
    this.update_at = update_at;
    this.expires_at = expires_at;
    this.priority = priority;
    this.status = status;
  }
}

module.exports = Note;
