// This page exists to take care of dom-related functions: i.e. generating HTML strings, updating views, etc.

/*global store api moment dom */

const dom = function () {


  const generateNeedString = (listOfneeds) => {
    let domString = '';
    domString += `<div class="card prayer-card prayer-card-add">
      <div class="card-body">
        <h5 class="card-title">Post a Need</h4>
        <form class='submit-need-form'>
          <label class="card-text" for='title'>Title:</label>
          <input id='title' class='submit-need-title'>
          <label class='card-text" for='body'>Request: </label>
          <textarea id='body' class='submit-need-body'></textarea>
          <button type='submit' class="btn center btn-success submit-need-button">Submit</button>
        </form>
      </div>
    </div>`;
    domString += listOfneeds.map((request) => {
      console.log(request.body);
      return `
      <div data-id = '${request.id}' class="card prayer-card">
            <div class="card-body">
                <h5 class="card-title">${request.title}</h4>
                <p class="card-text">
                    ${request.body}
                    <div class='prayer-author'>
                        <b>Posted by: ${request.author.name}</b>
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

  const renderNeeds = (domString) => {
    $('.need-container').html(domString);
  }; 

  const generateIndividualNeedString = (request) => {
    let commentString = '';
    if (request.comments.length) {
      request.comments.forEach((comment) => {
        console.log(comment);
        commentString += `<li class='need-comment list-group-item'><b>${comment.author}</b> : ${comment.body} -- <i>${moment(request.created).calendar()}</i></li>`;
      });
    }

    return  `<div data-id = '${request.id}' class="card h75 individual-prayer-card">
          <div class="card-body">
              <h5 class="card-title">${request.title}</h4>
              <p class="card-text">
                  ${request.body}
                  <div class='prayer-author'>
                      <b>Posted by: ${request.author.name}</b>
                  </div>
                  <br>
                  ${moment(request.created).calendar()}
                  <br>
                  <br>
              <a href="/prayer" class="btn btn-info js-back-to-main-button">Back</a>
              <a href="/prayer" class="btn btn-danger js-delete-need">Delete</a>
          </div>
          <div class=need-comments>
          <form class='need-comment-form'>
            <label for='need-comment-input'>Add Comment:</label>
            <input id = 'need-comment-input' class='need-comment-input'>
          </form>
          <ul class="list-group need-comment bg-info">
         </ul>
        ${commentString}
      </div>`;
  };

  const renderIndividualNeed = (domString) => {
    $('.need-container').html('');
    $('.individual-need-view').html(domString);
  };


  const handleNewNeed = () => {
    $('.need-container').on('submit', '.submit-need-form', (event) => {
      event.preventDefault();

      const title = $('.submit-need-title').val();
      const body = $('.submit-need-body').val();

      if ( !title || !body) {
        return null;
      }

      const newItem = {
        'title':title,
        'body':body
      };
      // Send to Server
      api.createNeed(newItem, (data) => {
        store.needs.unshift(data);
        let domString = dom.generateNeedString(store.needs);
        dom.renderNeeds(domString);
      });

    });
  };


  const handleReturnToMainNeed = () => {
    $('.view-request').on('click','.js-back-to-main-button', (event) => {
      event.preventDefault();
      store.currentNeed = '';
    });
  };

  const handleViewNeed = () => {
    $('.need-container').on('click', '.view-request', (event) => {

      event.preventDefault();
      let id =  $(event.target).closest('.prayer-card').attr('data-id');
      let currentRequest = store.needs.find((request) => {
        return request.id === id;
      });
      store.currentNeed = currentRequest;
      render();
    });
  };


  const handleNewComment = () => {
    $('.individual-need-view').on('submit', '.need-comment-form', (event) => {
      event.preventDefault();
      const message =  $('.need-comment-input').val();
      const id = $(event.target).closest('.individual-prayer-card').attr('data-id');
      api.addComment(id,{message},(response) => {
        store.currentNeed.comments.push({'body':message, author:'Jimmy Thorton'});
        dom.render(store.currentNeed);
      });
    });
  };

  const handleDeleteNeed = () => {
    $('.individual-need-view').on('click', '.js-delete-need', (event) => {
      event.preventDefault();
      const id = $(event.target).closest('.individual-prayer-card').attr('data-id');

      api.deleteNeed(id, (response) => {
        console.log(response);
        store.currentNeed = '';
        store.needs = store.needs.filter((request) => {
          return request.id !== id;
        });
        $('.individual-need-view').html('');
        render();        
      });
    });
  };

  const render = () => {
    if (store.currentNeed) {
      let domString = generateIndividualNeedString(store.currentNeed);
      renderIndividualNeed(domString);
    } else {
      let domString = dom.generateNeedString(store.needs);
      renderNeeds(domString);
    }
  };

  const initListeners = () => {
    handleNewNeed();
    handleViewNeed();
    handleReturnToMainNeed();
    handleNewComment();
    handleDeleteNeed();
  };

  return{
    generateNeedString,
    renderNeeds,
    initListeners,
    generateIndividualNeedString,
    render
  };

}();