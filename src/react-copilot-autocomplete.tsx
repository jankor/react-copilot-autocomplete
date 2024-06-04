import {
  useState,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle,
  useCallback,
  useEffect,
  cloneElement,
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
    wrapper?:  React.CSSProperties;    
    suggestion?: React.CSSProperties;
  };
  children?: React.ReactNode;
};

export interface AutocompleteTextareaRef extends HTMLTextAreaElement {
  clearSuggestion: () => void;
  setSuggestion: (suggestion: string) => void;
}

export interface AutocompleteInputRef extends HTMLInputElement {
  clearSuggestion: () => void;
  setSuggestion: (suggestion: string) => void;
}

type component = React.ForwardRefRenderFunction<
  AutocompleteTextareaRef | AutocompleteInputRef,
  componentProps
>;

const defaultSuggestionStyle = {
  position: 'absolute' as 'absolute',
  overflowY: 'hidden' as 'hidden',    
  display: 'block !important',
  whiteSpace: 'pre-wrap', 
  top: 0,  
  opacity: 0.5,
  borderColor: 'transparent',
  zIndex: -1,  
};

const defaultWrapperStyle = {
  position: 'relative' as 'relative',
  margin: 0,
  padding: 0,    
};

/**
 * JSX Component for displaying textarea with copilot like word autocomplete
 * @param {object} props
 * @param {string[]} props.dictionary array of strings with words to be used for autocomplete
 * @param {boolean} props.autocompleteEnabled enables/disables autocomplete, true by default
 * @param {function ({object})} props.handleCompletion function to handle custom completion
 * @param {string} props.as: input | texarea, default is input
 * @param {boolean} props.asChild use this prop to wrap a child component with autocomplete, false by default
 * @param {boolean} props.caseSensitive case sensitivity for the built-in autocomplete, false by default
 * @param {boolean} props.completionOnClick disable to only complete on touch devices, false by default
 * @param {Set<string>} props.completionShortcut Set with keys to complete the suggestion
 * @param {object} props.classNames object with keys: wrapper, suggestion for custom class names
 * @param {object} props.styles object with keys: wrapper, suggestion for custom react inline styles
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
    as: Tag = 'input' as unknown as React.ElementType,
    asChild = false,
    children,
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
    inputRef.current!.setSuggestion = (suggestion: string) => {
      setSuggestion(suggestion);
    };
    return inputRef.current!;
  });

  const lastSuggestedWord = useRef("");
  const wordIndex = useMemo(
    () => handleCompletion ? {} : new Trie(dictionary, { caseSensitive }),
    [dictionary, caseSensitive, handleCompletion],
  ) as Trie;

  const touchDevice = useMemo(() => window.matchMedia("(pointer: coarse)").matches, [window]);
  
  const getLatestWord = useCallback((text: string) => {  
    const words = text.split(/\W+/)
    return words.length > 0 ? words[words.length - 1] : '';
  }, []);

  const syncOverlayStyle = useCallback(() => {        
    const inputStyle = inputRef.current ? getComputedStyle(inputRef.current) : null;
    const isInput = inputRef.current?.nodeName === 'INPUT';
    if (inputStyle) {
      if (inputStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && inputRef.current) {
        backgroundColor.current = inputStyle.backgroundColor;
        inputRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        inputRef.current.style.overscrollBehavior = 'none';
        inputRef.current.style.verticalAlign = 'top';
      }
      console.log(inputStyle);
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
        textIndent: inputStyle.textIndent,
        lineHeight: isInput ? inputStyle.height : inputStyle.lineHeight,
        verticalAlign: inputStyle.verticalAlign,
        ...styles?.suggestion,
      });
    }
  }, [inputRef]);

  const resizeObserver = useRef(new ResizeObserver(() => {    
    syncOverlayStyle();
  }));

  useEffect(() => {
    if (inputRef.current && resizeObserver.current) {      
      resizeObserver.current.observe(inputRef.current);

      return () => {
        resizeObserver.current.disconnect();
      }
    }
  }, [inputRef.current]);

  useEffect(() => {
    syncOverlayStyle();
  }, [inputRef.current])

  useEffect(() => {
    if (inputRef.current && suggestionRef.current) {      
      suggestionRef.current.scrollTop = inputRef.current.scrollTop;
      suggestionRef.current.scrollLeft = inputRef.current.scrollLeft;
    }
  }, [suggestion, suggestionRef.current, inputRef.current])

  const handleScrollInput = (scroll: React.UIEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!suggestionRef.current) return;
    if (scroll.currentTarget.nodeName === 'INPUT' && scroll.currentTarget.scrollLeft !== 0) {
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

    if (currentText.length > 0 && currentText[currentText.length - 1] === '\n') {
      // make sure new line is visible in suggestion as well for synced scrolling
      setSuggestion(currentText + ' ');
    } else {
      setSuggestion(currentText);
    }

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

  return (
    <div style={{...defaultWrapperStyle, ...styles?.wrapper }} className={classNames?.wrapper}>{
      asChild ? (
        cloneElement(children as React.ReactElement, {
        ref: inputRef,
        onChange: onUpdate,
        onKeyDown: handleKeyDown,
        onMouseDown: onAreaClick,
        onScroll: handleScrollInput,
        ...rest
        }
      )) : (
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
