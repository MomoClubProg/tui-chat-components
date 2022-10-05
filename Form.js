
const blessed = require('blessed');

class Form {

  /**
  *
  * @constructor
  * 
  * @example
  *
  *   let form = new Form(); 
  *
  */ 
  constructor() {
    this.screen = blessed.screen({
       smartCSR:true,
        cursor: {
          artificial: true,
          shape: 'line',
          blink: true,
          color: null 
        }
    });

    this.form = blessed.form({
      parent: this.screen,
      width: '80%',
      top: 'center',
      left: 'center',
      bottom: -2,
      keys: true,
      vi: true,
    });

    this.rowCount = 0;
    this.callback = () => {};
    this.values = {};

    this.screen.key('q', function () {
      this.destroy();
      process.exit();
    });

  }

  /**
  *
  * Create a form text input
  * 
  * @param {String} label - The label of the input prompt
  * 
  * @example
  *
  *   form.addPrompt('Username'); 
  *   form.addPrompt('Password'); 
  *   form.addPrompt('Favorite Animal'); 
  *
  */ 
  addPrompt(label) {
    const lbl = blessed.text({
      parent: this.form,
      content: label,
      top: this.rowCount+1
    })
    const textbox = blessed.textbox({
      parent:this.form,
      name: label,
      height: 3,
      left: 'center',
      top: this.rowCount,
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

    this.rowCount += 3;
  }


  /**
  *
  * Add a submit button & event to the form
  * 
  * @param {Function} callback - The submit event callback
  * 
  * @example
  *
  *   form.addPrompt('myTextArea');
  * 
  *   form.addSubmit((data) => {
  *       console.log(data.myTextArea); 
  *   }); 
  *
  */ 
  addSubmit(callback = () => {}) {
    const btn = blessed.button({
      parent: this.form,
      content: 'CHAT',
      border: {
        type: 'line'
      },
      style: {
      
        focus: {
           bg: 'white',
           fg: 'black'
        },
      },
      
      top: this.rowCount + 2,
      width: 8,
      height: 3,
      left: 'center',
    })

    btn.on('press', ()=>{
      this.form.submit();
    })

    this.callback = callback.bind(this);
    this.form.on('submit', (data)=>{
      let values = Object.values(data);
      
      for (let i = 0; i < values.length; i++) {
        if(values[i].length === 0) {
          return;
        };
      }
      this.callback(data); 
    })
  }

  clear() {
    this.screen.destroy();
  }

  render() {
    this.screen.render();
  }

}

module.exports = Form;
