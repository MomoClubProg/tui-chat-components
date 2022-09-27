const { Chat } = require('./index.js')

const chat = new Chat();

chat.addMessage('UserA', 'first message!');

chat.addPrompt(({ user, message })=>{
  // Send message to server
});

chat.addFooter(`\tESC - Command Mode\t\tDown Arrow - Insert Mode`);

chat.render();



