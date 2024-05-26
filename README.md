# React copilot autocomplete

This is a copilot like autosuggest in react based on textarea (not on content editable).
All props are passed directly to the textarea (including ref) so this component should be compatible with any
form handling.
Use Tab or click/tap the textarea to autocomplete the current suggestion.

You can pass a dictionary list and word autocompletion will work out of the box based on Trie index lookup:

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/main/src/assets/word-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)
```js
<AutocompleteTextarea words={['New York', 'London', 'Berlin', 'Hong Kong']}/>
```

Please install trie peer dependency if you are using the built in autocomplete:
```bash
npm i trie-typed --save
```


You can also pass your own suggestion function and ignore the built-in word completion. Keep in mind that this way you will have to handle:
- Debouncing and throttling
- Api race conditions
- Correctly slice/discard currentSuggestion as user types

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/main/src/assets/custom-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)
```js
<AutocompleteTextarea handleCompletion={async ({value, currentSuggestion, setSuggestion, onChangeEvent}) => {
  const suggestion = await getAIPoweredSuggestion(value);
  if (suggestion !== currentSuggestion) {
    setSuggestion(suggestion);
  }
}}/>
```

# Configurable Props
*Note*: All props are optional but if you don't pass either dictionary or handleCompletion there will be no completion.

## autocompleteEnabled : boolean
#### Default value: `true`
Disables autocompletion

## dictionary : array of strings
#### Default value: `[]`
Dictionary of words used for built-in autocomplete, won't be used if custom handleCompletion is passed

## caseSensitive : boolean
#### Default value: `false`
Sets case sensitivity for built-in autocomplete.

## handleCompletion : func
#### Default value: `({value, currentSuggestion, setSuggestion, onChangeEvent}) => void`
Custom handler for external autosuggestion - allows you to set any suggestion based on current input and current suggestion

## completionShortcut : Set of strings
#### Default value: `Set(['Tab'])`
Set of keys that can be pressed to set current suggestion, use modifier keys with (Shift, Ctrl, Alt, Meta) +
```js
Set(['Tab']) // pressing Tab will set current suggestion
Set(['Shift+Tab']) // pressing Shift and Tab will set current suggestion
Set(['Tab', 'Shift+Tab']) // pressing Shift and Tab or Tab will set current suggestion
```

## completionOnClick : boolean
#### Default value: `false`
Allow completion on click as well, by default only touch devices with tap can set current suggestion

## classNames : object
#### Default value: `{wrapper: undefined, area: undefined, suggestion: undefined}`
You can set class names for all three components - wrapper, textarea and suggestion overlay

## styles : object
#### Default value: `{wrapper: undefined, area: undefined, suggestion: undefined}`
You can set react inline styles for all three components - wrapper, textarea and suggestion overlay
Be careful not to override important functional styles, such as
- the form background color is transparent, the actual background color comes from the suggestion overlay
- make sure the suggestion z index is below the form
- make sure that the form and the suggestion have the same overlap size
```js
const suggestionStyle = {
    ...areaStyle,
    position: 'absolute',
    overflowY: 'scroll',
    backgroundColor: 'white',
    display: 'block !important',
    top: 0,
    color: '#c9c9c9',
    borderColor: 'transparent',
    zIndex: -1,
    ...styles?.suggestion,
  };
```

