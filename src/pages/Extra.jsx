import { useState } from "react";
import ReactPaginate from "react-paginate";


const Extra = () => {
    const allData = [
        {
            id: 1,
            itemcolor: "red",
        },
        {
            id: 2,
            itemcolor: "green",
        },
        {
            id: 3,
            itemcolor: "yellow",
        },
        {
            id: 4,
            itemcolor: "black",
        },
        {
            id: 5,
            itemcolor: "red",
        },
        {
            id: 6,
            itemcolor: "yellow",
        },
        {
            id: 7,
            itemcolor: "green",
        },
        {
            id: 8,
            itemcolor: "yellow",
        },
    ]

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 2;
    const endOffset = itemOffset + itemsPerPage;
   

    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);


    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div className="container mx-auto px-4">
            <h1>Extra page</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    allData.map((item) => {
                        return (
                            <div key={item.id} className="border w-[300px] h-[300px] bg-red-300 text-white flex justify-center items-center font-bold text-xl">
                                <div>{item.itemcolor}</div>
                            </div>
                        )
                    })
                }
            </div>



            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </div>
    )
}

export default Extra