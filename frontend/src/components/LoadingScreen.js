import { Spinner } from 'react-bootstrap';

import React from 'react';

export const LoadingScreen = () => (
    <div className="splash-screen">
     <Spinner style={{ position: "fixed", top: "50%", left: "50%" }} animation="border" variant='info' role="status">
		 <span className="sr-only">Loading...</span>
	 </Spinner>
    </div>
);
