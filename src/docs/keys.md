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

| physical keyboard | Key event         | Displayed Layout |
| ----------------- | ----------------- | ---------------- |
| ISO               | not exist         | ISO              |
| ?                 | different meaning | keycode          |

<https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent>

event.code - returns KeyY for letter "z" <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code>

event.location - <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location>

event.repeat - (not on IE) <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat>

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
    ​view: Window http://localhost:8000/typewriter/
    ​which: 76
    ​<get isTrusted()>: function isTrusted()
    ​<prototype>: KeyboardEventPrototype { getModifierState: getModifierState(), initKeyboardEvent: initKeyboardEvent(), initKeyEvent: initKeyEvent(), … }
}
```

---

### Links

- <https://en.wikipedia.org/wiki/ISO/IEC_9995>
- <http://www.unicode.org/reports/tr35/tr35-49/tr35-keyboards.html>
- <https://unicode.org/reports/tr35/tr35-keyboards.html>
- <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>

### Caveats

Things which makes a typewriter app complicated

Because some browsers choose to interpret physical keys differently, there are some differences in which keys map to which codes. ...On Mac OS X, it's hard to get scancode or something which can distinguish a physical key from a key event. Therefore, Gecko always maps code value from the virtual keycode. [KeyboardEvent: code values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)

---

### Caveats

Things which makes a typewriter app complicated

Because some browsers choose to interpret physical keys differently, there are some differences in which keys map to which codes. ...On Mac OS X, it's hard to get scancode or something that can distinguish a physical key from a key event. Therefore, Gecko always maps code value from the virtual keycode. [KeyboardEvent: code values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)

---

## Order of the keys in lessons

It is clear, that the order of the keys is important by learning. It seems obvious, that everyone should start on the "F" and "J" keys, and spread learning from those keys. But how to exactly continue, depends on

- Physical keyboard layout. The number and position of the keys are different on keyboards, it can not be handled in the same way.
- Keyboard language, the order of importance of letters. E.g. the letter "a" or "e" appears usually more in words like the letter "q" or "y". So it makes sense to start with "useful" ones
- Possible characters. E.g. some keyboard has a character on "D04" + AltGr position, some not. The arrangement of characters on different levels is various.
- Personal attitude. Some may like to do it differently. Or different kind of school

### Recommendation

1. Get all the characters from the keyboard grouped by level. Subgroup and sort them 1. alpha 2. numeric 3. others. Arrange each group by the pre-defined physical order.
2. Make it possible to override it with a JSON which can belong to a specific keyboard layout.
3. Make it possible to override it by the user.

The harmonized 48 graphic key keyboard arrangement
Keyboards which comply to this narrower specification contain all the keys shown in white in the figure above, the key at C12 shown in yellow, and one of the two keys at E13 and B00 shown in red. The standard does not require this; it only says that keyboards complying to this narrower specification can be called such.
In fact, several layouts (e. g. the US layout), to allow a wider return key, have a key at D13 (shown in green) instead of C12 (shown in yellow). Thus, while they cannot be called “harmonized 48 graphic key keyboards” according to the standard, they still comply to the standard itself. It is to be noted that ISO/IEC 9995-3:2010, in referring to the basic layout within its specific scope, does take a possible substitution of C12 by D13 into account.

<https://www.w3.org/TR/uievents-code/>

- Standard "101": "Backslash" above a single-row Enter key
- Alternate "101": has a large Enter key and shrinks the Backspace key to make room for the "IntlYen" key
- Standard "102": adds a key that doesn’t exist on the "101" layouts: The "IntlBackslash" next to the left shift key. (Standard ▜ shape enter)
