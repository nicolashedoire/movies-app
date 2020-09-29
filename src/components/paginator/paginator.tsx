import React, { useEffect } from "react";
import { Button, ButtonGroup, Row, Col } from "reactstrap";
import IPaginator from "./types";
import "./styles.scss";
import { compact } from 'lodash';

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
    return showPrevButton ? (
      <Button key={"1"} onClick={() => onPageClick(1)}>
        First
      </Button>
    ) : (
      <Button key={"1"} disabled>
        First
      </Button>
    );
  };

  const buildLastButton = () => {
    const numberOfpages: number = Math.floor(
      Number(totalCount) / Number(itemsPerPage)
    );
    return showNextButton ? (
      <Button key={numberOfpages} onClick={() => onPageClick(numberOfpages)}>
        Last
      </Button>
    ) : (
      <Button key={numberOfpages} disabled>
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
      let values: any =
      numberOfpages > 0 ? Array.from(Array(numberOfpages).keys()) : undefined;
      values.shift();
      let filterValues = 0;
      let filteredValues = values.map((val: any) => {
        if(val >= currentPage){
          return val;
        }else{
          filterValues++;
        }
      });
      for(let i = 0; i < filterValues; i++){
        filteredValues.push('x');
      }
      filteredValues = compact(filteredValues).slice(0, maxPagesShown);
      return numberOfpages > 1 ? (
        <div className="p-4">
          {buildFirstButton()}
          {buildPrevButton()}
          <ButtonGroup>
            {filteredValues &&
              filteredValues.map((page: number) => {
                return page < numberOfpages ? (
                  <Button
                    key={page}
                    className={
                      currentPage === page
                        ? "paginator-button-hover"
                        : ""
                    }
                    onClick={() => onPageClick(page)}
                  >
                    {page}
                  </Button>
                ) : <Button><span style={{color: 'transparent'}}>..</span></Button>  ;
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
