import AutocompleteArea from './react-copilot-autocomplete';
function App() {
  return (
    <div style={{width: '400px', margin: '0 auto'}}>
      <div>
        <h1>Autocomplete Area</h1>
        <p>Type Berlin, London, Paris, Madrid, Budapest to see suggestions</p>
        <AutocompleteArea  dictionary={['Berlin', 'London', 'Paris', 'Madrid', 'Budapest']}/>        
      </div>
    </div>
  );
}

export default App;
