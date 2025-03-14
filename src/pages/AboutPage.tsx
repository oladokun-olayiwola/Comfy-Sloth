import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";
import { useProductsContext } from "../context/products_context";

const AboutPage: React.FC = () => {
  const { single_product } = useProductsContext();

  return (
    <main>
      <PageHero title="about" product={single_product} />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            At Comfy Sloth, we believe furniture is more than just decor—it's a
            reflection of your personality and lifestyle. Founded with a passion
            for quality craftsmanship and innovative design, we've dedicated
            ourselves to creating custom furniture that perfectly balances
            comfort and style. From timeless classics to modern pieces, every
            item we craft is made to transform your space into a true sanctuary
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
