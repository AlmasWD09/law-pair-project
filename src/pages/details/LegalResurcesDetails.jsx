import { useParams } from "react-router-dom"

const LegalResurcesDetails = () => {
  const { id } = useParams()




  return (
    <section className="flex justify-center py-3">
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <img
          className="object-cover w-full h-64 md:h-[70%]"
          src="/legalImage/legal2.png"
          alt="Article"
        />

        <div className="p-6">
          <div>
            <p
              href="#"
              className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              tabIndex="0"
              role="link"
            >
              Your Legal Compass
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Navigate complex legal matters with clarity and confidence.
            </p>
          </div>

       
        </div>
      </div>
    </section>
  )
}

export default LegalResurcesDetails