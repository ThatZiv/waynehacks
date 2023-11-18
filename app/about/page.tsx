import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ from "@/components/FAQ";
import Announcement from "@/components/Announcement";
import constants from "@/misc/constants";

export const revalidate = 15 * 60; // revalidate every 15 min
export const dynamic = "force-static"; // force static (this wont work)

const colClass = "w-48 h-72"
const imageContainerClass = "h-64 w-48 border-8 p-2 ml-20 mr-20"
const imageClass = "h-full w-full object-cover"

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-white items-center">
        <h1 className="text-center">About Us</h1>
        <div className="w-auto"/>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5 justify-self-center">
          <div className={colClass}><div className={imageContainerClass}><img src="/res/Zavaar_Shah.jpg" alt="Headshot of Zavaar Shah" className={imageClass}/><span className="items-center w-48 ">Zavaar Shah</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><img src="/res/Cayden_Koweck.jpg" alt="Headshot of Cayden Koweck" className={imageClass}/><span className="items-center w-48 ">Cayden Koweck</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><img src="/res/Madeline_Bartley.jpg" alt="Headshot of Madeline Bartley" className={imageClass}/><span className="items-center w-48 ">Madeline Bartley</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><img src="/res/Christian_Rudiger.png" alt="Headshot of Christian Rudiger" className={imageClass}/><span className="items-center w-48 ">Christian Rudiger</span></div></div>
          <div className={colClass}><div className={imageContainerClass}><img src="/res/Omair_Hashmi.png" alt="Headshot of Omair Hashimi" className={imageClass}/><span className="items-center w-48 ">Omair Hashimi</span></div></div>
        </div>
        <div className="w-auto"/>
      </div>
    </div>
  );
}
