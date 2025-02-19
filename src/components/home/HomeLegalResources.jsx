import { useNavigate } from "react-router-dom"

const HomeLegalResources = () => {
    const navigate = useNavigate()

    const resurcesData = [
        {
            id: 1,
            image: "/legalImage/legal1.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            id: 2,
            image: "/legalImage/legal2.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            id: 3,
            image: "/legalImage/legal3.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },

        {
            id: 4,
            image: "/legalImage/legal4.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            id: 5,
            image: "/legalImage/legal5.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },
        {
            id: 6,
            image: "/legalImage/legal6.png",
            name: "Your Legal Compass",
            description: "Navigate complex legal matters with clarity and confidence."
        },

    ]

    const handleClick = (id) => {
        navigate(`/legal-resources-details/${id}`)
    }
    return (
        <div className="container mx-auto md:px-4 pb-[24px] lg:pb-[48px] md:pt-[30px] lg:pt-[96px]">
            <h1 className="font-roboto font-bold text-[24px] md:text-[32px] text-center py-[32px] text-primary">Free legal resources</h1>

            {/* Free legal resources cards */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
                    {
                        resurcesData.map((item, index) => {
                            return (
                                <div key={index} className="relative w-full h-full lg:w-[329px] lg:h-[306px] rounded">
                                    {/* Image */}

                                    <div className="w-full h-full lg:w-[329px] lg:h-[306px]">
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
                                        <button
                                            onClick={() => handleClick(item.id)}
                                            className="mt-3 bg-white text-black px-4 py-2 font-semibold rounded">
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