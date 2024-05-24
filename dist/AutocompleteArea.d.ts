/// <reference types="react" />
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
}
export interface AutocompleteTextareaRef extends HTMLTextAreaElement {
    clearSuggestion: () => void;
}
declare const RefAutocompleteTextarea: import('react').ForwardRefExoticComponent<componentProps & import('react').RefAttributes<AutocompleteTextareaRef>>;
export default RefAutocompleteTextarea;
