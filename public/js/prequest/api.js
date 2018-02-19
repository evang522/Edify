// API.JS is used to fetch, update, create, and delete data from the API

const api = function () {

  const fetch = (callback) => {
    $.getJSON('/api/prequests', callback);
  };

  const createPrequest = (data,callback) => {
    $.ajax({
      url:'/api/prequests',
      type:'POST',
      contentType:'application/json',
      data:JSON.stringify(data),
      success:callback
    });
  };

  const deletePrequest = (id,callback) => {
    $.ajax({
      url:'/api/prequests/' + id,
      type:'DELETE',
      contentType:'application/json',
      success:callback
    });
  };


  const addComment = (id,data,callback) => {
    $.ajax({
      url:'/api/prequests/comments/'+id,
      contentType:'application/json',
      type:'PUT',
      data: JSON.stringify(data),
      success:callback
    });
  };


  return {
    fetch,
    createPrequest,
    deletePrequest,
    addComment
  };

}();
