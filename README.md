# tui-chat-components

Simple chat components for the `tui`




### Example

```js

const TUI = require('tui-chat-components');

const tui = new TUI('MyUserName');

tui.addMessage('UserA', 'first message!');

tui.addPrompt(({ user, message }) => {
  // Send data to server
});

tui.addFooter(`\tESC - Command Mode\t\tDown Arrow - Insert Mode`);

tui.render();

```


### Methods

#### `tui.addMessage(username, message)`

Add a message to the channel

* username `string`
* * The name of the user

* message `string`
* * The message sent by the user

#### `tui.addPrompt(callback)`

Add a text box for the user to send messages

* callback `(message) => void`
* * The action to perform when a message is sent

#### `tui.addFooter(text)`

Add a message under the prompt

* text `string`
* * The text of the footer


