
import Image from "next/image";
async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();


  return (
    <>
      <div className="mt-20">
        <div className="container">
          <div className="mx-auto flex justify-between gap-6 lg:gap-8 flex-col lg:flex-row">
            <div className="w-full lg:w-[58%] relative min-h-[300px] sm:min-h-[400px]">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="lg:max-w-[635px] w-full">
              <div className="pb-4 sm:pb-6 border-b border-bdr-clr border-bdr-clr-drk">
                <h2 className="font-semibold pb-5 text-3xl leading-none tracking-tight text-title text-black">
                  {data.title}
                </h2>

                <span className="text-2xl pb-5 sm:text-3xl leading-none block">
                  კატეგორია: {data.category}
                </span>

                <span className="text-2xl pb-5 sm:text-3xl leading-none block">
                  ფასი: {data.price} ₾
                </span>

                <span className="text-2xl pb-5 sm:text-3xl leading-none block">
                  კატეგორია: {data.category}
                </span>

                <p className="text-base pb-5 md:text-lg leading-6 font-normal text-title text-black mt-2">
                  {data.description}
                </p>
              </div>

              <div className="py-5 sm:py-6  ">
              <div className="flex items-center gap-3">
                  <div className="inc-dec flex items-center gap-2">
                    <div className="dec w-8 h-8 bg-[#E8E9EA] bg-dark-secondary flex items-center justify-center">
                      <button className="cursor-pointer" >  <span className="text-2xl"> - </span> </button>
                    </div>
                  </div>

                  <div> 0 </div>

                  <div className="inc w-8 h-8 bg-[#E8E9EA] bg-dark-secondary flex items-center justify-center">
                    <button className="cursor-pointer" ><span className="text-2xl"> + </span></button>
                  </div>
                </div>
                <div className="flex items-center gap-3"></div>

                <div className="flex gap-5 mt-4 sm:mt-6">
                  <button className="rounded-lg cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300">
                    Add to cart
                  </button>
                  <button className="rounded-lg cursor-pointer px-4 py-2 bg-gray-900 text-gray-100">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
