import React from "react";
import LinearProgress from '@mui/material/LinearProgress';

const Loading: React.FC = () => {
    return(
        <div className="loading">
            <LinearProgress />
        </div>
    )
}

export default Loading;
