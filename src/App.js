import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
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
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>deaths: {data.deaths}</Card.Text>
          <Card.Text>recovered: {data.recovered}</Card.Text>
          <Card.Text>Todays Cases: {data.todayCases}</Card.Text>
          <Card.Text>Today Death: {data.todayDeaths}</Card.Text>
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

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center" }}>Covid-19 Live Stats</h2>
      <br />
      <CardGroup>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {latestUpdated}</small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <Form>
        <Form.Group className="mb-3" controlId="formGroupSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
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

export default App;
