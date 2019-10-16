
//const bfa         = require('./model/wow_bfa.js');
//const classic     = require('./model/wow_classic.js');

const Blizzard    = require('blizzard.js');
const Translation = require('./translate.js');

class General{
  constructor (config){
    this.blizzard = Blizzard.initialize({
      key: config.client,
      secret: config.secret,
      origin: 'eu', // optional
      locale: 'fr_FR', // optional
      //token: config.clientid // optional
    });
    this.translate = new Translation('fr_FR');
    switch (config.need){
      case "prix" :
        this.response = this.getPrice();
        break;
    }
  }

  async getPrice(){
    try {
    await blizzard.getApplicationToken()
      .then(response => {
      this.blizzard.defaults.token = response.data.access_token
      });
    const token = await blizzard.wow.token();
    let response = this.translate.text("le prix du jeton est de ");
    return response + token.data.price + " PO";
    } catch (err) {
    console.error(err);
    }
  }

  async getResponse(){
    await this.response;
    return this.response;
  }

    async getItem (id) {
      try {
        await blizzard.getApplicationToken()
          .then(response => {
            blizzard.defaults.token = response.data.access_token
          });
        const item = await blizzard.wow.item({ id: id });
        console.log(item.data.name +'-'+ item.data.description) //mettre un return dans une commande
      } catch (err) {
        console.error(err);
      }
    };
    
}
module.exports = General;

