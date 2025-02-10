import { useParams } from "react-router-dom"

const AttorneyDetails = () => {
    const {id} = useParams()
    console.log(id)

    
  return (
    <div>AttorneyDetails</div>
  )
}

export default AttorneyDetails