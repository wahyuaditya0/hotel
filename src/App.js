import React from "react";
import "./App.css";
import Flat from "./components/flat.js";
import GoogleMapReact from "google-map-react";
import Marker from "./components/marker.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: "",
    };
  }

  componentDidMount() {
    const url =
      "https://raw.githubusercontent.com/wahyuaditya0/flats-boilerplate/main/flats.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          flats: data,
          allFlats: data,
        });
      });
  }

  selectFlat = (flat) => {
    console.log(flat);
    this.setState({ selectedFlat: flat });
  };

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) =>
        new RegExp(event.target.value, "i").exec(flat.name)
      ),
    });
  };

  render() {
    let center = {
      lat: -0.9416177324689695,
      lng: 100.36878446424903,
    };

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng,
      };
    }

    return (
      <div className="app">
        <div className="main">
          <div className="title">Hotel.id</div>
          <div className="title-sub">Find The Perfect Hotel for you...</div>
          <div className="search">
            <input
              type="text"
              placeholder="Search...."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <div className="flats">
            {this.state.flats.map((flat) => {
              return (
                <Flat
                  key={flat.name}
                  flat={flat}
                  selectFlat={this.selectFlat}
                />
              );
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact center={center} zoom={15}>
            {this.state.flats.map((flat) => {
              return (
                <Marker
                  key={flat.name}
                  lat={flat.lat}
                  lng={flat.lng}
                  text={flat.price}
                  selected={flat === this.state.selectedFlat}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
