import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Input, Row, Col } from "reactstrap";
import Paginator from "../paginator";
import { config } from "./config";

export default function MoviesFilters({
  count,
  onChange,
}: {
  count: string;
  onChange: Function;
}) {
  const history = useHistory();
  const [page, setPage] = useState(config.page);
  const [limit, setLimit] = useState(config.limit);
  const [year, setYear] = useState(config.year);
  const [activatePrevButton, setActivatePrevButton] = React.useState(false);
  const [activateNextButton, setActivateNextButton] = React.useState(true);

  useEffect(() => {
    history.push(`/movies?page=${page}&limit=${limit}&year=${year}`);
    onChange(limit, page, year);
    if (page === 1) {
      setActivatePrevButton(false);
      setActivateNextButton(true);
    } else {
      setActivatePrevButton(true);
    }
  }, [page, limit, year]);

  const getPagesNumber = useCallback(() => {
    return Math.floor(Number(count) / Number(limit));
  }, [count, limit]);

  const handlePaginatorButtonClick = useCallback(
    (value: number) => {
      const numberOfpages = getPagesNumber();
      if (value === 1) {
        setActivateNextButton(true);
        setActivatePrevButton(false);
      } else {
        setActivatePrevButton(true);
        if (value === numberOfpages) {
          setActivateNextButton(false);
        }
      }
      setPage(value);
    },
    [page]
  );

  const handlePaginatorPrevClick = useCallback(() => {
    if (page > 1) {
      const pageNumber = page - 1;
      setPage(pageNumber);
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
      <Col md={1}>
        <Input
          type="select"
          value={limit}
          className="m-4"
          onChange={(e) => {
            setLimit(Number(e.currentTarget.value));
            setPage(1);
          }}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </Input>
      </Col>
      <Col md={1}>
        <Input
          type="number"
          min={1892}
          className="m-4"
          value={year}
          onChange={(e) => {
            setYear(Number(e.currentTarget.value));
            setPage(1);
          }}
        />
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
