
const HomeLegalResources = () => {
    const resurcesData = [

        {
            image: "/legalImage/legal1.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            image: "/legalImage/legal2.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            image: "/legalImage/legal3.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },

        {
            image: "/legalImage/legal4.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            image: "/legalImage/legal5.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            image: "/legalImage/legal6.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },

    ]
    return (
        <div className="container mx-auto px-4 pb-[48px]">
            <h1 className="font-roboto font-bold text-[32px] text-[#121221] text-center py-[32px]">Free legal resources</h1>

            {/* Free legal resources cards */}
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-3 place-items-center">
                    {
                        resurcesData.map((item, index) => {
                            return (
                                <div key={index} className="relative w-[329px] h-[306px] rounded">
                                    {/* Image */}

                                    <div className="border w-[329px] h-[306px]">
                                        <img
                                            src={item.image}
                                            alt="Your Legal Compass"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

                                    {/* Overlay */}
                                    <div className="absolute bottom-2 left-0 p-[24px] w-full text-white">
                                        <h2 className="text-lg font-bold">Your Legal Compass</h2>
                                        <p className="text-sm">Navigate complex legal matters with clarity and confidence.</p>
                                        <button className="mt-3 bg-white text-black px-4 py-2 font-semibold rounded">
                                            Read more
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeLegalResources