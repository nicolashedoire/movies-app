import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Input, Row, Col } from "reactstrap";
import Paginator from "../paginator";

export default function MoviesFilters({
  count,
  onChange,
}: {
  count: string;
  onChange: Function;
}) {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activatePrevButton, setActivatePrevButton] = React.useState(false);
  const [activateNextButton, setActivateNextButton] = React.useState(true);

  useEffect(() => {
    history.push(`/?page=${page}&limit=${limit}`);
    onChange(limit, page);
  }, [page, limit]);

  const getPagesNumber = useCallback(() => {
    return Math.ceil(Number(count) / Number(limit));
  }, [count, limit]);

  const handlePaginatorButtonClick = (value: number) => {
    const numberOfpages = getPagesNumber();
    value === numberOfpages
      ? setActivateNextButton(false)
      : setActivateNextButton(true);
    value === 1 ? setActivatePrevButton(false) : setActivatePrevButton(true);
    setPage(value);
  };

  const handlePaginatorPrevClick = useCallback(() => {
    if (page > 1) {
      const pageNumber = page - 1;
      setPage(pageNumber);
      pageNumber === 1
        ? setActivatePrevButton(false)
        : setActivatePrevButton(true);
    }
    setActivateNextButton(true);
  }, [page]);

  const handlePaginatorNextClick = useCallback(() => {
    const numberOfpages = getPagesNumber();
    if (page < numberOfpages) {
      const pageNumber = page + 1;
      setPage(pageNumber);
      pageNumber === numberOfpages
        ? setActivateNextButton(false)
        : setActivateNextButton(true);
      setActivatePrevButton(true);
    } else {
      setActivateNextButton(false);
    }
  }, [getPagesNumber, page]);

  return (
    <Row>
      <Col md={3}>
        <Input
          type="select"
          value={limit}
          className="m-4"
          onChange={(e) => setLimit(Number(e.currentTarget.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Input>
      </Col>
      <Col md={6}>
        <Paginator
          totalCount={count}
          itemsPerPage={limit}
          currentPage={page}
          maxPagesShown={6}
          showPrevButton={activatePrevButton}
          showNextButton={activateNextButton}
          onPageClick={handlePaginatorButtonClick}
          onPrevButtonClick={handlePaginatorPrevClick}
          onNextButtonClick={handlePaginatorNextClick}
        />
      </Col>
    </Row>
  );
}
