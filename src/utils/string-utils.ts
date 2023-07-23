function getSubStringFromHashtag(str: string) {
  const regex = /#[^\s#]+/;

  const matches = str.match(regex);
  if (matches) {
    return matches[0];
  }
  return str;
}

export {getSubStringFromHashtag};
