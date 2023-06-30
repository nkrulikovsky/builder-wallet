export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-sky/50 text-black">
      <div className="flex flex-col-reverse md:flex-row mt-12 md:mt-20 mb-20 justify-center items-center gap-8 md:gap-20 lg:gap-32 px-8 text-center md:text-start">
        <div className="">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-72 rounded-[2.5rem] border-[7px] border-black ring-[3px] ring-[#7e7384] rotate-0 md:-rotate-1"
            src="/video/showcase.mp4"
          />
        </div>
        <div className="pb-4">
          <h1 className="text-2xl md:text-4xl font-black">
            Your Builder DAOs
            <br />
            in the pocket
          </h1>
          <div className="mt-8">
            <p>
              <span className="text-pink">•</span> All your Daos in one place
            </p>
            <p>
              <span className="text-purple">•</span> See pending proposals
            </p>
            <p>
              <span className="text-green">•</span> Track auctions
            </p>
            <p>
              <span className="text-orange">•</span> Widgets for everything
            </p>
            <p>
              <span className="text-red">•</span> Vote
              <span className="text-black">&</span>Bid via in-app browser
            </p>
          </div>
          <div className="mt-10 max-w-max hidden md:flex flex-col">
            <div className="bg-white rounded-2xl p-2 gap-1">
              <img
                src="/svg/app-store-qr.svg"
                alt="App Store Install QR Code"
                className="h-32 w-32"
              />
            </div>
            <p className="mt-1.5 text-center text-xs text-[#3e87f8]/90 font-bold leading-3">
              Scan to install
              <br />
              on the phone
            </p>
          </div>
          <div className="mt-8 flex md:hidden w-full justify-center">
            <a
              href="https://testflight.apple.com/join/Ja91wWG3"
              target="_blank"
            >
              <img
                src="/svg/app-store-download-badge.svg"
                alt="App Store Download Badge"
                className="w-32 m-1.5"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
