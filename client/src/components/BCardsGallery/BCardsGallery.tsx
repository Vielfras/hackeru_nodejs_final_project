import './BCardsGallery.css'
import BCard from '../Card/BCard'
import { ICard } from '../../interfaces/CardInterfaces'
import { Row } from 'react-bootstrap'

interface IBCardsGalleryProps {
  cards: ICard[]
}

export default function BCardsGallery(props:IBCardsGalleryProps) {
  
  const { cards } = props

  return (
    <>
      <Row xs={1} md={2} lg={3} xl={4} className="g-5">
        {
          cards.map((card) => (
            <BCard key={card._id} card={card} />
          ))
        }
      </Row>
      <h5 className='mt-5'>Total {cards?.length} cards</h5>
    </>
  )
}
