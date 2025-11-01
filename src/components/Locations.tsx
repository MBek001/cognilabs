import { useTranslations } from 'next-intl';
import Image from 'next/image'

export default function Locations() {

    const t = useTranslations("Locations");

  return (
    <div className='container mx-auto mt-20 mb-20'>
<h3 className="text-center text-7xl font-semibold">
  {(() => {
    const words = t("headword").split(" ");
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span className="text-blue-500">{lastWord}</span>
      </>
    );
  })()}
</h3>
        <div className='flex justify-center  mt-20 mb-20'>
            <div> 
            <Image src="/locations/location1.png" alt="locations" width={500} height={746} />
        </div>
        <div>
            <Image className='rounded-r-4xl' src="/locations/loc2.png" alt="locations" width={500} height={746} />
        </div>
        </div>
    </div>
  )
}
 