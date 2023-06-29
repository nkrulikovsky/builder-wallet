import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-sky/30 text-black">
      <div className="flex flex-col sm:flex-row mt-8 sm:mt-20 justify-center">
        <div></div>
        <div>
          <p className="text-2xl font-black">Builder DAOs in the pocket</p>
          <p>Track all auctions</p>
          <p>See all pending proposals</p>
        </div>
      </div>
    </main>
  )
}
