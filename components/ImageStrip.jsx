export default function ImageStrip() {
  return (
    <section className="py-24 overflow-hidden bg-white w-full">
      <div className="w-[120%] -ml-[10%] flex gap-8">
        <div className="w-1/4 aspect-[3/4] bg-[#f8f8f8] rounded-lg"></div>
        <div className="w-1/4 aspect-[3/4] bg-[#f0f0f0] rounded-lg translate-y-12"></div>
        <div className="w-1/4 aspect-[3/4] bg-[#e8e8e8] rounded-lg"></div>
        <div className="w-1/4 aspect-[3/4] bg-[#f4f4f4] rounded-lg -translate-y-8"></div>
        <div className="w-1/4 aspect-[3/4] bg-[#ececec] rounded-lg translate-y-16"></div>
      </div>
    </section>
  )
}
