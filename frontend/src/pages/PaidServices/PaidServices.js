import React from "react";
import PaidServiceCard from "../../components/PaidServiceCard/PaidServiceCard";

function PaidServices() {
  return (
    <div className="height-full "> 
      <div class="container">
        {/* map row */}
        <div class="row">
          <div class="col-sm ">
            <PaidServiceCard />
          </div>
          <div class="col-sm">
            <PaidServiceCard />
          </div>
          <div class="col-sm">
            <PaidServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaidServices;
