import {
  useState,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import { Trie } from "trie-typed";

type completionParams = {
  value: string;
  currentSuggestion: string;
  setSuggestion: (suggestion: string) => void;
  onChangeEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
};

type possibleInputComponents = 'input' | 'textarea';

interface componentProps extends React.HTMLAttributes<HTMLElement> {
  autocompleteEnabled?: boolean;
  dictionary?: Array<string>;
  caseSensitive?: boolean;
  handleCompletion?: (completionParams: completionParams) => void;
  completionShortcut?: Set<string>;
  completionOnClick?: boolean;
  as?: possibleInputComponents,
  asChild?: boolean,
  classNames?: {
    wrapper?: string;
    suggestion?: string;
  };
  styles?: {
    wrapper?: React.StyleHTMLAttributes<HTMLDivElement>;    
    suggestion?: React.StyleHTMLAttributes<HTMLDivElement>;
  };
};

export interface AutocompleteTextareaRef extends HTMLTextAreaElement {
  clearSuggestion: () => void;
}

export interface AutocompleteInputRef extends HTMLInputElement {
  clearSuggestion: () => void;
}

type component = React.ForwardRefRenderFunction<
  AutocompleteTextareaRef | AutocompleteInputRef,
  componentProps
>;

/**
 * JSX Component for displaying textarea with copilot like word autocomplete
 * @param {object} props
 * @param {string[]} props.dictionary array of strings with words to be used for autocomplete
 * @param {boolean} props.autocompleteEnabled enables/disables autocomplete, true by default
 * @param {function ({object})} props.handleCompletion function to handle custom completion
 * @param {boolean} props.caseSensitive case sensitivity for the built-in autocomplete, false by default
 * @param {boolean} props.completionOnClick disable to only complete on touch devices, false by default
 * @param {Set<string>} props.completionShortcut Set with keys to complete the suggestion
 * @param {object} props.classNames object with keys: wrapper, area, suggestion for custom class names
 * @param {object} props.styles object with keys: wrapper, area, suggestion for custom react inline styles
 * @returns
 */
const AutocompleteTextarea: component = (
  {
    styles,
    style,
    className,
    classNames,
    dictionary = [],
    autocompleteEnabled = true,
    onChange,
    onMouseDown,
    handleCompletion,
    caseSensitive = false,
    completionShortcut = new Set(['Tab']),
    completionOnClick = false,
    as: Tag = 'textarea' as unknown as React.ElementType,
    asChild = false,
    ...rest },
  ref,
) => {
  const [suggestion, setSuggestion] = useState("");
  const [suggestionStyle, setSuggestionStyle] = useState({});
  const inputRef = useRef<AutocompleteTextareaRef | AutocompleteInputRef| null>(null); 
  const suggestionRef = useRef<HTMLDivElement>(null); 
  const backgroundColor = useRef<string | null>(null); 
  
  useImperativeHandle(ref, () => {
    inputRef.current!.clearSuggestion = () => {
      setSuggestion(inputRef?.current?.value || "");
    };
    return inputRef.current!;
  });

  const lastSuggestedWord = useRef("");
  const wordIndex = useMemo(
    () => handleCompletion ? {} : new Trie(dictionary, { caseSensitive }),
    [dictionary, caseSensitive, handleCompletion],
  ) as Trie;

  const touchDevice = useMemo(() => window.matchMedia("(pointer: coarse)").matches, [window]);
  const isInput = useMemo(() => inputRef.current?.nodeName === 'INPUT', [inputRef]);

  const getLatestWord = useCallback((text: string) => {
    return text.slice(text.lastIndexOf(" ") + 1);
  }, []);

  const syncOverlayStyle = useCallback(() => {    
    const inputStyle = inputRef.current ? getComputedStyle(inputRef.current) : null;    
    if (inputStyle) {
      if (inputStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && inputRef.current) {
        backgroundColor.current = inputStyle.backgroundColor;
        inputRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      }      
      setSuggestionStyle({
        ...defaultSuggestionStyle,
        width: inputStyle.width,
        height: inputStyle.height,
        boxSizing: inputStyle.boxSizing,
        marginLeft: inputStyle.marginLeft,
        marginRight: inputStyle.marginRight,
        marginTop: inputStyle.marginTop,
        marginBottom: inputStyle.marginBottom,
        paddingLeft: inputStyle.paddingLeft,
        paddingRight: inputStyle.paddingRight,
        paddingTop: inputStyle.paddingTop,
        paddingBottom: inputStyle.paddingBottom,
        fontFamily: inputStyle.fontFamily,
        fontSize: inputStyle.fontSize,
        borderLeftWidth: inputStyle.borderLeftWidth,
        borderRightWidth: inputStyle.borderRightWidth,
        borderTopWidth: inputStyle.borderTopWidth,
        borderBottomWidth: inputStyle.borderBottomWidth,
        borderStyle: inputStyle.borderStyle,
        backgroundColor: backgroundColor.current || 'white',
        lineHeight: isInput ? inputStyle.height : inputStyle.lineHeight,
      });
    }
  }, [inputRef, isInput]);

  const handleScrollInput = (scroll: React.UIEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!suggestionRef.current) return;
    if (isInput && scroll.currentTarget.scrollLeft !== 0) {
      if (suggestion !== '') {
        setSuggestion('');
        lastSuggestedWord.current = "";
      }
    }
    suggestionRef.current.scrollTop = scroll.currentTarget.scrollTop;
    suggestionRef.current.scrollLeft = scroll.currentTarget.scrollLeft;    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!autocompleteEnabled) return;
    const modifier = `${e.altKey ? 'Alt+' : ''}${e.ctrlKey ? 'Ctrl+' : ''}${e.metaKey ? 'Meta+' : ''}${e.shiftKey ? 'Shift+' : ''}`
    if (completionShortcut.has(`${modifier}${e.key}`)) {
      e.preventDefault();
      if (!suggestion) return;

        if (inputRef.current) {
          inputRef.current.value = suggestion;
        }
        lastSuggestedWord.current = "";
        setSuggestion(suggestion);
    }    
  };

  const onAreaClick = (e: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onMouseDown && onMouseDown(e);
    //e.nativeEvent.sourceCapabilities.firesTouchEvents // true for touch not in safari
    if (!touchDevice && !completionOnClick) return;
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

  const onUpdate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const currentText = e.target.value;
    const startPosition =  e.target.selectionStart;
    const endPosition =  e.target.selectionEnd
    const currentWord = getLatestWord(currentText);
    const scrollLeft = e.target.scrollLeft;
    const isTargetInput = e.target.nodeName === 'INPUT';

    onChange && onChange(e);

    if (isTargetInput && scrollLeft !== 0) {
      if (suggestion !== '') {
        setSuggestion('');
        lastSuggestedWord.current = "";
      }
      return;
    }

    if (handleCompletion) {
      setSuggestion(currentText);
      if (startPosition !== endPosition || endPosition !== currentText.length) {
        handleCompletion({
          value: e.target.value,
          currentSuggestion: suggestion,
          setSuggestion: (value) => setSuggestion(currentText + value),
          onChangeEvent: e,
        });
      }
      return;
    }

    if (!autocompleteEnabled) return;

    if (inputRef.current && suggestionRef.current) {
      suggestionRef.current.scrollTop = inputRef.current.scrollTop;
      suggestionRef.current.scrollLeft = inputRef.current.scrollLeft;
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

  const defaultSuggestionStyle = {
    position: 'absolute' as 'absolute',
    overflowY: 'scroll' as 'scroll',
    overflowX: 'scroll' as 'scroll',    
    display: 'block !important',    
    top: 0,
    opacity: 0.5,
    //whiteSpace: 'nowrap', // check if this is required for input
    borderColor: 'transparent',
    zIndex: -1,
    
  };
  useEffect(() => {
    syncOverlayStyle();
  }, [inputRef.current])
//console.log('ref', inputRef.current ? getComputedStyle(inputRef.current) : 'no ref')
  
  return (
    <div style={wrapperStyle} className={classNames?.wrapper}>{
      asChild ? (rest.children) : (
        <Tag        
          style={style}
          className={className}
          ref={inputRef}
          onChange={onUpdate}
          onKeyDown={handleKeyDown}
          onMouseDown={onAreaClick}
          onScroll={handleScrollInput}
          {...rest}
        />)
      }
      {autocompleteEnabled ? (
        <div ref={suggestionRef} style={suggestionStyle} className={classNames?.suggestion}>{suggestion}</div>
      ) : (
        false
      )}
    </div>
  );
};

const RefAutocompleteTextarea = forwardRef<
  AutocompleteTextareaRef | AutocompleteInputRef,
  componentProps
>(AutocompleteTextarea);
export default RefAutocompleteTextarea;
