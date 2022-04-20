import { useEffect, useRef, useState } from 'react'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import Aplayer from 'aplayer'

const Music = ({ neteaseSongId: neteaseMusicId }: { neteaseSongId: string }) => {
  const musicApi = 'https://api.i-meto.com/meting/api?server=netease'
  const aPlayerRef = useRef<HTMLDivElement>(null)
  async function getData(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
    const json = await response.json()
    return json[0]
  }

  // When mounted on client, now we can show the UI
  useEffect(() => {
    let aPlayer: Aplayer | null = null
    getData(`${musicApi}&type=song&id=${neteaseMusicId}`).then((res) => {
      const { title, url, pic, lrc, author } = res
      aPlayer = new APlayer({
        container: aPlayerRef.current,
        lrcType: 3,
        audio: {
          name: title,
          artist: author,
          url: url,
          cover: pic,
          lrc: lrc,
        },
      })
    })
    return () => {
      aPlayer && aPlayer.destroy()
    }
  }, [neteaseMusicId])

  return <div ref={aPlayerRef} className="aplayer aplayer-withlrc"></div>
}
export default Music
