

const hruDbRest = require('../repository/hruDb');

const Id = 1;

class Chat {
  constructor({ name, picture, usersId }) {
    this.name = name;
    this.picture = picture || 'default';
    this.usersId = usersId;
    this.head = null;
    this.tail = null;
  }

  save() {
    this.id = Id++;
    const value = JSON.stringify(this);
    hruDbRest.saveMessage({ key: this.Id, value });
  }

  getUsers() {
    return this.usersId.map(userId => hruDbRest.getUser(userId));
  }

  getMessages(count) {
    // hruDb.getPreviousTenMessageFor(tailId)
    return [];
  }

  addMessage(messageId) {
    this.tail = this.head;
    this.head = messageId;
  }

  addUser(id) {
    this.usersId.push(id);
  }

  getUnreadMessages() {
    return this.getMessages().filter(message => !message.isRead);
  }

  static create({ name, picture, usersId }) {
    return new Chat({ name, picture, usersId });
  }

  static getAllChatesByUserId(id) {
        //hruDb()
  }
}
