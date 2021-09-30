import React, { Component } from "react";

class TableHeader extends Component {
  columns = [
    { path: "Title", order: "asc" },
    { path: "Genre", order: "asc" },
    { path: "Stock", order: "asc" },
    { path: "Rate", order: "asc" },
    { path: "like", order: "asc" },
    { path: "delete", order: "asc" },
  ];

  render() {
    return (
      <thead>
        <tr>
          {this.columns.map((column) => (
            <th
              scope="col"
              key={column.path || column.key}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                this.props.handleSortChange({
                  path: column.path,
                  order: "asc",
                })
              }
            >
              {column.path != "like" && column.path != "delete"
                ? column.path
                : ""}
              <span> </span>
              <i
                className={this.getOrderBadgeClass(
                  this.props.sortColumn,
                  column
                )}
              ></i>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
  getOrderBadgeClass = (sortColumn, column) => {
    let orderBadge;
    sortColumn.path === column.path
      ? (orderBadge = "fas fa-sort-")
      : (orderBadge = "");

    orderBadge += sortColumn.order === "asc" ? "up" : "down";

    return orderBadge;
  };
}

export default TableHeader;
