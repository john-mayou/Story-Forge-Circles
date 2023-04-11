import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

    function ReadManuscriptPage() {
    
    const history = useHistory();

    return (
        <>
            <div align="center">
            <h3>Manuscript View</h3>
            <button onClick={history.goBack}>Back</button>
            <h4>Comments</h4>
            <button>+Comment</button>
            </div>
      </>
    );
};

export default ReadManuscriptPage;
