import { Card, CardContent } from "@/components/ui/card"
import { getStrapiMedia } from "@/lib/strapi"
import DictionaryAudioPlayer from "./dictionary-audio-player"

interface DictionaryCharacterResultProps {
  character: any
}

export default function DictionaryCharacterResult({ character }: DictionaryCharacterResultProps) {
  const { codepoint, chars, notes } = character

  // Group forms by language
  const formsByLang = chars.reduce((acc: any, form: any) => {
    if (form.lang) {
      const langName = form.lang.zhName
      if (!acc[langName]) {
        acc[langName] = form
      }
    }
    return acc
  }, {})

  return (
    <Card className="overflow-hidden border-2 border-red-100">
      <div className="bg-red-800 px-4 py-2 text-white">
        <div className="text-lg font-medium">{codepoint}</div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-6">
          {Object.entries(formsByLang).map(([langName, form]: [string, any]) => (
            <div key={langName} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{langName}</h3>
                {form.audio && <DictionaryAudioPlayer src={getStrapiMedia(form.audio.url) || ""} language={langName} />}
              </div>
              <div className="text-base mb-3">{form.pron}</div>
              {form.glyph && form.glyph !== codepoint && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-500">字形：</span>
                  <span className="text-lg">{form.glyph}</span>
                </div>
              )}
              {form.notes && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-500">備註：</span>
                  <span>{form.notes}</span>
                </div>
              )}
              {form.examples && form.examples.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-500">例詞：</span>
                  <div className="mt-1 space-y-2">
                    {form.examples.map((example: any, idx: number) => (
                      <div key={idx} className="pl-4 border-l-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            {example.glyph && <span className="text-gray-900 mr-2">{example.glyph}</span>}
                            <span className="text-gray-600">[{example.pron}]</span>
                          </div>
                          {example.audio && (
                            <DictionaryAudioPlayer
                              src={getStrapiMedia(example.audio.url) || ""}
                              language={langName}
                              small
                            />
                          )}
                        </div>
                        {example.notes && <p className="text-gray-500 text-sm mt-1">{example.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {notes && (
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">備註：</span>
              <p className="text-gray-700">{notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
