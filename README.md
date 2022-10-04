# tui-chat-components

Simple chat components for the `tui`




### Example

```js

const { Chat } = require('tui-chat-components');

const chat = new Chat('MyUserName');

chat.addMessage('UserA', 'first message!');

chat.addPrompt(({ user, message }) => {
  // Send data to server
});

chat.addFooter(`\tESC - Command Mode\t\tDown Arrow - Insert Mode`);

chat.render();

```


### Methods

#### `chat.addMessage(username, message)`

Add a message to the channel

* username `string`
* * The name of the user

* message `string`
* * The message sent by the user

#### `chat.addPrompt(callback)`

Add a text box for the user to send messages

* callback `(message) => void`
* * The action to perform when a message is sent

#### `chat.addFooter(text)`

Add a message under the prompt

* text `string`
* * The text of the footer


