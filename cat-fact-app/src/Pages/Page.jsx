import { useState } from "react"
export default function Page() {
  const [fact, setFact] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchRandomFact = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://catfact.ninja/fact")
      const data = await response.json()
      setFact(data.fact)
    } catch (error) {
      setFact("Sorry, couldn't fetch a fact right now. Please try again!")
      console.error("Error fetching fact:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Random Cat Facts</h1>

        <button
          onClick={fetchRandomFact}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-6"
        >
          {loading ? "Loading..." : "Get Random Fact"}
        </button>

        {fact && (
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">{fact}</p>
          </div>
        )}

        {!fact && !loading && <p className="text-gray-500 italic">Click the button to get a random cat fact!</p>}
      </div>
    </div>
  )
}
