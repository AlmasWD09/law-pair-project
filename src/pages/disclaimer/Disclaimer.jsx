import useDisclimerData from "../../hooks/useDisclimerData"

const Disclaimer = () => {
  const [disclimerData,refetch] = useDisclimerData();
  return (
    <div className=" h-[calc(100vh-154px)]  md:h-[calc(100vh-454px)]">
    <div className="container mx-auto py-8 px-4">
    <div dangerouslySetInnerHTML={{ __html: disclimerData?.disclaimer }} className="max-w-[700px] text-wrap"/>
    </div>
  </div>
  )
}

export default Disclaimer