import React, { useState } from "react";
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";

const TabsSection = () => {
  const [plainTabs, setPlainTabs] = useState(1);

  const toggleNavs = (e, setTabs, index) => {
    e.preventDefault();
    setTabs(index);
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col className="mt-5 mt-lg-0" lg="9">
          {/* Menu */}
          <div className="nav-wrapper">
            <Nav
              className="nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={plainTabs === 1}
                  className={`mb-sm-3 mb-md-0 ${plainTabs === 1 ? 'active' : ''}`}
                  onClick={(e) => toggleNavs(e, setPlainTabs, 1)}
                  href="#pablo"
                  role="tab"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={plainTabs === 2}
                  className={`mb-sm-3 mb-md-0 ${plainTabs === 2 ? 'active' : ''}`}
                  onClick={(e) => toggleNavs(e, setPlainTabs, 2)}
                  href="#pablo"
                  role="tab"
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={plainTabs === 3}
                  className={`mb-sm-3 mb-md-0 ${plainTabs === 3 ? 'active' : ''}`}
                  onClick={(e) => toggleNavs(e, setPlainTabs, 3)}
                  href="#pablo"
                  role="tab"
                >
                  Messages
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={plainTabs === 4}
                  className={`mb-sm-3 mb-md-0 ${plainTabs === 4 ? 'active' : ''}`}
                  onClick={(e) => toggleNavs(e, setPlainTabs, 4)}
                  href="#pablo"
                  role="tab"
                >
                  Messages
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={plainTabs === 5}
                  className={`mb-sm-3 mb-md-0 ${plainTabs === 5 ? 'active' : ''}`}
                  onClick={(e) => toggleNavs(e, setPlainTabs, 5)}
                  href="#pablo"
                  role="tab"
                >
                  Messages
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Card className="shadow">
            <CardBody>
              <TabContent activeTab={`plainTabs${plainTabs}`}>
                <TabPane tabId="plainTabs1">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche tempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyeh
                    dreamcatcher synth.
                  </p>
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse.
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs2">
                  <p className="description">
                    Cosby sweater eu banh mi, qui irure terry richardson ex
                    squid. Aliquip placeat salvia cillum iphone. Seitan
                    aliquip quis cardigan american apparel, butcher voluptate
                    nisi qui.
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs3">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche tempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyeh
                    dreamcatcher synth.
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs4">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche tempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyehhhhhhhhhhh
                    dreamcatcher synth.
                  </p>
                </TabPane>
                <TabPane tabId="plainTabs5">
                  <p className="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cleanse. Mustache cliche thhhhhhhhhempor, williamsburg carles vegan
                    helvetica. Reprehenderit butcher retro keffiyeh
                    dreamcatcher synth.
                  </p>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TabsSection;