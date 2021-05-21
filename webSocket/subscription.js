class SubscriptionAPI {
  constructor(list = []) {
    this.subscribeList = list;
  }

  set subscribeUser(userId) {
    this.subscribeList.push(userId);
  }

  get getSubscribeList() {
    return this.subscribeList;
  }

  set unUbscribeUser(userId) {
    this.subscribeList = this.subscribeList.filter((id) => id !== userId);
  }

  
}

const subscription = new SubscriptionAPI();

module.exports = { subscription };
