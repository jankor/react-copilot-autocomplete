import AutocompleteArea from './react-copilot-autocomplete';
function App() {
  return (
    <>
      <AutocompleteArea caseSensitive dictionary={['Berlin', 'London', 'New York', 'Hong Kong']}/>
      <AutocompleteArea handleCompletion={({value, setSuggestion}) => {
        if (value === 'Could we mee') {
          setSuggestion('t in New York? // This can be your AI powered suggestion');
        }
    }}/>
    </>
  );
}

export default App;
