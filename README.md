# React copilot autocomplete

This is a copilot like autosuggest in react based on textarea (not on content editable).
Use Tab or click/tap the textarea to autocomplete current suggestion.

You can pass a dictionary list and word autocomplete will work out of the box based on Trie index look up:

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/master/src/assets/word-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)
```js
<AutocompleteTextarea words={['New York', 'London', 'Berlin', 'Hong Kong']}/>
```

You can also pass your own suggestion funtion and ignore the build in word autocomplete. Keep in mind this way you will have to hande:
- Debouncing and Throttling
- Api race conditions
- Correctly slice/discard currentSuggestion as user is typing

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/master/src/assets/custom-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)
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
Dictionary of words used for built in autocomplete, won't be used if custom handleCompletion is passed

## caseSensitive : boolean
#### Default value: `false`
Sets case sensitivity for built in autocomplete.

## handleCompletion : func
#### Default value: `({value, currentSuggestion, setSuggestion, onChangeEvent}) => void`
Custom handler for external autosuggestion - allows you to set any suggestion based on current input and current suggestion

## classNames : object
#### Default value: `{wrapper: undefined, area: undefined, suggestion: undefined}`
You can set class names for all main three components - wrapper, textarea and suggestion overlay

## styles : object
#### Default value: `{wrapper: undefined, area: undefined, suggestion: undefined}`
You can set react inline styles for all main three components - wrapper, textarea and suggestion overlay
Bare in mind no to override important functional styles - eg:
- form background color is transparent, the actuall background color is coming from suggestion overlay
- make sure to keep suggestion z index below the form
- make sure the form and suggestion has the same overlapping size
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

