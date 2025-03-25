import useAboutData from "../../hooks/useAboutData";

const About = () => {
  const [aboutData, refetch] = useAboutData();

  return (
    <div className="flex items-center min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div 
          dangerouslySetInnerHTML={{ __html: aboutData?.about }} 
          className="w-full max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] break-words bg-gray-400 p-6 sm:p-8 text-center md:text-left rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default About;
