// This page exists to take care of dom-related functions: i.e. generating HTML strings, updating views, etc.

/*global store api dom */

const dom = function () {


  const generatePrequestString = (listOfPrequests) => {
    let domString = `
    <div class="card prayer-card prayer-card-add">
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
    return  `
    <div data-id = '${request.id}' class="card h75 individual-prayer-card">
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
          </div>
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

      const newItem = {
        'title':title,
        'requestbody':requestbody
      };
      console.log(newItem);
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
      console.log('handleViewIndividual is working!');

      event.preventDefault();
      let id =  $(event.target).closest('.prayer-card').attr('data-id');
      let currentRequest = store.prequests.find((request) => {
        return request.id === id;
      });
      store.currentPrequest = currentRequest;

      render();
    });
  };

  const render = () => {
    if (store.currentPrequest) {
      console.log('render chose the option with a single note');
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
  };

  return{
    generatePrequestString,
    renderPrequests,
    initListeners,
    generateIndividualPrequestString,
    render
  };

}();