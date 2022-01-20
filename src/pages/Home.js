import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import ReactTooltip from "react-tooltip";
import Toggle from "react-toggle";
import { RingLoader } from "react-spinners";
import NumberFormat from "react-number-format";
import "react-toggle/style.css";

function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
        console.log(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const latestUpdated = date.toString();

  const filterCountry = results.filter((item) => {
    return searchCountry !== "" ? item.country.includes(searchCountry) : item;
  });

  const countries = filterCountry.map((data, i) => {
    return (
      <Card
        key={i}
        bg={darkTheme ? "dark" : "light"}
        text={darkTheme ? "light" : "dark"}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>Deaths: {data.deaths}</Card.Text>
          <Card.Text>Recovered: {data.recovered}</Card.Text>
          <Card.Text>Today´s Cases: {data.todayCases}</Card.Text>
          <Card.Text>Today´s Death: {data.todayDeaths}</Card.Text>
          <Card.Text>
            Cases per one million: {data.casesPerOneMillion}
          </Card.Text>
          <Card.Text>Active: {data.active}</Card.Text>
          <Card.Text>Critical: {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  const queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  const handleDarkThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      style={{
        background: darkTheme ? "black" : "white",
        color: darkTheme ? "white" : "dark",
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={50} color={"green"} loading={loading} />
      </div>
      <br />
      <h2
        style={{ textAlign: "center", color: darkTheme ? "white" : "black" }}
        data-tip="Last modified: 19.01.22"
      >
        Covid-19 Live Stats
      </h2>
      <ReactTooltip effect="solid" />
      <br />
      <div style={{ textAlign: "center" }}>
        <Toggle
          defaultChecked={false}
          icons={{
            checked: "🌜",
            unchecked: "🌞",
          }}
          onChange={handleDarkThemeChange}
        />
      </div>
      <br />
      <CardGroup>
        <Card
          bg="secondary"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <NumberFormat
              value={latest.cases}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <NumberFormat
              value={latest.deaths}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <NumberFormat
              value={latest.recovered}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            bg="dark"
            type="text"
            placeholder="Search Countries"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <Form.Text className="text-muted">C´mon u bitch</Form.Text>
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
