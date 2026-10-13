/** Colours each word's first letter, the way the AMV mark sets A, M and V. */
export function Initialled({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="text-accent-logo">{word[0]}</span>
          {word.slice(1)}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
