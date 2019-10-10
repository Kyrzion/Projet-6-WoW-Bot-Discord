//export default


async function getItem (id) {
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
  }

  async function getToken () {
    try {
      await blizzard.getApplicationToken()
        .then(response => {
          blizzard.defaults.token = response.data.access_token
        });
      const token = await blizzard.wow.token();
      console.log(token.data.price)
    } catch (err) {
      console.error(err);
    }
  }


 