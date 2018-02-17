// API.JS is used to fetch, update, create, and delete data from the API

const api = function () {

  const fetch = (callback) => {
    $.getJSON('/api/prequest', callback);
  };

  const createPrequest = (data,callback) => {
    $.ajax({
      url:'/api/prequest',
      method:'POST',
      contentType:'application/json',
      data:data,
      success:callback
    });
  };

  return {
    fetch,
    createPrequest
  };

}();
