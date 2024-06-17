import './CardDetails.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { apiBase } from '../../config'

interface ICard {
  _id: string
  title: string
  subTitle: string
  description: string
  image: { url: string, alt: string }
  bizNumber: number
  user_id: string
}

export default function CardDetails() {

  const { cardId } = useParams()

  const [card, setCard] = useState<ICard|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${apiBase}/cards/${cardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()).data;
        if (!response.ok) throw new Error(data)
        setCard(data)
      } catch (err) {
        const errMessage = (err as Error).message
        setError(errMessage)
      }
    };
    fetchCard();
  },[cardId])

  return (
    <div className='CardDetails Page'>
      <h3>Card Details</h3>
      <br></br>

      <div>
        {
          (error) &&
            <>
              <h5>Error getting card '{cardId}' :</h5>
              <div style={{color:'red'}}>{error}</div>
            </>
        }
      </div>
      {
        (card) ?
        <Container>
          
          <Row className="g-5">
              <Col>
                <Card className="text-center">
                  <Card.Header style={{fontWeight:'500'}}>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Img variant="top" src={card.image.url} style={{height:'200px',objectFit:'cover'}}/>
                    <Card.Title>{card.subTitle}</Card.Title>
                    <Card.Text>
                      {card.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Button variant="primary" size='sm' className='mx-3'><CiEdit className='me-1' size={22} style={{marginTop:'-5px'}}/>Edit Card</Button>
                    <Button variant="danger" size='sm' className='mx-3'><CiTrash className='me-1' size={22} style={{marginTop:'-5px'}}/>Delete Card</Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col className='border rounded'>
                <div className='py-5'>
                  Maybe the 'Add new card' \ 'Edit card' option here ? ...
                  <br></br>
                  Maybe just additional info (likes count, owner, creation date, etc ...) ?
                </div>
              </Col>

          </Row>
        </Container>
          :
          null
      }

    </div>
  )
}
