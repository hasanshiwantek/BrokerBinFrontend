import { useSelector } from 'react-redux';

const useDefaultSettings = () => {
  const optionFormData = useSelector((state) => state.optionFormData);

  return {
    fontSize: optionFormData?.otherSettings?.fontSize || '8',
    alternateRowColors: optionFormData?.customPartDisplay?.alternateRowColors,
    showBorders: optionFormData?.customPartDisplay?.showBorders,
    showFilters: optionFormData?.customPartDisplay?.showFilters,
    displayFiltersPosition: optionFormData?.customPartDisplay?.displayFiltersPosition,
    showDetails: optionFormData?.customPartDisplay?.showDetails,
    forceDescriptions: optionFormData?.customPartDisplay?.forceDescriptions,
    doubleVision: optionFormData?.customPartDisplay?.doubleVision,
    sortPreferences: optionFormData?.displaySettings?.sortPreferences || [],
  };
};

export default useDefaultSettings;
