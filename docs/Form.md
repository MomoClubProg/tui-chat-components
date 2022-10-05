<a name="Form"></a>

<br/>

## Form
**Kind**: global class  

* [Form](#Form)
    * [.addPrompt(label)](#Form+addPrompt)
    * [.addSubmit(callback)](#Form+addSubmit)

<a name="Form+addPrompt"></a>

<br/>

### form.addPrompt(label)
Create a form text input

**Kind**: instance method of [<code>Form</code>](#Form)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The label of the input prompt |

**Example**  
```js
form.addPrompt('Username'); 
  form.addPrompt('Password'); 
  form.addPrompt('Favorite Animal'); 
```
<a name="Form+addSubmit"></a>

<br/>

### form.addSubmit(callback)
Add a submit button & event to the form

**Kind**: instance method of [<code>Form</code>](#Form)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The submit event callback |

**Example**  
```js
form.addPrompt('myTextArea');

  form.addSubmit((data) => {
      console.log(data.myTextArea); 
  }); 
```
