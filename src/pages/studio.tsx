import { useState, useEffect } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import Header from "../components/Header";

const Studio = () => {
  const [designers, setDesigners] = useState([]);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";
  console.log(designers);
  // fetch API - designers
  useEffect(() => {
    const cachedData = localStorage.getItem("Members");
    const abortController = new AbortController();

    if (cachedData) {
      setDesigners(JSON.parse(cachedData));
    } else {
      fetchPayload(_baseURI, "Members", abortController.signal).then((data) => {
        setDesigners(data["docs"]);
        localStorage.setItem("Members", JSON.stringify(data["docs"]));
      });
    }
    // cancel the fetch request when the component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className={"about-page"}>
      <Header />
      <br />
      {designers && (
        <section className={"designers-list info"}>
          <h3>projectmedewerkers:</h3>
          {designers.map((designer) => (
            <div>
              <p>
                {designer.portfolio && (
                  <span>
                    <a href={designer.portfolio}>{designer.fullName}</a>{" "}
                  </span>
                )}
                {!designer.portfolio && (
                  <span>
                    <p className="non-click-link">{designer.fullName}</p>
                  </span>
                )}
                {/*
                <span>
                  {designer.active.memberFrom.split("T")[0]} -{" "}
                  <span>
                    {designer.active.memberTill && (
                      <span>{designer.active.memberTill.split("T")[0]}</span>
                    )}
                  </span>
                </span>
                */}
              </p>
            </div>
          ))}
        </section>
      )}
      <br />
      <section class="designers-list info">
        <h3>webdesign:</h3>
        <p>
          <a href="https://instagram.com/stelladevonrain">Stella Schöning</a>
        </p>
        <p>
          <a href="">Olivier Van D'huynslager</a>
        </p>
      </section>
    </div>
  );
};

export default Studio;
