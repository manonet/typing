# Keys

Hardware - can not be changed, must be identified, e.g. Enter key shape and position
  the labels on the keys are irrelevant, they can not be detected, they have no effect.

Operating system
  win
    extra C12
  mac
    extra D13
    extra E13

Selected keyboard layout in the operating system
  can be anything, even if it conflicts with the physical keyboard layout
  this determinates which characters will be written

|physical keyboard   |Key event           |Displayed Layout    |
|--------------------|--------------------|--------------------|
|ISO                 |not exist           |ISO                 |
|?                   |different meaning   |keycode             |

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

event.code - returns KeyY for letter "z" https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

event.location - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location

event.repeat - (not on IE) https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat

```js
​event: {
    altKey: false​
    bubbles: true​
    cancelBubble: false​
    cancelable: true​
    charCode: 0​
    code: "KeyL"​
    composed: true​
    ctrlKey: false
    currentTarget: null​
    defaultPrevented: false​
    detail: 0
    eventPhase: 0​
    explicitOriginalTarget: <textarea id="userText" class="SampleBoard-userText-200">
    ​isComposing: false
    ​isTrusted: true
    ​key: "l"
    ​keyCode: 76
    ​layerX: 0
    ​layerY: 0
    ​location: 0
    ​metaKey: false
    ​originalTarget: <textarea id="userText" class="SampleBoard-userText-200">
    ​pageX: 0
    ​pageY: 110
    ​rangeOffset: 0
    ​rangeParent: null
    ​repeat: false
    ​shiftKey: false
    ​srcElement: <textarea id="userText" class="SampleBoard-userText-200">​
    target: <textarea id="userText" class="SampleBoard-userText-200">
    ​timeStamp: 2774
    ​type: "keydown"
    ​view: Window http://localhost:8000/program/
    ​which: 76
    ​<get isTrusted()>: function isTrusted()
    ​<prototype>: KeyboardEventPrototype { getModifierState: getModifierState(), initKeyboardEvent: initKeyboardEvent(), initKeyEvent: initKeyEvent(), … }
}
```
