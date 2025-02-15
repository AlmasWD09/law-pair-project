

const FindAttorney = () => {
    return (
        <div className="bg-[#10101E] w-full bg-[url('/FindAttonery/background.png')] bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto px-4 pt-[40px] md:pt-[83px]">
                <div className="flex flex-col lg:flex-row justify-between">
                    {/* content */}
                    <div className="flex flex-col">
                        <h1 className="font-roboto font-bold text-[32px] md:text-[48px] text-[#FFFFFF] max-w-[606px]">Finding an Attorney made easy.</h1>

                        <small className="font-roboto text-[14px] text-[#FFFFFF] md:pt-[24px] pb-[20px] md:pb-[48px]">The LawPair app is the fastest & easiest to find your lawyer.</small>

                        <small className="font-roboto text-[18px] text-[#FFFFFF]">Available on</small>

                        <p className="">Available on</p>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                            <img src="/FindAttonery/photo02.png" alt="attorney stor" className="w-[120px] md:w-[200px] lg:w-full object-contain"/>
                            <img src="/FindAttonery/photo01.png" alt="attorney stor" className="w-[120px] md:w-[200px] lg:w-full object-contain"/>
                        </div>
                    </div>

                    {/* image */}
                    <div>
                        <img src="/FindAttonery/group01.png" alt="group image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindAttorney