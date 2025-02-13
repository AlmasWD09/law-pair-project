
const About = () => {
  console.log(import.meta.env.VITE_API_URL)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-154px)]  md:h-[calc(100vh-454px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-roboto">Data Not Found</h1>
          <h2 className="text-xl font-semibold">About Page</h2>
        </div>
      </div>
    )
  }
  
  export default About