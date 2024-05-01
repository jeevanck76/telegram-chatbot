var axios = require("axios").default;
const prompt = require('prompt-sync')();

module.exports =async function promptAsker(asked){
  // console.log(asked);
      var options = {
        method: 'POST',
        url: 'http://localhost:11434/api/generate',
        data: {model: 'llama3', prompt: 'sing a song for ramanujan V', stream: false}
      };
      // const promptAsked = prompt('Hello! Ask Anything ----->   ');
      var reply;
      // options.data.prompt=asked + " REPLY STRICTLY IN UNDER 30 TO 40 WORDS";
      options.data.prompt=asked;

     await axios.request(options).then(function (response) {
        reply= response.data.response;
        // console.log(response.data.response);
        // console.log(reply);

      }).catch(function (error) {
        console.error(error);
      });
      
      return reply;
    }
    // promptAsker("helo");
