import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomNotFound = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-[400px]">
                <h1 className="text-xl font-semibold uppercase text-center">data not found</h1>
                <div className="flex justify-center">
                    <Button style={{ backgroundColor: "#1b69ad", color: "white", width: "115px", height: "48px", fontSize: "16px", fontFamily: "Roboto" }}>
                        <Link to={'/'}>Go Back</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CustomNotFound