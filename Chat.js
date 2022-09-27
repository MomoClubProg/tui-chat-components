const blessed = require('blessed');

class Chat {
  constructor(username = 'UserA', userTag = '000000000000000000000000') {
    this.screen = blessed.screen({
       smartCSR:true,
        cursor: {
          artificial: true,
          shape: 'line',
          blink: true,
          color: null 
        }
    });

    this.screen.key('9', () => {
      this.scrollUp(-1);
    });

    this.screen.key('8', () => {
      this.scrollUp(1);
    });

    this.screen.key('q', function () {
      this.destroy();
      process.exit();
    });

    this.form = blessed.form({
      parent: this.screen,
      width: '100%',
      left: 'center',
      keys: true,
      vi: true
    });

    this.messageForm = blessed.form({
      parent: this.form,
      width: '100%',
      left: 'center',
      bottom: 4
    });

    this.username = username; 
    this.userTag = userTag;
    this.prompt;
    this.hasFooter = false;

    this.userHistory = [];
    this.messages = [];
    this.scroll = 0;
    this.color = Chat.colorFromName(username);
    this.messageCount = 0;

    this.streak = 1;
  }

  static palette = ['31', '32', '33', '34', '35', '36',  '96', '94', '91', '92', '93', '95']
  static colorFromName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      if (("0123456789").includes(name[i]))
        sum += +name[i];  
      else sum += name.charCodeAt(i)/8;
      if (Math.floor(sum) >= Chat.palette.length) sum -= Chat.palette.length+1;
    }
    return Chat.palette[Math.max(0, Math.min(Chat.palette.length, Math.floor(sum-1)))];
  }

  addMessage(username, content, userTag) {
    if (content.length === 0) return;
    this.messageCount++;

    const color = Chat.colorFromName(username);

    
    this.userHistory.push({ username, userTag });
  

    const showUsername = this.isDifferentUser();

    this.scrollUp(showUsername ? 3 : 1);
    let user = showUsername ? `\x1b[${color}m@${username}\x1b[0m [\x1b[32m${userTag}\x1b[0m]\n` : '';

    if (showUsername) {
     this.streak = 0;
    } else {
     this.streak= 0;
    }

    this.messages.push(blessed.text({
      parent: this.messageForm,
      content: `${user}${content}`,
      bottom: this.hasFooter+(this.streak),
      left: 1
   }))

  }

  getLastUser() {
    return this.userHistory[this.userHistory.length - 1];
  }

  focusScroll() {
    this.scrollUp(this.scroll)
  }

  scrollUp(n) {
    this.scroll += n;
    this.messages.forEach((m,i) => {
      m.bottom += n;
    });
  }

  isDifferentUser() {
    if (this.userHistory.length <= 1) return true;
    return  this.userHistory[this.userHistory.length - 2].username !== this.userHistory[this.userHistory.length - 1].username &&
      this.userHistory[this.userHistory.length - 2].userTag !== this.userHistory[this.userHistory.length - 1].userTag
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
      },
      index: 10
    });
    this.prompt.focus();

    this.screen.key('enter', ()=>{
      this.form.submit();
    })

    this.form.on('submit', ({ textbox }) => {
      sendMessage({
        user: this.username,
        userTag: this.userTag,
        message: textbox
      });
      this.addMessage(this.username, textbox, this.userTag);
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

module.exports = Chat;
