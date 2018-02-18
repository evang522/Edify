// API.JS is used to fetch, update, create, and delete data from the API

const api = function () {

  const fetch = (callback) => {
    $.getJSON('/api/prequest', callback);
  };

  const createPrequest = (data,callback) => {
    $.ajax({
      url:'/api/prequest',
      type:'POST',
      contentType:'application/json',
      data:JSON.stringify(data),
      success:callback
    });
  };

  const deletePrequest = (id,callback) => {
    $.ajax({
      url:'/api/prequest/' + id,
      type:'DELETE',
      contentType:'application/json',
      success:callback
    });
  };

  return {
    fetch,
    createPrequest,
    deletePrequest
  };

}();
