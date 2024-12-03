import React from "react";

const LeftDesign = () => {
    return (
        <div className="w-full md:w-[20%] box-border flex flex-col gap-3 relative pl-14 -z-10 animate-fade-in opacity-0">
            <div className="border-[0.5px] border-[var(--border-thin)] rounded-lg w-[30%] h-[30%] animate-inc-size-box"></div>
            <div className="border-[1px] border-[var(--border-thick)] rounded-lg w-[50%] h-[70%] animate-dec-size-box"></div>
            <div className="absolute border-[0.5px] border-[var(--border-thin)] rounded-lg bottom-0 left-[60%] h-[10%] w-[80%] animate-inc-width-box"></div>
        </div>
    );
};


export default LeftDesign;
