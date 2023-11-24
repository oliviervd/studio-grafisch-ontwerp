import { useState, useEffect } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import Header from "../components/Header";

const Studio = () => {
  const [designers, setDesigners] = useState([]);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";
  console.log(designers);
  // fetch API - designers
  useEffect(() => {
    fetchPayload(_baseURI, "Members").then((data) => {
      setDesigners(data["docs"]);
    });
  }, []);

  return (
    <div>
      <Header />
      <br />
      {designers && (
        <section className={"designers-list info"}>
          <h3>projectmedewerkers:</h3>
          {designers.map((designer) => (
            <div>
              <p>
                <span>
                  <a>{designer.fullName}</a>:{" "}
                </span>
                <span>
                  {designer.active.memberFrom.split("T")[0]} -{" "}
                  <span>
                    {designer.active.memberTill && (
                      <span>{designer.active.memberTill.split("T")[0]}</span>
                    )}
                  </span>
                </span>
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
