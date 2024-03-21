'use client';
import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup,] = useState(null);
  const [availableGroups, setAvailableGroups] = useState(['GroupA', 'GroupB', 'GroupC']);

  const addGroup = (groupName) => {
    setAvailableGroups((prevGroups) => [...prevGroups, groupName]);
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
  };

  return (
    <GroupContext.Provider value={{ selectedGroup, addGroup, selectGroup, availableGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export  const useGroup = () => {
  return useContext(GroupContext);
};
