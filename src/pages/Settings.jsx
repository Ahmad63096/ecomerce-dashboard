import React from "react";
import Grettingmessage from "../components/Grettingmessage";
function Settings() {
  return (
    <>
      <div className="p-4 m-3  settings-container ">
        <h1>Settings</h1>
        <div className="tab-content mt-4 p-4 rounded">
          <Grettingmessage />
        </div>
      </div>
    </>
  );
}

export default Settings;