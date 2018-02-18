// This page exists to take care of dom-related functions: i.e. generating HTML strings, updating views, etc.

/*global store api dom */

const dom = function () {


  const generatePrequestString = (listOfPrequests) => {
    let domString = '';
    domString += `<div class="card prayer-card prayer-card-add">
      <div class="card-body">
        <h5 class="card-title">Add Prayer Request</h4>
        <form class='submit-prequest-form'>
          <label class="card-text" for='title'>Title:</label>
          <input id='title' class='submit-prequest-title'>
          <label class='card-text" for='requestbody'>Request: </label>
          <textarea id='requestbody' class='submit-prequest-body'></textarea>
          <button type='submit' class="btn center btn-success submit-prequest-button">Submit</button>
        </form>
      </div>
    </div>`;
    domString += listOfPrequests.map((request) => {
      return `
      <div data-id = '${request.id}' class="card prayer-card">
            <div class="card-body">
                <h5 class="card-title">${request.title}</h4>
                <p class="card-text">
                    ${request.requestbody}
                    <div class='prayer-author'>
                        <b>Posted by: ${request.author}</b>
                    </div>
                    <br>
                    ${moment(request.created).calendar()}
                    <br>
                    <br>
                <a href="/prayer" class="btn btn-info view-request">View</a>
            </div>
        </div>`;
    });
    return domString;
  };  

  const renderPrequests = (domString) => {
    $('.prequest-container').html(domString);
  }; 

  const generateIndividualPrequestString = (request) => {
    let commentString = '';
    if (request.comments.length) {
      request.comments.forEach((comment) => {
        commentString += `<li class='prequest-comment list-group-item'>${comment.author} : ${comment.message} -- <i>${moment(request.created).calendar()}</i></li>`;
      });
    }

    return  `<div data-id = '${request.id}' class="card h75 individual-prayer-card">
          <div class="card-body">
              <h5 class="card-title">${request.title}</h4>
              <p class="card-text">
                  ${request.requestbody}
                  <div class='prayer-author'>
                      <b>Posted by: ${request.author}</b>
                  </div>
                  <br>
                  ${moment(request.created).calendar()}
                  <br>
                  <br>
              <a href="/prayer" class="btn btn-info js-back-to-main-button">Back</a>
              <a href="/prayer" class="btn btn-danger js-delete-prequest">Delete</a>
          </div>
          <div class=prequest-comments>
          <form class='prequest-comment-form'>
            <label for='prequest-comment-input'>Add Comment</label>
            <input id = 'prequest-comment-input' class='prequest-comment-input'>
          </form>
          <ul class="list-group prequest-comment bg-info">
         </ul>
        ${commentString}
      </div>`;
  };

  const renderIndividualPrequest = (domString) => {
    $('.prequest-container').html('');
    $('.individual-prequest-view').html(domString);
  };


  const handleNewPrequest = () => {
    $('.prequest-container').on('submit', '.submit-prequest-form', (event) => {
      event.preventDefault();

      const title = $('.submit-prequest-title').val();
      const requestbody = $('.submit-prequest-body').val();

      if ( !title || !requestbody) {
        return null;
      }

      const newItem = {
        'title':title,
        'requestbody':requestbody
      };
      // Send to Server
      api.createPrequest(newItem, (data) => {
        store.prequests.push(data);
        let domString = dom.generatePrequestString(store.prequests);
        dom.renderPrequests(domString);
      });

    });
  };


  const handleReturnToMainPrequest = () => {
    $('.view-request').on('click','.js-back-to-main-button', (event) => {
      event.preventDefault();
      store.currentPrequest = '';
    });
  };

  const handleViewPrequest = () => {
    $('.prequest-container').on('click', '.view-request', (event) => {

      event.preventDefault();
      let id =  $(event.target).closest('.prayer-card').attr('data-id');
      let currentRequest = store.prequests.find((request) => {
        return request.id === id;
      });
      store.currentPrequest = currentRequest;
      render();
    });
  };


  const handleNewComment = () => {
    $('.individual-prequest-view').on('submit', '.prequest-comment-form', (event) => {
      event.preventDefault();
      const message =  $('.prequest-comment-input').val();
      const id = $(event.target).closest('.individual-prayer-card').attr('data-id');
      api.addComment(id,{message},(response) => {
        store.currentPrequest.comments.push({'message':message, author:'Evan Garrett'});
        dom.render(store.currentPrequest);
      });
    });
  };

  const handleDeletePrequest = () => {
    $('.individual-prequest-view').on('click', '.js-delete-prequest', (event) => {
      event.preventDefault();
      const id = $(event.target).closest('.individual-prayer-card').attr('data-id');

      api.deletePrequest(id, (response) => {
        console.log(response);
        store.currentPrequest = '';
        store.prequests = store.prequests.filter((request) => {
          return request.id !== id;
        });
        $('.individual-prequest-view').html('');
        render();        
      });
    });
  };

  const render = () => {
    if (store.currentPrequest) {
      let domString = generateIndividualPrequestString(store.currentPrequest);
      renderIndividualPrequest(domString);
    } else {
      let domString = dom.generatePrequestString(store.prequests);
      renderPrequests(domString);
    }
  };

  const initListeners = () => {
    handleNewPrequest();
    handleViewPrequest();
    handleReturnToMainPrequest();
    handleNewComment();
    handleDeletePrequest();
  };

  return{
    generatePrequestString,
    renderPrequests,
    initListeners,
    generateIndividualPrequestString,
    render
  };

}();