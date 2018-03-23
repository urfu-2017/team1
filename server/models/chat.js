
const  IMessengerRepositrory = require('../messengerRepostiories/IMessengerRepository');

const messengerRepository = new IMessengerRepositrory();

let Id = 1;

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
    messengerRepository.saveChat(this);
  }

  getUsers() {
    return this.usersId.map(userId => messengerRepository.getUser(userId));
  }

  getMessagesByRange(oldestMessageAvailableToUser, count) {
    //oldestMessageAvailableToUser - перед этим сообщением еще нет информации о более старых сообщениях
    let messageId = oldestMessageAvailableToUser.id;
    messengerRepository.getMessagesByRange(this.id, messageId, count);
  }

  addMessage(messageId) {
    this.tail = this.head;
    this.head = messageId;
  }

  addUser(id) {
    this.usersId.push(id);
  }

  getUnreadMessages() {
    return messengerRepository.getAllMessages(this.id)
      .filter(message => !message.isRead);
  }

  static create({ name, picture, usersId }) {
    return new Chat({ name, picture, usersId });
  }

  static getAllChatesByUserId(id) {
    return messengerRepository.getAllChats(userId);
  }
}

module.exports = Chat;
