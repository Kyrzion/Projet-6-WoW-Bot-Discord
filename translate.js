

class Translate {
    constructor(lang){
          this.defineLang(lang);
      
    }
    
    defineLang(lang){
      this.data = require(`./${lang}.json`);
    }
    
    getTrad(string){
      return this.data[string];
    }

    
}
  
  
  
  
  
 // !lang en
  
  
  
 // {
  //  "tokenPrice" : ["le prix du token est :", 30, 70]
  //}
  
  //{
  //  "tokenPrice" : ["token price is :", 30, 70]
  //}
  
  
 // let trad = translate.getTrad("tokenPrice")
  //canvas.fill(trad[0],trad[1],trad[2])
  
module.exports = Translate;
