import React, { useState } from "react";
import Qubit from "../components/Qubit";
function General() {
  const [selectedOption, setSelectedOption] = useState("qubit_devpandas");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row rounded mx-0">
          <div className="col-md-6 p-3">
            <select id="componentSelector" className="form-select main-search" value={selectedOption} onChange={handleSelectChange}>
              <option value="qubit_devpandas">Qubit Devpandas</option>
              <option value="qubit">Qubit</option>
              <option value="qubit_ecom">Ecom</option>
            </select>
          </div>
        </div>
      </div>
      {selectedOption === "qubit" && <Qubit bot_type={selectedOption} />}
      {selectedOption === "qubit_ecom" && <Qubit bot_type={selectedOption} />}
      {selectedOption === "qubit_devpandas" && <Qubit bot_type={selectedOption} />}
    </>
  );
}
export default General;