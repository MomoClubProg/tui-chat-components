const TUI = require('./index.js')

const tui = new TUI();

tui.addMessage('UserA', 'first message!');

tui.addPrompt(({ user, message })=>{
  // Send message to server
});

tui.addFooter(`\tESC - Command Mode\t\tDown Arrow - Insert Mode`);

tui.render();



