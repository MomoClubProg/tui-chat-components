<a name="Chat"></a>

## Chat
**Kind**: global class  

* [Chat](#Chat)
    * [new Chat(username, userTag)](#new_Chat_new)
    * [.addMessage(username, content, [userTag])](#Chat+addMessage)
    * [.addPrompt(sendMessage)](#Chat+addPrompt)
    * [.addFooter(content)](#Chat+addFooter)

<a name="new_Chat_new"></a>

<br/>

### new Chat(username, userTag)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> | <code>UserA</code> | The client's user username |
| userTag | <code>String</code> | <code>000000000000000000000000</code> | The client's user tag |

**Example**  
```js
let chat = new Chat('UserA', '4234');
```
<a name="Chat+addMessage"></a>

<br/>

### chat.addMessage(username, content, [userTag])
Add a message to the chat box interface

**Kind**: instance method of [<code>Chat</code>](#Chat)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The user name to display |
| content | <code>String</code> | The content of the message to display |
| [userTag] | <code>String</code> | The user tag (display's next to the name in brackets) |

**Example**  
```js
chat.addMessage('UserB', 'Hello world back!', '1241');
  
```
<a name="Chat+addPrompt"></a>

<br/>

### chat.addPrompt(sendMessage)
add a chat prompt

**Kind**: instance method of [<code>Chat</code>](#Chat)  

| Param | Type | Description |
| --- | --- | --- |
| sendMessage | <code>function</code> | Callback with a `Message` object as argument |

**Example**  
```js
// add a prompt and do nothing on enter
  chat.addPrompt(() => {});   

  // add a prompt and `console.log` data on enter
  chat.addPrompt((msg) => {
    console.log(msg);
    // on enter event
  })
  
```
<a name="Chat+addFooter"></a>

<br/>

### chat.addFooter(content)
Add a footer (Text at the bottom of the screen

**Kind**: instance method of [<code>Chat</code>](#Chat)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The text writtern in the footer |

**Example**  
```js
chat.addFooter('Press ESC-q to quit!');
  
```
