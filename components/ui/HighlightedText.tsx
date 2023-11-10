import React from 'react';
import classes from '../../styles/test.module.css';

interface HighlightedTextProps {
  text: string;
  stringsToHighlight: string[];
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, stringsToHighlight }) => {
  if (!text || !stringsToHighlight || stringsToHighlight.length === 0) {
    return <pre className={classes.preformated_text}>{text}</pre>;
  }

  const normalizeString = (string: string) => {
    return string.replace(/\s+/g, ' ').trim()
  }

  let normalizedText = normalizeString(text)

  stringsToHighlight.forEach((stringToHighlight) => {
    const index = normalizedText.indexOf(stringToHighlight)
    if (index !== -1) {
      normalizedText = normalizedText.slice(0, index) +
        `<span style="background-color: #FBC49D; padding: 1px; border-radius: 5px;">${stringToHighlight}</span>` +
        normalizedText.slice(index + stringToHighlight.length)
    }
  });

  return <div dangerouslySetInnerHTML={{ __html: normalizedText }} />;
};

export default HighlightedText;
