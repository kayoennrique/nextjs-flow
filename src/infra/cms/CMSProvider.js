import React from 'react';

const CMSContext = React.createContext({
  cmsContent: {}
});

export const getCMSContent = () => {
  return React.useContext(CMSContext).cmsContent;
};

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={{ cmsContent }}>
      {children}
    </CMSContext.Provider>
  )
}
