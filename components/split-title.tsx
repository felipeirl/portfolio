import { Fragment, type CSSProperties } from "react";

interface SplitTitleProps {
  text: string;
}

/**
 * Título em que cada palavra sobe de dentro de uma máscara (animação em CSS, guiada pelo scroll).
 * O texto inteiro fica no DOM em .sr-only para leitores de tela; as palavras animadas são decorativas.
 */
export function SplitTitle({ text }: SplitTitleProps) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word">
              <span style={{ "--i": index } as CSSProperties}>{word}</span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}
