import React from "react";
import { Button, ButtonGroup, Row, Col } from "reactstrap";
import IPaginator from "./types";
import "./styles.scss";

export default function Paginator({
  totalCount,
  currentPage,
  maxPagesShown,
  showPrevButton,
  showNextButton,
  onPageClick,
  onPrevButtonClick,
  onNextButtonClick,
  itemsPerPage,
}: IPaginator) {
  const buildFirstButton = () => {
    return (
      <Button key={"1"} onClick={() => onPageClick(1)}>
        First
      </Button>
    );
  };

  const buildLastButton = () => {
    const numberOfpages: number = Math.ceil(
      Number(totalCount) / Number(itemsPerPage)
    );
    return (
      <Button key={numberOfpages} onClick={() => onPageClick(numberOfpages)}>
        Last
      </Button>
    );
  };

  const buildPrevButton = () => {
    return showPrevButton ? (
      <Button onClick={() => onPrevButtonClick()}>Prev</Button>
    ) : (
      <Button disabled>Prev</Button>
    );
  };

  const buildNextButton = () => {
    return showNextButton ? (
      <Button onClick={() => onNextButtonClick()}>Next</Button>
    ) : (
      <Button disabled>Next</Button>
    );
  };

  const buildButtons = () => {
    if (totalCount && itemsPerPage) {
      const numberOfpages: number = Math.ceil(
        Number(totalCount) / Number(itemsPerPage)
      );
      const values =
        numberOfpages > 0 ? Array.from(Array(numberOfpages).keys()) : undefined;
      return numberOfpages > 1 ? (
        <div className="p-4">
          {buildFirstButton()}
          {buildPrevButton()}
          <ButtonGroup>
            {values &&
              values.map((value: number) => {
                const computedValue = value + currentPage;
                return computedValue <= maxPagesShown + currentPage - 1 &&
                  computedValue < numberOfpages ? (
                  <Button
                    key={value}
                    className={
                      currentPage === computedValue
                        ? "paginator-button-hover"
                        : ""
                    }
                    onClick={() => onPageClick(computedValue)}
                  >
                    {computedValue}
                  </Button>
                ) : null;
              })}
          </ButtonGroup>
          {buildNextButton()}
          {buildLastButton()}
        </div>
      ) : null;
    }
  };

  return (
    <Row>
      <Col md={12}>{buildButtons()}</Col>
    </Row>
  );
}
