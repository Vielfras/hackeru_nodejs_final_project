import './Free.css'
import { useEffect, useState } from 'react'
import { ICard } from '../../interfaces/CardInterfaces';
import { doGetAllCards } from '../../services/CardsService';
import BCardsGallery from '../../components/BCardsGallery/BCardsGallery';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function Free() {

  const [cards, setCards] = useState<ICard[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getAllCards = async () => {
      const { error, result } = await doGetAllCards()
      if (error) {
        setError(error)
      } else {
        setCards(result)
      }
    }
    getAllCards();
  }, [])

  return (
    <div className='Free Page'>
      <h3>Free Page</h3>
      <br></br>
      <div>
        {(error) && <div>Error getting cards 😞 <br></br> {error}</div>}
      </div>
      {
        (cards) ?
          <BCardsGallery cards={cards}/>
        :
          (!error) && <LoadingSpinner animation='grow' variant='primary'/>
      }
    </div>
  )
}