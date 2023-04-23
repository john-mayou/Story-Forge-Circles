import { useEffect, useState } from "react";
import axios from "axios";
import CircleTable from "../CircleTable/CircleTable";
import Header from "../../../layout/Header/Header";

function BrowserCirclePage() {
  const [publicCircles, setPublicCircles] = useState([]);

  useEffect(() => {
    fetchPublicCircles();
  }, []);

  const fetchPublicCircles = async () => {
    const circleResult = await axios.get("/api/circles/public");
    setPublicCircles(circleResult.data);
  };

  return (
    <main className="content-main">
      <Header title={"Public Circles"} />
      <div style={{marginTop: '1em'}} align="center">
        {publicCircles && (
          <CircleTable
            circleList={publicCircles}
            type="public"
            searchBar={true}
          />
        )}
      </div>
    </main>
  );
}

export default BrowserCirclePage;
