type LogoStripProps = { brands: string[] };

/** LogoStrip — neutral type-set chips standing in for real brand logos. */
export function LogoStrip({ brands }: LogoStripProps) {
  return (
    <div className="logostrip">
      {brands.map((b) => (
        <div className="logochip" key={b}>
          {b}
        </div>
      ))}
    </div>
  );
}
