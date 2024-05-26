import {
  useState,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle,
  useCallback,
} from "react";
import { Trie } from "trie-typed";

type completionParams = {
  value: string;
  currentSuggestion: string;
  setSuggestion: (suggestion: string) => void;
  onChangeEvent: React.ChangeEvent<HTMLTextAreaElement>;
};

interface componentProps extends React.HTMLAttributes<HTMLElement> {
  autocompleteEnabled?: boolean;
  dictionary?: Array<string>;
  caseSensitive?: boolean;
  handleCompletion?: (completionParams: completionParams) => void;
  classNames?: {
    wrapper?: string;
    area?: string;
    suggestion?: string;
  };
  styles?: {
    wrapper?: React.StyleHTMLAttributes<HTMLDivElement>;
    area?: React.StyleHTMLAttributes<HTMLTextAreaElement>;
    suggestion?: React.StyleHTMLAttributes<HTMLDivElement>;
  };
};

export interface AutocompleteTextareaRef extends HTMLTextAreaElement {
  clearSuggestion: () => void;
}

type component = React.ForwardRefRenderFunction<
  AutocompleteTextareaRef,
  componentProps
>;

enum KeyEnum {
  TAB = "Tab",
}

/**
 * JSX Component for displaying textarea with copilot like word autocomplete
 * @param {object} props
 * @param {string[]} props.dictionary array of strings with words to be used for autocomplete
 * @param {boolean} props.autocompleteEnabled enables/disables autocomplete, true by default
 * @param {function ({object}) void} props.handleCompletion function to handle custom completion
 * @param {boolean} props.caseSensitive case sensitivity for the built-in autocomplete, false by default
 * @param {object} props.classNames object with keys: wrapper, area, suggestion for custom class names
 * @param {object} props.styles object with keys: wrapper, area, suggestion for custom react inline styles
 * @returns
 */
const AutocompleteTextarea: component = (
  {
    styles,
    classNames,
    dictionary = [],
    autocompleteEnabled = true,
    onChange,
    onMouseDown,
    handleCompletion,
    caseSensitive = false,
    ...rest },
  ref,
) => {
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<AutocompleteTextareaRef>(null); 
  const suggestionRef = useRef<HTMLDivElement>(null);;  

  useImperativeHandle(ref, () => {
    inputRef.current!.clearSuggestion = () => {
      setSuggestion(inputRef?.current?.value || "");
    };
    return inputRef.current!;
  });

  const lastSuggestedWord = useRef("");
  const wordIndex = useMemo(
    () => new Trie(dictionary, { caseSensitive }),
    [dictionary],
  );

  const getLatestWord = useCallback((text: string) => {
    return text.slice(text.lastIndexOf(" ") + 1);
  }, []);

  const handleScrollInput = (scroll: React.UIEvent<HTMLTextAreaElement>) => {
    if (!suggestionRef.current) return;  
    suggestionRef.current.scrollTop = scroll.currentTarget.scrollTop;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!autocompleteEnabled) return;
    if (Object.values(KeyEnum).includes(e.key as KeyEnum)) {
      e.preventDefault();
    }

    switch (e.key) {
      case KeyEnum.TAB:
        if (!suggestion) return;

        if (inputRef.current) {
          inputRef.current.value = suggestion;
        }
        lastSuggestedWord.current = "";
        setSuggestion(suggestion);
        break;
    }
  };

  const onAreaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    onMouseDown && onMouseDown(e);
    //e.nativeEvent.sourceCapabilities.firesTouchEvents // true for touch not in safari
    if (!autocompleteEnabled) return;
    if (!suggestion) return;
    if (inputRef.current) {
      if (suggestion === inputRef.current.value) return;
      inputRef.current.value = suggestion;
      inputRef.current.selectionStart = inputRef.current.selectionEnd =
      inputRef.current.value.length + 1;
      lastSuggestedWord.current = "";
      setSuggestion(suggestion);
      e.preventDefault();
    } 
  }

  const onUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.target.value;

    onChange && onChange(e);
    if (handleCompletion) {
      setSuggestion(currentText);
      handleCompletion({
        value: e.target.value,
        currentSuggestion: suggestion,
        setSuggestion: (value) => setSuggestion(currentText + value),
        onChangeEvent: e,
      });
      return;
    }

    if (!autocompleteEnabled) return;

    const startPosition =  e.target.selectionStart;
    const endPosition =  e.target.selectionEnd
    const currentWord = getLatestWord(currentText);

    if (inputRef.current && suggestionRef.current) {
      suggestionRef.current.scrollTop = inputRef.current.scrollTop;
    }
    setSuggestion(currentText);
    // if the current word is less than 2 characters, don't suggest anything
    // if the user has active selection don't suggest anything
    // if the user is not at the end of the text don't suggest anything
    if (currentWord.length < 2 || startPosition !== endPosition || endPosition !== currentText.length) {
      if (currentWord.length === 0 || lastSuggestedWord.current) {
        lastSuggestedWord.current = "";
      }
      return;
    }

    // do not suggest the same word again
    if (
      lastSuggestedWord.current &&
      lastSuggestedWord.current
        .toLowerCase()
        .startsWith(currentWord.toLowerCase())
    ) {
      const suggestedStringMissingPart = lastSuggestedWord.current.slice(
        currentWord.length,
      );
      setSuggestion(currentText + suggestedStringMissingPart);      
      return;
    }

    // conduct a search in the trie
    const hasPrefix = wordIndex.hasPrefix(currentWord);
    const [suggestedString] = hasPrefix
      ? wordIndex.getWords(currentWord, 1)
      : [null];
    if (suggestedString) {      
      lastSuggestedWord.current = suggestedString;
      const suggestedStringMissingPart = suggestedString.slice(
        currentWord.length,
      );
      setSuggestion(currentText + suggestedStringMissingPart);      
      return;
    }

    //reset suggestion if nothing is matching
    lastSuggestedWord.current = "";
  };

  const wrapperStyle = {
    position: 'relative' as 'relative',
    margin: 0,
    padding: 0,
    ...styles?.wrapper,
  };

  const areaStyle = {
    fontFamily: 'inherit',
    width: '100%',
    height: '300px',
    boxSizing: 'border-box' as 'border-box',
    backgroundColor: 'transparent',
    border: '1px solid #d9d9d9',
    fontSize: '15px',
    resize: 'none' as 'none',
    padding: '10px',
    zIndex: 1,
    ...styles?.area,
  };

  const suggestionStyle = {
    ...areaStyle,
    position: 'absolute' as 'absolute',
    overflowY: 'scroll' as 'scroll',
    backgroundColor: 'white',
    display: 'block !important',
    top: 0,
    color: '#c9c9c9',
    borderColor: 'transparent',
    zIndex: -1,
    ...styles?.suggestion,
  };

  return (
    <div style={wrapperStyle} className={classNames?.wrapper}>
      <textarea
        style={areaStyle}
        className={classNames?.area}
        ref={inputRef}
        onChange={onUpdate}
        onKeyDown={handleKeyDown}
        onMouseDown={onAreaClick}
        onScroll={handleScrollInput}
        {...rest}
      />
      {autocompleteEnabled ? (
        <div ref={suggestionRef} style={suggestionStyle} className={classNames?.suggestion}>{suggestion}</div>
      ) : (
        false
      )}
    </div>
  );
};

const RefAutocompleteTextarea = forwardRef<
  AutocompleteTextareaRef,
  componentProps
>(AutocompleteTextarea);
export default RefAutocompleteTextarea;
