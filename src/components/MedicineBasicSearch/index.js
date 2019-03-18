import React from 'react';
import t from 'prop-types';
import DetailsPanel from '../DetailsPanel';

import tablet from '../../../static/images/pill_24.png';
import capsule from '../../../static/images/capsule_24.png';
import syrup from '../../../static/images/syrup_24.png';
import classes from './style.module.css';

const callIcon = (dosageForm) => {
  switch (dosageForm) {
    case ('suspension'): return syrup;
    case ('effervescent tablet'): return tablet;
    case ('tablet'): return tablet;
    case ('capsule'): return capsule;
    default: return tablet;
  }
};

const callImage = (dosageForm) => {
  const medIcon = callIcon(dosageForm);
  return (
    <div className={classes.imageContainerLeft}>
      <img className={classes.medIcon} src={medIcon} alt={dosageForm} />
    </div>
  );
};

const callDetails = (nappiCode, details, fetchDetails) => {
  fetchDetails(nappiCode);
  console.log(fetchDetails(nappiCode));
  return (
    <DetailsPanel details={details} />
  );
};

const callName = (name, nappiCode, details, fetchDetails) => (
  <button
    className={classes.name}
    onClick={() => callDetails(nappiCode, details, fetchDetails)}
    type="button"
  >
    {name}
  </button>
);

const callPriceAndGenerics = (price, nappiCode, fetchGenerics) => (
  <div className={classes.farRightContainer}>
    <div className={classes.price}>{price}</div>
    <button
      className={classes.generics}
      onClick={() => fetchGenerics(nappiCode)}
      type="button"
    >
      Find Generics
    </button>
  </div>
);

const createMedicinePanel = (fetchGenerics, details, fetchDetails) => (props) => {
  const {
    dosage_form: dosageForm,
    name,
    sep: price,
    nappi_code: nappiCode,
  } = props;

  return (
    <div className={classes.container} key={nappiCode}>
      {callImage(dosageForm)}
      <div className={classes.descriptionContainerRight}>
        {callName(name, nappiCode, details, fetchDetails)}
        {callPriceAndGenerics(price, nappiCode, fetchGenerics)}
      </div>
    </div>
  );
};

const MedicineBasicSearch = ({ results, details, fetchGenerics, fetchDetails }) => (
  results.map(createMedicinePanel(fetchGenerics, details, fetchDetails))
);

export default MedicineBasicSearch;

MedicineBasicSearch.propTypes = {
  results: t.arrayOf(t.shape({
    dosage_form: t.string,
    name: t.string,
    sep: t.string,
    nappi_code: t.string,
  })).isRequired,
};

MedicineBasicSearch.defaultProps = {
  results: [],
};
