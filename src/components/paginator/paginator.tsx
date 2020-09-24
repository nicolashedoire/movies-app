import React from 'react';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';
import IPaginator from './types';

export default function Paginator({
  totalCount,
  currentPage,
  maxPagesShown,
  showPrevButton,
  showNextButton,
  onPageClick,
  onPrevButtonClick,
  onNextButtonClick,
  itemsPerPage}: IPaginator) {

  const buildPrevButton = () => {
    return showPrevButton ? (
      <Button onClick={() => onPrevButtonClick()}>Précédent</Button>
    ) : (
      <Button disabled>Précédent</Button>
    );
  };

  const buildNextButton = () => {
    return showNextButton ? (
      <Button onClick={() => onNextButtonClick()}>Suivant</Button>
    ) : (
      <Button disabled>Suivant</Button>
    );
  };

  const buildButtons = () => {
    if (totalCount && itemsPerPage) {
      const numberOfpages: number = Math.ceil(Number(totalCount) / itemsPerPage);
      const values = numberOfpages > 0 ? Array.from(Array(numberOfpages).keys()) : undefined;
      return numberOfpages > 1 ? (
        <div className="p-4">
          {buildPrevButton()}
          <ButtonGroup>
            {values &&
              values.map((value: number) => {
                const computedValue = value + 1;
                return computedValue <= maxPagesShown ? (
                  <Button
                    key={value}
                    className={currentPage === computedValue ? 'paginator-button-hover' : ''}
                    onClick={() => onPageClick(computedValue)}
                  >
                    {computedValue}
                  </Button>
                ) : null;
              })}
          </ButtonGroup>
          {buildNextButton()}
        </div>
      ) : null;
    }
  };

  return (
  <Row>
    <Col md={12}>
      {buildButtons()}
    </Col>
  </Row>);
}
