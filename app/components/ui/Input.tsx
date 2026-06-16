type InputProps = {
  label?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** Input — labelled text field with a soft blue focus ring. */
export function Input({ label, optional = false, hint, error, id, className = "", ...rest }: InputProps) {
  const fid = id || (label ? "f-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <div className={`nhm-field ${error ? "nhm-field--error" : ""} ${className}`.trim()}>
      {label ? (
        <label className="nhm-field__label" htmlFor={fid}>
          {label}
          {optional ? <span className="opt">&nbsp;&nbsp;(optional)</span> : null}
        </label>
      ) : null}
      <input id={fid} className="nhm-input" {...rest} />
      {error ? (
        <span className="nhm-field__hint nhm-field__hint--error">{error}</span>
      ) : hint ? (
        <span className="nhm-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
