# React copilot autocomplete

This is a copilot like autosuggest in react based on native html input or textarea (not on content editable).
All props are passed directly to the elements (including ref, className and style) so this component should be compatible with any
form handling.
Use Tab or click/tap the textarea to autocomplete the current suggestion.

Live preview available at [https://jankor.github.io/react-copilot-autocomplete/](https://jankor.github.io/react-copilot-autocomplete/)

You can pass a dictionary list and word autocompletion will work out of the box based on Trie index lookup:

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/main/src/assets/word-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)

Please install trie peer dependency if you are using the built in autocomplete:
```bash
npm i trie-typed --save
```
```js
<Autocomplete as="textarea" words={['New York', 'London', 'Berlin', 'Hong Kong']}/>
```


You can also pass your own suggestion function and ignore the built-in word completion. Keep in mind that this way you will have to handle:
- Debouncing and throttling
- Api race conditions
- Correctly slice/discard currentSuggestion as user types

[![react-copilot-autocomplete](https://github.com/jankor/react-copilot-autocomplete/raw/main/src/assets/custom-autocomplete.gif)](https://github.com/jankor/react-copilot-autocomplete)
```js
<Autocomplete 
  as="textarea"
  handleCompletion={async ({value, currentSuggestion, setSuggestion, onChangeEvent}) => {
  const suggestion = await getAIPoweredSuggestion(value);
  if (suggestion !== currentSuggestion) {
    setSuggestion(suggestion);
  }
}}/>
```

You can also pass your input component that will be enhanced with autocomplete. For example an input from UI library:

```js
import { TextField } from '@radix-ui/themes';

const EnhancedTextField = forwardRef<AutocompleteInputRef>((props, fwdRef) => 
  <TextField.Root size="2" {...props} ref={fwdRef} placeholder="Get your city" />
);

<Autocomplete
  asChild
  words={['New York', 'London', 'Berlin', 'Hong Kong']}
  styles={{suggestion: {top: '1px', left: '1px', height: '29.500px', opacity: 0.8}}}>
  <EnhancedTextField />
</Autocomplete>
```

# Configurable Props
*Note*: All props are optional but if you don't pass either dictionary or handleCompletion there will be nothing to suggest.

## as : string - input | textarea
#### Default value: `input`
Select the html element to render: input or textarea are supported.
Cannot be used in combination with asChild.

## asChild : boolean
#### Default value: `false`
Change the default rendered element for the one passed as a child, merging their props and behavior. Use this when you want to pass custom input or textarea (eg one from a UI library). Keep in mind to spread props and forward ref of the custom element. You can learn more about the concept from radix documentation:
https://www.radix-ui.com/primitives/docs/guides/composition

## autocompleteEnabled : boolean
#### Default value: `true`
Disables autocompletion

## dictionary : array of strings
#### Default value: `[]`
Dictionary of words used for the built-in autocomplete, won't be used if custom handleCompletion is passed

## caseSensitive : boolean
#### Default value: `false`
Sets case sensitivity for the built-in autocomplete.

## handleCompletion : func
#### Default value: `({value, currentSuggestion, setSuggestion, onChangeEvent}) => void`
Custom handler for external autosuggestion - allows you to set any suggestion based on current input and current suggestion. The handler is only called when cursor is at the end of the current text.

## completionShortcut : Set of strings
#### Default value: `Set(['Tab'])`
Set of keys that can be pressed to set current suggestion, use modifier keys with (Shift, Ctrl, Alt, Meta) +
```js
Set(['Tab']) // pressing Tab will set the current suggestion
Set(['Shift+Tab']) // pressing Shift and Tab will set the current suggestion
Set(['Tab', 'Shift+Tab']) // pressing Shift and Tab or Tab will set the current suggestion
```

## completionOnClick : boolean
#### Default value: `false`
Allows completion on click as well, by default only touch devices with tap can set current suggestion

## classNames : object
#### Default value: `{wrapper: undefined, suggestion: undefined}`
You can set class names for the support elements - wrapper and suggestion overlay

## styles : object
#### Default value: `{wrapper: undefined, suggestion: undefined}`
You can set react inline styles for the support elements - wrapper and suggestion overlay
Be careful not to override important functional styles, such as
- make sure the suggestion z index is below the form
- make sure that the form and the suggestion have the same overlap size

```

