const JSONUtil = (() => {
  function parseJSON(response) {
    return response.json();
  }

  function handleParseException(ex) {
    console.log('parsing failed', ex);
  }

  return { parseJSON, handleParseException };
})();

export default JSONUtil;
