import postRobot from 'post-robot';

export const EELeadManager = (options = {}) => {
  if (!options.domain) {
    throw new Error('Must have value for option domain');
  }

  const onLoadHandler = () => {
    if (options.onLoad && typeof options.onLoad === 'function') {
      options.onload(API);
    }
  };

  const ifrm = document.createElement('iframe');
  ifrm.src = `${options.domain}/pages`;
  ifrm.addEventListener('load', onLoadHandler);
  document.body.appendChild(ifrm);

  const submitLead = user => {
    postRobot
      .send(ifrm.contentWindow, 'submitLead', user, { domain: options.domain })
      .then(event => {
        const user = event.data;
        return user;
      });
  };

  const getLead = () => {
    return postRobot
      .send(ifrm.contentWindow, 'getLead', {}, { domain: options.domain })
      .then(event => {
        return event.data;
      });
  };

  const API = {
    getLead,
    submitLead,
  };

  return API;
};

export default (input = 'No args passed!') => input;
