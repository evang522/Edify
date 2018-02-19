/*global api store dom*/

const initiateApp = () => {
  dom.initListeners();
  api.fetch((data) => {
    store.needs = data;
    dom.render();
  });

};


$(initiateApp);