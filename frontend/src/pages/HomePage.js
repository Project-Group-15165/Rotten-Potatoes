import {
    Row,
    Col,
    Container,
  } from "reactstrap";

import BookCard from '../components/cards/Bookcard'
import AuthorCard from '../components/cards/Authorcard'
import GenreCard from '../components/cards/genrecard'
import useScrollToTop from '../services/useScrollToTop'

function HomePage() {
    useScrollToTop()
    return (
    <>
        <section id="popular-books" class="bookshelf no-padding-bottom no-margin no-padding">
		<Container >
			<Row>
                <Col md={12}>
                    <div class="section-header align-center">
                        <h2 class="section-title">Popular Books</h2>
                    </div>
                </Col>                
            </Row>
            <Row>
                <Col xs="12" sm="6" md="6" lg="3">
                    <BookCard bookid={1}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <BookCard bookid={2}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <BookCard bookid={3}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <BookCard bookid={4}/>
                </Col>
            </Row>
        </Container>
        </section>
        <section id="popular-authors" class="bookshelf no-padding-bottom no-margin no-padding">
		<Container >
			<Row>
                <Col md={12}>
                    <div class="section-header align-center">
                        <h2 class="section-title">Popular Authors</h2>
                    </div>
                </Col>                
            </Row>
            <Row>
                <Col xs="12" sm="6" md="6" lg="3">
                    <AuthorCard authorid={1}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <AuthorCard authorid={2}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <AuthorCard authorid={3}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <AuthorCard authorid={4}/>
                </Col>
            </Row>
        </Container>
        </section>
        <section id="popular-genres" class="bookshelf no-padding-bottom no-margin no-padding">
		<Container >
			<Row>
                <Col md={12}>
                    <div class="section-header align-center">
                        <h2 class="section-title">Popular Genres</h2>
                    </div>
                </Col>                
            </Row>
            <Row>
                <Col xs="12" sm="6" md="6" lg="3">
                    <GenreCard genre={{genreid:1, name:"Fantasy"}}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <GenreCard genre={{genreid:2, name:"Young Adult"}}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <GenreCard genre={{genreid:3, name:"Fiction"}}/>
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <GenreCard genre={{genreid:4, name:"Magic"}}/>
                </Col>
            </Row>
        </Container>
        </section>
        
    </>
    )
}
    
export default HomePage;