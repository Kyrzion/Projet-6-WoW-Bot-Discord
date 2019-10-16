class Translate{
    constructor(lang){
        this.data = {
            "fr_FR" : {
                "le prix du jetoin est de " : "the token price is ",
                "kjlkkjlk": "jkhjkhjkh"
            },
        };
        this.data = this.data[lang];
    }
    text(str){
        return this.data[str];
    }
}
module.exports = Translate;