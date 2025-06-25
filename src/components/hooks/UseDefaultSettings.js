import { useSelector } from 'react-redux';

const useDefaultSettings = () => {
  const profileStore = useSelector((state) => state.profileStore);
  const user = profileStore.user;

  return {
    fontSize: user?.userSetting?.settings?.otherSettings?.fontSize || '',
    alternateRowColors: user?.userSetting?.settings.customPartDisplay?.alternateRowColors,
    showBorders: user?.userSetting?.settings.customPartDisplay?.showBorders,
    showFilters: user?.userSetting?.settings.customPartDisplay?.showFilters,
    displayFiltersPosition: user?.userSetting?.settings.customPartDisplay?.displayFiltersPosition,
    showDetails: user?.userSetting?.settings.customPartDisplay?.showDetails,
    forceDescriptions: user?.userSetting?.settings.customPartDisplay?.forceDescriptions,
    doubleVision: user?.userSetting?.settings.customPartDisplay?.doubleVision,
    sortPreferences: user?.userSetting?.settings.displaySettings?.sortPreferences || [],
    itemsPerPage: user?.userSetting?.settings.displaySettings?.itemsPerPage,
  };
};

export default useDefaultSettings;
