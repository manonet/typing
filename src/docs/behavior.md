# Behavior

## Examples

### Example 1

```
a
```

- Sample: The letter `a` should be marked as `active`.
- Keyboard: The key `a` should be marked as `toPress`.

#### Use case 1 - happy path

User press `a` key

- Sample: The letter `a` should be marked as `done`.
- Keyboard: The key `a` should be marked as `correct`.
- Statistics: `a` to `correct`

#### Use case 2

User press `b` key

- Sample: The letter `a` should be marked as `error`.
- Keyboard: The key `a` should be marked as `missed`.
- Keyboard: The key `b` should be marked as `error`.
- Statistics: `b` to `misspelled`, `a` to `misread`

### Example 2

```
A
```

- Sample: The letter `A` should be marked as `active`.
- Keyboard: The key `Shift` should be marked as `toPress`. The key `a` should be marked as `toPressNext`.

#### Use case 1 - happy path

User press and hold `Shift` key

- Sample: The letter `A` does not change, no input happend.
- Keyboard: The key `Shift` should be marked as `correct`, `toPress` should be removed.
- Keyboard: The key `a` should be marked as `toPress`.

User press `a` key

- Sample: The letter `A` should be marked as `done`.
- Keyboard: The key `Shift` and key `a` should be marked as `correct`.
- Statistics: `A` to `correct`

#### Use case 2

User press `Shift` key

- Sample: The letter `A` does not change, no input happend.
- Keyboard: The key `Shift` should be marked as `correct`, `toPress` should be removed.
- Keyboard: The key `a` should be marked as `toPress`.

User releases `Shift` key

- Sample: The letter `A` does not change, no input happend.
- Keyboard: The key `Shift` should be marked as `toPress`, `correct` should be removed. The key `a` should be marked as `toPressNext`.
