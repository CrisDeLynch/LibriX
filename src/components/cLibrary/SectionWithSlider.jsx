import { useRef } from "react";
import Slider from "react-slick";
import BannerFlechas from "./BannerFlechas";
import BookCard from "../BookCard";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <BannerFlechas left={false} />,
    prevArrow: <BannerFlechas left />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

const SectionWithSlider = ({ libros }) => {
  const sliderRef = useRef();
  if (!libros?.length) return null;

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {libros.map((libro) => (
          <div key={libro.id} className="px-1">
            <BookCard {...libro} portadaUrl={libro.portada_url} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SectionWithSlider;
