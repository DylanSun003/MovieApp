import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemCount, pageSize, currentPage } = this.props;
    const itemPerPage = Math.ceil(itemCount / pageSize); // each page has this number of items
    let pageNumber = [];
    for (let i = 1; i < itemPerPage + 1; i++) pageNumber.push(i);

    if (pageNumber.length == 1) return null;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumber.map((pageNum) => (
            <li
              key={pageNum}
              className={this.getCurrentPageClass(pageNum, currentPage)}
            >
              <a
                onClick={() => this.props.onPageChange(pageNum)}
                className="page-link"
                href="#"
              >
                {pageNum}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  getCurrentPageClass(pageNum, currentPage) {
    let currentPageClassName = "page-item ";
    currentPageClassName += pageNum === currentPage ? "active" : "";
    return currentPageClassName;
  }
}

export default Pagination;
