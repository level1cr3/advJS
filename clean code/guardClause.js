// without guard clause

function getInsuranceDeductible(insurance) {
  if (insurance.covered) {
    if (insurance.majorRepair) {
      return 500;
    } else if (insurance.mediumRepair) {
      return 300;
    } else {
      return 100;
    }
  } else {
    return 0;
  }
}

// with guard clause

function getInsuranceDeductible(insurance) {
  if (!insurance.covered) return 0;
  if (insurance.majorRepair) return 500;
  if (insurance.mediumRepair) return 300;

  return 100;
}
