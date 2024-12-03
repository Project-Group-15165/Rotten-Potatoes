import {
    Row,
    Col,
    Container,
  } from "reactstrap";

import Tabs from './../components/Tabs'

function HomePage() {
    return (
    <>
        <section id="popular-books" class="bookshelf no-padding-bottom no-margin no-padding">
		<Container >
			<Row>
                <Col md={12}>
                    <div class="section-header align-center">
                        <h2 class="section-title">Popular Books</h2>
                    </div>
                    <Tabs />
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
                    <Tabs />
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
                    <Tabs />
                </Col>                
            </Row>
        </Container>
        </section>
        
    </>
    )
}
    
export default HomePage;