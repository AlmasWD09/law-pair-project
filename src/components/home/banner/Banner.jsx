
const Banner = () => {
    const bannerImage = [
        {
            image: "/bannerCard/card1.png",
            name: "Immigration",
        },
        {
            image: "/bannerCard/card2.png",
            name: "Wills & Trusts",
        },
        {
            image: "/bannerCard/card3.png",
            name: "Family & Matrimonial",
        },
        {
            image: "/bannerCard/card4.png",
            name: "Trademarks",
        },
        {
            image: "/bannerCard/card5.png",
            name: "Advance Care Planning",
        },
        {
            image: "/bannerCard/card6.png",
            name: "Criminal Defense",
        },
        {
            image: "/bannerCard/card7.png",
            name: "Residential Real Estate",
        },
        {
            image: "/bannerCard/card8.png",
            name: "Business Formation",
        },
        {
            image: "/bannerCard/card9.png",
            name: "Commercial Real Estate",
        },
    ]
    return (
        <div className="bg-[#F5F5F7] container mx-auto px-4">
            <div className="text-center pt-[193px] pb-[297px]">
                <h1 className="text-[96px] font-crimson font-semibold text-primary ">LawPair</h1>
                <p className="max-w-[600px] mx-auto h-[73px] text-[#41414D] pt-[48px] pb-[104px]">No hassle. No fees. We've streamlined the attorney search process so that you can focus on what matters most.</p>
                <button className="bg-primary py-[20px] px-[40px] text-[#FFFFFF] text-[20px] font-bold rounded">Find your lawyer</button>
            </div>

            <div>
                <div className="max-w-[695px] mx-auto text-center text-wrap pb-[36px]">
                    <h1 className="font-roboto font-bold text-[32px]">Find the Legal Help You Need</h1>
                    <p className="text-[#60606A] font-roboto font-normal text-[24px] pt-[12px]">Finding the right legal support has never been easier. Select up to 3 practice areas to find your LawPair Suggested (TM) attorney today</p>
                </div>

                {/* banner curd */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-3 place-items-center gap-3">
                        {
                            bannerImage?.map((item, index) => {
                                return (
                                    <div key={index} className="bg-[#FFFFFF] w-[240px] h-[136px] flex flex-col justify-center items-center ">
                                        <img src={item.image} alt="banner image" className="pb-[8px]" />
                                        <h4 className="text-[18px] font-normal font-roboto">{item.name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner