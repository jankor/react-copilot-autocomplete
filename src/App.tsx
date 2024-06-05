import {forwardRef} from 'react';
import AutocompleteArea, { AutocompleteInputRef } from './react-copilot-autocomplete';
import { Theme, TextField } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const EnhancedTextField = forwardRef<AutocompleteInputRef>((props, fwdRef) => 
  <TextField.Root size="2" {...props} ref={fwdRef} placeholder="City names…" />);

function App() {  
  return (
    <Theme>
      <div style={{width: '350px', margin: '0 auto'}}>
        <div>
          <h1>Autocomplete Area</h1>
          <p>Type Berlin, London, Paris, Madrid, Budapest to see suggestions <span style={{color: '#3f3f3f'}}>(use Tab on keyboard or tap the textarea on mobile to autocomplete)</span></p>
          <p>Input:</p>
          <AutocompleteArea style={{padding: '3px', margin: 0, width: '100%', border: '1px solid grey'}} dictionary={['Berlin', 'London', 'Paris', 'Madrid', 'Budapest']} />
          <p>Textarea:</p>
          <AutocompleteArea as='textarea' style={{padding: '5px', height: '50px', margin: 0, width: '100%'}} dictionary={['Berlin', 'London', 'Paris', 'Madrid', 'Budapest']} />  
          <p>Radix input asChild:</p>
            <AutocompleteArea asChild styles={{suggestion: {top: '1px', left: '1px', height: '29.500px', opacity: 0.8}}} dictionary={['Berlin', 'London', 'Paris', 'Madrid', 'Budapest']}>
              <EnhancedTextField />
            </AutocompleteArea>
          <p>Check the examples at <a href="https://github.com/jankor/react-copilot-autocomplete/blob/main/src/App.tsx">https://github.com/jankor/react-copilot-autocomplete/blob/main/src/App.tsx</a></p>
        </div>
      </div>
    </Theme>
  );
}

export default App;
