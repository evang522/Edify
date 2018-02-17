/*global api store dom*/

const initiateApp = () => {
  dom.initListeners();
  api.fetch((data) => {
    store.prequests = data;
    let domString = dom.generatePrequestString(store.prequests);
    dom.renderPrequests(domString);
  });

};


$(initiateApp);