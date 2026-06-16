type TextareaProps = {
  label?: string;
  optional?: boolean;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Textarea — labelled multi-line field. */
export function Textarea({ label, optional = false, hint, id, className = "", ...rest }: TextareaProps) {
  const fid = id || (label ? "t-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <div className={`nhm-field ${className}`.trim()}>
      {label ? (
        <label className="nhm-field__label" htmlFor={fid}>
          {label}
          {optional ? <span className="opt">&nbsp;&nbsp;(optional)</span> : null}
        </label>
      ) : null}
      <textarea id={fid} className="nhm-textarea" {...rest} />
      {hint ? <span className="nhm-field__hint">{hint}</span> : null}
    </div>
  );
}
