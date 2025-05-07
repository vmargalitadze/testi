"use client"
import React, {  useState } from "react";

import Navlist from "./Navlist";
function List() {
   const [open, setOpen] = useState([]);
  return (
    <>
      <div className="flex   flex-row items-center h-9 justify-center gap-8">
      <Navlist open={open} setOpen={setOpen}/>
      </div>
    </>
  );
}

export default List;
