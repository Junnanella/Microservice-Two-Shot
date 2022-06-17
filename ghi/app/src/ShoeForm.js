import React from "react";

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        // this is setting inital state for the input tags
        this.state = {
            brand: '',
            model: '',
            color: '',
            bins: []
        };
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBinsChange = this.handleBinsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.shoes = data.shoes;
        delete data.shoes;
        delete data.bins;
        console.log(data);
    
        const binsUrl = 'http://localhost:8080/api/bins/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(binsUrl, fetchConfig);
        if (response.ok) {
            const newBin = await response.json();
            console.log(newBin);
        }

        const cleared = {
            brand: '',
            model: '',
            color: '',
            bins: '',
        };
        this.setState(cleared);
    }
    //extra closing here
    handleBrandChange(event) {
        const value = event.target.value;
        this.setState({ brand: value });
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model: value });
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value });
    }

    handleBinsChange(event) {
        const value = event.target.value;
        this.setState({ bin: value });
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/bins/';

        const response = await fetch(url);
// what is states: data.states doing on line 77
        if (response.ok) {
            const data = await response.json();
            this.setState({ bins: data.bins });
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoe-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleBrandChange} value={this.state.brand} placeholder="Brand" required type="text" name="brand" id="brand" className="form-control" />
                                <label htmlFor="brand">Brand</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleModel} value={this.state.model} placeholder="Model" required type="text" name="model" id="model" className="form-control" />
                                <label htmlFor="model">Model</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleColor} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleBins} value={this.state.bin} required name="bin" id="bin" className="form-select">
                                    <option value="">Choose a bin</option>
                                    {this.bin.bins.map(bin => {
                                        return (
                                            <option key={bin.closet_name} value={bin.closet_name}>
                                                {bin.closet_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoeForm;