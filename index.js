const blessed = require('blessed');

class TUI {
  constructor(username = 'UserA') {
    this.screen = blessed.screen({
       smartCSR:true
    });

    this.screen.key('q', function () {
      this.destroy();
    });

    this.form = blessed.form({
      parent: this.screen,
      width: '100%',
      left: 'center',
      keys: true,
      vi: true
    });
    this.username = username; 
    this.prompt;
    this.hasFooter = false;
    this.messages = [];
    this.messageCount = 0;
  }

  addMessage(username, content, colorCode = '34') {
    this.messageCount++;
    this.scrollUp(3);
    this.messages.push(blessed.text({
      parent: this.form,
      content: `\x1b[${colorCode}m@${username}\x1b[0m\n${content}`,
      bottom: 4+this.hasFooter,
      left: 1
   }))
  }

  scrollUp(n) {
    this.messages.forEach((m,i) => {
      m.bottom += n;
    });
  }

  addPrompt(sendMessage) {
    this.prompt = blessed.textbox({
      parent:this.form,
      bottom: 0,
      left: 0,
      height: 3,
      content: 'message',
      inputOnFocus: true,
      border: {
        type: 'line'
      },
      focus: {
        fg: 'blue'
      }
    });
    this.prompt.focus();

    this.screen.key('enter', ()=>{
      this.form.submit();
    })

    this.form.on('submit', ({ textbox }) => {
      sendMessage({
        user: this.username,
        message: textbox
      });
      this.addMessage(this.username, textbox);
      this.clear();
      this.render();
    });
  }

  addFooter(content) {
    this.prompt.bottom++;
    this.scrollUp(1);

    this.hasFooter = true;
    const text = blessed.text({
      parent: this.form,
      bottom: 0,
      left: 0,
      width: '100%',
      content
    });
  }

  clear() {
    this.form.reset();
    this.prompt.focus();
  }

  render() {
    this.screen.render();
  }
};

module.exports = TUI;
