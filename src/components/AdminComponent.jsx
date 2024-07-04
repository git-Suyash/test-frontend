import React, { useState, useMemo } from "react";
import { Checkbox } from '@headlessui/react';
import { CiSearch } from "react-icons/ci";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Faculty Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Faculty EmailID",
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Faculty Department",
  },
  {
    id: "isActive",
    numeric: false,
    disablePadding: false,
    label: "Faculty Status",
  },
];

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th scope="col" className="px-6 py-3 text-left">
          <Checkbox
            checked={numSelected > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            className="text-primary-500"
          />
        </th>
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            scope="col"
            className="px-6 py-3 text-left"
          >
            <button
              onClick={createSortHandler(headCell.id)}
              className="flex items-center space-x-1"
            >
              <span>{headCell.label}</span>
              {orderBy === headCell.id && (
                <span className="visually-hidden">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              )}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function EnhancedTableToolbar({ numSelected, handleActivate, handleDeActivate, requestSearch }) {
  return (
    <div className="flex items-center justify-between py-2">
      {numSelected > 0 ? (
        <span className="text-sm">
          {numSelected} selected
        </span>
      ) : (
        <h2 className="text-xl font-bold">Faculty List</h2>
      )}

      {numSelected > 0 ? (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={handleActivate}
          >
            Set Active
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={handleDeActivate}
          >
            DeActivate
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search User"
            onChange={(e) => requestSearch(e.target.value)}
          />
          <CiSearch className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </div>
  );
}

export const AdminComponent = ({ userList, handleDeActivate, handleActivate }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = userList.map((n) => ({ id: n.id, activeUser: false }));
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id, activeUser) => {
    const selectedIndex = selected.findIndex(
      (item) => item.id === id && item.activeUser === activeUser
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, { id, activeUser }];
    } else {
      newSelected = selected.filter(
        (item) => item.id !== id || item.activeUser !== activeUser
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.some((item) => item.id === id);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const visibleRows = useMemo(() =>
    stableSort(userList, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ), [order, orderBy, page, rowsPerPage, userList]);

    const requestSearch = (searchedVal) => {
      const filteredRows = userList.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };

    return (
      <div className="w-full mx-auto px-4 py-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleDeActivate={handleDeActivate}
            handleActivate={handleActivate}
            requestSearch={requestSearch}
          />
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={userList.length}
              />
              <tbody className="divide-y divide-gray-200">
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 ${
                        isItemSelected ? "bg-gray-100" : ""
                      }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) =>
                            handleClick(event, row.id, row.isActive)
                          }
                          className="text-primary-500"
                        />
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap cursor-pointer text-blue-500"
                        onClick={() => handleUserNameClick(row.id)}>
                        {row.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.isActive ? "Active" : "Not Active"}
                      </td>
                    </tr>
                  );
                })}
                {emptyRows > 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            {/* <Pagination
              rowsPerPageOptions={[15, 25, 30]}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </div>
        </div>
      </div>
    );
};

