export function Background() {
  return (
    <>
      <div aria-hidden className="aurora">
        <span className="aurora-blob a" />
        <span className="aurora-blob b" />
        <span className="aurora-blob c" />
      </div>
      <div aria-hidden className="grid-overlay" />
      <div aria-hidden className="grain" />
    </>
  );
}
