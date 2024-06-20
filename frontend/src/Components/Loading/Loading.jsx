import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ isLoading }) => {
    return (
        <div>
            {isLoading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#111F2C] flex justify-center items-center z-20">
                    <ReactLoading type={"spinningBubbles"} color={"green"} height={50} width={50} />
                </div>
            ) : null}
        </div>
    );
};

export default Loading;
