import Image from "next/image";

export const revalidate = 15 * 60; // revalidate every 15 min
export const dynamic = "force-static"; // force static (this won't work)

const colClass = "w-48 h-72"
const imageContainerClass = "h-64 w-48 border-8 p-2 mr-20"
const imageClass = "h-full w-full object-cover"

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-white">
        <h1 className="text-center text-3xl pb-5">About Us</h1>
        <p className="text-center  text-2px">
          Established in Fall 2021 as Wayne State&apos;s only Computer Science organization, SCD is focused on creating opportunities
          for students interested in coding and development. We aim to provide a community of peers that support one another in
          coding, resume building, networking, and developing new skills.<br/>
          WayneHacks is one of those efforts, while past events have been hosted online, this is our first step in transitioning
          to an in-person event.
        </p>
        <h2 className="text-center text-2xl pb-5 pt-2">Our Team</h2>
        <div className="w-auto"/>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className={colClass}><div className={imageContainerClass}><Image src="/res/Zavaar_Shah.jpg" width={248} height={248} alt="Headshot of Zavaar Shah" className={imageClass}/><span className="items-center w-48 ">Zavaar Shah</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><Image src="/res/Cayden_Koweck.jpg" width={248} height={248} alt="Headshot of Cayden Koweck" className={imageClass}/><span className="items-center w-48 ">Cayden Koweck</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><Image src="/res/Madeline_Bartley.jpg" width={248} height={248} alt="Headshot of Madeline Bartley" className={imageClass}/><span className="items-center w-48 ">Madeline Bartley</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><Image src="/res/Christian_Rudiger.png" width={248} height={248} alt="Headshot of Christian Rudiger" className={imageClass}/><span className="items-center w-48 ">Christian Rudiger</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><Image src="/res/Omair_Hashmi.png" width={248} height={248} alt="Headshot of Omair Hashimi" className={imageClass}/><span className="items-center w-48 ">Omair Hashimi</span></div></div>
        </div>
        <div className="w-auto"/>
      </div>
    </div>
  );
}
