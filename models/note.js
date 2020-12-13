/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
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
      priority,
      status,
  ) {
    this.id = id;
    this.uid = uid;
    this.category = category;
    this.title = title;
    this.body = body;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.expires_at = expires_at;
    this.priority = priority;
    this.status = status;
  }
}

module.exports = Note;
