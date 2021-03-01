import React from "react";
import classes from "./Table.module.css";
import "./Table.module.css";
const Table = (props) => {
  return (
    <table className={classes.Table}>
      <thead>
        <tr>
          <th>Username</th>
          <th style={{textAlign: "center"}}>Email</th>
          <th>Created at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.user.length === 0 ? (
          <tr>
            <td colSpan='4'>
              <p className={classes.Warning}>No users yet!</p>
            </td>
          </tr>
        ) : (
          props.user.map((item) => {
            return (
              <tr key={item.id} className={classes.Products}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    onClick={() => props.delete(item.id)}
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "40%",
                      color: "red",
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
