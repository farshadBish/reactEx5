import React, { useState } from 'react'
import SingleBook from './SingleBook'
import { Col, Container, Form, Row } from 'react-bootstrap'
import CommentArea from './CommentArea'

const BookList =(props)=>{

    const [searchQuery,setSearchquerry] = useState('');
    const [selectedBook,setSelectedbook] = useState(null);

        return (
            <Container>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Search</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search here"
                                        value={searchQuery}
                                        onChange={e =>setSearchquerry(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            {
                                props.books.filter(b => b.title.toLowerCase().includes(searchQuery)).map(b => (
                                    <Col xs={3} key={b.asin} >
                                        <SingleBook
                                            book={b}
                                            selectedBook={selectedBook}
                                            changeSelectedBook={asin => setSelectedbook(asin)} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col md={4}>
                        <CommentArea asin={selectedBook} />
                    </Col>
                </Row>
            </Container>
        )
    }

export default BookList