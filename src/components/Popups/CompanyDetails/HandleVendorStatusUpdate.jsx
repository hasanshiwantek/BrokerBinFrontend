// Reusable status updater

export const handleVendorStatusUpdate = ({
  type,
  companyId,
  currentStatus,
  setStatus,
  action,
  statusKey,
  dispatch,
  token,
  toast,
}) => {
  const newStatus = currentStatus === 1 ? 0 : 1;

  dispatch(action({ company_id: companyId, [statusKey]: newStatus, token }))
    .unwrap()
    .then((result) => {
      if (result?.status === "success") {
        toast.info(result?.message || "Vendor status updated!", {
          style: { fontSize: "14px", marginTop: "-10px" },
        });
        setStatus((prev) => ({
          ...prev,
          [companyId]: newStatus,
        }));
      } else {
        toast.info(result?.message || "Failed to update vendor status.", {
          style: { fontSize: "14px", marginTop: "-10px" },
        });
      }
    })
    .catch((error) => {
      console.error(`${type} error:`, error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    });
};

// Reusable initializer
export const initializeStatus = ({
  companyContactData,
  statusKey,
  setStatus,
}) => {
  if (companyContactData?.data?.company) {
    const id = companyContactData.data.company.id;
    const value = +companyContactData.data.company[statusKey] || 0;
    setStatus({ [id]: value });
  }
};
