import './MyOwnCards.css'
import { useEffect, useState } from 'react'
import { ICard } from '../../interfaces/CardInterfaces';
import { doGetMyCards } from '../../services/CardsService';
import BCardsGallery from '../../components/BCardsGallery/BCardsGallery';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function MyOwnCards() {

  const [cards, setCards] = useState<ICard[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getMyCards = async () => {
      const { error, result } = await doGetMyCards()
      if (error) {
        setError(error)
      } else {
        setCards(result)
      }
    }
    getMyCards();
  }, [])

  return (
    <div className='MyOwnCards Page'>
      <h3>My Cards</h3>
      <br></br>

      <div>
        {(error) && <div>Error getting cards 😞 <br></br> {error}</div>}
      </div>
      {
        (cards) ?
          <BCardsGallery cards={cards} />
        :
          (!error) && <LoadingSpinner animation='grow' variant='primary' />
      }
    </div>
  )
}
