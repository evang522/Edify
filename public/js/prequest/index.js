/*global api store dom*/

const initiateApp = () => {
  dom.initListeners();
  api.fetch((data) => {
    store.prequests = data;
    dom.render();
  });

};


$(initiateApp);