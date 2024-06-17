import './BCard.css'
import { ICard } from '../../interfaces/CardInterfaces'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Card } from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'

interface IBcardProps {
  card: ICard
}

export default function BCard(props: IBcardProps) {

  const { card } = props

  const navigate = useNavigate()

  const goToCardDetails = (cardId: string) => {
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } })
  }

  return (
    <>
      <Col key={card._id}>
        <Card className="text-center">
          <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={card.image.url} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Title className='pt-3'>{card.subtitle}</Card.Title>
            <Card.Text>
              {card.description}
            </Card.Text>
            <Button variant="primary" size='sm' onClick={() => goToCardDetails(card._id)}>Go to card</Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            <AiOutlineLike size={18} style={{ marginTop: '-5px' }} />
            <span className='px-2'>{card.likes.length} {card.likes.length>1 ? 'likes':'like'}</span>
          </Card.Footer>
        </Card>
      </Col>
    </>
  )
}
