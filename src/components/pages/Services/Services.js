import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";
import * as React from "react";
// import { Element } from "react-scroll";
// import styled from "styled-components";
// import { Marginer } from "./marginer";
// import { ReviewCard } from '../ReviewCard';
// import { SectionTitle } from "./sectionTitle";
import { useMediaQuery } from "react-responsive";
import Navbar from "../../Navbar"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "../Services/Services.css"


import "pure-react-carousel/dist/react-carousel.es.css";

// import User1Img from "./images/img-5.jpg";
// import User2Img from "./images/img-5.jpg";
// import User3Img from "./images/img-5.jpg";
// import User4Img from "./images/img-5.jpg";


// const ReviewsContainer = styled(Element)`
//   height: 700px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StyledCarouselProvider = styled(CarouselProvider)`
//   width: 50%;
//   @media screen and (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const StyledSlide = styled(Slide)`
//   .carousel__inner-slide {
//     display: flex;
//     justify-content: center;
//   }
// `;

// const StyledDotGroup = styled(DotGroup)`
//   margin: auto;
//   display: flex;
//   justify-content: center;
//   button {
//     width: 11px;
//     height: 11px;
//     border-radius: 50%;
//     background-color: #e4e4e4;
//     border: none;
//     outline: none;
//     &:not(:last-of-type) {
//       margin-right: 3px;
//     }
//   }
//   .carousel__dot--selected {
//     background-color: #c4c4c4;
//   }
// `;
export function Services() {
  // const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="accordion">
        <Accordion defaultActiveKey="0">

          <Card className="accordion">
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Balance Sheet Analysis
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div>
                  What Is a Balance Sheet?
                </div>
                <p>
                  A balance sheet is a financial statement that reports a company's assets, liabilities and shareholders' equity at a specific point in time, and provides a basis for computing rates of return and evaluating its capital structure. It is a financial statement that provides a snapshot of what a company owns and owes, as well as the amount invested by shareholders.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card >
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Cash Flow Analysis
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div>
                  What Is Cash Flow From Financing Activities?
                </div>
                <p>
                  Cash flow from financing activities (CFF) is a section of a company’s cash flow statement, which shows the net flows of cash that are used to fund the company. Financing activities include transactions involving debt, equity, and dividends.
                  Cash flow from financing activities provides investors with insight into a company’s financial strength and how well a company's capital structure is managed.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>


          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Income Analysis
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <div>
                  What Is Cash Flow From Financing Activities?
                </div>
                <p>
                  What is an Income Statement?
                  An income statement is one of the three important financial statements used for reporting a company's financial performance over a specific accounting period, with the other two key statements being the balance sheet and the statement of cash flows.
                  Also known as the profit and loss statement or the statement of revenue and expense, the income statement primarily focuses on the company’s revenues and expenses during a particular period.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>


          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                Assets Management
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <div>
                  What Are Assets Under Management (AUM)?
                </div>
                <p>
                  Assets under management (AUM) is the total market value of the investments that a person or entity manages on behalf of clients. Assets under management definitions and formulas vary by company.
                  In the calculation of AUM, some financial institutions include bank deposits, mutual funds, and cash in their calculations. Others limit it to funds under discretionary management, where the investor assigns authority to the company to trade on his behalf.
                  Overall, AUM is only one aspect used in evaluating a company or investment. It is also usually considered in conjunction with management performance and management experience. However, investors often consider higher investment inflows and higher AUM comparisons as a positive indicator of quality and management experience.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>



        </Accordion>
      </div>


      {/* <ReviewsContainer>
        <SectionTitle>What others are saying about us</SectionTitle>
        <Marginer direction="vertical" margin="3em" />
        <StyledCarouselProvider
          naturalSlideWidth={200}
          naturalSlideHeight={isMobile ? 250 : 205}
          totalSlides={4}
          visibleSlides={isMobile ? 1 : 2}
          dragEnabled={false}
        >
          <Slider>
            <StyledSlide index={0}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User1Img}
              />
            </StyledSlide>
            <StyledSlide index={1}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User2Img}
              />
            </StyledSlide>
            <StyledSlide index={2}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User3Img}
              />
            </StyledSlide>
            <StyledSlide index={3}>
              <ReviewCard
                reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
                username="John coner"
                userImgUrl={User4Img}
              />
            </StyledSlide>
          </Slider>

          <StyledDotGroup />
        </StyledCarouselProvider>
      </ReviewsContainer>
      <p>What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <br/>
      <br/>
      <br/> */}
    </>
  );
}