import React from "react";

const RightDesign = () => {
    return (
        <div className="w-full md:w-[20%] box-border flex flex-col gap-3 relative pr-14 -z-10 animate-fade-in opacity-0">
            <div className="absolute top-0 right-16 border border-[var(--border-thick)] rounded-lg w-[130%] h-[20%] animate-inc-width-box"></div>
            <div className="absolute top-[21%] right-16 border-[0.5px] border-[var(--border-thin)] rounded-lg w-[30%] h-[70%] animate-dec-size-box"></div>
            <div className="absolute top-0 -left-[300%] border-[0.5px] border-[var(--border-thin)] rounded-lg bottom-0 h-[12%] w-[80%] animate-dec-width-box"></div>
        </div>
    );
};


export default RightDesign;
