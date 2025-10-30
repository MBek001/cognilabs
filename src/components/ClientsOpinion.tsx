import { useTranslations } from 'next-intl'

export default function ClientsOpinion() {

    const t = useTranslations("ClientsOpinion")

    const clientOpinions = [
      {
        id: 1,
        name: "Erkinbay Abdullayev",
        position: "Founder and CEO of Eric's Consulting",
        img: "/clients/client1.png",
        stars:5,
        comment: "В короткие сроки команда Cognilabs предоставила качественные и профессиональные услуги. Для нас было особенно важно — точность и своевременное выполнение задач, — и они ответственно выполнили эти требования. Я определённо рекомендую их и другим представителям бизнеса!"
      },
       {
        id: 2,
        name: "The Djafariy team",
        position: "",
        img: "/clients/client2.png",
        stars:5,
        comment: "We are pleased to have worked with the Cognilabs team!The mobile app, online store, and website turned out even better than we expected.The team's attentive and professional approach made us very happy.In the future, we plan to continue working with this team on an ongoing basis."
      },
      {
        id: 2,
        name: "Best Solar team",
        position: "",
        img: "/clients/client3.png",
        stars:5,
        comment: "The Cognilabs team provided us with AI-powered sales agents.They respond to customers automatically and quickly provide the necessary information.This has significantly eased our work and allowed us to redirect our time to more important tasks.Many thanks to the Cognilabs team."
      },
    ]

  return (
    <div className='mt-40'>
        <div className='flex flex-col gap-7 mb-10 justify-center items-center'>
            <h3 className='text-6xl font-semibold w-[1000px] text-center'>
                {t("maintext").split(' ').map((word, index) => {
                    // 3-4 so'zlarni ko'k rangga bo'yash (index 2 va 3)
                    if (index === 2 || index === 3) {
                        return <span key={index} className='text-blue-500'>{word} </span>
                    }
                    return <span key={index}>{word} </span>
                })}
            </h3>
            <p className='text-3xl w-[900px] font-thin  text-[#FFFFFFCC] text-center'>{t("text")}</p> 
        </div>
        <div>

        </div>
    </div>
  )
}