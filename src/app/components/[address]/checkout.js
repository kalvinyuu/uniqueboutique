const handleNextStep = async () => {
  const addressElement = elements.getElement('address');

  const {complete, value} = await addressElement.getValue();

  if (complete) {
    // Allow user to proceed to the next step
    // Optionally, use value to store the address details
  }
};
