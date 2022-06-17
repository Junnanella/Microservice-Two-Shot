import React from "react";

function ShoeList(props) {
    if (props.shoes === undefined) {
        return null
    };
    return (
        <table className="table table-striped">
            <thead>
                <tr className='table-primary'>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Bin</th>
                </tr>
            </thead>

            <tbody>
                {props.shoes.map(shoe => {
                    return (
                        <tr key={shoe.id}>
                            <td>{shoe.manufacturer}</td>
                            <td>{shoe.model_name}</td>
                            <td>{shoe.color}</td>
                            <td>{shoe.bin}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ShoeList