// This page exists to take care of dom-related functions: i.e. generating HTML strings, updating views, etc.


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
      <div class="card prayer-card">
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
                <a href="/prayer" class="btn btn-info">View</a>
            </div>
        </div>`;
    });
    return domString;
  };  

  const renderPrequests = (domString) => {
    $('.prequest-container').html(domString);
  }; 


  const handleNewPrequest = () => {
    $('.prequest-container').on('submit', '.submit-prequest-form', (event) => {
      event.preventDefault();

      // Send to Server
    });
  };

  const initListeners = () => {
    handleNewPrequest();
  };

  return{
    generatePrequestString,
    renderPrequests,
    initListeners
  };

}();