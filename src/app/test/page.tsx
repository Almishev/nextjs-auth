export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Tailwind Test Page</h1>
      <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
        This is a red background with white text
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
        This is a green background with white text
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
        This is a blue background with white text
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-purple-500 text-white p-4 rounded-lg">Grid Item 1</div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">Grid Item 2</div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">Grid Item 3</div>
      </div>
    </div>
  )
} 