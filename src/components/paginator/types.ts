export default interface IPaginator {
    totalCount: string;
    itemsPerPage: number;
    currentPage: number;
    maxPagesShown: number;
    showPrevButton: Boolean;
    showNextButton: Boolean;
    onPageClick: Function;
    onPrevButtonClick: Function;
    onNextButtonClick: Function;
}
