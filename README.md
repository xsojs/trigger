
# @xso/trigger

It fires global events that are intercepted in far away in the code.

Compatible with pure JavaScript, XSO components, React, Vue, Angular, Svelte, and more.

> Remember that, the trigger works spread inside functions and the source code files.
> With the key, you can interact anywhere.

A simple way to replace the complexity of Redux and others.

## Documentation

Here is the official website with the full documentation:

- [xsojs.dev](https://www.xsojs.dev/framework/trigger)

## Install

To start playing with XSO COM:

`npm install -S @xso/trigger`

But better, is to use the PNPM:

`pnpm install @xso/trigger`

Or if you prefer Yarn:

`yarn add -S @xso/trigger`

Or even another package manager.

## How To Use

Example of the capabilities supported in the XSO trigger events:

```javascript
import trigger from "@xso/trigger";

const MESSAGE_KEY = "MESSAGE";

const mainFunc = (message)=> {
    console.warn('Main:', message);
};

// Set a function to key:
trigger.set(MESSAGE_KEY, mainFunc);

// Append more functions to the key:
trigger.add(MESSAGE_KEY, (message)=> {
    console.log('Client 1:', message);
});

// Append more functions to the key:
trigger.add(MESSAGE_KEY, (message)=> {
    console.log('Client 2:', message);
});

// Execute the key with args:
trigger(MESSAGE_KEY, 'Hello!');

function showKeyDetails() {
    // Gets the latest args passed to the key:
    trigger.get(MESSAGE_KEY, (message) => {
        console.error('The last message sent:', message);
    });
    // Get all functions attached to the key:
    console.log('Event functions:', trigger.events(MESSAGE_KEY));
    // Get latest args stored:
    console.log('Latest args stored:', trigger.stored(MESSAGE_KEY));
}
showKeyDetails();

console.log('1...');

window.setTimeout(()=> {
    trigger(MESSAGE_KEY, 'Hi there!');
    showKeyDetails();
    console.log('2...');
}, 1000);

window.setTimeout(()=> {
    // Remove function from the key:
    trigger.del(MESSAGE_KEY, mainFunc);
    // Execute the key with other arg:
    trigger(MESSAGE_KEY, 'Main was kicked!');
    showKeyDetails();
    console.log('3...');
}, 2000);

window.setTimeout(()=> {
    // Reset the key with only a function:
    trigger.set(MESSAGE_KEY, mainFunc);
    // Execute the key with other arg:
    trigger(MESSAGE_KEY, 'Main is back and no clients anymore!');
    showKeyDetails();
    console.log('4...');
}, 3000);

window.setTimeout(()=> {
    // Removes all functions attached to the key:
    trigger.clear(MESSAGE_KEY);
    trigger(MESSAGE_KEY, 'No one there!?');
    showKeyDetails();
    console.log('5...');
}, 4000);

window.setTimeout(()=> {
    // Remove the key and everything else:
    trigger.purge(MESSAGE_KEY);
    // Check if the key exists:
    if (trigger.exists(MESSAGE_KEY)) {
        console.warn('Key exists yet...');
    } else {
        console.error('Key removed...');
    }
}, 5000);
```

## Vanilla JS in HTML

Here is an integration directly in the raw HTML with pure JavaScript, like this:

```html
<!--
Here is the bundle JS file to download:
https://github.com/xsojs/trigger/blob/main/dist/xso-trigger.umd.js
-->
<script src="xso-trigger.umd.js"></script>

<script>
const ACTION_KEY = 'My-Action';
// Append a function to the key:
trigger.add(ACTION_KEY, (payload)=> {
    console.log(
        `${ACTION_KEY} trigger payload:`,
        payload
    );
});

trigger.add(ACTION_KEY, (payload)=> {
    alert('Trigger worked! See the payload in console log.');
});

// Execute the key with args:
trigger(ACTION_KEY, { type: 'message', content: 'Hello world.'});
</script>
```
