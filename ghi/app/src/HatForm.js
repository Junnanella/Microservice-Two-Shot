import React from "react";

class HatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style_name: "",
      color: "",
      fabric: "",
      picture_url: "",
      location: "",
      locations: [],
    };
    // bind handle methods
    this.handleChangeStyleName = this.handleChangeStyleName.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeFabric = this.handleChangeFabric.bind(this);
    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // wait for component to mount for locations
  async componentDidMount() {
    const url = "http://localhost:8100/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  // handle submit
  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      style_name: this.state.style_name,
      color: this.state.color,
      fabric: this.state.fabric,
      picture_url: this.state.picture_url,
      location: this.state.location,
    };

    const hatUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
      this.setState({
        style_name: "",
        color: "",
        fabric: "",
        picture_url: "",
        location: "",
      });
    }
  }

  //   handle changes
  handleChangeStyleName(event) {
    const value = event.target.value;
    this.setState({ style_name: value });
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangeFabric(event) {
    const value = event.target.value;
    this.setState({ fabric: value });
  }

  handleChangePictureUrl(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleChangeLocation(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Hat</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeStyleName}
                  value={this.state.style_name}
                  placeholder="Style Name"
                  required
                  type="text"
                  name="style_name"
                  id="style_name"
                  className="form-control"
                />
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeColor}
                  value={this.state.color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="style_name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangeFabric}
                  value={this.state.fabric}
                  placeholder="Fabric"
                  required
                  type="text"
                  name="fabric"
                  id="fabric"
                  className="form-control"
                />
                <label htmlFor="style_name">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChangePictureUrl}
                  value={this.state.picture_url}
                  placeholder="Picture Url"
                  required
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="style_name">Picture Url</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleChangeLocation}
                  value={this.state.location}
                  required
                  name="location"
                  id="location"
                  className="form-select"
                >
                  <option value="">Choose a location</option>
                  {this.state.locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.closet_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HatForm;
