import React from "react";

function HatsList(props) {
  const { hats } = props;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map((hat) => {
          return (
            <tr key={hat.id}>
              <td>{hat.style_name}</td>
              <td>{hat.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HatsList;
