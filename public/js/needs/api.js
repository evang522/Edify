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
      url:`/api/needs/${id}/comments/`,
      contentType:'application/json',
      type:'PUT',
      data: JSON.stringify(data),
      success:callback
    });
  };

  const deleteComment = (id,commentid,callback) => {
    $.ajax({
      url:`/api/needs/${id}/commentid/${commentid}`,
      type:'DELETE',
      contentType:'application/json',
      success:callback
    });
  };


  return {
    fetch,
    createNeed,
    deleteNeed,
    addComment,
    deleteComment
  };

}();
