import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const selectGroup = (group) => {
    setSelectedGroup(group);
  };

  return (
    <GroupContext.Provider value={{ selectedGroup, selectGroup, availableGroups, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  return useContext(GroupContext);
};