# tui-chat-components

Simple chat components for the `tui`

## Install

```
npm i tui-chat-components
```


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

Documentation for the `Chat` is accessible [here](./docs/Chat.md)

Documentation for the `Form` is accessible [here](./docs/Form.md)