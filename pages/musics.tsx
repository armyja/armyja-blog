import dynamic from 'next/dynamic'
const Music = dynamic(() => import('@/components/Music'), { ssr: false })
const Musics = () => {
  // return (<>12313213</>)
  return (
    <>
      1131<Music neteaseSongId={'1309896289'}></Music>
    </>
  )
}
export default Musics
