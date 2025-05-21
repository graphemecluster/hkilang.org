import Image from "next/image"
import { getAboutData } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/strapi"
import AboutTimeline from "@/components/about/about-timeline"
import AboutMembers from "@/components/about/about-members"

export default async function AboutContent() {
  const aboutData = await getAboutData()
  const data = aboutData.data

  // Extract sections
  const mission = data.sections[0]
  const introduction = data.sections[1]
  const logo = data.sections[2]


  // Get logo image URL
  const logoImageUrl = getStrapiMedia(data.logo?.data?.attributes?.url)

  return (
    <div>
      {/* Mission Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">本會宗旨</h2>
            <div className="w-20 h-1 bg-red-800 mb-4"></div>
          </div>
          <div className="md:col-span-2">
            {mission && (
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: mission.content }}
                  className="prose prose-red prose-img:rounded-lg prose-headings:font-serif max-w-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">本會簡介</h2>
            <div className="w-20 h-1 bg-red-800 mb-4"></div>
          </div>
          <div className="md:col-span-2">
            {introduction && (
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: introduction.content }}
                  className="prose prose-red prose-img:rounded-lg prose-headings:font-serif max-w-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">本會會徽</h2>
            <div className="w-20 h-1 bg-red-800 mb-4"></div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {logoImageUrl && (
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <Image
                      src={logoImageUrl || "/placeholder.svg"}
                      alt="香港本土語言保育協會會徽"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <div>
                {logo && (
                  <div className="prose prose-lg max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: logo.content }}
                      className="prose prose-red prose-img:rounded-lg prose-headings:font-serif max-w-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">組織架構</h2>
            <div className="w-20 h-1 bg-red-800 mb-4"></div>
          </div>
          <div className="md:col-span-2">
            <AboutMembers members={data.members || []} />
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">發展歷程</h2>
            <div className="w-20 h-1 bg-red-800 mb-4"></div>
          </div>
          <div className="md:col-span-2">
            <AboutTimeline timeline={data.timeline || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
