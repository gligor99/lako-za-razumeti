import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [promptText, setPromptText] = useState<string>('')
  const [summarizedText, setSummarizedText] = useState<string>('')

  const getSummarizedText = async () => {
    if (!promptText)
      return alert('Nema unesenog teksta! Unesite tekst za sažetak.')

    setLoading(true)

    const trimmedText = promptText.replace(/\s/g, ' ')
    const prompt = `Sumirajte ovo, kako bi bilo lakse za razumeti: ${trimmedText}`

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })

    setSummarizedText(completion.data.choices[0].text || '')
    setLoading(false)
  }

  return (
    <section className="flex h-screen w-screen flex-1 flex-col items-center justify-center p-10">
      <div className="flex items-center justify-center">
        <p className="hidden  text-center lg:block">
          Aplikacija vrši sumarizaciju teksta na njegove ključne tačke kako bi
          olakšala razumevanje i uštedela vreme čitaocima. Sa samo jednim
          klikom, aplikacija skraćuje tekst i izdvaja najbitnije informacije
          kako bi se dobilo brzo i efikasno razumevanje sadržaja. Sa ovom
          aplikacijom, možete biti sigurni da ćete brzo dobiti suštinske
          informacije koje vam trebaju.
        </p>
      </div>
      <div className="grid h-screen w-full grid-cols-1 gap-5 p-2 lg:grid-cols-2 lg:p-16">
        <div className="h-full w-full ">
          <textarea
            readOnly={loading}
            placeholder="Dodajte tekst ..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="h-full w-full resize-none rounded-lg border-2 border-black p-4 focus:border-pink-100 active:border-pink-100"
          ></textarea>
        </div>
        <div className="h-full w-full">
          <textarea
            readOnly
            value={summarizedText.trim()}
            wrap="virtual"
            placeholder="Generisani tekst ..."
            className="aligntop h-full w-full resize-none rounded-lg border-2 border-black p-4 focus:border-pink-100 active:border-pink-100"
          ></textarea>
        </div>
      </div>

      <button
        className={`flex min-h-[50px] min-w-[250px] items-center  justify-center rounded-lg bg-yellow-300 py-2 px-2 font-semibold uppercase text-black ${
          loading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={getSummarizedText}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="h-5 w-5 animate-spin  rounded-full border-t-2 border-b-2 border-black"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-7.938A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
            />
          </svg>
        ) : (
          'Izvuci najvažnije'
        )}
      </button>
    </section>
  )
}
