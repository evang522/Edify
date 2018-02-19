// API.JS is used to fetch, update, create, and delete data from the API

const api = function () {

  const fetch = (callback) => {
    $.getJSON('/api/needs', callback);
  };


  const fetchById = (id, callback) => {
    $.getJSON('/api/needs/'+ id, callback);
  };

  const createNeed = (data,callback) => {
    $.ajax({
      url:'/api/needs',
      type:'POST',
      contentType:'application/json',
      data:JSON.stringify(data),
      success:callback
    });
  };

  const deleteNeed = (id,callback) => {
    $.ajax({
      url:'/api/needs/' + id,
      type:'DELETE',
      contentType:'application/json',
      success:callback
    });
  };


  const addComment = (id,data,callback) => {
    $.ajax({
      url:'/api/needs/comments/'+id,
      contentType:'application/json',
      type:'PUT',
      data: JSON.stringify(data),
      success:callback
    });
  };


  return {
    fetch,
    createNeed,
    deleteNeed,
    addComment,
    fetchById
  };

}();
