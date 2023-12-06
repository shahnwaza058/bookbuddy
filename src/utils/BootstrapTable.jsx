import React from "react";
import "../Component/Style/table.css";
import { useNavigate } from "react-router-dom";
const BootstrapTable = ({ type, listOfBooks }) => {
  const navigate = useNavigate();
  return (
    <section class="intro mt-5 w-100 d-flex justify-content-center">
      <div class="mx-lg-5 w-100 mx-0 h-100">
        <h2 className="fs-3 mx-lg-3 mx-0 fw-bold text-uppercase">
          List of {type}
        </h2>
        <div class="w-100 mx-lg-3 mx-0 d-flex align-items-center h-100">
          <div class="w-100">
            <div class="row w-100 justify-content-center">
              <div class="col-12 w-100">
                <div class="card w-100">
                  <div class="card-body w-100 p-0">
                    <div
                      class="table-responsive w-100 table-scroll"
                      data-mdb-perfect-scrollbar="true"
                      style={{ position: "relative", height: "250px" }}
                    >
                      {listOfBooks.length > 0 ? (
                        <table className="table table-hover w-100 table-striped mb-0">
                          <thead className="bg-danger position-sticky">
                            <tr>
                              <th scope="col"> SN</th>
                              <th scope="col">Book name</th>
                              <th scope="col">Author</th>
                              <th scope="col">Genre</th>
                              {type === "lended-book" && (
                                <th scope="col">Borrowed by</th>
                              )}
                              {type === "borrowed-book" && (
                                <th scope="col">Lent by</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {listOfBooks.map((book, idx) => (
                              <tr
                                className="text-capitalize"
                                key={idx}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigate(`/book/${book.book?.bookId}`)
                                }
                              >
                                <td>{idx + 1}</td>
                                <td>{book.book?.bookName}</td>
                                <td>{book.book?.author}</td>
                                <td>{book.book?.genre}</td>
                                {type === "lended-book" && (
                                  <td>{book?.borrowedBy?.name}</td>
                                )}
                                {type === "borrowed-book" && (
                                  <td>{book?.lendedBy?.name}</td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-danger p-3 fs-3 text-center fw-bolder">
                          No books available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootstrapTable;
